// MainWalletScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const WalletScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Card Balance: $7,421.89</Text>
      <Text>Total Income: $77,858.21</Text>
      <Text>Total Expense: $15,887.65</Text>

      <Button title="Deposit" onPress={() => navigation.navigate('DepositScreen')} />
      <Button title="Withdraw" onPress={() => navigation.navigate('WithdrawScreen')} />
      <Button title="Transaction History" onPress={() => navigation.navigate('TransactionHistoryScreen')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
});

export default WalletScreen;