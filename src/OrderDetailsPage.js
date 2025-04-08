import React from 'react';
import { Card, Progress, Tag, Divider, Typography, List, Space, Badge, Button } from 'antd';
import {
  ArrowLeftOutlined,
  EditOutlined,
  UndoOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const OrderDetailsPage = () => {
  const order = {
    id: "#0758267/90",
    status: "In Progress",
    date: "April 23, 2024 at 6:23 pm",
    estimatedShipping: "Apr 25, 2024",
    paymentStatus: "Paid",
    items: [
      {
        name: "Men Black Slim Fit T-shirt",
        size: "M",
        status: "Ready",
        quantity: 1,
        price: 80.00,
        tax: 3.00,
        amount: 83.00,
        image: "https://via.placeholder.com/40x40.png?text=T",
      },
      {
        name: "Dark Green Cargo Pant",
        size: "M",
        status: "Packaging",
        quantity: 3,
        price: 330.00,
        tax: 4.00,
        amount: 334.00,
        image: "https://via.placeholder.com/40x40.png?text=P",
      },
      {
        name: "Men Dark Brown Wallet",
        status: "Ready",
        quantity: 1,
        price: 132.00,
        tax: 5.00,
        amount: 137.00,
        image: "https://via.placeholder.com/40x40.png?text=W",
      }
    ],
    summary: {
      subtotal: 777.00,
      discount: 60.00,
      delivery: 0.00,
      tax: 20.00,
      total: 737.00
    },
    payment: {
      method: "Master Card",
      card: "xxxx xxxx xxxx 7812",
      transactionId: "#IDN768139059",
      cardHolder: "Gastron Lapierre",
      icon: "https://via.placeholder.com/24x16.png?text=MC"
    }
  };

  const progressSteps = [
    { title: "Order Confirming", status: "finish" },
    { title: "Payment Pending", status: "finish" },
    { title: "Processing", status: "process" },
    { title: "Shipping", status: "wait" },
    { title: "Delivered", status: "wait" },
  ];

  const getStatusColor = (status) => {
    if (status === "Ready") {
      return "success";
    } else if (status === "Packaging") {
      return "processing";
    }
    return "default";
  };

  const getProgressPercent = () => {
    const currentIndex = progressSteps.findIndex(step => step.status === "process");
    if (currentIndex === -1) {
      return 0;
    }
    return (currentIndex / (progressSteps.length - 1)) * 100;
  };

  return (
    <div style={{ backgroundColor: '#f0f2f5', padding: '20px' }}>
      <div style={{ maxWidth: '980px', margin: '0 auto' }}>
        {/* Top Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <Button icon={<ArrowLeftOutlined />} size="small">Back</Button>
            <Title level={4} style={{ margin: '0 0 0 12px', display: 'inline-block' }}>Order #{order.id}</Title>
            <Tag style={{ marginLeft: '10px' }} color={order.status === "In Progress" ? "processing" : "success"}>{order.status}</Tag>
          </div>
          <div>
            <Button size="small">Refund</Button>
            <Button style={{ marginLeft: '6px' }} size="small" icon={<UndoOutlined />}>Return</Button>
            <Button style={{ marginLeft: '6px' }} type="primary" size="small" icon={<EditOutlined />}>Edit Order</Button>
          </div>
        </div>

        <Card style={{ marginBottom: '20px' }}>
          <div style={{ marginBottom: '12px' }}>
            <Text>Order / Order Details / <Text strong>{order.id}</Text> - {order.date}</Text>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <Progress percent={getProgressPercent()} showInfo={false} strokeColor="#faad14" trailColor="#f5f5f5" />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
              {progressSteps.map((step, index) => (
                <div key={index} style={{ textAlign: 'center', flex: 1 }}>
                  <Text style={{ fontSize: '12px', color: step.status === "finish" ? '#52c41a' : step.status === "process" ? '#faad14' : '#bfbfbf' }}>
                    {step.title}
                  </Text>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: '13px' }}>Estimated shipping date: <Text strong>{order.estimatedShipping}</Text></Text>
            <Button type="primary" size="small" style={{ backgroundColor: '#faad14', borderColor: '#faad14', fontSize: '12px' }}>Mark As Ready To Ship</Button>
          </div>
        </Card>

        <div style={{ display: 'flex', gap: '16px' }}>
          {/* Product List */}
          <Card title="Product" style={{ flex: 2, marginBottom: 0 }}>
            <List
              itemLayout="horizontal"
              dataSource={order.items}
              renderItem={(item) => (
                <List.Item style={{ padding: '10px 0' }}>
                  <List.Item.Meta
                    avatar={<img style={{ width: '36px', height: '36px', marginRight: '12px', objectFit: 'cover' }} src={item.image} alt={item.name} />}
                    title={
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text strong style={{ fontSize: '14px' }}>{item.name}</Text>
                        {item.size && <Tag style={{ backgroundColor: '#f0f0f0', color: '#595959', border: 'none', fontSize: '12px' }}>Size: {item.size}</Tag>}
                      </div>
                    }
                    description={
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                        <Text>Quantity: {item.quantity}</Text>
                        <Badge
                          status={getStatusColor(item.status)}
                          text={item.status}
                          style={{
                            backgroundColor: getStatusColor(item.status) === 'success' ? '#f6ffed' : getStatusColor(item.status) === 'processing' ? '#fffbe6' : '#f5f5f5',
                            color: getStatusColor(item.status) === 'success' ? '#52c41a' : getStatusColor(item.status) === 'processing' ? '#faad14' : '#000000d9',
                            border: '1px solid ' + (getStatusColor(item.status) === 'success' ? '#b7eb8f' : getStatusColor(item.status) === 'processing' ? '#ffe58f' : '#d9d9d9')
                          }}
                        />
                      </div>
                    }
                  />
                  <div style={{ textAlign: 'right' }}>
                    <Text style={{ marginRight: '6px', fontSize: '13px' }}>${item.price.toFixed(2)}</Text>
                    <Text type="secondary" style={{ fontSize: '12px' }}>+ ${item.tax.toFixed(2)} tax</Text>
                    <Title level={5} style={{ margin: '4px 0 0 0', fontSize: '14px' }}>${item.amount.toFixed(2)}</Title>
                  </div>
                </List.Item>
              )}
            />
          </Card>

          {/* Order Summary */}
          <Card title="Order Summary" style={{ flex: 1, marginBottom: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px' }}>
              <Text>Sub Total :</Text>
              <Text>${order.summary.subtotal.toFixed(2)}</Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px' }}>
              <Text>Discount :</Text>
              <Text type="danger">-${order.summary.discount.toFixed(2)}</Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px' }}>
              <Text>Delivery Charge :</Text>
              <Text>${order.summary.delivery.toFixed(2)}</Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '13px' }}>
              <Text>Estimated Tax (15.5%) :</Text>
              <Text>${order.summary.tax.toFixed(2)}</Text>
            </div>
            <Divider style={{ marginBottom: '10px' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '14px' }}>
              <Text strong>Total Amount :</Text>
              <Title level={4} style={{ margin: 0, fontSize: '16px' }}>${order.summary.total.toFixed(2)}</Title>
            </div>

            <Divider style={{ marginBottom: '10px' }} />
            <div style={{ marginTop: '10px' }}>
              <Text strong style={{ fontSize: '13px' }}>Payment Information</Text>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                {order.payment.icon && <img src={order.payment.icon} alt="Payment Icon" style={{ marginRight: '6px', width: '20px', height: '14px', objectFit: 'contain' }} />}
                <Text style={{ fontSize: '12px' }}>{order.payment.method} - {order.payment.card}</Text>
              </div>
              <Text type="secondary" style={{ fontSize: '12px' }}>Transaction ID: {order.payment.transactionId}</Text>
              <Text type="secondary" style={{ fontSize: '12px' }}>Card Holder Name: {order.payment.cardHolder}</Text>
              <Tag color="green" style={{ marginTop: '10px', display: 'block', textAlign: 'center', fontSize: '12px' }}>Payment Status: {order.paymentStatus}</Tag>
            </div>
          </Card>
        </div>

        {/* Customer Details (Optional) */}
        {/* <Card title="Customer Details" style={{ marginTop: '20px' }}>
          <p style={{ fontSize: '13px' }}>Customer Name: John Doe</p>
          <p style={{ fontSize: '13px' }}>Shipping Address: 123 Main St, Anytown, USA</p>
          <p style={{ fontSize: '13px' }}>Email: john.doe@example.com</p>
        </Card> */}
      </div>
    </div>
  );
};

export default OrderDetailsPage;