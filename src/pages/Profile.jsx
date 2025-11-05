// import React from "react";
// import Sidebar from "../components/Sidebar";
// import ProfileNav from "../components/ProfileNav";
// import "../styles/Profile.css";

// const Profile = () => {
//   const profileImage =
//     "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop";

//   return (
//     <>
//       <link
//         rel="stylesheet"
//         href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
//       />

//       <div className="profile-app-container dashboard-container">
//         <Sidebar />

//         <div className="profile-main-content">
//           {/* ===== Header ===== */}
      
          

//             {/* Reusable Navigation Component */}
//             <ProfileNav />
          

//           {/* ===== Main Content ===== */}
//           <main className="profile-content">
//             <div className="profile-content-wrapper">
//               <h2 className="profile-page-title">My Profile</h2>

//               {/* Profile Header Card */}
//               <div className="profile-card profile-header-card">
//                 <div className="profile-header-section">
//                   <img
//                     src={profileImage}
//                     alt="John Doe"
//                     className="profile-user-avatar-large"
//                   />
//                   <div className="profile-info">
//                     <h3>John Doe</h3>
//                     <p>johndoe@gmail.com</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Personal Info */}
//               <div className="profile-card">
//                 <h3 className="profile-card-title">Personal Information</h3>
//                 <div className="profile-info-grid profile-info-grid-two-column">
//                   <div className="profile-info-item">
//                     <span className="profile-info-label">First name</span>
//                     <span className="profile-info-value">John</span>
//                   </div>
//                   <div className="profile-info-item">
//                     <span className="profile-info-label">Last name</span>
//                     <span className="profile-info-value">Doe</span>
//                   </div>
//                   <div className="profile-info-item">
//                     <span className="profile-info-label">Email</span>
//                     <span className="profile-info-value">
//                       johndoe@gmail.com
//                     </span>
//                   </div>
//                   <div className="profile-info-item">
//                     <span className="profile-info-label">Phone number</span>
//                     <span className="profile-info-value">+1234567890</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Address */}
//               <div className="profile-card">
//                 <h3 className="profile-card-title">Address</h3>
//                 <div className="profile-info-grid profile-info-grid-three-column">
//                   <div className="profile-info-item">
//                     <span className="profile-info-label">Country</span>
//                     <span className="profile-info-value">United States</span>
//                   </div>
//                   <div className="profile-info-item">
//                     <span className="profile-info-label">City</span>
//                     <span className="profile-info-value">New York</span>
//                   </div>
//                   <div className="profile-info-item">
//                     <span className="profile-info-label">Postal code</span>
//                     <span className="profile-info-value">10001</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Vehicle Information */}
//               <div className="profile-card">
//                 <h3 className="profile-card-title">Vehicle Information</h3>
//                 <div className="profile-info-grid profile-info-grid-two-column">
//                   <div className="profile-info-item">
//                     <span className="profile-info-label">Car name</span>
//                     <span className="profile-info-value">Model S</span>
//                   </div>
//                   <div className="profile-info-item">
//                     <span className="profile-info-label">Car brand</span>
//                     <span className="profile-info-value">Tesla</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </main>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Profile;



















