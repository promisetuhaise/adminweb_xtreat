import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/screens/LoginScreen";
 import AdminDashboard from './src/screens/AdminDashboard';

import Vendors from './src/screens/VendorsScreen';
import Customers from './src/screens/CustomersScreen';
import VendorDetails from './src/screens/vendorDetails';
// import ChatListScreen from './src/screens/ChatListScreen';
// import ChatScreen from './src/screens/ChatScreen';
// import AnalyticsScreen from './src/screens/AnalyticsScreen';
// import ProductsScreen from './src/screens/ProductsScreen';
// import OrdersScreen from './src/screens/OrdersScreen';
// import AddProduct from "./src/screens/AddProduct";
// import ProductList from "./src/screens/ProductList";
// import TransactionsScreen from "./src/screens/TransactionsScreen";
// import BalanceScreen from "./src/screens/BalanceScreen";
// import TransferScreen from "./src/screens/TransferScreen";
// import DeliveryReportsScreen from "./src/screens/DeliveryReportsScreen";
// import LoanRepayments from "./src/screens/LoanRepayments";
// import AllUsersScreen from "./src/screens/AllUsersScreen";
// import LoanApplications from "./src/screens/LoanApplications";
// import SalesReport from "./src/screens/SalesReport";
// import AddEmployee from "./src/screens/AddEmployee";
// import EmployeeList from "./src/screens/EmployeeList";
// import ApprovedLoans from "./src/screens/ApprovedLoans";
import SettingsScreen from "./src/screens/SettingsScreen";
import WalletScreen from "./src/screens/WalletScreen";
// import DepositScreen from "./src/screens/DepositScreen";
// import WithdrawScreen from "./src/screens/WithdrawScreen";
// import TransactionHistoryScreen from "./src/screens/TransactionHistoryScreen";
// import BannerSection from "./src/screens/BannerSection";
// import AddBannerScreen from "./src/screens/AddBannerScreen";
// import BannerListScreen from "./src/screens/BannerListScreen";
// import BannerDetailScreen from "./src/screens/BannerDetailScreen";
// import NotificationDetail from "./src/screens/NotificationDetail";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
         <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
         <Stack.Screen name="Customers" component={Customers} />
         <Stack.Screen name="Vendors" component={Vendors} />
         <Stack.Screen name="VendorDetails" component={VendorDetails} />
         <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
         <Stack.Screen name="WalletScreen" component={WalletScreen} />



        
        
  
      </Stack.Navigator>
    </NavigationContainer>
  );
}
