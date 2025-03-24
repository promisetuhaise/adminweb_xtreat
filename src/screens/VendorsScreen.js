import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  Pressable,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const VendorsScreen = () => {
  const navigation = useNavigation();

  // State for filtering vendor status ("Approved", "Pending", "Declined")
  const [activeFilter, setActiveFilter] = useState("Approved");

  // State for vendor list and pagination
  const [vendorList, setVendorList] = useState([]);
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  // State for deletion alert modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);

  // Helper function to get token from AsyncStorage
  const getAuthToken = async () => {
    try {
      let token = await AsyncStorage.getItem("authToken");
      return token || "";
    } catch (error) {
      console.error("Error reading token:", error);
      return "";
    }
  };

  // Check if token exists on mount. If not, redirect to the login screen.
  useEffect(() => {
    const checkAuth = async () => {
      const token = await getAuthToken();
      if (!token) {
        navigation.navigate("Login");
      }
    };
    checkAuth();
  }, [navigation]);

  // Fetch vendors from API on component mount
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch("http://192.168.28.234:8000/api/v1/vendors/vendors/", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        const vendorsData = data.results || data;
        const formattedData = vendorsData.map((vendor) => ({
          id: vendor.id || vendor.username,
          name: vendor.username,
          email: vendor.user_email,
          phone: vendor.phone_number,
          // Map shop details using the Django REST response fields
          shop: {
            shopname: vendor.shop_name,
            shopaddress: vendor.shop_address,
            shop_description: vendor.shop_description,
          },
          status: vendor.status, // "Approved", "Pending", or "Declined"
        }));
        setVendorList(formattedData);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    fetchVendors();
  }, []);

  // Filter vendors based on activeFilter
  const filteredVendors = vendorList.filter((vendor) => vendor.status === activeFilter);

  const totalPages = Math.ceil(filteredVendors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedVendors = filteredVendors.slice(startIndex, startIndex + itemsPerPage);

  // For Pending vendors: Approve and Reject handlers
  const handleApprove = async (vendorId, event) => {
    event.stopPropagation();
    const vendor = vendorList.find((v) => v.id === vendorId);
    if (!vendor) return;
    try {
      const token = "your-hardcoded-token-or-dynamic-token";
      const response = await fetch(
        `http://192.168.28.234:8000/api/v1/vendors/${vendorId}/toggle-status/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: "Approved" }),
        }
      );
      if (response.ok) {
        const updatedData = await response.json();
        const updatedVendors = vendorList.map((v) =>
          v.id === vendorId ? { ...v, status: updatedData.status } : v
        );
        setVendorList(updatedVendors);
      } else {
        const errorData = await response.json();
        console.error("Failed to approve vendor", response.status, errorData);
        Alert.alert("Error", "Failed to approve vendor.");
      }
    } catch (error) {
      console.error("Error approving vendor:", error);
      Alert.alert("Error", "An error occurred while approving vendor.");
    }
  };

  const handleReject = async (vendorId, event) => {
    event.stopPropagation();
    const vendor = vendorList.find((v) => v.id === vendorId);
    if (!vendor) return;
    try {
      const token = "your-hardcoded-token-or-dynamic-token";
      const response = await fetch(
        `http://192.168.28.234:8000/api/v1/vendors/${vendorId}/toggle-status/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: "Declined" }),
        }
      );
      if (response.ok) {
        const updatedData = await response.json();
        const updatedVendors = vendorList.map((v) =>
          v.id === vendorId ? { ...v, status: updatedData.status } : v
        );
        setVendorList(updatedVendors);
      } else {
        const errorData = await response.json();
        console.error("Failed to reject vendor", response.status, errorData);
        Alert.alert("Error", "Failed to reject vendor.");
      }
    } catch (error) {
      console.error("Error rejecting vendor:", error);
      Alert.alert("Error", "An error occurred while rejecting vendor.");
    }
  };

  // Toggle vendor status for non-pending vendors (toggle between Approved and Declined)
  const handleToggleStatus = async (vendorId, event) => {
    event.stopPropagation();
    const vendor = vendorList.find((v) => v.id === vendorId);
    if (!vendor) return;
    const newStatus = vendor.status === "Approved" ? "Declined" : "Approved";
    try {
      const token = "your-hardcoded-token-or-dynamic-token";
      const response = await fetch(
        `http://192.168.28.234:8000/api/v1/vendors/${vendorId}/toggle-status/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (response.ok) {
        const updatedData = await response.json();
        const updatedVendors = vendorList.map((v) =>
          v.id === vendorId ? { ...v, status: updatedData.status } : v
        );
        setVendorList(updatedVendors);
      } else {
        const errorData = await response.json();
        console.error("Failed to toggle status", response.status, errorData);
        Alert.alert("Error", "Failed to update vendor status.");
      }
    } catch (error) {
      console.error("Error toggling vendor status:", error);
      Alert.alert("Error", "An error occurred while updating vendor status.");
    }
  };

  // When delete is pressed, show the alert modal (stop propagation so row doesn't trigger navigation)
  const handleDeletePress = (vendor, event) => {
    event.stopPropagation();
    setSelectedVendor(vendor);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedVendor) {
      try {
        const token = await getAuthToken();
        if (!token) {
          Alert.alert("Unauthorized", "Please login again.");
          navigation.navigate("Login");
          return;
        }
        const response = await fetch(
          `http://192.168.28.234:8000/api/v1/vendors/${selectedVendor.id}/delete/`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );
        if (response.ok) {
          const updatedVendors = vendorList.filter((v) => v.id !== selectedVendor.id);
          setVendorList(updatedVendors);
          setShowDeleteModal(false);
          setSelectedVendor(null);
          if (currentPage > Math.ceil(updatedVendors.length / itemsPerPage)) {
            setCurrentPage(Math.ceil(updatedVendors.length / itemsPerPage));
          }
          Alert.alert("Success", "Vendor deleted successfully.");
        } else {
          const errorData = await response.json();
          console.error("Failed to delete vendor", response.status, errorData);
          Alert.alert("Error", "Failed to delete vendor.");
        }
      } catch (error) {
        console.error("Error deleting vendor:", error);
        Alert.alert("Error", "An error occurred while deleting vendor.");
      }
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedVendor(null);
  };

  // Pagination handlers
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Navigate to vendor details when a row is tapped
  const handleRowPress = (vendor) => {
    navigation.navigate("VendorDetails", { vendor });
  };

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <View style={styles.sidebar}>
        <TouchableOpacity
          style={styles.sidebarIconContainer}
          onPress={() => navigation.navigate("AdminDashboard")}
        >
          <Ionicons name="grid-outline" size={24} color="#fff" />
          <Text style={styles.sidebarIconLabel}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sidebarIconContainer}
          onPress={() => navigation.navigate("Customers")}
        >
          <Ionicons name="people-outline" size={24} color="#fff" />
          <Text style={styles.sidebarIconLabel}>Customers</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sidebarIconContainer}
          onPress={() => navigation.navigate("Vendors")}
        >
          <Ionicons name="storefront-outline" size={24} color="#fff" />
          <Text style={styles.sidebarIconLabel}>Vendors</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sidebarIconContainer}
          onPress={() => navigation.navigate("Reports")}
        >
          <Ionicons name="document-text-outline" size={24} color="#fff" />
          <Text style={styles.sidebarIconLabel}>Reports</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sidebarIconContainer}
          onPress={() => navigation.navigate("Orders")}
        >
          <Ionicons name="cart-outline" size={24} color="#fff" />
          <Text style={styles.sidebarIconLabel}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sidebarIconContainer}
          onPress={() => navigation.navigate("Settings")}
        >
          <Ionicons name="settings-outline" size={24} color="#fff" />
          <Text style={styles.sidebarIconLabel}>Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollContainer}>
          {/* Header (Title & Tabs) */}
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Vendors ({filteredVendors.length})</Text>
          </View>

          {/* Tabs Row */}
          <View style={styles.tabsRow}>
            <TouchableOpacity
              style={[styles.tabButton, activeFilter === "Approved" && styles.activeTab]}
              onPress={() => {
                setActiveFilter("Approved");
                setCurrentPage(1);
              }}
            >
              <Text style={styles.tabButtonText}>Approved</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabButton, activeFilter === "Pending" && styles.activeTab]}
              onPress={() => {
                setActiveFilter("Pending");
                setCurrentPage(1);
              }}
            >
              <Text style={styles.tabButtonText}>Pending</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabButton, activeFilter === "Declined" && styles.activeTab]}
              onPress={() => {
                setActiveFilter("Declined");
                setCurrentPage(1);
              }}
            >
              <Text style={styles.tabButtonText}>Declined</Text>
            </TouchableOpacity>
          </View>

          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, { flex: 3, borderRightWidth: 1, borderRightColor: "transparent", paddingRight: 10 }]}>
              Name
            </Text>
            <Text style={[styles.headerCell, { flex: 4, borderRightWidth: 1, borderRightColor: "transparent", paddingRight: 10 }]}>
              Contact
            </Text>
            <Text
              style={[
                styles.headerCell,
                {
                  flex: 3,
                  borderRightWidth: 1,
                  borderRightColor: "transparent",
                  paddingRight: 10,
                  marginRight: 20,
                },
              ]}
            >
              Shop
            </Text>
            <Text style={[styles.headerCell, { flex: 3, borderRightWidth: 1, borderRightColor: "transparent", paddingRight: 10 }]}>
              Description
            </Text>
            <Text style={[styles.headerCell, { flex: 2, borderRightWidth: 1, borderRightColor: "transparent", paddingRight: 10 }]}>
              Status
            </Text>
            <Text style={[styles.headerCell, { flex: 2 }]}>Action</Text>
          </View>

          {/* Table Body */}
          {displayedVendors.map((vendor) => (
            <Pressable
              key={vendor.id}
              style={({ hovered }) => [
                styles.tableRow,
                hovered && styles.tableRowHovered,
              ]}
              onPress={() => handleRowPress(vendor)}
              android_ripple={{ color: "#eee" }}
            >
              <View style={[styles.rowCell, { flex: 3, borderRightWidth: 1, borderRightColor: "transparent", paddingRight: 10 }]}>
                <Text style={styles.primaryText}>{vendor.name}</Text>
              </View>
              <View
                style={[
                  styles.rowCell,
                  {
                    flex: 4,
                    borderRightWidth: 1,
                    borderRightColor: "transparent",
                    paddingRight: 10,
                  },
                ]}
              >
                <Text style={styles.primaryText}>{vendor.email}</Text>
                <Text style={[styles.primaryText, { marginTop: 4 }]}>{vendor.phone}</Text>
              </View>
              <View
                style={[
                  styles.rowCell,
                  {
                    flex: 3,
                    borderRightWidth: 1,
                    borderRightColor: "transparent",
                    paddingRight: 10,
                    marginRight: 20,
                  },
                ]}
              >
                {vendor.shop ? (
                  <>
                    <Text style={styles.primaryText}>{vendor.shop.shopname}</Text>
                    <Text style={[styles.primaryText, { marginTop: 4 }]}>{vendor.shop.shopaddress}</Text>
                  </>
                ) : (
                  <Text style={styles.primaryText}>N/A</Text>
                )}
              </View>
              <View
                style={[
                  styles.rowCell,
                  { flex: 3, borderRightWidth: 1, borderRightColor: "transparent", paddingRight: 10 },
                ]}
              >
                <Text style={styles.primaryText}>
                  {vendor.shop && vendor.shop.shop_description ? vendor.shop.shop_description : ""}
                </Text>
              </View>
              <View
                style={[
                  styles.rowCell,
                  { flex: 2, borderRightWidth: 1, borderRightColor: "transparent", paddingRight: 10 },
                ]}
              >
                <View style={styles.statusContainer}>
                  <View
                    style={[
                      styles.statusIndicator,
                      vendor.status === "Approved"
                        ? styles.approvedIndicator
                        : vendor.status === "Pending"
                        ? styles.pendingIndicator
                        : styles.declinedIndicator,
                    ]}
                  />
                  <Text
                    style={[
                      styles.statusLabel,
                      vendor.status === "Approved"
                        ? styles.approvedText
                        : vendor.status === "Pending"
                        ? styles.pendingText
                        : styles.declinedText,
                    ]}
                  >
                    {vendor.status}
                  </Text>
                </View>
              </View>
              <View style={[styles.rowCell, { flex: 2, flexDirection: "row", alignItems: "center" }]}>
                {vendor.status === "Pending" ? (
                  <>
                    <TouchableOpacity onPress={(e) => handleApprove(vendor.id, e)} style={styles.actionIcon}>
                      <Ionicons name="checkmark-circle-outline" size={24} color="#388E3C" />
                      <Text style={styles.secondaryText}>Approve</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={(e) => handleReject(vendor.id, e)} style={[styles.actionIcon, { marginLeft: 20 }]}>
                      <Ionicons name="close-circle-outline" size={24} color="#D32F2F" />
                      <Text style={styles.secondaryText}>Reject</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <TouchableOpacity onPress={(e) => handleToggleStatus(vendor.id, e)} style={styles.actionIcon}>
                      <Ionicons
                        name={vendor.status === "Approved" ? "toggle" : "toggle-outline"}
                        size={30}
                        color={vendor.status === "Approved" ? "#f9622c" : "#ccc"}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={(e) => handleDeletePress(vendor, e)} style={[styles.actionIcon, { marginLeft: 15 }]}>
                      <Ionicons name="trash-outline" size={20} color="#280300" />
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </Pressable>
          ))}
        </ScrollView>

        {/* Pagination */}
        <View style={styles.paginationContainer}>
          <Text style={styles.paginationText}>
            Page {currentPage} of {totalPages}
          </Text>
          <View style={styles.paginationButtonsContainer}>
            <TouchableOpacity
              style={styles.paginationButtonBlack}
              onPress={handlePrevious}
              disabled={currentPage === 1}
            >
              <Text style={styles.paginationButtonTextWhite}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.paginationButtonWhite}
              onPress={handleNext}
              disabled={currentPage === totalPages}
            >
              <Text style={styles.paginationButtonTextBlack}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Deletion Alert Modal */}
        <Modal transparent={true} visible={showDeleteModal} animationType="fade">
          <View style={styles.alertContainer}>
            <View style={styles.alertBox}>
              <Text style={styles.alertTitle}>Confirm Delete</Text>
              {selectedVendor && (
                <Text style={styles.alertText}>
                  Are you sure you want to delete {selectedVendor.name}?
                </Text>
              )}
              <View style={styles.alertButtonContainer}>
                <TouchableOpacity style={styles.alertButton} onPress={handleConfirmDelete}>
                  <Text style={styles.alertButtonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.alertButton} onPress={handleCancelDelete}>
                  <Text style={styles.alertButtonText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default VendorsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    letterSpacing: 0.1,
  },
  sidebar: {
    width: 80,
    backgroundColor: "#F9622C",
    paddingVertical: 20,
    borderRightWidth: 1,
    borderRightColor: "#ebedf0",
    alignItems: "center",
  },
  sidebarIconContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  sidebarIconLabel: {
    marginTop: 4,
    fontSize: 10,
    color: "#fff",
  },
  mainContent: {
    flex: 1,
    position: "relative",
  },
  scrollContent: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 80,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 0,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3a3a3a",
    ontFamily: "sans serif",
  },
  topRightButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  exportButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#280300",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 10,
  },
  addBookingButton: {
    backgroundColor: "#F9622C",
    borderRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  addBookingButtonText: {
    color: "#fff",
    fontSize: 14,
    ontFamily: "sans serif",
  },
  tabsRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  tabButton: {
    marginRight: 10,
    borderRadius: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#f9622c",
  },
  tabButtonText: {
    color: "#280300",
    fontSize: 14,
    ontFamily: "sans serif",
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingBottom: 10,
    marginBottom: 6,
    alignItems: "center",
  },
  headerCell: {
    color: "#280300",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "left",
    ontFamily: "sans serif",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
  },
  tableRowHovered: {
    backgroundColor: "#eee",
  },
  rowCell: {
    justifyContent: "center",
  },
  primaryText: {
    color: "#5B5B5B",
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  secondaryText: {
    color: "#f9622c",
    fontSize: 13,
    marginTop: 2,
    letterSpacing: 0.1,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 5,
  },
  approvedIndicator: {
    backgroundColor: "#388E3C",
  },
  pendingIndicator: {
    backgroundColor: "#F57C00",
  },
  declinedIndicator: {
    backgroundColor: "#D32F2F",
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 0.1,
  },
  approvedText: {
    color: "#388E3C",
  },
  pendingText: {
    color: "#F57C00",
  },
  declinedText: {
    color: "#D32F2F",
  },
  actionIcon: {
    marginLeft: 0,
  },
  paginationContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
  },
  paginationText: {
    color: "#280300",
    fontSize: 14,
    fontWeight: "bold",
  },
  paginationButtonsContainer: {
    flexDirection: "row",
    marginLeft: "auto",
  },
  paginationButtonBlack: {
    marginLeft: 10,
    borderRadius: 5,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#f9622c",
  },
  paginationButtonTextWhite: {
    color: "#f9622c",
    fontSize: 16,
    fontWeight: "bold",
  },
  paginationButtonWhite: {
    marginLeft: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#000",
  },
  paginationButtonTextBlack: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  alertContainer: {
    position: "absolute",
    top: -10,
    left: 0,
    right: 0,
    paddingTop: 10,
    alignItems: "center",
  },
  alertBox: {
    width: "50%",
    backgroundColor: "#fff",
    borderRadius: 3,
    padding: 25,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 0,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#280300",
    marginBottom: 5,
  },
  alertText: {
    fontSize: 16,
    color: "#280300",
    marginBottom: 10,
  },
  alertButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  alertButton: {
    marginLeft: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: "#F9622C",
    borderRadius: 4,
  },
  alertButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#f9622c",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#f9622c",
    textAlign: "center",
  },
  modalSubText: {
    fontSize: 14,
    marginBottom: 5,
    color: "#280300",
    textAlign: "center",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#F9622C",
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
