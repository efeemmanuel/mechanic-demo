// import React, { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import ProfileNav from "../components/ProfileNav"; // ✅ Imported shared nav
// import "../styles/Support.css";

// const Support = () => {
//   const [ticketText, setTicketText] = useState("");

//   // Social media icons
//   const instagramLogo =
//     "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png";
//   const facebookIcon =
//     "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg";
//   const linkedinLogo =
//     "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png";
//   const xLogo =
//     "https://upload.wikimedia.org/wikipedia/commons/5/57/X_logo_2023_%28white%29.png";

//   const support = [
//     {
//       email: "johndoe@gmail.com",
//       date: "20/01/2025",
//       status: "Resolved",
//     },
//     {
//       email: "johndoe@gmail.com",
//       date: "20/01/2025",
//       status: "Unresolved",
//     },
//   ];

//   return (
//     <>
//       <link
//         rel="stylesheet"
//         href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
//       />

//       <div className="support-app-container dashboard-container">
//         <Sidebar />

//         <div className="support-main-content">
//           {/* ✅ Reused shared navigation */}
//           <ProfileNav />

//           {/* ===== Support Content ===== */}
//           <div className="support-content">
//             <div className="support-content-wrapper">
//               <h2 className="support-page-title">Support</h2>

//               {/* Create New Ticket */}
//               <div className="support-ticket-card">
//                 <h3 className="support-ticket-title">Create New Ticket</h3>
//                 <p className="support-ticket-subtitle">
//                   Fill up all the information here, then click submit button
//                 </p>

//                 <div className="support-textarea-wrapper">
//                   <textarea
//                     placeholder="Type in your issue here..."
//                     className="support-textarea"
//                     value={ticketText}
//                     onChange={(e) => setTicketText(e.target.value)}
//                   />
//                 </div>

//                 <button className="support-submit-btn">Submit ticket</button>
//               </div>

//               {/* Bottom Section */}
//               <div className="support-bottom-section">
//                 {/* Support History */}
//                 <div className="support-history-section">
//                   <h3 className="support-section-title">
//                     Latest support history
//                   </h3>


//                  <div className="support-history-list">
//   {support.map((item, index) => (
//     <div key={index} className="support-history-item">
//       <div className="support-history-message">
//         <div className="support-history-label">Message</div>
//         <div className="support-history-email">{item.email}</div>
//       </div>

//       <div className="support-history-date-wrapper">
//         <div className="support-history-label">Date</div>
//         <div className="support-history-date">{item.date}</div>
//       </div>

//       <div className="support-history-status-wrapper">
//         <div className="support-history-label">Support Status</div>
//         <div
//           className={`support-history-status ${
//             item.status === "Resolved"
//               ? "support-status-resolved"
//               : "support-status-unresolved"
//           }`}
//         >
//           {item.status}
//         </div>
//       </div>
//     </div>
//   ))}
// </div>



//                 </div>

//                 {/* Social Media */}
//                 <div className="support-social-section">
//                   <h3 className="support-section-title">Social media</h3>
//                   <div className="support-social-icons">
//                     <a
//                       href="https://www.instagram.com/"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <img
//                         src={instagramLogo}
//                         alt="Instagram"
//                         className="support-social-icon"
//                       />
//                     </a>
//                     <a
//                       href="https://www.facebook.com/"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <img
//                         src={facebookIcon}
//                         alt="Facebook"
//                         className="support-social-icon"
//                       />
//                     </a>
//                     <a
//                       href="https://www.linkedin.com/"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <img
//                         src={linkedinLogo}
//                         alt="LinkedIn"
//                         className="support-social-icon"
//                       />
//                     </a>
//                     <a
//                       href="https://twitter.com/"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <img
//                         src={xLogo}
//                         alt="X"
//                         className="support-social-icon-small"
//                       />
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Support;
















import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ProfileNav from "../components/ProfileNav";
import { supportAPI } from "../services/profileAPI";
import "../styles/Support.css";