import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ProfileNav from "../components/ProfileNav";
import { profileAPI, userAPI } from "../services/profileAPI";
import "../styles/Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const [profileResponse, userResponse] = await Promise.all([
        profileAPI.getProfile(),
        userAPI.getUserProfile()
      ]);
      
      if (profileResponse.success) {
        setProfile(profileResponse.data);
      }
      if (userResponse.success) {
        setUser(userResponse.data);
      }
    } catch (err) {
      setError('Failed to load profile');
      console.error('Profile fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAvailabilityToggle = async (isAvailable) => {
    try {
      const response = await profileAPI.updateAvailability(isAvailable);
      if (response.success) {
        setProfile(prev => ({ ...prev, isAvailable }));
      }
    } catch (err) {
      setError('Failed to update availability');
    }
  };

  if (loading) {
    return (
      <div className="profile-app-container dashboard-container">
        <Sidebar />
        <div className="profile-main-content">
          <ProfileNav />
          <div className="profile-content">
            <div className="loading-spinner">Loading profile...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-app-container dashboard-container">
        <Sidebar />
        <div className="profile-main-content">
          <ProfileNav />
          <div className="profile-content">
            <div className="error-message">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />

      <div className="profile-app-container dashboard-container">
        <Sidebar />

        <div className="profile-main-content">
          <ProfileNav />

          <main className="profile-content">
            <div className="profile-content-wrapper">
              <h2 className="profile-page-title">My Workshop Profile</h2>

              {/* Profile Header Card */}
              <div className="profile-card profile-header-card">
                <div className="profile-header-section">
                  <img
                    src={profile?.profileImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"}
                    alt={user?.firstName || 'Mechanic'}
                    className="profile-user-avatar-large"
                  />
                  <div className="profile-info">
                    <h3>{profile?.businessName || `${user?.firstName} ${user?.lastName}`}</h3>
                    <p>{user?.email}</p>
                    <div className="profile-status">
                      <span className={`status-badge ${profile?.isAvailable ? 'available' : 'busy'}`}>
                        {profile?.isAvailable ? 'Available' : 'Busy'}
                      </span>
                      {profile?.isVerified && (
                        <span className="verified-badge">
                          <i className="fas fa-check-circle"></i> Verified
                        </span>
                      )}
                    </div>
                    <div className="availability-toggle">
                      <label>
                        <input
                          type="checkbox"
                          checked={profile?.isAvailable !== false}
                          onChange={(e) => handleAvailabilityToggle(e.target.checked)}
                        />
                        Available for new jobs
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Information */}
              <div className="profile-card">
                <h3 className="profile-card-title">Business Information</h3>
                <div className="profile-info-grid profile-info-grid-two-column">
                  <div className="profile-info-item">
                    <span className="profile-info-label">Business Name</span>
                    <span className="profile-info-value">{profile?.businessName || 'Not set'}</span>
                  </div>
                  <div className="profile-info-item">
                    <span className="profile-info-label">Business Type</span>
                    <span className="profile-info-value">{profile?.businessType || 'Not set'}</span>
                  </div>
                  <div className="profile-info-item">
                    <span className="profile-info-label">Years of Experience</span>
                    <span className="profile-info-value">{profile?.yearsOfExperience || '0'} years</span>
                  </div>
                  <div className="profile-info-item">
                    <span className="profile-info-label">Rating</span>
                    <span className="profile-info-value">
                      {profile?.rating ? `${profile.rating}/5 (${profile.reviewCount} reviews)` : 'No ratings yet'}
                    </span>
                  </div>
                  <div className="profile-info-item">
                    <span className="profile-info-label">Total Jobs</span>
                    <span className="profile-info-value">{profile?.totalJobs || 0}</span>
                  </div>
                  <div className="profile-info-item">
                    <span className="profile-info-label">Completion Rate</span>
                    <span className="profile-info-value">{profile?.completionRate || 0}%</span>
                  </div>
                </div>
                {profile?.description && (
                  <div className="profile-description">
                    <span className="profile-info-label">Description</span>
                    <p>{profile.description}</p>
                  </div>
                )}
              </div>

              {/* Personal Info */}
              <div className="profile-card">
                <h3 className="profile-card-title">Personal Information</h3>
                <div className="profile-info-grid profile-info-grid-two-column">
                  <div className="profile-info-item">
                    <span className="profile-info-label">First name</span>
                    <span className="profile-info-value">{user?.firstName || 'Not set'}</span>
                  </div>
                  <div className="profile-info-item">
                    <span className="profile-info-label">Last name</span>
                    <span className="profile-info-value">{user?.lastName || 'Not set'}</span>
                  </div>
                  <div className="profile-info-item">
                    <span className="profile-info-label">Email</span>
                    <span className="profile-info-value">{user?.email}</span>
                  </div>
                  <div className="profile-info-item">
                    <span className="profile-info-label">Phone number</span>
                    <span className="profile-info-value">{profile?.phone || user?.phone || 'Not set'}</span>
                  </div>
                </div>
              </div>

              {/* Address */}
              {profile?.address && (
                <div className="profile-card">
                  <h3 className="profile-card-title">Workshop Address</h3>
                  <div className="profile-info-grid profile-info-grid-three-column">
                    <div className="profile-info-item">
                      <span className="profile-info-label">Street</span>
                      <span className="profile-info-value">{profile.address.street || 'Not set'}</span>
                    </div>
                    <div className="profile-info-item">
                      <span className="profile-info-label">City</span>
                      <span className="profile-info-value">{profile.address.city || 'Not set'}</span>
                    </div>
                    <div className="profile-info-item">
                      <span className="profile-info-label">State</span>
                      <span className="profile-info-value">{profile.address.state || 'Not set'}</span>
                    </div>
                    <div className="profile-info-item">
                      <span className="profile-info-label">Country</span>
                      <span className="profile-info-value">{profile.address.country || 'Not set'}</span>
                    </div>
                    <div className="profile-info-item">
                      <span className="profile-info-label">Postal Code</span>
                      <span className="profile-info-value">{profile.address.postalCode || 'Not set'}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Specializations */}
              {profile?.specializations && profile.specializations.length > 0 && (
                <div className="profile-card">
                  <h3 className="profile-card-title">Specializations</h3>
                  <div className="specializations-list">
                    {profile.specializations.map((spec, index) => (
                      <span key={index} className="specialization-tag">
                        {spec.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Countries Served */}
              {profile?.countries && profile.countries.length > 0 && (
                <div className="profile-card">
                  <h3 className="profile-card-title">Countries Served</h3>
                  <div className="countries-list">
                    {profile.countries.map((country, index) => (
                      <span key={index} className="country-tag">
                        {country}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Services */}
              {profile?.services && profile.services.length > 0 && (
                <div className="profile-card">
                  <h3 className="profile-card-title">Services Offered</h3>
                  <div className="services-list">
                    {profile.services.map((service, index) => (
                      <div key={index} className="service-item">
                        <strong>{service.name}</strong>
                        <p>{service.description}</p>
                        <span className="price-range">
                          ${service.priceRange?.min || 0} - ${service.priceRange?.max || 0}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Profile;