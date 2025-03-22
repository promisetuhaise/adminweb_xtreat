import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

const AppPopupModal = ({
  visible,
  onClose,
  booking,       // booking details to display
  onApprove,     // callback for Approve button
  onReject,      // callback for Reject button
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Clicking outside the container closes the modal */}
      <TouchableOpacity style={styles.popupOverlay} onPress={onClose}>
        <View style={styles.popupContainer}>

          {/* Prevent clicks on container from closing modal immediately */}
          <TouchableOpacity activeOpacity={1} style={{ width: '100%' }}>
            <Text style={styles.popupTitle}>Booking Approval Requested</Text>

            <Text style={styles.subTitle}>
              Approval is required for a booking request
            </Text>

            {/* Booking details */}
            {booking && (
              <>
                <Text style={styles.detailText}>
                  <Text style={styles.boldText}>User: </Text>
                  {booking.userName}
                </Text>
                <Text style={styles.detailText}>
                  <Text style={styles.boldText}>Email: </Text>
                  {booking.email}
                </Text>
                <Text style={styles.detailText}>
                  <Text style={styles.boldText}>Department: </Text>
                  {booking.department}
                </Text>
                <Text style={styles.detailText}>
                  <Text style={styles.boldText}>Office: </Text>
                  {booking.office}
                </Text>
                <Text style={styles.detailText}>
                  <Text style={styles.boldText}>Role: </Text>
                  {booking.role}
                </Text>
                <Text style={styles.detailText}>
                  <Text style={styles.boldText}>From: </Text>
                  {booking.fromDate} (morning)
                </Text>
                <Text style={styles.detailText}>
                  <Text style={styles.boldText}>To: </Text>
                  {booking.toDate} (end of day)
                </Text>
                <Text style={styles.detailText}>
                  <Text style={styles.boldText}>Leave Type: </Text>
                  {booking.leaveType}
                </Text>
              </>
            )}

            {/* Action buttons */}
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.approveButton} onPress={onApprove}>
                <Text style={styles.buttonText}>Approve</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.rejectButton} onPress={onReject}>
                <Text style={styles.buttonText}>Reject</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default AppPopupModal
const styles = StyleSheet.create({
  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#000',
    marginBottom: 4,
  },
  boldText: {
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-evenly',
  },
  approveButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  rejectButton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
