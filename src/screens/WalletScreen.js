// MainWalletScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const WalletScreen = ({ navigation }) => {
  const [currency, setCurrency] = useState("UGX");
  const exchangeRate = 3.2; // Example Rate

  const convertAmount = (amount) => {
    return currency === "UGX" ? amount : (amount * exchangeRate).toFixed(2);
  };

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <View style={styles.sidebar}>
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
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Currency Toggle */}
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleText}>UGX</Text>
          <Switch
            value={currency === "RWF"}
            onValueChange={() => setCurrency(currency === "UGX" ? "RWF" : "UGX")}
          />
          <Text style={styles.toggleText}>RWF</Text>
        </View>

        {/* Wallet Summary (Three Cards in One Row) */}
        <View style={styles.summaryRow}>
          <View style={[styles.summaryBox, { backgroundColor: "#280800" }]}>
            <Ionicons name="cash-outline" size={24} color="#fff" />
            <Text style={styles.summaryLabel}>Balance</Text>
            <Text style={styles.summaryAmount}>
              {currency} {convertAmount(7421890)}
            </Text>
          </View>

          <View style={[styles.summaryBox, { backgroundColor: "#280800" }]}>
            <Ionicons name="arrow-down-circle-outline" size={24} color="#fff" />
            <Text style={styles.summaryLabel}>Total Income</Text>
            <Text style={styles.summaryAmount}>
              {currency} {convertAmount(77858210)}
            </Text>
          </View>

          <View style={[styles.summaryBox, { backgroundColor: "#280800" }]}>
            <Ionicons name="arrow-up-circle-outline" size={24} color="#fff" />
            <Text style={styles.summaryLabel}>Total Expense</Text>
            <Text style={styles.summaryAmount}>
              {currency} {convertAmount(15887650)}
            </Text>
          </View>
        </View>

        {/* Action Buttons (One Line) */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.smallButton}
            onPress={() => navigation.navigate("DepositScreen")}
          >
            <Ionicons name="wallet-outline" size={18} color="#fff" />
            <Text style={styles.buttonText}>Deposit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.smallButton, { backgroundColor: "#F9622C" }]}
            onPress={() => navigation.navigate("WithdrawScreen")}
          >
            <Ionicons name="cash-outline" size={18} color="#fff" />
            <Text style={styles.buttonText}>Withdraw</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.smallButton, { backgroundColor: "#F9622C" }]}
            onPress={() => navigation.navigate("TransactionHistoryScreen")}
          >
            <Ionicons name="time-outline" size={18} color="#fff" />
            <Text style={styles.buttonText}>Transaction History</Text>
          </TouchableOpacity>
        </View>

        {/* Transaction Filters */}
        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Received</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Sent</Text>
          </TouchableOpacity>
        </View>

        {/* Transaction History Table */}
        <ScrollView style={styles.tableContainer}>
          {/* Table Headers */}
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Transaction ID</Text>
            <Text style={styles.headerText}>Amount</Text>
            <Text style={styles.headerText}>Type</Text>
            <Text style={styles.headerText}>Actions</Text>
          </View>

          {[...Array(10)].map((_, index) => (
            <View key={index} style={styles.transactionRow}>
              <Text style={styles.transactionText}>#TRX00{index + 1}</Text>
              <Text style={styles.transactionText}>{currency} {convertAmount(5000 + index * 1000)}</Text>
              <Text style={styles.transactionText}>{index % 2 === 0 ? "Received" : "Sent"}</Text>
              <TouchableOpacity>
                <Ionicons name="eye-outline" size={20} color="#3498DB" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="trash-outline" size={20} color="#E74C3C" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#F5F7FA",
  },
  sidebar: {
    width: 90,
    backgroundColor: "#F9622C",
    paddingVertical: 20,
    alignItems: "center",
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
  mainContent: {
    flex: 1,
    padding: 20,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 10,
    color: "#2C3E50",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  summaryBox: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 5,
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#fff",
  },
  summaryAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  smallButton: {
    flexDirection: "row",
    backgroundColor: "#F9622C",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "flex-start", 
    alignItems: "center",
  },
  filterButton: {
    backgroundColor: "#ddd",
    paddingVertical: 6,
    paddingHorizontal: 12, 
    borderRadius: 6,
    marginRight: 5,
  },
  filterText: {
    fontSize: 14,
    fontWeight: "600",
  },
  tableContainer: {
    maxHeight: 300,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#ddd",
  },
  headerText: {
    fontSize: 14,
    fontWeight: "bold",
    width: "20%",
  },
  transactionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  transactionText: {
    fontSize: 14,
    width: "20%",
  },
});

export default WalletScreen;