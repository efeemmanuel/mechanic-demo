import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Dashboard from "./pages/Dashboard";
import NewOrders from "./pages/NewOrders";
import OrderDetails from "./pages/OrderDetails";
import ProcurePage from "./pages/ProcurePage";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";
import Support from "./pages/Support";
import Chat from "./pages/Chat";
import HistoryDetails from "./pages/HistoryDetails";
import History from "./pages/History";
import AddHistory from "./pages/AddHistory";
import CreateAccount from "./pages/CreateAccount";
import Login from "./pages/Login";
import Verify from "./pages/Verify";
import ProfileForm from "./pages/ProfileForm";
import HistoryModal from "./pages/HistoryModal";
import MechanicTrackOrders from "./pages/MechanicTrackOrders";

// Import Font Awesome styles globally
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route */}
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/new-orders" element={<NewOrders />} />
          
          {/* ADD THIS ROUTE - This is the missing route! */}
          <Route path="/orders/:orderId" element={<OrderDetails />} />
          
          <Route path="/new-orderdetails" element={<OrderDetails />} />
          <Route path="/procure-page" element={<ProcurePage />} />
          <Route path="/history_modal" element={<HistoryModal />} />
          <Route path="/history" element={<History />} />
          <Route path="/history-details" element={<HistoryDetails />} /> 
          <Route path="/add-history" element={<AddHistory />} /> 
          <Route path="/profile-form" element={<ProfileForm />} /> 
          <Route path="/chat" element={<Chat />} />
          <Route path="/register" element={<CreateAccount />} />
          <Route path="/" element={<Login />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/change_password" element={<ChangePassword />} />
          <Route path="/support" element={<Support />} />

          {/* Mechanic Auto Parts Tracking */}
          <Route path="/mechanic/track-orders" element={<MechanicTrackOrders />} />
          <Route path="/mechanic/auto-parts/:orderId" element={<OrderDetails />} />
          <Route path="/mechanic/auto-parts/:orderId/quote" element={<OrderDetails />} />
          <Route path="/mechanic/auto-parts/:orderId/edit" element={<OrderDetails />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;