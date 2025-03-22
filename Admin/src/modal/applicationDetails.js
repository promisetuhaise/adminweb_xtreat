import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function AppPopupModal({
  visible,
  onClose,
  app,          // The "application" or "vendor" data
  onApprove,    // Optional: If you want to handle Approve in the modal
  onReject,     // Optional: If you want to handle Reject in the modal
}) {
  // If the modal is not visible or there's no data, render nothing
  if (!visible || !app) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Dark overlay to close the modal when tapped outside */}
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose} />

      {/* Centered container for the modal content */}
      <View style={styles.container}>
        {/* Modal box */}
        <View style={styles.modalBox}>
          {/* Top bar: Title on the left, close icon on the right */}
          <View style={styles.topBar}>
            <Text style={styles.topBarTitle}>Approve Vendor Request</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Horizontal info row (3 columns) */}
          <View style={styles.infoRow}>
            <View style={styles.infoBlock}>
              <Text style={styles.infoLabel}>Username</Text>
              <Text style={styles.infoValue}>
                {app.username || 'JohnDoe'}
              </Text>
            </View>
            <View style={styles.infoBlock}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>
                {app.email || 'johndoe@email.com'}
              </Text>
            </View>
            <View style={styles.infoBlock}>
              <Text style={styles.infoLabel}>Phone Number</Text>
              <Text style={styles.infoValue}>
                {app.phoneNumber || '+1234567890'}
              </Text>
            </View>
          </View>

          {/* Middle section: Shop details */}
          <View style={styles.requestBox}>
            {/* Header row inside the box */}
            <View style={styles.requestBoxHeader}>
              <Text style={styles.requestBoxTitle}>Shop Details</Text>
              {/* Status badge (e.g., Pending) */}
              <View style={[styles.statusBadge, { backgroundColor: '#f0ad4e' }]}>
                <Text style={styles.statusBadgeText}>
                  {app.status || 'Pending'}
                </Text>
              </View>
            </View>

            {/* Shop Name & Shop Address */}
            <View style={styles.shopRow}>
              <View style={styles.shopBlock}>
                <Text style={styles.shopLabel}>Shop Name</Text>
                <Text style={styles.shopValue}>
                  {app.shopName || 'No shop name provided'}
                </Text>
              </View>
              <View style={styles.shopBlock}>
                <Text style={styles.shopLabel}>Shop Address</Text>
                <Text style={styles.shopValue}>
                  {app.shopAddress || 'No address provided'}
                </Text>
              </View>
            </View>

            {/* Shop Description */}
            <Text style={styles.description}>
              {app.shopDescription || 'No shop description provided.'}
            </Text>
          </View>

          {/* Bottom bar with action buttons at bottom right */}
          <View style={styles.bottomBar}>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: '#fff', borderWidth:1 , borderColor:"#f9622c" }]}
                onPress={() => {
                  if (onReject) onReject(app);
                  onClose();
                }}
              >
                <Text style={styles.actionButtonDeclineText}>Decline</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: '#f9622c', marginLeft: 8 }]}
                onPress={() => {
                  if (onApprove) onApprove(app);
                  onClose();
                }}
              >
                <Text style={styles.actionButtonText}>Approve</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  /* Dark background overlay */
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  /* Center everything within the modal */
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  /* Main modal box */
  modalBox: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 1,
    overflow: 'hidden',
  },
  /* Top bar with close icon */
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 50,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  topBarTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#280300',
  },

  /* Info row (3 columns) */
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#fefefe',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoBlock: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#280300',
  },

  /* Middle request box */
  requestBox: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  requestBoxHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  requestBoxTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#280300',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },

  /* Shop row: Name + Address */
  shopRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  shopBlock: {
    flex: 1,
    marginRight: 10,
  },
  shopLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  shopValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#280300',
  },

  description: {
    fontSize: 13,
    color: '#3a3a3a',
    marginTop: 6,
  },

  /* Bottom bar with action buttons at bottom right */
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    padding: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  actionButtonDeclineText: {
    color: '#f9622c',
    fontWeight: '600',
    fontSize: 14,
  },
  
});
