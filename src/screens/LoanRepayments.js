import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";

const LoanRepayments = () => {
  // Sample Loan Repayment Data
  const [loans, setLoans] = useState([
    { id: 1, vendor: "TechWorld Ltd", totalLoan: 5000, paid: 3000, balance: 2000, date: "2025-02-17" },
    { id: 2, vendor: "SmartGadgets", totalLoan: 7000, paid: 4000, balance: 3000, date: "2025-02-10" },
    { id: 3, vendor: "MobileHub", totalLoan: 3000, paid: 2500, balance: 500, date: "2025-02-05" },
    { id: 4, vendor: "ElectroMart", totalLoan: 10000, paid: 6000, balance: 4000, date: "2025-01-25" },
  ]);

  const [search, setSearch] = useState("");

  // Filtered Loans Based on Search Input
  const filteredLoans = loans.filter((loan) =>
    loan.vendor.toLowerCase().includes(search.toLowerCase())
  );

  // Total Calculations
  const totalLoanAmount = loans.reduce((sum, loan) => sum + loan.totalLoan, 0);
  const totalPaidAmount = loans.reduce((sum, loan) => sum + loan.paid, 0);
  const totalBalance = loans.reduce((sum, loan) => sum + loan.balance, 0);

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.header}>Loan Repayments</Text>

      {/* Summary Section */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>Total Loans</Text>
          <Text style={styles.summaryValue}>${totalLoanAmount}</Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>Total Paid</Text>
          <Text style={styles.summaryValue}>${totalPaidAmount}</Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>Outstanding</Text>
          <Text style={styles.summaryValue}>${totalBalance}</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Vendor..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Loan Repayments List */}
      <ScrollView horizontal>
        <FlatList
          data={filteredLoans}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.cell}>{item.vendor}</Text>
              <Text style={styles.cell}>${item.totalLoan}</Text>
              <Text style={styles.cell}>${item.paid}</Text>
              <Text style={styles.cell}>${item.balance}</Text>
              <Text style={styles.cell}>{item.date}</Text>
            </View>
          )}
          ListHeaderComponent={() => (
            <View style={[styles.row, styles.headerRow]}>
              <Text style={[styles.cell, styles.headerCell]}>Vendor</Text>
              <Text style={[styles.cell, styles.headerCell]}>Total Loan</Text>
              <Text style={[styles.cell, styles.headerCell]}>Paid</Text>
              <Text style={[styles.cell, styles.headerCell]}>Balance</Text>
              <Text style={[styles.cell, styles.headerCell]}>Date</Text>
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8FAFC",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#374151",
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  summaryBox: {
    flex: 1,
    backgroundColor: "#E0F2FE",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1E40AF",
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E40AF",
  },
  searchContainer: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    fontSize: 16,
    color: "#374151",
  },
  row: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  headerRow: {
    backgroundColor: "#E0F2FE",
  },
  cell: {
    flex: 1,
    fontSize: 16,
    color: "#374151",
    fontWeight: "500",
  },
  headerCell: {
    fontWeight: "bold",
    color: "#1E40AF",
  },
});

export default LoanRepayments;
