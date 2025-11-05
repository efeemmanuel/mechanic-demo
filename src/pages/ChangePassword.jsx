// import React, { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import ProfileNav from "../components/ProfileNav";
// import "../styles/changePassword.css";

// const ChangePassword = () => {
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const handleSaveChanges = () => {
//     if (newPassword !== confirmPassword) {
//       alert("New password and confirm password do not match!");
//       return;
//     }
//     if (!currentPassword || !newPassword) {
//       alert("Please fill in all fields!");
//       return;
//     }
//     alert("Password changed successfully!");
//     setCurrentPassword("");
//     setNewPassword("");
//     setConfirmPassword("");
//   };

//   return (
//     <>
//       <link
//         rel="stylesheet"
//         href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
//       />

//       <div className="dashboard-container">
//         <Sidebar />

//         <main className="changePassword-main">
//           <ProfileNav />

//           <section className="changePassword-content">
//             <div className="changePassword-card">
//               <h2>Change Password</h2>

//               <div className="changePassword-form-group">
//                 <input
//                   type="password"
//                   value={currentPassword}
//                   onChange={(e) => setCurrentPassword(e.target.value)}
//                   placeholder="Enter current password"
//                 />
//               </div>

//               <div className="changePassword-form-group">
//                 <input
//                   type="password"
//                   value={newPassword}
//                   onChange={(e) => setNewPassword(e.target.value)}
//                   placeholder="Enter new password"
//                 />
//               </div>

//               <div className="changePassword-form-group">
//                 <input
//                   type="password"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   placeholder="Confirm new password"
//                 />
//               </div>

//               <button
//                 onClick={handleSaveChanges}
//                 className="changePassword-save-btn"
//               >
//                 Save changes
//               </button>
//             </div>
//           </section>
//         </main>
//       </div>
//     </>
//   );
// };

// export default ChangePassword;















import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ProfileNav from "../components/ProfileNav";
import { userAPI } from "../services/profileAPI";
import "../styles/ChangePassword.css";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSaveChanges = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match!");
      return;
    }
    if (!currentPassword || !newPassword) {
      setMessage("Please fill in all fields!");
      return;
    }
    if (newPassword.length < 6) {
      setMessage("New password must be at least 6 characters long!");
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await userAPI.changePassword({
        currentPassword,
        newPassword
      });

      if (response.success) {
        setMessage("Password changed successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to change password");
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

      <div className="dashboard-container">
        <Sidebar />

        <main className="changePassword-main">
          <ProfileNav />

          <section className="changePassword-content">
            <div className="changePassword-card">
              <h2>Change Password</h2>

              {message && (
                <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
                  {message}
                </div>
              )}

              <div className="changePassword-form-group">
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  disabled={loading}
                />
              </div>

              <div className="changePassword-form-group">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  disabled={loading}
                />
              </div>

              <div className="changePassword-form-group">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  disabled={loading}
                />
              </div>

              <button
                onClick={handleSaveChanges}
                className="changePassword-save-btn"
                disabled={loading}
              >
                {loading ? 'Changing Password...' : 'Save changes'}
              </button>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default ChangePassword;
