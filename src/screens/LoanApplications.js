import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";

const LoanApplications = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [loanApplications, setLoanApplications] = useState([
    { id: 1, name: "Mulungi Tendo", amount: "UGX 500,000", status: "Pending" },
    { id: 2, name: "Aisha Nambatya", amount: "UGX 300,000", status: "Approved" },
    { id: 3, name: "Afrah Nakanwagi", amount: "UGX 700,500", status: "Rejected" },
  ]);

  const handleApproval = (loan) => {
    setSelectedLoan(loan);
    setModalVisible(true);
  };

  const confirmApproval = (action) => {
    if (action === "approve") {
      alert(`${selectedLoan.name}'s loan has been approved.`);
      // Updating the loan status in backend or state
    } else {
      alert(`${selectedLoan.name}'s loan has been declined.`);
      // Updating  the loan status in backend or state
    }
    setModalVisible(false);
    setSelectedLoan(null);
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("AdminDashboard")}>
        <Text style={styles.backText}>← Back to Dashboard</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Loan Applications</Text>

      {/* Loan Applications Table */}
      <View style={styles.tableContainer}>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Name</Text>
            <Text style={styles.tableHeaderText}>Amount</Text>
            <Text style={styles.tableHeaderText}>Status</Text>
            <Text style={styles.tableHeaderText}>Action</Text>
          </View>
          {loanApplications.map((loan) => (
            <View key={loan.id} style={styles.tableRow}>
              <Text style={styles.tableText}>{loan.name}</Text>
              <Text style={styles.tableText}>{loan.amount}</Text>
              <Text style={styles.tableText}>{loan.status}</Text>
              <View style={styles.tableAction}>
                <Switch
                  value={loan.status === "Approved"}
                  onValueChange={() => handleApproval(loan)}
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Confirmation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Action</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to {selectedLoan?.status === "Pending" ? "approve" : "decline"} the loan for {selectedLoan?.name}?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={() => confirmApproval("approve")}>
                <Text style={styles.modalButtonText}>Approve</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => confirmApproval("decline")}>
                <Text style={styles.modalButtonText}>Decline</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  backButton: { marginBottom: 10 },
  backText: { color: "red", fontSize: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  tableContainer: { marginTop: 20 },
  table: { borderWidth: 1, borderColor: "#ddd", borderRadius: 10, overflow: "hidden" },
  tableHeader: { flexDirection: "row", backgroundColor: "#F9622C", padding: 10 },
  tableHeaderText: { color: "#fff", fontWeight: "bold", width: "25%", textAlign: "center" },
  tableRow: { flexDirection: "row", justifyContent: "space-between", padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  tableText: { fontSize: 16, width: "25%", textAlign: "center" },
  tableAction: { width: "25%", alignItems: "center" },

  // Modal Styles
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" },
  modalContent: { width: 300, backgroundColor: "white", borderRadius: 10, padding: 20, alignItems: "center", elevation: 5 },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  modalMessage: { textAlign: "center", marginBottom: 20 },
  modalButtons: { flexDirection: "row", justifyContent: "space-around", width: "100%" },
  modalButton: { backgroundColor: "#F9622C", padding: 10, borderRadius: 5, width: 100 },
  modalButtonText: { color: "#fff", fontSize: 16, textAlign: "center" },
});

export default LoanApplications;