import React, { useState,} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Modal,
  ActivityIndicator,
} from "react-native";
import { BarChart, LineChart } from "react-native-chart-kit";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect} from "react";
import axios from "axios";

const storeAvatar = require("../../assets/logo.png");
const screenWidth = Dimensions.get("window").width;
const isSmallDevice = screenWidth < 600;
const chartWidth = isSmallDevice ? screenWidth - 40 : 450;

const AdminDashboard = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [rightPanelVisible, setRightPanelVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Today");
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [ordersData, setOrdersData] = useState({});
  const [loanData, setLoanData] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [salesData, setSalesData] = useState({});
  const [revenueData, setRevenueData] = useState({
    labels: [],
    datasets:[
    {
      data: [],
    },
  ],
  });
  const handleLogout = () => {
    // Logic to handle logout
    console.log("User logged out");
    navigation.navigate('Login'); 
};
  
  



  // const salesData = {
  //   Today: 500000,
  //   "Last Week": 3200000,
  //   "Last Month": 950000,
  //   "All Time": 2700000,
  // };
  // const ordersData = {
  //   Today: 12,
  //   "Last Week": 80,
  //   "Last Month": 300,
  //   "All Time": 5000,
  // };
  // const loanData = {
  //   Today: 10,
  //   "Last Week": 50,
  //   "Last Month": 150,
  //   "All Time": 2000,
  // };
  // // const userData = {
  // //   Today: 5,
  // //   "Last Week": 30,
  // //   "Last Month": 100,
  // //   "All Time": 500,
  // // };

  // const transactions = [
  //   { id: "1", title: "Transaction #1", details: "+ UGX 50,000 - Deposit" },
  //   { id: "2", title: "Transaction #2", details: "- UGX 20,000 - Withdrawal" },
  //   { id: "3", title: "Transaction #3", details: "+ UGX 30,000 - Deposit" },
  //   { id: "4", title: "Transaction #4", details: "- UGX 10,000 - Withdrawal" },
  //   { id: "5", title: "Transaction #5", details: "+ UGX 70,000 - Deposit" },
  //   { id: "6", title: "Transaction #6", details: "- UGX 25,000 - Withdrawal" },
  //   { id: "7", title: "Transaction #7", details: "+ UGX 40,000 - Deposit" },
  //   { id: "8", title: "Transaction #8", details: "- UGX 15,000 - Withdrawal" },
  //   { id: "9", title: "Transaction #9", details: "+ UGX 60,000 - Deposit" },
  //   {
  //     id: "10",
  //     title: "Transaction #10",
  //     details: "- UGX 30,000 - Withdrawal",
  //   },
  //   { id: "11", title: "Transaction #11", details: "+ UGX 55,000 - Deposit" },
  //   {
  //     id: "12",
  //     title: "Transaction #12",
  //     details: "- UGX 20,000 - Withdrawal",
  //   },
  // ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const salesResponse = await axios.get(
          "https://api-xtreative.onrender.com/api/v1/admins/sales"
        );
        const ordersResponse = await axios.get(
          "https://api-xtreative.onrender.com/api/v1/admins/orders"
        );
        const loanResponse = await axios.get(
          "https://api-xtreative.onrender.com/api/v1/admins/loans"
        );
        const transactionsResponse = await axios.get(
          "https://api-xtreative.onrender.com/api/v1/admins/transactions"
        );
        const revenueResponse = await axios.get(
          "https://api-xtreative.onrender.com/api/v1/admins/revenue"
        );

        // Update state with fetched data
        setSalesData(salesResponse.data);
        setOrdersData(ordersResponse.data);
        setLoanData(loanResponse.data);
        setTransactions(transactionsResponse.data);
        setRevenueData(revenueResponse.data); // Assuming you've declared setRevenueData
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();

    // Refresh data every 30 seconds for real-time updates
    const interval = setInterval(fetchDashboardData, 30000);

    return () => clearInterval(interval); // Cleanup on unmount
}, []);