const Support = () => {
  const [ticketText, setTicketText] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [supportTickets, setSupportTickets] = useState([]);

  // Social media icons
  const instagramLogo =
    "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png";
  const facebookIcon =
    "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg";
  const linkedinLogo =
    "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png";
  const xLogo =
    "https://upload.wikimedia.org/wikipedia/commons/5/57/X_logo_2023_%28white%29.png";

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await supportAPI.getTickets();
      if (response.success) {
        setSupportTickets(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch support tickets:', err);
    }
  };

  const handleSubmitTicket = async () => {
    if (!ticketText.trim()) {
      setMessage("Please describe your issue before submitting!");
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await supportAPI.createTicket({
        message: ticketText,
        category: 'general'
      });

      if (response.success) {
        setTicketText("");
        setMessage("Support ticket submitted successfully! We'll get back to you soon.");
        fetchTickets(); // Refresh tickets list
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to submit support ticket. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />

      <div className="support-app-container dashboard-container">
        <Sidebar />

        <div className="support-main-content">
          <ProfileNav />

          <div className="support-content">
            <div className="support-content-wrapper">
              <h2 className="support-page-title">Support</h2>

              {message && (
                <div className={`support-message ${message.includes('successfully') ? 'success' : 'error'}`}>
                  {message}
                </div>
              )}

              {/* Create New Ticket */}
              <div className="support-ticket-card">
                <h3 className="support-ticket-title">Create New Ticket</h3>
                <p className="support-ticket-subtitle">
                  Fill up all the information here, then click submit button
                </p>

                <div className="support-textarea-wrapper">
                  <textarea
                    placeholder="Type in your issue here..."
                    className="support-textarea"
                    value={ticketText}
                    onChange={(e) => setTicketText(e.target.value)}
                    disabled={loading}
                    rows="6"
                  />
                </div>

                <button 
                  className="support-submit-btn"
                  onClick={handleSubmitTicket}
                  disabled={loading || !ticketText.trim()}
                >
                  {loading ? 'Submitting...' : 'Submit ticket'}
                </button>
              </div>

              {/* Bottom Section */}
              <div className="support-bottom-section">
                {/* Support History */}
                <div className="support-history-section">
                  <h3 className="support-section-title">
                    Support History
                  </h3>

                  {supportTickets.length === 0 ? (
                    <div className="no-tickets">
                      <p>No support tickets yet</p>
                    </div>
                  ) : (
                    <div className="support-history-list">
                      {supportTickets.map((ticket, index) => (
                        <div key={ticket._id || index} className="support-history-item">
                          <div className="support-history-message">
                            <div className="support-history-label">Message</div>
                            <div className="support-history-email">{ticket.message.substring(0, 50)}...</div>
                          </div>

                          <div className="support-history-date-wrapper">
                            <div className="support-history-label">Date</div>
                            <div className="support-history-date">
                              {new Date(ticket.createdAt).toLocaleDateString('en-GB')}
                            </div>
                          </div>

                          <div className="support-history-status-wrapper">
                            <div className="support-history-label">Status</div>
                            <div
                              className={`support-history-status ${
                                ticket.status === "resolved"
                                  ? "support-status-resolved"
                                  : ticket.status === "pending"
                                  ? "support-status-pending"
                                  : "support-status-unresolved"
                              }`}
                            >
                              {ticket.status}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Contact Information */}
                <div className="support-social-section">
                  <h3 className="support-section-title">Contact & Support</h3>
                  <div className="support-contact-info">
                    <p><strong>Email:</strong> support@carmechanic.com</p>
                    <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                    <p><strong>Hours:</strong> Mon-Fri 9AM-6PM</p>
                  </div>
                  <h4 className="support-social-title">Follow Us</h4>
                  <div className="support-social-icons">
                    <a
                      href="https://www.instagram.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={instagramLogo}
                        alt="Instagram"
                        className="support-social-icon"
                      />
                    </a>
                    <a
                      href="https://www.facebook.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={facebookIcon}
                        alt="Facebook"
                        className="support-social-icon"
                      />
                    </a>
                    <a
                      href="https://www.linkedin.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={linkedinLogo}
                        alt="LinkedIn"
                        className="support-social-icon"
                      />
                    </a>
                    <a
                      href="https://twitter.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={xLogo}
                        alt="X"
                        className="support-social-icon-small"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Support;