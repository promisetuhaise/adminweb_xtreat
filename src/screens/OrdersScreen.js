import React, { useState, useEffect  } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from 'axios';

const OrdersScreen = () => {
  const navigation = useNavigation();
  const [statusFilter, setStatusFilter] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('https://api-xtreative.onrender.com/customers/api/v1/place-order/');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter orders based on status selection
  const filteredOrders = orders.filter(order => (statusFilter ? order.status === statusFilter : true));

  // Open order details modal
  const openModal = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  // Close modal
  const closeModal = () => {
    setSelectedOrder(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <View style={styles.sidebar}>
        <ScrollView>
          {[
            { name: "Dashboard", icon: "grid-outline", route: "AdminDashboard" },
            { name: "Customers", icon: "people-outline", route: "Customers" },
            { name: "Vendors", icon: "storefront-outline", route: "Vendors" },
            { name: "Reports", icon: "document-text-outline", route: "Reports" },
            { name: "Orders", icon: "cart-outline", route: "Orders" },
            { name: "Settings", icon: "settings-outline", route: "Settings" },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.sidebarIconContainer}
              onPress={() => navigation.navigate(item.route)}
            >
              <Ionicons name={item.icon} size={24} color="#fff" />
              <Text style={styles.sidebarIconLabel}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.header}>Orders Overview</Text>

        {/* Filter Section */}
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Filter by Status</Text>
          <Picker selectedValue={statusFilter} style={styles.picker} onValueChange={setStatusFilter}>
            <Picker.Item label="All" value="" />
            <Picker.Item label="Pending" value="Pending" />
            <Picker.Item label="Shipped" value="Shipped" />
            <Picker.Item label="Delivered" value="Delivered" />
          </Picker>
        </View>

        {/* Orders Table */}
        {loading ? (
          <ActivityIndicator size="large" color="#F9622C" />
        ) : (
          <ScrollView style={styles.scrollView}>
            <View style={styles.tableContainer}>
              <View style={styles.tableHeader}>
                {['Order ID', 'Date', 'Status', 'Vendor', 'Customer', 'Product', 'Actions'].map((header, index) => (
                  <Text key={index} style={styles.headerText}>{header}</Text>
                ))}
              </View>
              {filteredOrders.map((order) => (
                <View key={order.id} style={styles.tableRow}>
                  <Text style={styles.rowText}>{order.orderNumber}</Text>
                  <Text style={styles.rowText}>{order.date}</Text>
                  <Text style={[styles.rowText, styles.status(order.status)]}>{order.status}</Text>
                  <Text style={styles.rowText}>{order.vendor}</Text>
                  <Text style={styles.rowText}>{order.customer}</Text>
                  <Text style={styles.rowText}>{order.product}</Text>
                  <View style={styles.actions}>
                    <TouchableOpacity style={styles.viewButton} onPress={() => openModal(order)}>
                      <Text style={styles.buttonText}>View</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton} onPress={() => alert(`Deleting ${order.orderNumber}`)}>
                      <Ionicons name="trash-outline" size={24} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        )}
      </View>

      {/* Order Details Modal */}
      {isModalVisible && (
        <Modal transparent={true} animationType="fade" visible={isModalVisible}>
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Order Details</Text>
                {selectedOrder && (
                  <>
                    <Text style={styles.modalContent}><Text style={styles.bold}>Order Number: </Text>{selectedOrder.orderNumber}</Text>
                    <Text style={styles.modalContent}><Text style={styles.bold}>Date: </Text>{selectedOrder.date}</Text>
                    <Text style={styles.modalContent}><Text style={styles.bold}>Status: </Text>{selectedOrder.status}</Text>
                    <Text style={styles.modalContent}><Text style={styles.bold}>Vendor: </Text>{selectedOrder.vendor}</Text>
                    <Text style={styles.modalContent}><Text style={styles.bold}>Customer: </Text>{selectedOrder.customer}</Text>
                    <Text style={styles.modalContent}><Text style={styles.bold}>Product: </Text>{selectedOrder.product}</Text>
                  </>
                )}
                <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  sidebar: {
    width: 90,
    backgroundColor: "#F9622C",
    paddingVertical: 20,
    alignItems: "center",
    height: '100%',
  },
  sidebarIconContainer: {
    alignItems: "center",
    marginVertical: 15,
  },
  sidebarIconLabel: {
    marginTop: 4,
    fontSize: 12,
    color: "#fff",
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Poppins",
    color: "#333",
  },
  filterSection: {
    marginBottom: 20,
    alignItems: 'center', // Center the filter
  },
  filterLabel: {
    fontSize: 18,
    marginBottom: 12,
    color: "#333",
    fontWeight: '600',
    fontFamily: "Poppins",
    letterSpacing: 0.5,
  },
  picker: {
    height: 50,
    width: '75%', // Adjust the width to make it more balanced
    backgroundColor: "#fff",
    borderRadius: 30, // More rounded corners for a smoother appearance
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
    paddingHorizontal: 15,
    borderColor: '#ddd',
    borderWidth: 1,
    alignItems: 'center', // Center content inside the picker
    justifyContent: 'center', // Center the content inside the picker
  },
  scrollView: {
    flex: 1,
  },
  tableContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F9622C",
    paddingVertical: 12,
    borderRadius: 10,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    flex: 1,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  rowText: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    flex: 1,
  },
  status: (status) => ({
    color: status === "Pending" ? "#FFA500" : status === "Shipped" ? "#008CBA" : "#28A745",
    fontWeight: "bold",
  }),
  actions: {
    flexDirection: "row",
    gap: 10,
  },
  viewButton: {
    backgroundColor: "#280300",
    padding: 8,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    padding: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 15,
    width: '80%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 6,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: "Poppins",
  },
  modalContent: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "Poppins",
  },
  bold: {
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#F9622C',
    padding: 12,
    borderRadius: 30,
    alignSelf: "center",
    marginTop: 20,
  },
});

export default OrdersScreen;