import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const VendorDetails = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  // Extract vendor from navigation params
  const vendor = params?.vendor;

  if (!vendor) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No vendor details available.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vendor Details</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{vendor.name}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{vendor.email}</Text>

        <Text style={styles.label}>Phone Number:</Text>
        <Text style={styles.value}>
          {vendor.countryCode ? `(${vendor.countryCode}) ` : ""}{vendor.phone}
        </Text>

        <Text style={styles.label}>Shop Name:</Text>
        <Text style={styles.value}>{vendor.shop?.shopname || "N/A"}</Text>

        <Text style={styles.label}>Shop Address:</Text>
        <Text style={styles.value}>{vendor.shop?.shopaddress || "N/A"}</Text>

        {vendor.shop?.shop_description && (
          <>
            <Text style={styles.label}>Shop Description:</Text>
            <Text style={styles.value}>{vendor.shop.shop_description}</Text>
          </>
        )}

        <Text style={styles.label}>Status:</Text>
        <Text style={[styles.value, vendor.status === "Approved" ? styles.approved : vendor.status === "Pending" ? styles.pending : styles.declined]}>
          {vendor.status}
        </Text>
      </View>
    </ScrollView>
  );
};

export default VendorDetails;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#F9622C",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  content: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginTop: 10,
  },
  value: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  approved: {
    color: "#388E3C",
  },
  pending: {
    color: "#F57C00",
  },
  declined: {
    color: "#D32F2F",
  },
  errorText: {
    fontSize: 16,
    color: "#D32F2F",
    textAlign: "center",
    marginTop: 20,
  },
});
