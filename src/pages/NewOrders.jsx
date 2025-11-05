// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import "../styles/NewOrders.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// const NewOrders = () => {
//   const [query, setQuery] = useState("");

//   const orders = [
//     {
//       id: 1,
//       clientFullName: "Michael Johnson",
//       date: "October 10, 2025",
//       carMake: "Toyota",
//       carModel: "Camry 2018",
//     },
//     {
//       id: 2,
//       clientFullName: "Sarah Williams",
//       date: "October 11, 2025",
//       carMake: "Honda",
//       carModel: "Civic 2020",
//     },
//     {
//       id: 3,
//       clientFullName: "James Anderson",
//       date: "October 12, 2025",
//       carMake: "BMW",
//       carModel: "X3 2021",
//     },
//   ];

//   // 🔍 Filter orders dynamically as user types
//   const filteredOrders = orders.filter((order) =>
//     `${order.clientFullName} ${order.carMake} ${order.carModel} ${order.id}`
//       .toLowerCase()
//       .includes(query.toLowerCase())
//   );

//   return (
//     <div className="dashboard-container">
//       <Sidebar />
//       <main className="dashboard-main">
//         <section className="neworder-section">
//           {/* Header */}
//           <header className="neworder-header">
//             <Link to="/dashboard" className="neworder-back-link" aria-label="Go back">
//               <i className="fas fa-arrow-left"></i>
//             </Link>
//             <h1 className="neworder-title">New Orders</h1>
//           </header>

//           {/* Search */}
//           <div className="neworder-search-wrapper">
//             <div className="neworder-search-container">
//               <i className="fas fa-search search-icon"></i>
//               <input
//                 type="text"
//                 placeholder="Search by name, vehicle, or order ID..."
//                 className="neworder-search-input"
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//               />
//             </div>
//           </div>

//           {/* Orders List */}
//           <div className="neworder-list">
//             {filteredOrders.length > 0 ? (
//               filteredOrders.map((order) => (
//                 <div key={order.id} className="neworder-card">
//                   <div className="neworder-info">
//                     <div className="neworder-meta">
//                       <span className="neworder-id">#{order.id}</span>
//                       <span className="neworder-client">{order.clientFullName}</span>
//                     </div>
//                     <div className="neworder-details">
//                       <span className="neworder-date">{order.date}</span>
//                       <span className="neworder-car">
//                         {order.carMake} {order.carModel}
//                       </span>
//                     </div>
//                   </div>

//                   <Link
//                     to={`/orders/${order.id}`}
//                     className="neworder-view-btn"
//                     aria-label={`View order ${order.id}`}
//                   >
//                     View
//                   </Link>
//                 </div>
//               ))
//             ) : (
//               <p className="no-results">No matching orders found.</p>
//             )}
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default NewOrders;


























// // Updated NewOrders.js with backend integration
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import "../styles/NewOrders.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import { mechanicAPI } from "../services/mechanicAPI";

// const NewOrders = () => {
//   const [query, setQuery] = useState("");
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const response = await mechanicAPI.getMechanicOrders('pending');
//       setOrders(response.data.orders || []);
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//       setError('Failed to load orders');
//       // Fallback to mock data for development
//       setOrders([
//         {
//           id: 1,
//           orderId: 'ORDER_12345',
//           clientFullName: "Michael Johnson",
//           date: "October 10, 2025",
//           carMake: "Toyota",
//           carModel: "Camry 2018",
//           status: 'pending',
//           hasQuote: false
//         },
//         {
//           id: 2,
//           orderId: 'ORDER_12346',
//           clientFullName: "Sarah Williams",
//           date: "October 11, 2025",
//           carMake: "Honda",
//           carModel: "Civic 2020",
//           status: 'pending',
//           hasQuote: false
//         }
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔍 Filter orders dynamically as user types
//   const filteredOrders = orders.filter((order) =>
//     `${order.clientFullName} ${order.carMake} ${order.carModel} ${order.orderId}`
//       .toLowerCase()
//       .includes(query.toLowerCase())
//   );

//   const getStatusBadge = (order) => {
//     if (order.hasQuote) {
//       return <span className="quote-badge">Quote Sent</span>;
//     }
//     return <span className="status-badge new">New</span>;
//   };

//   if (loading) {
//     return (
//       <div className="dashboard-container">
//         <Sidebar />
//         <main className="dashboard-main">
//           <div className="loading-spinner">
//             <i className="fas fa-spinner fa-spin"></i>
//             Loading orders...
//           </div>
//         </main>
//       </div>
//     );
//   }

//   return (
//     <div className="dashboard-container">
//       <Sidebar />
//       <main className="dashboard-main">
//         <section className="neworder-section">
//           {/* Header */}
//           <header className="neworder-header">
//             <Link to="/dashboard" className="neworder-back-link" aria-label="Go back">
//               <i className="fas fa-arrow-left"></i>
//             </Link>
//             <h1 className="neworder-title">New Orders</h1>
//             <button onClick={fetchOrders} className="refresh-btn">
//               <i className="fas fa-sync-alt"></i>
//             </button>
//           </header>

//           {/* Search */}
//           <div className="neworder-search-wrapper">
//             <div className="neworder-search-container">
//               <i className="fas fa-search search-icon"></i>
//               <input
//                 type="text"
//                 placeholder="Search by name, vehicle, or order ID..."
//                 className="neworder-search-input"
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//               />
//             </div>
//           </div>

//           {error && (
//             <div className="error-message">
//               <i className="fas fa-exclamation-circle"></i>
//               {error}
//             </div>
//           )}

