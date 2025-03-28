import React, { useState } from "react";
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
      onPress: () =>
        Alert.alert("Privacy Policy", "This is the privacy policy."),
    },
    {
      id: 6,
      title: "Terms of Service",
      onPress: () =>
        Alert.alert("Terms of Service", "This is the terms of service."),
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
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
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
                  onValueChange={() =>
                    setNotificationsEnabled(!notificationsEnabled)
                  }
                />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  backButton: { marginBottom: 10 },
  backText: { color: "red", fontSize: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  settingsContainer: {
    flexDirection: "column",
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
  optionText: { fontSize: 16, color: "red" },
});

export default SettingsScreen;
