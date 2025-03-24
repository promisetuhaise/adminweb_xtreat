import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomersScreen = () => {
  const navigation = useNavigation();

  // State for filtering ("All", "Active", or "Inactive")
  const [activeFilter, setActiveFilter] = useState("All");

  // State for customer list and pagination
  const [customerList, setCustomerList] = useState([]);
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  // State for deletion alert modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

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

  // Fetch customers from API on component mount
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://192.168.28.234:8000/api/v1/customers/", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        const customersData = data.results || data;
        const formattedData = customersData.map((customer) => ({
          id: customer.id || customer.username,
          name: customer.username,
          email: customer.user_email,
          countryCode: customer.country_code,
          phone: customer.phone_number,
          address: customer.address || customer.Address,
          city: customer.city,
          status: customer.status, // "Active" or "Inactive"
        }));
        setCustomerList(formattedData);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  // Filter customers based on activeFilter: "All", "Active", or "Inactive"
  const filteredCustomers =
    activeFilter === "Active"
      ? customerList.filter((cust) => cust.status === "Active")
      : activeFilter === "Inactive"
      ? customerList.filter((cust) => cust.status === "Inactive")
      : customerList;

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedCustomers = filteredCustomers.slice(startIndex, startIndex + itemsPerPage);

  // Toggle customer status between Active and Inactive using the API endpoint (requires authorization)
  const handleToggleStatus = async (custId) => {
    const customer = customerList.find((cust) => cust.id === custId);
    if (!customer) return;

    // Determine current active state: true for "Active", false for "Inactive"
    const isActive = customer.status === "Active";

    try {
      // Replace this token with dynamic token retrieval if needed.
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQyNjMwNTExLCJpYXQiOjE3NDI1NDQxMTEsImp0aSI6ImYwYzE5YjJlODdkMjRmMDM5MDY1NGQzYWMyNjVmMWQ3IiwidXNlcl9pZCI6NjB9.zoB22mpR-Z2dyanVsmrlCuUnCFcpmt-I9v0bqLHNoX8";
      console.log(token);
      const response = await fetch(
        `http://192.168.28.234:8000/api/v1/customers/${custId}/toggle-status/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          // Toggle the status by sending the inverse of the current active state.
          body: JSON.stringify({ active: !isActive }),
        }
      );
      if (response.ok) {
        // Assuming the API returns the updated active status as a boolean.
        const updatedData = await response.json();
        const updatedCustomers = customerList.map((cust) =>
          cust.id === custId
            ? { ...cust, status: updatedData.active ? "Active" : "Inactive" }
            : cust
        );
        setCustomerList(updatedCustomers);
      } else {
        const errorData = await response.json();
        console.error("Failed to toggle status", response.status, errorData);
        Alert.alert("Error", "Failed to update status.");
      }
    } catch (error) {
      console.error("Error toggling status:", error);
      Alert.alert("Error", "An error occurred while updating status.");
    }
  };

  // When delete is pressed, show the alert modal
  const handleDeletePress = (cust) => {
    setSelectedCustomer(cust);
    setShowDeleteModal(true);
  };

  // Confirm deletion and remove the customer via API call (requires authorization)
  const handleConfirmDelete = async () => {
    if (selectedCustomer) {
      try {
        const token = await getAuthToken();
        if (!token) {
          Alert.alert("Unauthorized", "Please login again.");
          navigation.navigate("Login");
          return;
        }
        const response = await fetch(
          `http://192.168.28.234:8000/api/v1/customers/${selectedCustomer.id}/delete/`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );
        if (response.ok) {
          const updatedCustomers = customerList.filter(
            (cust) => cust.id !== selectedCustomer.id
          );
          setCustomerList(updatedCustomers);
          setShowDeleteModal(false);
          setSelectedCustomer(null);
          if (currentPage > Math.ceil(updatedCustomers.length / itemsPerPage)) {
            setCurrentPage(Math.ceil(updatedCustomers.length / itemsPerPage));
          }
          Alert.alert("Success", "Customer deleted successfully.");
        } else {
          const errorData = await response.json();
          console.error("Failed to delete customer", response.status, errorData);
          Alert.alert("Error", "Failed to delete customer.");
        }
      } catch (error) {
        console.error("Error deleting customer:", error);
        Alert.alert("Error", "An error occurred while deleting customer.");
      }
    }
  };

  // Cancel deletion
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedCustomer(null);
  };

  // Pagination handlers
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
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
          {/* Header (Title & Buttons) */}
          <View style={styles.headerContainer}>
            <View>
              <Text style={styles.headerTitle}>
                Customers ({filteredCustomers.length})
              </Text>
            </View>
            <View style={styles.topRightButtons}>
              <TouchableOpacity style={styles.exportButton}>
                <Ionicons
                  name="download-outline"
                  size={16}
                  color="#280300"
                  style={{ marginRight: 4 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addBookingButton}
                onPress={() => navigation.navigate("Banners")}
              >
                <Text style={styles.addBookingButtonText}>Banners</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Tabs Row with Active Indicator */}
          <View style={styles.tabsRow}>
            <TouchableOpacity
              style={[styles.tabButton, activeFilter === "All" && styles.activeTab]}
              onPress={() => {
                setActiveFilter("All");
                setCurrentPage(1);
              }}
            >
              <Text style={styles.tabButtonText}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabButton, activeFilter === "Active" && styles.activeTab]}
              onPress={() => {
                setActiveFilter("Active");
                setCurrentPage(1);
              }}
            >
              <Text style={styles.tabButtonText}>Active</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabButton, activeFilter === "Inactive" && styles.activeTab]}
              onPress={() => {
                setActiveFilter("Inactive");
                setCurrentPage(1);
              }}
            >
              <Text style={styles.tabButtonText}>Inactive</Text>
            </TouchableOpacity>
          </View>

          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, { flex: 3 }]}>Name</Text>
            <Text style={[styles.headerCell, { flex: 3 }]}>Email</Text>
            <Text style={[styles.headerCell, { flex: 3 }]}>Phone Number</Text>
            <Text style={[styles.headerCell, { flex: 3 }]}>Address</Text>
            <Text style={[styles.headerCell, { flex: 2 }]}>Status</Text>
            <Text style={[styles.headerCell, { flex: 2 }]}>Action</Text>
          </View>

          {/* Table Body */}
          {displayedCustomers.map((cust) => (
            <View style={styles.tableRow} key={cust.id}>
              {/* Customer Name */}
              <View style={[styles.rowCell, { flex: 3 }]}>
                <Text style={styles.primaryText}>{cust.name}</Text>
              </View>
              {/* Email */}
              <View style={[styles.rowCell, { flex: 3 }]}>
                <Text style={styles.primaryText}>{cust.email}</Text>
              </View>
              {/* Phone Number */}
              <View style={[styles.rowCell, { flex: 3 }]}>
                <Text style={styles.primaryText}>{`(${cust.countryCode}) ${cust.phone}`}</Text>
              </View>
              {/* Address (Address + City) */}
              <View style={[styles.rowCell, { flex: 3 }]}>
                <Text style={styles.primaryText}>
                  {cust.address}, {cust.city}
                </Text>
              </View>
              {/* Status */}
              <View style={[styles.rowCell, { flex: 2 }]}>
                <Text
                  style={[
                    styles.statusText,
                    cust.status === "Active" ? styles.activeStatus : styles.inactiveStatus
                  ]}
                >
                  {cust.status}
                </Text>
              </View>
              {/* Action Buttons */}
              <View style={[styles.rowCell, { flex: 2, flexDirection: "row", alignItems: "center" }]}>
                <TouchableOpacity onPress={() => handleToggleStatus(cust.id)} style={styles.actionIcon}>
                  <Ionicons
                    name={cust.status === "Active" ? "toggle" : "toggle-outline"}
                    size={30}
                    color={cust.status === "Active" ? "#f9622c" : "#ccc"}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionIcon, { marginLeft: 15 }]} onPress={() => handleDeletePress(cust)}>
                  <Ionicons name="trash-outline" size={20} color="#280300" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Sticky Pagination Row */}
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
              {selectedCustomer && (
                <Text style={styles.alertText}>
                  Are you sure you want to delete {selectedCustomer.name}?
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

export default CustomersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    fontFamily:"poppins"
  },
  sidebar: {
    width: 80,
    backgroundColor: "#F9622C",
    paddingVertical: 20,
    borderRightWidth: 1,
    borderRightColor: "#ebedf0",
    alignItems: "center"
  },
  sidebarIconContainer: {
    alignItems: "center",
    marginVertical: 20
  },
  sidebarIconLabel: {
    marginTop: 4,
    fontSize: 10,
    color: "#fff"
  },
  mainContent: {
    flex: 1,
    position: "relative"
  },
  scrollContent: {
    flex: 1
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 80
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 0,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3a3a3a"
  },
  topRightButtons: {
    flexDirection: "row",
    alignItems: "center"
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
    marginRight: 10
  },
  addBookingButton: {
    backgroundColor: "#F9622C",
    borderRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 8
  },
  addBookingButtonText: {
    color: "#fff",
    fontSize: 14
  },
  tabsRow: {
    flexDirection: "row",
    marginBottom: 10
  },
  tabButton: {
    marginRight: 10,
    borderRadius: 1,
    paddingVertical: 6,
    paddingHorizontal: 12
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#f9622c"
  },
  tabButtonText: {
    color: "#280300",
    fontSize: 14
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingBottom: 10,
    marginBottom: 6,
    alignItems: "center"
  },
  headerCell: {
    color: "#280300",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "left"
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderColor: "#f0f0f0"
  },
  rowCell: {
    justifyContent: "center"
  },
  primaryText: {
    color: "#5B5B5B",
    fontSize: 13,
    fontWeight: "500"
  },
  secondaryText: {
    color: "#f9622c",
    fontSize: 13,
    marginTop: 2,
  },
  statusText: {
    paddingHorizontal: -4,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center"
  },
  activeStatus: {
    color: "#388E3C",
    backgroundColor: "#C8E6C9"
  },
  inactiveStatus: {
    color: "#D32F2F",
    backgroundColor: "#FFCDD2"
  },
  actionIcon: {
    marginLeft: 0
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
    alignItems: "center"
  },
  paginationText: {
    color: "#280300",
    fontSize: 14,
    fontWeight: "bold"
  },
  paginationButtonsContainer: {
    flexDirection: "row",
    marginLeft: "auto"
  },
  paginationButtonBlack: {
    marginLeft: 10,
    borderRadius: 5,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#f9622c"
  },
  paginationButtonTextWhite: {
    color: "#f9622c",
    fontSize: 16,
    fontWeight: "bold"
  },
  paginationButtonWhite: {
    marginLeft: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#000"
  },
  paginationButtonTextBlack: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold"
  },
  alertContainer: {
    position: "absolute",
    top: -10,
    left: 0,
    right: 0,
    paddingTop: 10,
    alignItems: "center"
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
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 0
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#280300",
    marginBottom: 5
  },
  alertText: {
    fontSize: 16,
    color: "#280300",
    marginBottom: 10
  },
  alertButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  alertButton: {
    marginLeft: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: "#F9622C",
    borderRadius: 4
  },
  alertButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold"
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#f9622c"
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#f9622c",
    textAlign: "center"
  },
  modalSubText: {
    fontSize: 14,
    marginBottom: 5,
    color: "#280300",
    textAlign: "center"
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
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
    fontSize: 16
  }
});
