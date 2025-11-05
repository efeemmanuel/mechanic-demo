import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/AddHistory.css";

export default function AddHistory() {
  const [items, setItems] = useState([
    { name: "Brake pad", rate: "20,000", qty: 2, amount: "40,000" },
  ]);
  const [form, setForm] = useState({
    invoice: "",
    date: "",
    name: "",
    email: "",
    address: "",
    carName: "",
    carBrand: "",
    complaint: "",
    item: "",
    rate: "",
    qty: "",
    amount: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function addItem() {
    if (!form.item) return;
    setItems((prev) => [
      ...prev,
      {
        name: form.item,
        rate: form.rate || "0",
        qty: form.qty || 1,
        amount: form.amount || "0",
      },
    ]);
    setForm((prev) => ({ ...prev, item: "", rate: "", qty: "", amount: "" }));
  }

  function removeItem(idx) {
    setItems((prev) => prev.filter((_, i) => i !== idx));
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />

      <div className="addhistory-app-container dashboard-container">
        <Sidebar />

        <main className="addhistory-main-content">
          <header className="addhistory-header">
            <button className="addhistory-back-btn">
              <i className="fas fa-chevron-left"></i>
            </button>
            <h1 className="addhistory-title">Add Order History</h1>
          </header>

          <p className="addhistory-sub-text">Manually add history with previous mechanics</p>

          <div className="addhistory-form-container">
            {/* Invoice and Date */}
            <div className="addhistory-form-row">
              <div className="addhistory-form-group">
                {/* <label>Information</label> */}
                <input
                  name="invoice"
                  value={form.invoice}
                  onChange={handleChange}
                  placeholder="Invoice Number"
                />
              </div>

              <div className="addhistory-form-group">
                {/* <label className="addhistory-transparent-label">Date</label> */}
                <input
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  placeholder="DD/MM/YYYY"
                />
              </div>
            </div>

            <hr className="addhistory-divider" />

            {/* Customer Details */}
            <h3 className="addhistory-section-title">Customer Details</h3>
            <div className="addhistory-form-grid">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                className="addhistory-input"
              />
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="addhistory-input"
              />
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Address"
                className="addhistory-input"
              />
              <input
                name="carName"
                value={form.carName}
                onChange={handleChange}
                placeholder="Car Name"
                className="addhistory-input"
              />

              <select
                name="carBrand"
                value={form.carBrand}
                onChange={handleChange}
                className="addhistory-select"
              >
                <option value="">Car Brand</option>
                <option value="toyota">Toyota</option>
                <option value="honda">Honda</option>
                <option value="bmw">BMW</option>
              </select>
            </div>

            {/* Complaint */}
            <h3 className="addhistory-section-title">Customer Complaint</h3>
            <textarea
              name="complaint"
              value={form.complaint}
              onChange={handleChange}
              placeholder="Enter Complaint Here"
              className="addhistory-textarea"
            ></textarea>

            {/* Items Section */}
            <div className="addhistory-items-section">
              <div className="addhistory-item-row">
                <input
                  name="item"
                  value={form.item}
                  onChange={handleChange}
                  placeholder="Item"
                  className="addhistory-item-input"
                />
                <input
                  name="rate"
                  value={form.rate}
                  onChange={handleChange}
                  placeholder="Rate"
                  className="addhistory-item-input"
                />
                <input
                  name="qty"
                  type="number"
                  value={form.qty}
                  onChange={handleChange}
                  placeholder="Quantity"
                  className="addhistory-item-input"
                />
                <input
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  placeholder="Amount"
                  className="addhistory-item-input"
                />
                <button onClick={addItem} className="addhistory-add-btn">
                  Add
                </button>
              </div>

              {/* Items List */}
              <div className="addhistory-item-list">
                <div className="addhistory-item-list-header">
                  <span>Item</span>
                  <span>Rate</span>
                  <span>Qty</span>
                  <span>Amount</span>
                  <span>Action</span>
                </div>

                {items.map((it, idx) => (
                  <div key={idx} className="addhistory-item-list-row">
                    <span>{it.name}</span>
                    <span>{it.rate}</span>
                    <span>{it.qty}</span>
                    <span>{it.amount}</span>
                    <button
                      onClick={() => removeItem(idx)}
                      className="addhistory-remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <div className="addhistory-save-btn-container">
              <button className="addhistory-save-btn">Save</button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}