//           {/* Orders List */}
//           <div className="neworder-list">
//             {filteredOrders.length > 0 ? (
//               filteredOrders.map((order) => (
//                 <div key={order.orderId} className="neworder-card">
//                   <div className="neworder-info">
//                     <div className="neworder-meta">
//                       <span className="neworder-id">#{order.orderId}</span>
//                       <span className="neworder-client">{order.clientFullName}</span>
//                       {getStatusBadge(order)}
//                     </div>
//                     <div className="neworder-details">
//                       <span className="neworder-date">{order.date}</span>
//                       <span className="neworder-car">
//                         {order.carMake} {order.carModel}
//                       </span>
//                     </div>
//                   </div>

//                   <Link
//                     to={`/orders/${order.orderId}`}
//                     className="neworder-view-btn"
//                     aria-label={`View order ${order.orderId}`}
//                   >
//                     View
//                   </Link>
//                 </div>
//               ))
//             ) : (
//               <div className="no-orders-state">
//                 <div className="no-orders-icon">🔧</div>
//                 <h3>No New Orders</h3>
//                 <p>You don't have any pending orders at the moment.</p>
//               </div>
//             )}
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default NewOrders;



















// Updated NewOrders.js - Show both pending and quoted orders
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/NewOrders.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { mechanicAPI } from "../services/mechanicAPI";

const NewOrders = () => {
  const [query, setQuery] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("pending"); // 'pending' or 'quoted'

  useEffect(() => {
    fetchOrders();
  }, [activeTab]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // Fetch orders based on active tab
      const response = await mechanicAPI.getMechanicOrders(activeTab);
      setOrders(response.data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to load orders');
      // Fallback to mock data for development
      setOrders(getMockOrders());
    } finally {
      setLoading(false);
    }
  };

  const getMockOrders = () => {
    if (activeTab === 'pending') {
      return [
        {
          id: 1,
          orderId: 'ORDER_12345',
          clientFullName: "Michael Johnson",
          date: "October 10, 2025",
          carMake: "Toyota",
          carModel: "Camry 2018",
          status: 'pending',
          hasQuote: false
        }
      ];
    } else {
      return [
        {
          id: 2,
          orderId: 'ORDER_12346',
          clientFullName: "Sarah Williams",
          date: "October 11, 2025",
          carMake: "Honda",
          carModel: "Civic 2020",
          status: 'quoted',
          hasQuote: true,
          quoteStatus: 'pending'
        }
      ];
    }
  };

  // 🔍 Filter orders dynamically as user types
  const filteredOrders = orders.filter((order) =>
    `${order.clientFullName} ${order.carMake} ${order.carModel} ${order.orderId}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  const getStatusBadge = (order) => {
    if (order.status === 'quoted' || order.hasQuote) {
      return <span className="status-badge quoted">Quote Sent</span>;
    }
    return <span className="status-badge new">New Order</span>;
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <Sidebar />
        <main className="dashboard-main">
          <div className="loading-spinner">
            <i className="fas fa-spinner fa-spin"></i>
            Loading orders...
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-main">
        <section className="neworder-section">
          {/* Header */}
          <header className="neworder-header">
            <Link to="/dashboard" className="neworder-back-link" aria-label="Go back">
              <i className="fas fa-arrow-left"></i>
            </Link>
            <h1 className="neworder-title">My Orders</h1>
            <button onClick={fetchOrders} className="refresh-btn">
              <i className="fas fa-sync-alt"></i>
            </button>
          </header>

          {/* Tabs */}
          <div className="orders-tabs">
            <button 
              className={`tab-button ${activeTab === 'pending' ? 'active' : ''}`}
              onClick={() => setActiveTab('pending')}
            >
              <i className="fas fa-clock"></i>
              Pending Orders
            </button>
            <button 
              className={`tab-button ${activeTab === 'quoted' ? 'active' : ''}`}
              onClick={() => setActiveTab('quoted')}
            >
              <i className="fas fa-file-invoice-dollar"></i>
              Quotes Sent
            </button>
          </div>

          {/* Search */}
          <div className="neworder-search-wrapper">
            <div className="neworder-search-container">
              <i className="fas fa-search search-icon"></i>
              <input
                type="text"
                placeholder="Search by name, vehicle, or order ID..."
                className="neworder-search-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="error-message">
              <i className="fas fa-exclamation-circle"></i>
              {error}
            </div>
          )}

          {/* Orders List */}
          <div className="neworder-list">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <div key={order.orderId} className="neworder-card">
                  <div className="neworder-info">
                    <div className="neworder-meta">
                      <span className="neworder-id">#{order.orderId}</span>
                      <span className="neworder-client">{order.clientFullName}</span>
                      {getStatusBadge(order)}
                    </div>
                    <div className="neworder-details">
                      <span className="neworder-date">{order.date}</span>
                      <span className="neworder-car">
                        {order.carMake} {order.carModel}
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/orders/${order.orderId}`}
                    className="neworder-view-btn"
                    aria-label={`View order ${order.orderId}`}
                  >
                    {activeTab === 'quoted' ? 'View Quote' : 'View & Quote'}
                  </Link>
                </div>
              ))
            ) : (
              <div className="no-orders-state">
                <div className="no-orders-icon">
                  {activeTab === 'pending' ? '🔧' : '💰'}
                </div>
                <h3>
                  {activeTab === 'pending' ? 'No Pending Orders' : 'No Quotes Sent'}
                </h3>
                <p>
                  {activeTab === 'pending' 
                    ? "You don't have any pending orders at the moment." 
                    : "You haven't sent any quotes yet."}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default NewOrders;