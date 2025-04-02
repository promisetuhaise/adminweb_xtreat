import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const settingsOptions = [
    { id: 1, title: "Profile", onPress: () => navigation.navigate("Profile") },
    {
      id: 2,
      title: "Payment Methods",
      onPress: () => navigation.navigate("PaymentMethods"),
    },
    {
      id: 3,
      title: "Shipping Address",
      onPress: () => navigation.navigate("ShippingAddress"),
    },
    { id: 4, title: "Notifications", onPress: null },
    {
      id: 5,
      title: "Privacy Policy",
      onPress: () => Alert.alert("Privacy Policy", "This is the privacy policy."),
    },
    {
      id: 6,
      title: "Terms of Service",
      onPress: () => Alert.alert("Terms of Service", "This is the terms of service."),
    },
    {
      id: 7,
      title: "Logout",
      onPress: () =>
        Alert.alert("Logout", "Are you sure you want to logout?", [
          { text: "Cancel", style: "cancel" },
          { text: "Logout", onPress: () => console.log("User logged out") },
        ]),
    },
  ];

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
      <ScrollView style={styles.mainContent}>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.settingsContainer}>
          {settingsOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.option}
              onPress={option.onPress}
              disabled={option.id === 4} // Disable touch on Notifications
            >
              <View style={styles.optionRow}>
                <Text style={styles.optionText}>{option.title}</Text>
                {option.id === 4 && (
                  <Switch
                    value={notificationsEnabled}
                    onValueChange={() => setNotificationsEnabled(!notificationsEnabled)}
                  />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
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
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  settingsContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  option: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
});

export default SettingsScreen;