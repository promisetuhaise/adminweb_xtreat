import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import '../styles/OrderList.css';
const OrderList = () => {
  const navigate = useNavigate();

  const summaryData = [
    { title: 'Payment Refund', value: 490, icon: '💸' },
    { title: 'Order Cancel', value: 241, icon: '🛒' },
    { title: 'Order Shipping', value: 630, icon: '📦' },
    { title: 'Order Delivery', value: 170, icon: '🚚' },
    { title: 'Pending Review', value: 210, icon: '📋' },
    { title: 'Pending Payment', value: 608, icon: '⏳' },
    { title: 'Delivered', value: 200, icon: '✅' },
    { title: 'In Progress', value: 656, icon: '🔄' },
  ];

  const orders = [
    { id: '#583488/80', createdAt: 'Apr 23, 2024', customer: 'Gail C. Anderson', priority: 'Normal', total: '$1,230.00', paymentStatus: 'Unpaid', items: 4, deliveryNumber: '-', orderStatus: 'Draft' },
    { id: '#456754/80', createdAt: 'Apr 20, 2024', customer: 'Jung S. Ayala', priority: 'Normal', total: '$987.00', paymentStatus: 'Paid', items: 2, deliveryNumber: '-', orderStatus: 'Packaging' },
    { id: '#578246/80', createdAt: 'Apr 19, 2024', customer: 'David A. Arnold', priority: 'High', total: '$1,478.00', paymentStatus: 'Paid', items: 5, deliveryNumber: '#D-578578', orderStatus: 'Completed' },
    { id: '#348930/80', createdAt: 'Apr 4, 2024', customer: 'Cecilie D. Gordon', priority: 'Normal', total: '$720.00', paymentStatus: 'Refund', items: 4, deliveryNumber: '-', orderStatus: 'Canceled' },
    { id: '#391367/80', createdAt: 'Apr 2, 2024', customer: 'William Moreno', priority: 'Normal', total: '$1,909.00', paymentStatus: 'Paid', items: 6, deliveryNumber: '#D-89734235', orderStatus: 'Completed' },
  ];

  const handleViewOrder = (orderId) => {
    const cleanOrderId = orderId.replace(/[#/]/g, '-');
    navigate(`/order/${cleanOrderId}`);
  };

  return (
    <div className="flex flex-1 overflow-hidden">
      <Sidebar />
      <div className="flex-1 p-4 bg-gray-100 ml-[80px]">
        <div className="summary-cards">
          {summaryData.map((item, index) => (
            <div key={index} className="card">
              <div className="card-icon">{item.icon}</div>
              <div className="card-content">
                <h3>{item.title}</h3>
                <p>{item.value}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="order-list">
          <div className="table-header">
            <h2>All Order List</h2>
            <select>
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Year</option>
            </select>
          </div>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Created At</th>
                <th>Customer</th>
                <th>Priority</th>
                <th>Total</th>
                <th>Payment Status</th>
                <th>Items</th>
                <th>Delivery Number</th>
                <th>Order Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.id}</td>
                  <td>{order.createdAt}</td>
                  <td>{order.customer}</td>
                  <td>{order.priority}</td>
                  <td>{order.total}</td>
                  <td>
                    <span className={`status ${order.paymentStatus.toLowerCase() === 'paid' ? 'paid' : order.paymentStatus.toLowerCase() === 'refund' ? 'refund' : 'unpaid'}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td>{order.items}</td>
                  <td>{order.deliveryNumber}</td>
                  <td>
                    <span className={`status ${order.orderStatus.toLowerCase() === 'completed' ? 'completed' : order.orderStatus.toLowerCase() === 'canceled' ? 'canceled' : order.orderStatus.toLowerCase() === 'packaging' ? 'packaging' : 'draft'}`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn" onClick={() => handleViewOrder(order.id)}>🔍</button>
                    <button className="action-btn">✏️</button>
                    <button className="action-btn">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderList;