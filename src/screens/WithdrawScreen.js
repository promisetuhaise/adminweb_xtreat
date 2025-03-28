// WithdrawScreen.js
import React, { useState } from 'react';
import { View, Text, Button, Alert, TextInput, StyleSheet } from 'react-native';

const WithdrawScreen = () => {
  const [amount, setAmount] = useState('');

  const handleWithdraw = () => {
    Alert.alert(
      "Confirm Withdrawal",
      `Are you sure you want to withdraw $${amount}?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => console.log(`Withdrew: $${amount}`) }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <Button title="Withdraw" onPress={handleWithdraw} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
});

export default WithdrawScreen;