import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/History.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function History() {
  const navigate = useNavigate();

  const rows = Array.from({ length: 5 }).map((_, i) => ({
    ref: `#2323${i}`,
    item: "Electrical Repairs",
    status: ["Ongoing", "Cancelled", "Ongoing", "New Order", "Ongoing"][i % 5],
    amount: "₦7,600",
  }));

  const statusBadge = (status) => {
    switch (status) {
      case "Ongoing":
        return <span className="status ongoing">Ongoing</span>;
      case "Cancelled":
        return <span className="status cancelled">Cancelled</span>;
      case "New Order":
        return <span className="status new">New Order</span>;
      default:
        return <span className="status">{status}</span>;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="dashboard-main history-main">
        <div className="top-bar">
          <h2>History</h2>
        </div>

        <section className="history-card">
          <div className="history-header">
            <h2>Mechanic History</h2>

            <button
              className="add-btn"
              onClick={() => navigate("/add-history")}
            >
              <i className="fas fa-wrench"></i> Add Mechanic History
            </button>
          </div>

          {/* Filter Section */}
          <div className="filter-section">
            <div className="filter-group">
              <label>Status</label>
              <div className="filter-buttons">
                <button>Ongoing</button>
                <button>Cancelled</button>
                <button>New Order</button>
              </div>
            </div>

            <div className="filter-date">
              <label>Date</label>
              <input placeholder="DD" />
              <input placeholder="MM" />
              <input placeholder="YYYY" />
            </div>
          </div>

          {/* Table */}
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Ref</th>
                  <th>Item</th>
                  <th>Status</th>
                  <th>Amount</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.ref}>
                    <td>{r.ref}</td>
                    <td>{r.item}</td>
                    <td>{statusBadge(r.status)}</td>
                    <td className="amount">{r.amount}</td>
                    <td>
                      <button
                        className="details-btn"
                        onClick={() => navigate("/history-details")}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
