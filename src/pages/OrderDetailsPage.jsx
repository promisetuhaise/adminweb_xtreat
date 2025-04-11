// src/components/OrderDetailsPage.jsx
import React from 'react';
import 'boxicons/css/boxicons.min.css';
import Sidebar from '../components/sidebar';
import shirt from "../assets/Shirt.jpg"

const Header = () => (
  <header className="bg-white shadow-sm py-4">
    <div className="max-w-screen-xl mx-auto px-4 flex items-center">
      <button className="text-2xl mr-4 focus:outline-none">
        <i className="bx bx-menu"></i>
      </button>
      <h4
        style={{ fontSize: '13px', color: '#280300' }}
        className="uppercase font-bold"
      >
        Order Details
      </h4>
    </div>
  </header>
);

const ProgressSection = () => {
  const steps = [
    { label: 'Order Confirming', width: 'w-full', color: 'bg-green-500' },
    { label: 'Payment Pending', width: 'w-full', color: 'bg-green-500' },
    {
      label: 'Processing',
      width: 'w-3/5',
      color: 'bg-yellow-500',
      spinner: true,
    },
    { label: 'Shipping', width: 'w-0', color: 'bg-blue-500' },
    { label: 'Delivered', width: 'w-0', color: 'bg-blue-500' },
  ];

  return (
    <div className="flex-1 p-4 bg-gray-100 ml-[80px]">
      <div className="p-6">
        <div className="flex flex-wrap justify-between items-center mb-4">
          <div>
            <h4
              style={{ fontSize: '13px', color: '#280300' }}
              className="flex items-center font-medium space-x-2"
            >
              <span>#0758267/90</span>
              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                Paid
              </span>
              <span className="px-2 py-1 text-xs font-medium border border-yellow-500 text-yellow-500 rounded">
                In Progress
              </span>
            </h4>
            <p style={{ fontSize: '11px', color: '#000' }} className="text-sm mt-1">
              Order / Order Details / #0758267/90 – April 23, 2024 at 6:23 pm
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              style={{ fontSize: '11px', color: '#000' }}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              Refund
            </button>
            <button
              style={{ fontSize: '11px', color: '#000' }}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              Return
            </button>
            <button
              style={{
                fontSize: '11px',
                backgroundColor: '#f9622c',
                color: '#fff',
              }}
              className="px-4 py-2 rounded hover:bg-opacity-90"
            >
              Edit Order
            </button>
          </div>
        </div>

        <h4 style={{ fontSize: '13px', color: '#280300' }} className="mb-4">
          Progress
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
          {steps.map((s, i) => (
            <div key={i}>
              <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                <div className={`${s.color} ${s.width} h-full`} />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <p style={{ fontSize: '11px', color: '#000' }} className="mb-0">
                  {s.label}
                </p>
                {s.spinner && (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-yellow-500 border-t-transparent" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
        <p
          style={{ fontSize: '11px', color: '#000' }}
          className="flex items-center bg-white px-3 py-1 rounded border"
        >
          <i className="bx bx-arrow-from-left mr-2"></i>
          Estimated shipping date:
          <span className="ml-1 font-medium" style={{ color: '#280300' }}>
            Apr 25, 2024
          </span>
        </p>
        <button
          style={{
            fontSize: '11px',
            backgroundColor: '#f9622c',
            color: '#fff',
          }}
          className="px-4 py-2 rounded hover:bg-opacity-90"
        >
          Make As Ready To Ship
        </button>
      </div>
    </div>
  );
};

const ProductSection = () => {
  const products = [
    {
      name: 'Men Black Slim Fit T-shirt',
      size: 'M',
      status: 'Ready',
      qty: 1,
      price: '$80.00',
      text: '$3.00',
      amount: '$83.00',
      img: {shirt}
    },
    {
      name: 'Dark Green Cargo Pent',
      size: 'M',
      status: 'Packaging',
      qty: 3,
      price: '$330.00',
      text: '$4.00',
      amount: '$334.00',
      img: '../assets/images/Shirt.jpg',
    },
    {
      name: 'Men Dark Brown Wallet',
      size: 'S',
      status: 'Ready',
      qty: 1,
      price: '$132.00',
      text: '$5.00',
      amount: '$137.00',
      img: '../assets/images/Shirt.jpg',
    },
    {
      name: "Kid's Yellow T-shirt",
      size: 'S',
      status: 'Packaging',
      qty: 2,
      price: '$220.00',
      text: '$3.00',
      amount: '$223.00',
      img: '../assets/images/Shirt.jpg',
    },
  ];

  return (
    <div className="flex-1 p-4 bg-gray-100 ml-[80px]">
      <div className="p-6 border-b border-gray-200">
        <h4 style={{ fontSize: '13px', color: '#280300' }}>
          Product
        </h4>
      </div>
      <div className="p-6 overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              {[
                'Product Name & Size',
                'Status',
                'Quantity',
                'Price',
                'Text',
                'Amount',
              ].map((th, idx) => (
                <th
                  key={idx}
                  style={{ fontSize: '11px', color: '#000' }}
                  className="px-4 py-2 text-left font-semibold"
                >
                  {th}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 p-2 rounded-lg">
                      <img
                        src={p.img}
                        alt=""
                        className="h-12 w-12 object-cover rounded"
                      />
                    </div>
                    <div>
                      <a
                        href="#!"
                        style={{ fontSize: '13px', color: '#280300' }}
                        className="font-medium"
                      >
                        {p.name}
                      </a>
                      <p style={{ fontSize: '11px', color: '#000' }} className="mt-1">
                        Size: {p.size}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                      p.status === 'Ready'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td style={{ fontSize: '11px', color: '#000' }} className="px-4 py-3">
                  {p.qty}
                </td>
                <td style={{ fontSize: '11px', color: '#000' }} className="px-4 py-3">
                  {p.price}
                </td>
                <td style={{ fontSize: '11px', color: '#000' }} className="px-4 py-3">
                  {p.text}
                </td>
                <td style={{ fontSize: '11px', color: '#000' }} className="px-4 py-3">
                  {p.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TimelineSection = () => {
  const events = [
    {
      title: 'The packing has been started',
      desc: 'Confirmed by Gaston Lapierre',
      time: 'April 23, 2024, 09:40 am',
      icon: (
        <div className="animate-spin h-4 w-4 border-2 border-yellow-500 border-t-transparent rounded-full" />
      ),
    },
    {
      title: 'The Invoice has been sent to the customer',
      desc: (
        <span>
          Invoice email was sent to{' '}
          <a
            href="#!"
            style={{ fontSize: '13px', color: '#280300' }}
            className="text-blue-600"
          >
            hello@dundermuffilin.com
          </a>
        </span>
      ),
      action: (
        <button
          style={{
            fontSize: '11px',
            backgroundColor: '#f9622c',
            color: '#fff',
          }}
          className="px-3 py-1 rounded hover:bg-opacity-90 text-sm"
        >
          Resend Invoice
        </button>
      ),
      time: 'April 23, 2024, 09:40 am',
      icon: <i className="bx bx-check-circle text-green-500 text-xl" />,
    },
    {
      title: 'The Invoice has been created',
      desc: 'Invoice created by Gaston Lapierre',
      action: (
        <button
          style={{
            fontSize: '11px',
            backgroundColor: '#f9622c',
            color: '#fff',
          }}
          className="px-3 py-1 rounded hover:bg-opacity-90 text-sm"
        >
          Download Invoice
        </button>
      ),
      time: 'April 23, 2024, 09:40 am',
      icon: <i className="bx bx-check-circle text-green-500 text-xl" />,
    },
    {
      title: 'Order Payment',
      desc: 'Using Master Card',
      status: (
        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
          Paid
        </span>
      ),
      time: 'April 23, 2024, 09:40 am',
      icon: <i className="bx bx-check-circle text-green-500 text-xl" />,
    },
    {
      title: '4 Orders confirmed by Gaston Lapierre',
      desc: (
        <div className="flex flex-wrap gap-2">
          {['Order 1', 'Order 2', 'Order 3', 'Order 4'].map((o) => (
            <a
              key={o}
              href="#!"
              style={{ fontSize: '11px', color: '#000' }}
              className="px-2 py-1 bg-gray-100 rounded"
            >
              {o}
            </a>
          ))}
        </div>
      ),
      time: 'April 23, 2024, 09:40 am',
      icon: <i className="bx bx-check-circle text-green-500 text-xl" />,
    },
  ];

  return (
    <div className="flex-1 p-4 bg-gray-100 ml-[80px]">
      <div className="p-6 border-b border-gray-200">
        <h4 style={{ fontSize: '13px', color: '#280300' }}>
          Order Timeline
        </h4>
      </div>
      <div className="p-6 relative">
        <div className="absolute left-2 top-0 h-full border-l-2 border-dashed border-gray-300"></div>
        <div className="space-y-8 pl-6">
          {events.map((e, i) => (
            <div key={i} className="relative">
              <div className="absolute -left-3 top-0 bg-white p-1 rounded-full">
                {e.icon}
              </div>
              <div className="ml-4">
                <h5 style={{ fontSize: '13px', color: '#280300' }} className="font-medium">
                  {e.title}
                </h5>
                {e.desc && (
                  <p style={{ fontSize: '11px', color: '#000' }} className="mt-1">
                    {e.desc}
                  </p>
                )}
                {e.status && <div className="mt-1">{e.status}</div>}
                {e.action && <div className="mt-2">{e.action}</div>}
                <p style={{ fontSize: '11px', color: '#000' }} className="mt-2">
                  {e.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const OrderInfoSection = () => {
  const info = [
    { label: 'Vendor', value: 'Catpiller', icon: 'bx bx-store' },
    { label: 'Date', value: 'April 23, 2024', icon: 'bx bx-calendar' },
    { label: 'Paid By', value: 'Gaston Lapierre', icon: 'bx bx-user-circle' },
    { label: 'Reference #IMEMO', value: '#0758267/90', icon: 'bx bx-clipboard' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-4 bg-gray-100 ml-[80px]">
      {info.map((it, i) => (
        <div
          key={i}
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
        >
          <div>
            <p style={{ fontSize: '11px', color: '#000' }} className="text-sm">
              {it.label}
            </p>
            <p style={{ fontSize: '13px', color: '#280300' }} className="font-medium">
              {it.value}
            </p>
          </div>
          <i className={`${it.icon} text-3xl text-blue-600`} />
        </div>
      ))}
    </div>
  );
};

const OrderSummary = () => {
  const summary = [
    { label: 'Sub Total', value: '$777.00', icon: 'bx bx-clipboard' },
    { label: 'Discount', value: '-$60.00', icon: 'bx bx-discount' },
    { label: 'Delivery Charge', value: '$00.00', icon: 'bx bx-truck' },
    { label: 'Estimated Tax (15.5%)', value: '$20.00', icon: 'bx bx-calculator' },
  ];

  return (
    <div className="bg-white shadow rounded-lg mb-6">
      <div className="p-6 border-b border-gray-200">
        <h4 style={{ fontSize: '13px', color: '#280300' }}>
          Order Summary
        </h4>
      </div>
      <div className="p-6 space-y-2">
        {summary.map((s, i) => (
          <div key={i} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <i className={s.icon}></i>
              <span style={{ fontSize: '11px', color: '#000' }}>{s.label}</span>
            </div>
            <span style={{ fontSize: '11px', color: '#000' }} className="font-medium">
              {s.value}
            </span>
          </div>
        ))}
      </div>
      <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
        <span style={{ fontSize: '13px', color: '#280300' }} className="font-medium">
          Total Amount
        </span>
        <span style={{ fontSize: '13px', color: '#280300' }} className="font-medium">
          $737.00
        </span>
      </div>
    </div>
  );
};

const PaymentInfo = () => (
  <div className="bg-white shadow rounded-lg mb-6">
    <div className="p-6 border-b border-gray-200">
      <h4 style={{ fontSize: '13px', color: '#280300' }}>
        Payment Information
      </h4>
    </div>
    <div className="p-6 space-y-4">
      <div className="flex items-center gap-4">
        <div className="bg-gray-100 p-2 rounded-lg">
          <img
            src="/assets/images/card/mastercard.svg"
            alt="Mastercard"
            className="h-8"
          />
        </div>
        <div>
          <p style={{ fontSize: '13px', color: '#280300' }} className="font-medium">
            Master Card
          </p>
          <p style={{ fontSize: '11px', color: '#000' }} className="text-gray-600">
            xxxx xxxx xxxx 7812
          </p>
        </div>
        <i className="bx bx-check-circle text-green-500 text-2xl ml-auto"></i>
      </div>
      <p style={{ fontSize: '11px', color: '#000' }}>
        <span className="font-medium">Transaction ID:</span>{' '}
        <span className="text-gray-600">#IDN768139059</span>
      </p>
      <p style={{ fontSize: '11px', color: '#000' }}>
        <span className="font-medium">Card Holder Name:</span>{' '}
        <span className="text-gray-600">Gaston Lapierre</span>
      </p>
    </div>
  </div>
);

const CustomerDetails = () => (
  <div className="bg-white shadow rounded-lg mb-6">
    <div className="p-6 border-b border-gray-200">
      <h4 style={{ fontSize: '13px', color: '#280300' }}>
        Customer Details
      </h4>
    </div>
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <img
          src="/assets/images/users/avatar-1.jpg"
          alt="Avatar"
          className="h-12 w-12 rounded-full border-2 border-gray-200"
        />
        <div>
          <p style={{ fontSize: '13px', color: '#280300' }} className="font-medium">
            Gaston Lapierre
          </p>
          <a
            href="#!"
            style={{ fontSize: '11px', color: '#280300' }}
            className="text-blue-600"
          >
            hello@dundermuffilin.com
          </a>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center">
          <h5 style={{ fontSize: '13px', color: '#280300' }} className="font-medium">
            Contact Number
          </h5>
          <button>
            <i className="bx bx-edit-alt text-gray-600"></i>
          </button>
        </div>
        <p style={{ fontSize: '11px', color: '#000' }} className="text-gray-600">
          (723) 732-760-5760
        </p>
      </div>

      <div>
        <div className="flex justify-between items-center">
          <h5 style={{ fontSize: '13px', color: '#280300' }} className="font-medium">
            Shipping Address
          </h5>
          <button>
            <i className="bx bx-edit-alt text-gray-600"></i>
          </button>
        </div>
        <address style={{ fontSize: '11px', color: '#000' }} className="not-italic text-gray-600">
          Wilson's Jewelers LTD<br />
          1344 Hershell Hollow Road,<br />
          Tukwila, WA 98168,<br />
          United States<br />
          (723) 732-760-5760
        </address>
      </div>

      <div>
        <div className="flex justify-between items-center">
          <h5 style={{ fontSize: '13px', color: '#280300' }} className="font-medium">
            Billing Address
          </h5>
          <button>
            <i className="bx bx-edit-alt text-gray-600"></i>
          </button>
        </div>
        <p style={{ fontSize: '11px', color: '#000' }} className="text-gray-600">
          Same as shipping address
        </p>
      </div>
    </div>
  </div>
);

const MapSection = () => (
  <div className="bg-white shadow rounded-lg mb-6 overflow-hidden">
    <iframe
      src="https://maps.google.com/maps?width=1980&height=400&hl=en&q=University of Oxford&t=&z=14&ie=UTF8&iwloc=B&output=embed"
      className="w-full h-64"
      allowFullScreen
      loading="lazy"
    />
  </div>
);

const Footer = () => (
  <footer className="py-4 bg-white shadow-inner">
    <div className="max-w-screen-xl mx-auto px-4 text-center" style={{ fontSize: '11px', color: '#000' }}>
      {new Date().getFullYear()} © xtreative{' '}
      <i className="bx bx-heart" style={{ color: '#f9622c' }}></i>{' '}
      <a
        href="https://1.envato.market/techzaa"
        style={{ fontSize: '11px', color: '#280300' }}
        className="font-semibold"
        target="_blank"
        rel="noopener noreferrer"
      >
        market
      </a>
    </div>
  </footer>
);

export default function OrderDetailsPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="max-w-screen-xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <ProgressSection />
              <ProductSection />
              <TimelineSection />
              <OrderInfoSection />
            </div>
            <aside className="space-y-6">
              <OrderSummary />
              <PaymentInfo />
              <CustomerDetails />
              <MapSection />
            </aside>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