//   return (
//     <View>
//         <Text>Total Revenue: {revenueData.total}</Text>
//         <Text>Daily Revenue: {revenueData.daily}</Text>
//         {/* Other UI elements */}
//     </View>
// );

  
  return (
    <View
      style={[
        styles.container,
        { flexDirection: isSmallDevice ? "column" : "row" },
      ]}
    >
      {/* Sidebar - only for larger devices */}
      {!isSmallDevice && (
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
            onPress={() => navigation.navigate("OrdersScreen")}
          >
            <Ionicons name="cart-outline" size={24} color="#fff" />
            <Text style={styles.sidebarIconLabel}>Orders</Text>
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
            onPress={() => navigation.navigate("Customers")}
          >
            <Ionicons name="people-outline" size={24} color="#fff" />
            <Text style={styles.sidebarIconLabel}>Customers</Text>
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
            onPress={() => navigation.navigate("WalletScreen")}
          >
            <Ionicons name="wallet-outline" size={24} color="#fff" />
            <Text style={styles.sidebarIconLabel}>Wallet</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sidebarIconContainer}
            onPress={() => navigation.navigate("SettingsScreen")}
          >
            <Ionicons name="settings-outline" size={24} color="#fff" />
            <Text style={styles.sidebarIconLabel}>Settings</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Hamburger Menu for small devices */}
      {isSmallDevice && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={menuVisible}
          onRequestClose={() => setMenuVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.menuModalContent}>
              <TouchableOpacity
                onPress={() => setMenuVisible(false)}
                style={styles.closeIcon}
              >
                <Ionicons name="close" size={28} color="#280300" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setMenuVisible(false);
                  navigation.navigate("AdminDashboard");
                }}
              >
                <Ionicons name="grid-outline" size={24} color="#280300" />
                <Text style={styles.menuItemText}>Dashboard</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setMenuVisible(false);
                  navigation.navigate("Customers");
                }}
              >
                <Ionicons name="people-outline" size={24} color="#280300" />
                <Text style={styles.menuItemText}>Customers</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setMenuVisible(false);
                  navigation.navigate("Vendors");
                }}
              >
                <Ionicons name="storefront-outline" size={24} color="#280300" />
                <Text style={styles.menuItemText}>Vendors</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setMenuVisible(false);
                  navigation.navigate("Reports");
                }}
              >
                <Ionicons
                  name="document-text-outline"
                  size={24}
                  color="#280300"
                />
                <Text style={styles.menuItemText}>Reports</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setMenuVisible(false);
                  navigation.navigate("OrdersScreen");
                }}
              >
                <Ionicons name="cart-outline" size={24} color="#280300" />
                <Text style={styles.menuItemText}>Orders</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setMenuVisible(false);
                  navigation.navigate("SettingsScreen");
                }}
              >
                <Ionicons name="settings-outline" size={24} color="#280300" />
                <Text style={styles.menuItemText}>Settings</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {/* Main Content */}
      <View style={styles.mainContent}>
        <View style={styles.topBar}>
          <View style={styles.topBarLeft}>
            {isSmallDevice && (
              <TouchableOpacity
                onPress={() => setMenuVisible(true)}
                style={styles.hamburgerIcon}
              >
                <Ionicons name="menu-outline" size={28} color="#280300" />
              </TouchableOpacity>
            )}
            <Text style={styles.topBarTitle}>Dashboard</Text>
          </View>
          <View style={styles.topBarRight}>
            <View style={styles.searchBar}>
              <Ionicons name="search-outline" size={20} color="#bbb" />
              <Text style={styles.searchBarPlaceholder}>Search</Text>
            </View>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={styles.accountIconContainer}
            >
              <Ionicons name="person-circle-outline" size={24} color="#bbb" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Modal for Logout */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                onPress={handleLogout}
                style={styles.logoutButton}
              >
                <Text style={styles.logoutButtonText}>Logout</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeModalButton}
              >
                <Text style={styles.closeModalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Forward Arrow to display Right Panel on Small Devices */}
        {isSmallDevice && (
          <TouchableOpacity
            style={styles.rightPanelToggle}
            onPress={() => setRightPanelVisible(true)}
          >
            <Ionicons name="arrow-forward-outline" size={28} color="#280300" />
          </TouchableOpacity>
        )}

        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          {["Today", "Last Week", "Last Month", "All Time"].map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                selectedFilter === filter && styles.selectedFilter,
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter && styles.selectedFilterText,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView style={styles.contentScroll}>
          {/* Stats Cards */}
          <View style={styles.statsRow}>
            <View
              style={[
                styles.statsCard,
                isSmallDevice && styles.statsCardMobile,
              ]}
            >
              <Text style={styles.cardValue}>
                UGX {salesData[selectedFilter]}
              </Text>
              <Text
                style={[
                  styles.statsLabel,
                  isSmallDevice && styles.statsLabelMobile,
                ]}
              >
                Total Sales
              </Text>
            </View>
            <View
              style={[
                styles.statsCard,
                isSmallDevice && styles.statsCardMobile,
              ]}
            >
              <Text style={styles.cardValue}>{ordersData[selectedFilter]}</Text>
              <Text
                style={[
                  styles.statsLabel,
                  isSmallDevice && styles.statsLabelMobile,
                ]}
              >
                New Orders
              </Text>
            </View>
            <View
              style={[
                styles.statsCard,
                isSmallDevice && styles.statsCardMobile,
              ]}
            >
              <Text style={styles.cardValue}>{loanData[selectedFilter]}</Text>
              <Text
                style={[
                  styles.statsLabel,
                  isSmallDevice && styles.statsLabelMobile,
                ]}
              >
                Loan Requests
              </Text>
            </View>
            <View
              style={[
                styles.statsCard,
                isSmallDevice && styles.statsCardMobile,
              ]}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#0000ff" />
              ) : (
                <>
                  <Text style={styles.cardValue}>
                    {userData[selectedFilter] || 0}
                  </Text>
                  <Text
                    style={[
                      styles.statsLabel,
                      isSmallDevice && styles.statsLabelMobile,
                    ]}
                  >
                    Users
                  </Text>
                </>
              )}
            </View>
          </View>

          <View style={styles.extraStatsRow}>
            <View style={styles.extraStatsCard}>
              <Text style={styles.extraStatsValue}>UGX 500,000</Text>
              <Text style={styles.extraStatsLabel}>Total Earnings</Text>
            </View>
            <View style={styles.extraStatsCard}>
              <Text style={styles.extraStatsValue}>15</Text>
              <Text style={styles.extraStatsLabel}>Pending Payouts</Text>
            </View>
          </View>

          {/* Chart Area */}
          <View
            style={[
              styles.chartArea,
              { flexDirection: isSmallDevice ? "column" : "row" },
            ]}
          >
            <View style={[styles.chartContainer, { width: chartWidth }]}>
              <Text style={styles.sectionTitle}>Sales</Text>
              <BarChart
                data={revenueData}
                width={chartWidth}
                height={250}
                chartConfig={{
                  backgroundColor: "#fff",
                  backgroundGradientFrom: "#f4f4f4",
                  backgroundGradientTo: "#f4f4f4",
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(51, 51, 51, ${opacity})`,
                }}
                style={{ borderRadius: 10 }}
              />
            </View>
            <View style={[styles.chartContainer, { width: chartWidth }]}>
              <Text style={styles.sectionTitle}>Revenue Growth</Text>
              <LineChart
                data={revenueData}
                width={chartWidth}
                height={250}
                chartConfig={{
                  backgroundColor: "#fff",
                  backgroundGradientFrom: "#f4f4f4",
                  backgroundGradientTo: "#f4f4f4",
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(51, 51, 51, ${opacity})`,
                }}
                bezier
                style={{ borderRadius: 10 }}
              />
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Right Panel - Modal for Small Devices */}
      {isSmallDevice && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={rightPanelVisible}
          onRequestClose={() => setRightPanelVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.rightPanelModalContent}>
              <TouchableOpacity
                onPress={() => setRightPanelVisible(false)}
                style={styles.closeRightPanelButton}
              >
                <Ionicons name="close-outline" size={28} color="#280300" />
              </TouchableOpacity>
              <ScrollView style={styles.rightPanelContent}>
                <View style={styles.walletSection}>
                  <Image source={storeAvatar} style={styles.walletLogo} />
                  <View style={styles.walletCard}>
                    <View style={styles.walletBalanceRow}>
                      <Text style={styles.walletBalance}>UGX </Text>
                      <TouchableOpacity
                        style={styles.addFundsBtn}
                        onPress={() => alert("Add Funds")}
                      >
                        <Ionicons
                          name="add-circle-outline"
                          size={32}
                          color="#f9622c"
                        />
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.walletLabel}>Total Revenue</Text>
                  </View>
                </View>
                <View style={styles.transactionsCard}>
                  <View style={styles.transactionsHeader}>
                    <Text style={styles.transactionsTitle}>
                      Recent Transactions
                    </Text>
                    <Text style={styles.viewReport}>View All</Text>
                  </View>
                  <ScrollView
                    style={styles.transactionList}
                    nestedScrollEnabled={true}
                  >
                    {transactions.map((txn) => (
                      <View key={txn.id} style={styles.transactionItem}>
                        <Ionicons
                          name="arrow-forward-outline"
                          size={18}
                          color="#280300"
                          style={styles.transactionIcon}
                        />
                        <View style={styles.transactionTextContainer}>
                          <Text style={styles.transactionTitle}>
                            {txn.title}
                          </Text>
                          <Text style={styles.transactionDetails}>
                            {txn.details}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </ScrollView>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}

      {/* Right Panel - only for larger devices */}
      {!isSmallDevice && (
        <View style={styles.rightPanel}>
          <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={true}
          >
            <View style={styles.walletSection}>
              <Image source={storeAvatar} style={styles.walletLogo} />
              <View style={styles.walletCard}>
                <View style={styles.walletBalanceRow}>
                  <Text style={styles.walletBalance}>UGX </Text>
                  <TouchableOpacity
                    style={styles.addFundsBtn}
                    onPress={() => alert("Add Funds")}
                  >
                    <Ionicons
                      name="add-circle-outline"
                      size={32}
                      color="#f9622c"
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.walletLabel}>Total Revenue</Text>
              </View>
            </View>
            <View style={styles.transactionsCard}>
              <View style={styles.transactionsHeader}>
                <Text style={styles.transactionsTitle}>
                  Recent Transactions
                </Text>
                <Text style={styles.viewReport}>View All</Text>
              </View>
              <ScrollView
                style={styles.transactionList}
                nestedScrollEnabled={true}
              >
                {transactions.map((txn) => (
                  <View key={txn.id} style={styles.transactionItem}>
                    <Ionicons
                      name="arrow-forward-outline"
                      size={18}
                      color="#280300"
                      style={styles.transactionIcon}
                    />
                    <View style={styles.transactionTextContainer}>
                      <Text style={styles.transactionTitle}>{txn.title}</Text>
                      <Text style={styles.transactionDetails}>
                        {txn.details}
                      </Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default AdminDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  sidebar: {
    width: 80,
    backgroundColor: "#f9622c",
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
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "space-between",
  },
  topBarLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  hamburgerIcon: {
    marginRight: 10,
  },
  topBarTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#3a3a3a",
  },
  topBarRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderRadius: 6,
    height: 36,
    borderWidth: 1,
    borderColor: "#ebedf0",
  },
  searchBarPlaceholder: {
    marginLeft: 6,
    color: "#bbb",
  },
  accountIconContainer: {
    marginLeft: 10,
  },
  contentScroll: {
    flex: 1,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statsCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 5,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  statsCardMobile: {
    padding: 8,
    marginHorizontal: 3,
  },
  statsValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3a3a3a",
  },
  statsValueMobile: {
    fontSize: 16,
  },
  statsLabel: {
    marginTop: 4,
    fontSize: 12,
    color: "#f9622c",
    fontWeight: "500",
  },
  statsLabelMobile: {
    fontSize: 10,
  },
  extraStatsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  extraStatsCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 5,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  extraStatsValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#280300",
  },
  extraStatsLabel: {
    marginTop: 4,
    fontSize: 12,
    color: "#f9622c",
    fontWeight: "500",
  },
  chartArea: {
    justifyContent: "space-around",
    marginBottom: 20,
  },
  chartContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ebedf0",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#3a3a3a",
  },
  rightPanel: {
    width: 280,
    backgroundColor: "#fff",
    borderLeftWidth: 1,
    borderLeftColor: "#ebedf0",
  },
  walletSection: {
    padding: 20,
  },
  walletLogo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginBottom: 10,
    alignSelf: "center",
  },
  walletCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    marginBottom: 20,
  },
  walletBalanceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  walletBalance: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#280300",
  },
  addFundsBtn: {
    marginLeft: 10,
  },
  walletLabel: {
    fontSize: 14,
    color: "grey",
    textAlign: "center",
    marginBottom: 15,
  },
  transactionsCard: {
    marginHorizontal: 10,
    marginTop: -30,
    backgroundColor: "#f9f9f9",
    borderRadius: 1,
    padding: 1,
    borderWidth: 1,
    borderColor: "#f0f1f4",
  },
  transactionsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    padding: 10,
    backgroundColor: "#eee",
  },
  transactionsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3a3a3a",
  },
  transactionList: {
    maxHeight: 200,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f1f4",
  },
  transactionIcon: {
    marginRight: 10,
  },
  transactionTextContainer: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#280300",
  },
  transactionDetails: {
    fontSize: 12,
    color: "#9ca0a8",
  },
  viewReport: {
    fontSize: 12,
    color: "#1976D2",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: 300,
  },
  logoutButton: {
    backgroundColor: "#f9622c",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeModalButton: {
    backgroundColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeModalButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
  menuModalContent: {
    backgroundColor: "#fff",
    padding: 20,
    flex: 1,
    width: "100%",
    height: "100%",
    position: "relative",
  },
  closeIcon: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 40,
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#280300",
  },
  menuCloseButton: {
    marginTop: 10,
    alignSelf: "stretch",
    backgroundColor: "#f9622c",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  menuCloseButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  rightPanelToggle: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    zIndex: 100,
  },
  rightPanelModalContent: {
    backgroundColor: "#fff",
    paddingTop: 40,
    flex: 1,
    width: "100%",
    height: "100%",
    position: "relative",
  },
  closeRightPanelButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },

  filterContainer: { flexDirection: "row", marginBottom: 15 },
  filterButton: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginRight: 10,
  },
  selectedFilter: { backgroundColor: "#280300" },
  filterText: { fontSize: 14, color: "#333" },
  selectedFilterText: { color: "#fff" },
});
