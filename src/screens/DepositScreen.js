import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const DepositScreen = () => {
  const navigation = useNavigation();
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Mobile Money");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [depositDetails, setDepositDetails] = useState({});

  // Fields for Mobile Money
  const [mobileMoneyAccount, setMobileMoneyAccount] = useState("");

  // Fields for Bank Transfer
  const [bankAccountNumber, setBankAccountNumber] = useState("");

  // Fields for Credit Card
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [creditCardExpiry, setCreditCardExpiry] = useState("");
  const [creditCardCVV, setCreditCardCVV] = useState("");
  const [creditCardHolderName, setCreditCardHolderName] = useState("");

  const handleDeposit = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      return Alert.alert("Invalid Amount", "Enter a valid deposit amount.");
    }

    if (paymentMethod === "Mobile Money" && !mobileMoneyAccount.trim()) {
      return Alert.alert("Missing Information", "Enter your Mobile Money account number.");
    }

    if (paymentMethod === "Bank Transfer" && !bankAccountNumber.trim()) {
      return Alert.alert("Missing Information", "Enter your Bank account number.");
    }

    if (paymentMethod === "Credit Card") {
      if (
        !creditCardNumber.trim() ||
        !creditCardExpiry.trim() ||
        !creditCardCVV.trim() ||
        !creditCardHolderName.trim()
      ) {
        return Alert.alert("Missing Information", "Please fill in all credit card details.");
      }
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const currentDate = new Date();
    setDepositDetails({
      amount,
      method: paymentMethod,
      date: currentDate.toDateString(),
      time: currentDate.toLocaleTimeString(),
      account: paymentMethod === "Mobile Money" ? mobileMoneyAccount :
               paymentMethod === "Bank Transfer" ? bankAccountNumber : creditCardNumber,
    });

    setModalVisible(true);
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.navigate('AdminDashboard')} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </Pressable>
          <Text style={styles.headerTitle}>Deposit</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Select Payment Method</Text>
          <Picker
            selectedValue={paymentMethod}
            style={styles.picker}
            onValueChange={(itemValue) => setPaymentMethod(itemValue)}
            enabled={!loading}
          >
            <Picker.Item label="Mobile Money" value="Mobile Money" />
            <Picker.Item label="Bank Transfer" value="Bank Transfer" />
            <Picker.Item label="Credit Card" value="Credit Card" />
          </Picker>

          {paymentMethod === "Mobile Money" && (
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder="Mobile Number"
                keyboardType="phone-pad"
                value={mobileMoneyAccount}
                onChangeText={setMobileMoneyAccount}
                editable={!loading}
              />
            </View>
          )}

          {paymentMethod === "Bank Transfer" && (
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder="Bank Account Number"
                keyboardType="numeric"
                value={bankAccountNumber}
                onChangeText={setBankAccountNumber}
                editable={!loading}
              />
            </View>
          )}

          {paymentMethod === "Credit Card" && (
            <>
              <View style={styles.inputRow}>
                <TextInput style={styles.input} placeholder="Card Number" keyboardType="numeric" value={creditCardNumber} onChangeText={setCreditCardNumber} editable={!loading} />
                <TextInput style={styles.input} placeholder="Expiry" value={creditCardExpiry} onChangeText={setCreditCardExpiry} editable={!loading} />
                <TextInput style={styles.input} placeholder="CVV" keyboardType="numeric" secureTextEntry={true} value={creditCardCVV} onChangeText={setCreditCardCVV} editable={!loading} />
              </View>
              <TextInput style={[styles.input, { width: "100%" }]} placeholder="Card Holder Name" value={creditCardHolderName} onChangeText={setCreditCardHolderName} editable={!loading} />
            </>
          )}

          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Enter amount"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
              editable={!loading}
            />
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#f97316" style={styles.loader} />
          ) : (
            <Pressable style={styles.button} onPress={handleDeposit}>
              <Text style={styles.buttonText}>Confirm Deposit</Text>
            </Pressable>
          )}
        </View>

        {/* Success Modal */}
        <Modal visible={modalVisible} transparent={true} animationType="slide">
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Deposit Successful!</Text>
              <Text style={styles.modalText}>Amount: UGX {depositDetails.amount}</Text>
              <Text style={styles.modalText}>Method: {depositDetails.method}</Text>
              <Text style={styles.modalText}>Account: {depositDetails.account}</Text>
              <Text style={styles.modalText}>Date: {depositDetails.date}</Text>
              <Text style={styles.modalText}>Time: {depositDetails.time}</Text>
              <Pressable style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#F4F4F4", paddingTop: 80, alignItems: "center" },
  header: { height: 90, backgroundColor: "#F9622C", flexDirection: "row", alignItems: "center", paddingHorizontal: 20, position: "absolute", top: 0, left: 0, right: 0 },
  formContainer: { backgroundColor: "#fff", padding: 20, borderRadius: 10, width: "85%", marginTop: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, elevation: 5 },
  input: { backgroundColor: "#fff", borderColor: "#F9622C", borderWidth: 1, borderRadius: 10, paddingHorizontal: 10, fontSize: 14, height: 50, flex: 1, marginHorizontal: 5 },
  inputRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 15 },
  button: { backgroundColor: "#F9622C", padding: 15, borderRadius: 10, alignItems: "center" },
  modalBackground: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContainer: { width: "80%", backgroundColor: "#fff", padding: 20, borderRadius: 10, alignItems: "center" },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  modalText: { fontSize: 14, marginBottom: 5 },
  modalButton: { marginTop: 20, backgroundColor: "#B14228", padding: 10, borderRadius: 5 },
});

export default DepositScreen;
