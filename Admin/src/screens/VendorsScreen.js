import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet as RNStyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AppPopupModal from '../modal/applicationDetails'; // Import the separate modal component

export default function SellerProfiles() {
  const navigation = useNavigation();

  // State to track which tab is active
  const [activeTab, setActiveTab] = useState('Sellers');

  // --------------------------------------------
  // SELLERS PAGINATION
  // --------------------------------------------
  const [currentSellersPage, setCurrentSellersPage] = useState(1);
  const sellersPerPage = 3; // 3 sellers per page

  // Sellers data (updated with shopDescription)
  const sellers = [
    {
      id: 1,
      icon: require('../../assets/shop1.jpg'),
      name: 'Albo',
      website: 'Promise Wendy',
      phone: '(+256) 774788071',
      email: 'emailalbo@email.com',
      location: 'Kampala',
      shopDescription: 'Quality electronics and fashion.',
      stock: '120 items',
      status: 'Approved',
    },
    {
      id: 2,
      icon: require('../../assets/shop2.jpg'),
      name: 'Asashio',
      website: 'Promise Wendy',
      phone: '+(256) 774788071',
      email: 'emailasashio@email.com',
      location: 'Kampala',
      shopDescription: 'Trendy fashion and more.',
      stock: '80 items',
      status: 'Approved',
    },
    {
      id: 3,
      icon: require('../../assets/shop3.jpg'),
      name: 'Ecom',
      website: 'Promise Wendy',
      phone: '(+256) 774788071',
      email: 'emailEcom@email.com',
      location: 'Kampala',
      shopDescription: 'Reliable e-commerce solutions.',
      stock: '200 items',
      status: 'Approved',
    },
    {
      id: 4,
      icon: require('../../assets/shop1.jpg'),
      name: 'ExtraShop',
      website: 'Another Site',
      phone: '(+256) 123456789',
      email: 'extra@shop.com',
      location: 'Kampala',
      shopDescription: 'Delicious food and drinks.',
      stock: '50 items',
      status: 'Approved',
    },
    {
      id: 5,
      icon: require('../../assets/shop2.jpg'),
      name: 'ShopFive',
      website: 'Some Site',
      phone: '(+256) 999888777',
      email: 'shop5@shop.com',
      location: 'Kampala',
      shopDescription: 'Fashionable and service-oriented.',
      stock: '60 items',
      status: 'Approved',
    },
  ];
  const totalSellersPages = Math.ceil(sellers.length / sellersPerPage);
  const startSellerIndex = (currentSellersPage - 1) * sellersPerPage;
  const displayedSellers = sellers.slice(startSellerIndex, startSellerIndex + sellersPerPage);

  // --------------------------------------------
  // APPLICATIONS PAGINATION (6 columns x 2 rows => 12 items)
  // --------------------------------------------
  const [currentAppPage, setCurrentAppPage] = useState(1);
  const appsPerPage = 12;
  const applications = [
    { id: 101, icon: require('../../assets/shop4.jpg'), name: 'EA' },
    { id: 102, icon: require('../../assets/shop1.jpg'), name: 'RK' },
    { id: 103, icon: require('../../assets/shop6.jpg'), name: 'Delight' },
    { id: 104, icon: require('../../assets/shop3.jpg'), name: 'Ecom' },
    { id: 105, icon: require('../../assets/shop2.jpg'), name: 'Data Foundation' },
    { id: 106, icon: require('../../assets/shop1.jpg'), name: 'AK' },
    { id: 107, icon: require('../../assets/shop4.jpg'), name: 'Whale' },
    { id: 108, icon: require('../../assets/shop3.jpg'), name: 'Cabins' },
    { id: 109, icon: require('../../assets/shop2.jpg'), name: 'Academy' },
    { id: 110, icon: require('../../assets/shop6.jpg'), name: 'LiuJo' },
    { id: 111, icon: require('../../assets/shop6.jpg'), name: 'LiuJo' },
    { id: 112, icon: require('../../assets/shop6.jpg'), name: 'LiuJo' },
    { id: 113, icon: require('../../assets/shop6.jpg'), name: 'LiuJo' },
  ];
  const totalAppPages = Math.ceil(applications.length / appsPerPage);
  const startAppIndex = (currentAppPage - 1) * appsPerPage;
  const displayedApps = applications.slice(startAppIndex, startAppIndex + appsPerPage);

  // Sellers Actions (Toggle & Delete)
  const handleToggle = (id) => {
    console.log('Toggle seller status for item:', id);
  };
  const handleDelete = (id) => {
    console.log('Delete seller item:', id);
  };

  // Sellers 3-dot menu (removed since actions are now inline)
  const [showOptions, setShowOptions] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const iconRefs = useRef({});

  // State for Application Popup Modal
  const [showAppPopup, setShowAppPopup] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  const measureIcon = (id) => {
    iconRefs.current[id]?.measureInWindow((x, y, width, height) => {
      setMenuPosition({ x, y, width, height });
      setSelectedId(id);
      setShowOptions(true);
    });
  };

  // Render Sellers Tab with updated columns
  const renderSellersTab = () => {
    return (
      <>
        <View style={styles.listHeader}>
          <Text style={[styles.listHeaderText, { flex: 1 }]}>Seller</Text>
          <Text style={[styles.listHeaderText, { flex: 1 }]}>Contact</Text>
          <Text style={[styles.listHeaderText, { flex: 1 }]}>Shop</Text>
          <Text style={[styles.listHeaderText, { flex: 1 }]}>Shop Description</Text>
          <Text style={[styles.listHeaderText, { flex: 1 }]}>Stock</Text>
          <Text style={[styles.listHeaderText, { flex: 1 }]}>Status</Text>
          <Text style={[styles.listHeaderText, { flex: 1 }]}>Action</Text>
        </View>

        {displayedSellers.map((seller) => (
          <View key={seller.id} style={styles.sellerRow}>
            {/* Seller Column: only name */}
            <View style={[styles.cell, { flex: 1 }]}>
              <Text style={styles.cellText}>{seller.website}</Text>
            </View>

            {/* Contact Column: phone and email */}
            <View style={[styles.cell, { flex: 1 }]}>
              <Text style={styles.cellText}>{seller.phone}</Text>
              <Text style={[styles.cellText, { fontSize: 13 }]}>{seller.email}</Text>
            </View>

            {/* Shop Column: shop name (website) and address (location) */}
            <View style={[styles.cell, { flex: 1 }]}>
              <Text style={styles.cellText}>{seller.name}</Text>
              <Text style={[styles.cellText, { fontSize: 13}]}>{seller.location}</Text>
            </View>

            {/* Shop Description Column */}
            <View style={[styles.cell, { flex: 1 }]}>
              <Text style={styles.cellText}>{seller.shopDescription}</Text>
            </View>

            {/* Stock Column */}
            <View style={[styles.cell, { flex: 1, alignItems: 'center' }]}>
              <Text style={styles.cellText}>{seller.stock}</Text>
            </View>

            {/* Status Column */}
            <View style={[styles.cell, { flex: 1, alignItems: 'center' }]}>
              <Text style={styles.statusText}>{seller.status}</Text>
            </View>

            {/* Action Column: Toggle and Delete icons */}
            <View style={[styles.cell, { flex: 1, flexDirection: 'row', justifyContent: 'space-around' }]}>
              <TouchableOpacity onPress={() => handleToggle(seller.id)}>
                <Ionicons name="toggle-outline" size={20} color="#007BFF" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(seller.id)}>
                <Ionicons name="trash-outline" size={20} color="#FF0000" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </>
    );
  };

  // Render Applications Tab with clickable cards that show the popup modal
  const renderApplicationsTab = () => {
    return (
      <View style={styles.applicationsGrid}>
        {displayedApps.map((app) => (
          <TouchableOpacity
            key={app.id}
            style={styles.appCard}
            onPress={() => {
              console.log('App card clicked:', app.id);
              setSelectedApp(app);
              setShowAppPopup(true);
            }}
          >
            <Image
              source={app.icon ? app.icon : require('../../assets/default.png')}
              style={styles.appIcon}
            />
            <Text style={styles.appName}>{app.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  // "Page X of Y" with "Previous" & "Next" for Sellers
  const renderSellersPagination = () => {
    return (
      <View style={styles.paginationBar}>
        <Text style={styles.pageInfoText}>
          Page {currentSellersPage} of {totalSellersPages}
        </Text>
        <View style={styles.paginationButtons}>
          <TouchableOpacity
            style={[styles.prevButton, currentSellersPage === 1 && styles.disabledButton]}
            onPress={() => {
              if (currentSellersPage > 1) {
                setCurrentSellersPage((prev) => prev - 1);
              }
            }}
            disabled={currentSellersPage === 1}
          >
            <Text style={[styles.prevButtonText, currentSellersPage === 1 && styles.disabledText]}>
              Previous
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.nextButton, currentSellersPage === totalSellersPages && styles.disabledButton]}
            onPress={() => {
              if (currentSellersPage < totalSellersPages) {
                setCurrentSellersPage((prev) => prev + 1);
              }
            }}
            disabled={currentSellersPage === totalSellersPages}
          >
            <Text style={[styles.nextButtonText, currentSellersPage === totalSellersPages && styles.disabledText]}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // "Page X of Y" with "Previous" & "Next" for Applications
  const renderApplicationsPagination = () => {
    return (
      <View style={styles.paginationBar}>
        <Text style={styles.pageInfoText}>
          Page {currentAppPage} of {totalAppPages}
        </Text>
        <View style={styles.paginationButtons}>
          <TouchableOpacity
            style={[styles.prevButton, currentAppPage === 1 && styles.disabledButton]}
            onPress={() => {
              if (currentAppPage > 1) {
                setCurrentAppPage((prev) => prev - 1);
              }
            }}
            disabled={currentAppPage === 1}
          >
            <Text style={[styles.prevButtonText, currentAppPage === 1 && styles.disabledText]}>
              Previous
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.nextButton, currentAppPage === totalAppPages && styles.disabledButton]}
            onPress={() => {
              if (currentAppPage < totalAppPages) {
                setCurrentAppPage((prev) => prev + 1);
              }
            }}
            disabled={currentAppPage === totalAppPages}
          >
            <Text style={[styles.nextButtonText, currentAppPage === totalAppPages && styles.disabledText]}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Sidebar */}
      <View style={styles.sidebar}>
        <TouchableOpacity style={styles.sidebarIconContainer} onPress={() => navigation.navigate('AdminDashboard')}>
          <Ionicons name="grid-outline" size={24} color="#fff" />
          <Text style={styles.sidebarIconLabel}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarIconContainer} onPress={() => navigation.navigate('Customers')}>
          <Ionicons name="people-outline" size={24} color="#fff" />
          <Text style={styles.sidebarIconLabel}>Customers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarIconContainer} onPress={() => navigation.navigate('Vendors')}>
          <Ionicons name="storefront-outline" size={24} color="#fff" />
          <Text style={styles.sidebarIconLabel}>Vendors</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarIconContainer} onPress={() => navigation.navigate('Reports')}>
          <Ionicons name="document-text-outline" size={24} color="#fff" />
          <Text style={styles.sidebarIconLabel}>Reports</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarIconContainer} onPress={() => navigation.navigate('Orders')}>
          <Ionicons name="cart-outline" size={24} color="#fff" />
          <Text style={styles.sidebarIconLabel}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarIconContainer} onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings-outline" size={24} color="#fff" />
          <Text style={styles.sidebarIconLabel}>Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Seller Profiles</Text>
          </View>

          {/* Tabs */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity style={styles.tabButton} onPress={() => setActiveTab('Sellers')}>
              <Text style={[styles.tabText, activeTab === 'Sellers' && styles.activeTabText]}>
                Sellers
              </Text>
              {activeTab === 'Sellers' && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabButton} onPress={() => setActiveTab('Applications')}>
              <Text style={[styles.tabText, activeTab === 'Applications' && styles.activeTabText]}>
                Applications
              </Text>
              {activeTab === 'Applications' && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          </View>

          {/* Render Content */}
          {activeTab === 'Sellers' ? renderSellersTab() : renderApplicationsTab()}
        </ScrollView>

        {/* Pagination */}
        {activeTab === 'Sellers' && totalSellersPages > 1 && renderSellersPagination()}
        {activeTab === 'Applications' && totalAppPages > 1 && renderApplicationsPagination()}
      </View>

      {/* Application Popup Modal */}
      <AppPopupModal
        visible={showAppPopup}
        onClose={() => setShowAppPopup(false)}
        app={selectedApp}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
  },
  sidebar: {
    width: 80,
    backgroundColor: '#F9622C',
    paddingVertical: 20,
    borderRightWidth: 1,
    borderRightColor: '#ebedf0',
    alignItems: 'center',
  },
  sidebarIconContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  sidebarIconLabel: {
    marginTop: 4,
    fontSize: 10,
    color: '#fff',
  },
  mainContent: {
    flex: 1,
    position: 'relative',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },

  // Header
  headerContainer: {
    marginTop: 16,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3a3a3a',
    marginBottom: 8,
  },

  // Tabs
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tabButton: {
    marginRight: 20,
    position: 'relative',
  },
  tabText: {
    fontSize: 16,
    color: '#280300',
  },
  activeTabText: {
    color: '#280300',
    fontWeight: '500',
  },
  activeIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -2,
    height: 2,
    backgroundColor: '#f9622c',
  },

  // Sellers Table Header and Rows
  listHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingBottom: 10,
    marginBottom: 6,
    alignItems: 'left',
  },
  listHeaderText: {
    color: '#280300',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sellerRow: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
    alignItems: 'center',
  },
  cell: {
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  cellText: {
    fontSize: 13,
    color: '#f9622c',
    fontWeight: '500',
    marginTop:2,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#388E3C',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    textAlign: 'center',
  },

  // Applications Grid
  applicationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  appCard: {
    width: '14%',
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: '1%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  appIcon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  appName: {
    fontSize: 12,
    color: '#280300',
    marginTop: 4,
    textAlign: 'center',
  },

  // Pagination Bar
  paginationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
    paddingVertical: 1,
    bottom: 10,
  },
  pageInfoText: {
    color: '#280300',
    fontSize: 14,
    fontWeight: '500',
  },
  paginationButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prevButton: {
    borderWidth: 1,
    borderColor: '#f9622c',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  prevButtonText: {
    color: '#f9622c',
    fontSize: 14,
    fontWeight: '500',
  },
  nextButton: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  nextButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
  },
  disabledButton: {
    opacity: 0.3,
  },
  disabledText: {
    color: '#999',
  },

  // 3-Dots Menu for Sellers (removed actions in favor of inline toggle and delete)
  optionsMenu: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    width: 140,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  optionText: {
    fontSize: 14,
    color: '#280300',
  },
});
