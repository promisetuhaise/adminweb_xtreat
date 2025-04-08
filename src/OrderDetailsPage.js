import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.min.css'; // Remove the <link> tag and keep this
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './OrderDetailsPage.css'; // Keep custom styles at the bottom


// Header Component
const Header = () => (
  <header className="topbar">
    <div className="container-fluid">
      <div className="navbar-header">
        <div className="d-flex align-items-center">
          <div className="topbar-item">
            <button type="button" className="button-toggle-menu me-2">
              <i className="bx bx-menu fs-24 align-middle"></i>
            </button>
          </div>
          <div className="topbar-item">
            <h4 className="fw-bold topbar-button pe-none text-uppercase mb-0">Order Details</h4>
          </div>
        </div>
      </div>
    </div>
  </header>
);

// Sidebar Component (Simplified for brevity)
const Sidebar = () => (
  <div className="main-nav">
    <div className="logo-box">
      <a href="/" className="logo-dark">
        <img src="/assets/images/logo-dark.png" className="logo-lg" alt="logo dark" />
      </a>
    </div>
    <div className="scrollbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href="/">
            <span className="nav-icon"><i className="bx bx-home"></i></span>
            <span className="nav-text">Dashboard</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/orders">
            <span className="nav-icon"><i className="bx bx-shopping-bag"></i></span>
            <span className="nav-text">Orders</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
);

