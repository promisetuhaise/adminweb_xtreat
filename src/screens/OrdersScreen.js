import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Picker, ScrollView, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import Navbar from '../components/Navbar';

const OrdersScreen = () => {
  const navigation = useNavigation();
  const [statusFilter, setStatusFilter] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('');
  const [orders, setOrders] = useState([
    { id: '1', orderNumber: 'ORD1234', date: '2025-02-12', status: 'Pending', payment: 'Paid', total: 250, product: "Wall Painting", vendor: "TechVendor" },
    { id: '2', orderNumber: 'ORD1235', date: '2025-02-11', status: 'Shipped', payment: 'Unpaid', total: 150, product: "Bead Bag", vendor: "MobileVendor" },
    { id: '3', orderNumber: 'ORD1236', date: '2025-02-10', status: 'Delivered', payment: 'Paid', total: 320, product: "Bead Bracelet", vendor: "AudioVendor" },
    { id: '4', orderNumber: 'ORD1237', date: '2025-02-09', status: 'Pending', payment: 'Unpaid', total: 200, product: "Ankara Dress", vendor: "TabletVendor" },
    { id: '5', orderNumber: 'ORD1238', date: '2025-02-08', status: 'Cancelled', payment: 'Refunded', total: 180, product: "Bead Bag", vendor: "MonitorVendor" },
    { id: '6', orderNumber: 'ORD1239', date: '2025-02-07', status: 'Confirmed', payment: 'Paid', total: 280, product: "Sea shell deco", vendor: "AudioVendor" },
  ]);

  const filteredOrders = orders.filter(order =>
    (statusFilter ? order.status === statusFilter : true) &&
    (paymentFilter ? order.payment === paymentFilter : true)
  );

  const statusText = (status) => ({
    fontWeight: "bold",
    color: status === "Pending" ? "orange"
      : status === "Shipped" ? "blue"
      : status === "Delivered" ? "green"
        : status === "Cancelled" ? "red"
          : status === "Confirmed" ? "purple"
            : "black",
  });

  return (
    <View style={styles.container}>
      {/* <Navbar /> */}
      <Text style={styles.header}>Orders Overview</Text>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

        {/* Order Summary Section */}
        <View style={styles.cardSection}>
          <Text style={styles.cardSectionTitle}>Order Summary</Text>
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Total Orders</Text>
              <Text style={styles.cardValue}>{orders.length}</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Pending Orders</Text>
              <Text style={styles.cardValue}>{orders.filter(o => o.status === 'Pending').length}</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Completed Orders</Text>
              <Text style={styles.cardValue}>{orders.filter(o => o.status === 'Delivered').length}</Text>
            </View>
          </View>
        </View>

        {/* Filter Controls */}
        <View style={styles.filterContainer}>
          <View style={styles.filterWrapper}>
            <Text style={styles.filterLabel}>Status:</Text>
            <Picker selectedValue={statusFilter} style={styles.picker} onValueChange={setStatusFilter}>
              <Picker.Item label="All" value="" />
              <Picker.Item label="Pending" value="Pending" />
              <Picker.Item label="Shipped" value="Shipped" />
              <Picker.Item label="Delivered" value="Delivered" />
              <Picker.Item label="Cancelled" value="Cancelled" />
              <Picker.Item label="Confirmed" value="Confirmed" />
            </Picker>
          </View>

          <View style={styles.filterWrapper}>
            <Text style={styles.filterLabel}>Payment:</Text>
            <Picker selectedValue={paymentFilter} style={styles.picker} onValueChange={setPaymentFilter}>
              <Picker.Item label="All" value="" />
              <Picker.Item label="Paid" value="Paid" />
              <Picker.Item label="Unpaid" value="Unpaid" />
              <Picker.Item label="Refunded" value="Refunded" />
            </Picker>
          </View>
        </View>

        {/* Orders List */}
        <ScrollView style={styles.tableScroll}>
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Order Number</Text>
            <Text style={styles.headerText}>Date</Text>
            <Text style={styles.headerText}>Status</Text>
            <Text style={styles.headerText}>Total</Text>
          </View>
          {filteredOrders.map((order) => (
            <View style={styles.tableRow} key={order.id}>
              <Text style={styles.rowText}>{order.orderNumber}</Text>
              <Text style={styles.rowText}>{order.date}</Text>
              <Text style={[styles.rowText, styles.statusText(order.status)]}>{order.status}</Text>
              <Text style={styles.rowText}>UGX{order.total}</Text>
            </View>
          ))}
        </View>
      </ScrollView>


      </ScrollView>

      <Button title="Back to Dashboard" onPress={() => navigation.navigate("AdminDashboard")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 20 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: "#F9622C" },

  // Scrollable Container
  scrollView: { flexGrow: 1, minHeight: "50%" },

  // Order Summary Section
  cardSection: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  cardSectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10, color: "#333" },
  cardContainer: { flexDirection: "row", justifyContent: "space-between" },
  card: {
    flex: 1,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: { fontSize: 16, fontWeight: "bold", color: "red" },
  cardValue: { fontSize: 22, fontWeight: "bold", color: "red", marginTop: 5 },

  // Filter Section
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginVertical: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  filterWrapper: { flex: 1, marginHorizontal: 5 },
  filterLabel: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  picker: { height: 45, backgroundColor: "#f5f5f5", borderRadius: 6 },

  // Scrollable Table Section
  tableScroll: { flexGrow: 1, paddingBottom: 20 },
  tableContainer: { 
    backgroundColor: "#fff", 
    padding: 15, 
    borderRadius: 8, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    elevation: 5, 
    marginBottom: 20 
  },
  tableHeader: { 
    flexDirection: "row", 
    borderBottomWidth: 2, 
    borderBottomColor: "#ddd", 
    backgroundColor: "#F9622C", 
    borderRadius: 8, 
    padding: 10 
  },
  headerText: { flex: 1, fontWeight: "bold", color: "#fff", textAlign: "center" },
  tableRow: { flexDirection: "row", paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: "#eee" },
  rowText: { flex: 1, textAlign: "center", fontSize: 14, color: "#333" },

  statusText: (status) => ({
    fontWeight: "bold", 
    color: status === "Pending" ? "orange" : 
           status === "Shipped" ? "blue" : 
           status === "Delivered" ? "green" : 
           status === "Cancelled" ? "red" : 
           status === "Confirmed" ? "purple" : "black"
  }),
});


export default OrdersScreen;