// Progress Section Component
const ProgressSection = () => (
  <div className="card">
    <div className="card-body">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
        <div>
          <h4 className="fw-medium text-dark d-flex align-items-center gap-2">
            #0758267/90
            <span className="badge bg-success-subtle text-success px-2 py-1 fs-13">Paid</span>
            <span className="border border-warning text-warning fs-13 px-2 py-1 rounded">In Progress</span>
          </h4>
          <p className="mb-0">Order / Order Details / #0758267/90 - April 23, 2024 at 6:23 pm</p>
        </div>
        <div>
          <button className="btn btn-outline-secondary">Refund</button>
          <button className="btn btn-outline-secondary">Return</button>
          <button className="btn btn-primary">Edit Order</button>
        </div>
      </div>
      <div className="mt-4">
        <h4 className="fw-medium text-dark">Progress</h4>
      </div>
      <div className="row row-cols-xxl-5 row-cols-md-2 row-cols-1">
        {[
          { label: 'Order Confirming', width: '100%', color: 'bg-success' },
          { label: 'Payment Pending', width: '100%', color: 'bg-success' },
          { label: 'Processing', width: '60%', color: 'bg-warning', spinner: true },
          { label: 'Shipping', width: '0%', color: 'bg-primary' },
          { label: 'Delivered', width: '0%', color: 'bg-primary' },
        ].map((item, index) => (
          <div className="col" key={index}>
            <div className="progress mt-3" style={{ height: '10px' }}>
              <div
                className={`progress-bar progress-bar-striped progress-bar-animated ${item.color}`}
                style={{ width: item.width }}
              ></div>
            </div>
            <div className="d-flex align-items-center gap-2 mt-2">
              <p className="mb-0">{item.label}</p>
              {item.spinner && (
                <div className="spinner-border spinner-border-sm text-warning" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="card-footer d-flex flex-wrap align-items-center justify-content-between bg-light-subtle gap-2">
      <p className="border rounded mb-0 px-2 py-1 bg-body">
        <i className="bx bx-arrow-from-left align-middle fs-16"></i>
        Estimated shipping date: <span className="text-dark fw-medium">Apr 25, 2024</span>
      </p>
      <button className="btn btn-primary">Make As Ready To Ship</button>
    </div>
  </div>
);

// Product Section Component
const ProductSection = () => (
  <div className="card">
    <div className="card-header">
      <h4 className="card-title">Product</h4>
    </div>
    <div className="card-body">
      <div className="table-responsive">
        <table className="table align-middle mb-0 table-hover table-centered">
          <thead className="bg-light-subtle border-bottom">
            <tr>
              <th>Product Name & Size</th>
              <th>Status</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Text</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'Men Black Slim Fit T-shirt', size: 'M', status: 'Ready', qty: 1, price: '$80.00', text: '$3.00', amount: '$83.00', img: '/assets/images/product/p-1.png' },
              { name: 'Dark Green Cargo Pent', size: 'M', status: 'Packaging', qty: 3, price: '$330.00', text: '$4.00', amount: '$334.00', img: '/assets/images/product/p-5.png' },
              { name: 'Men Dark Brown Wallet', size: 'S', status: 'Ready', qty: 1, price: '$132.00', text: '$5.00', amount: '$137.00', img: '/assets/images/product/p-8.png' },
              { name: "Kid's Yellow T-shirt", size: 'S', status: 'Packaging', qty: 2, price: '$220.00', text: '$3.00', amount: '$223.00', img: '/assets/images/product/p-10.png' },
            ].map((product, index) => (
              <tr key={index}>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <div className="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
                      <img src={product.img} alt="" className="avatar-md" />
                    </div>
                    <div>
                      <a href="#!" className="text-dark fw-medium fs-15">{product.name}</a>
                      <p className="text-muted mb-0 mt-1 fs-13"><span>Size: </span>{product.size}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`badge px-2 py-1 fs-13 ${product.status === 'Ready' ? 'bg-success-subtle text-success' : 'bg-light text-dark'}`}>
                    {product.status}
                  </span>
                </td>
                <td>{product.qty}</td>
                <td>{product.price}</td>
                <td>{product.text}</td>
                <td>{product.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// Timeline Section Component
const TimelineSection = () => (
  <div className="card">
    <div className="card-header">
      <h4 className="card-title">Order Timeline</h4>
    </div>
    <div className="card-body">
      <div className="position-relative ms-2">
        <span className="position-absolute start-0 top-0 border border-dashed h-100"></span>
        {[
          { title: 'The packing has been started', desc: 'Confirmed by Gaston Lapierre', time: 'April 23, 2024, 09:40 am', icon: <div className="spinner-border spinner-border-sm text-warning" role="status"><span className="visually-hidden">Loading...</span></div> },
          { title: 'The Invoice has been sent to the customer', desc: <span>Invoice email was sent to <a href="#!" className="link-primary">hello@dundermuffilin.com</a></span>, action: <button className="btn btn-light">Resend Invoice</button>, time: 'April 23, 2024, 09:40 am', icon: <i className="bx bx-check-circle fs-20 text-success"></i> },
          { title: 'The Invoice has been created', desc: 'Invoice created by Gaston Lapierre', action: <button className="btn btn-primary">Download Invoice</button>, time: 'April 23, 2024, 09:40 am', icon: <i className="bx bx-check-circle fs-20 text-success"></i> },
          { title: 'Order Payment', desc: 'Using Master Card', status: <span className="badge bg-success-subtle text-success px-2 py-1 fs-13">Paid</span>, time: 'April 23, 2024, 09:40 am', icon: <i className="bx bx-check-circle fs-20 text-success"></i> },
          { title: '4 Order conform by Gaston Lapierre', desc: <div><a href="#!" className="badge bg-light text-dark fw-normal px-2 py-1 fs-13">Order 1</a> <a href="#!" className="badge bg-light text-dark fw-normal px-2 py-1 fs-13">Order 2</a> <a href="#!" className="badge bg-light text-dark fw-normal px-2 py-1 fs-13">Order 3</a> <a href="#!" className="badge bg-light text-dark fw-normal px-2 py-1 fs-13">Order 4</a></div>, time: 'April 23, 2024, 09:40 am', icon: <i className="bx bx-check-circle fs-20 text-success"></i> },
        ].map((item, index) => (
          <div className="position-relative ps-4" key={index}>
            <div className="mb-4">
              <span className="position-absolute start-0 avatar-sm translate-middle-x bg-light d-inline-flex align-items-center justify-content-center rounded-circle">
                {item.icon}
              </span>
              <div className="ms-2 d-flex flex-wrap gap-2 align-items-center justify-content-between">
                <div>
                  <h5 className="mb-1 text-dark fw-medium fs-15">{item.title}</h5>
                  {item.desc && <p className="mb-2">{item.desc}</p>}
                  {item.status && <div className="d-flex align-items-center gap-2"><p className="mb-1 text-dark fw-medium">Status:</p>{item.status}</div>}
                  {item.action}
                </div>
                <p className="mb-0">{item.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Order Info Section Component
const OrderInfoSection = () => (
  <div className="card bg-light-subtle">
    <div className="card-body">
      <div className="row g-3 g-lg-0">
        {[
          { label: 'Vender', value: 'Catpiller', icon: 'bx bx-store' },
          { label: 'Date', value: 'April 23, 2024', icon: 'bx bx-calendar' },
          { label: 'Paid By', value: 'Gaston Lapierre', icon: 'bx bx-user-circle' },
          { label: 'Reference #IMEMO', value: '#0758267/90', icon: 'bx bx-clipboard' },
        ].map((item, index) => (
          <div className={`col-lg-3 ${index < 3 ? 'border-end' : ''}`} key={index}>
            <div className="d-flex align-items-center gap-3 justify-content-between px-3">
              <div>
                <p className="text-dark fw-medium fs-16 mb-1">{item.label}</p>
                <p className="mb-0">{item.value}</p>
              </div>
              <div className="avatar bg-light d-flex align-items-center justify-content-center rounded">
                <i className={`${item.icon} fs-35 text-primary`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Order Summary Component
const OrderSummary = () => (
  <div className="card">
    <div className="card-header">
      <h4 className="card-title">Order Summary</h4>
    </div>
    <div className="card-body">
      <div className="table-responsive">
        <table className="table mb-0">
          <tbody>
            {[
              { label: 'Sub Total', value: '$777.00', icon: 'bx bx-clipboard' },
              { label: 'Discount', value: '-$60.00', icon: 'bx bx-discount' },
              { label: 'Delivery Charge', value: '$00.00', icon: 'bx bx-truck' },
              { label: 'Estimated Tax (15.5%)', value: '$20.00', icon: 'bx bx-calculator' },
            ].map((item, index) => (
              <tr key={index}>
                <td className="px-0">
                  <p className="d-flex mb-0 align-items-center gap-1">
                    <i className={item.icon}></i> {item.label}:
                  </p>
                </td>
                <td className="text-end text-dark fw-medium px-0">{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <div className="card-footer d-flex align-items-center justify-content-between bg-light-subtle">
      <p className="fw-medium text-dark mb-0">Total Amount</p>
      <p className="fw-medium text-dark mb-0">$737.00</p>
    </div>
  </div>
);

// Payment Info Component
const PaymentInfo = () => (
  <div className="card">
    <div className="card-header">
      <h4 className="card-title">Payment Information</h4>
    </div>
    <div className="card-body">
      <div className="d-flex align-items-center gap-3 mb-3">
        <div className="rounded-3 bg-light avatar d-flex align-items-center justify-content-center">
          <img src="/assets/images/card/mastercard.svg" alt="" className="avatar-sm" />
        </div>
        <div>
          <p className="mb-1 text-dark fw-medium">Master Card</p>
          <p className="mb-0 text-dark">xxxx xxxx xxxx 7812</p>
        </div>
        <div className="ms-auto">
          <i className="bx bx-check-circle fs-22 text-success"></i>
        </div>
      </div>
      <p className="text-dark mb-1 fw-medium">Transaction ID: <span className="text-muted fw-normal fs-13"> #IDN768139059</span></p>
      <p className="text-dark mb-0 fw-medium">Card Holder Name: <span className="text-muted fw-normal fs-13"> Gaston Lapierre</span></p>
    </div>
  </div>
);

// Customer Details Component
const CustomerDetails = () => (
  <div className="card">
    <div className="card-header">
      <h4 className="card-title">Customer Details</h4>
    </div>
    <div className="card-body">
      <div className="d-flex align-items-center gap-2">
        <img src="/assets/images/users/avatar-1.jpg" alt="" className="avatar rounded-3 border border-light border-3" />
        <div>
          <p className="mb-1">Gaston Lapierre</p>
          <a href="#!" className="link-primary fw-medium">hello@dundermuffilin.com</a>
        </div>
      </div>
      <div className="d-flex justify-content-between mt-3">
        <h5>Contact Number</h5>
        <a href="#!"><i className="bx bx-edit-alt fs-18"></i></a>
      </div>
      <p className="mb-1">(723) 732-760-5760</p>
      <div className="d-flex justify-content-between mt-3">
        <h5>Shipping Address</h5>
        <a href="#!"><i className="bx bx-edit-alt fs-18"></i></a>
      </div>
      <div>
        <p className="mb-1">Wilson's Jewelers LTD</p>
        <p className="mb-1">1344 Hershell Hollow Road,</p>
        <p className="mb-1">Tukwila, WA 98168,</p>
        <p className="mb-1">United States</p>
        <p className="">(723) 732-760-5760</p>
      </div>
      <div className="d-flex justify-content-between mt-3">
        <h5>Billing Address</h5>
        <a href="#!"><i className="bx bx-edit-alt fs-18"></i></a>
      </div>
      <p className="mb-1">Same as shipping address</p>
    </div>
  </div>
);

// Map Component
const MapSection = () => (
  <div className="card">
    <div className="card-body">
      <div className="mapouter">
        <div className="gmap_canvas">
          <iframe
            className="gmap_iframe rounded"
            width="100%"
            style={{ height: '418px' }}
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            src="https://maps.google.com/maps?width=1980&height=400&hl=en&q=University of Oxford&t=&z=14&ie=UTF8&iwloc=B&output=embed"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
);

// Footer Component
const Footer = () => (
  <footer className="footer">
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 text-center">
          {new Date().getFullYear()} © xtreative <i className="bx bx-heart fs-18 align-middle text-danger"></i> <a href="https://1.envato.market/techzaa" className="fw-bold footer-text" target="_blank">market</a>
        </div>
      </div>
    </div>
  </footer>
);

// Main OrderDetailsPage Component
const OrderDetailsPage = () => {
  return (
    <div className="wrapper">
      <Header />
      <Sidebar />
      <div className="page-content">
        <div className="container-xxl">
          <div className="row">
            <div className="col-xl-9 col-lg-8">
              <div className="row">
                <div className="col-lg-12">
                  <ProgressSection />
                  <ProductSection />
                  <TimelineSection />
                  <OrderInfoSection />
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4">
              <OrderSummary />
              <PaymentInfo />
              <CustomerDetails />
              <MapSection />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderDetailsPage;