// import React, { useState, useRef } from "react";
// import Sidebar from "../components/Sidebar";
// import ProfileNav from "../components/ProfileNav"; // ✅ Import the new component
// import "../styles/EditProfile.css";

// const EditProfile = () => {
//   const [profileImage, setProfileImage] = useState(
//     "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
//   );

//   const fileInputRef = useRef(null);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const imageURL = URL.createObjectURL(file);
//       setProfileImage(imageURL);
//     }
//   };

//   return (
//     <>
//       <link
//         rel="stylesheet"
//         href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
//       />

//       <div className="edit-profile-app-container dashboard-container">
//         <Sidebar />

//         <div className="edit-profile-main-content">
//           <div className="edit-profile-top-card">


//             {/* Header */}
        
           

//               {/* ✅ Profile Navigation Component */}
//               <ProfileNav />
            




//             {/* Title */}
//             <div className="profile-page-title edit-main">Edit Profile</div>

//             {/* Profile Card */}
//             <div className="edit-profile-card">
//               <div className="edit-profile-user-header">
//                 <div
//                   className="profile-image-wrapper"
//                   onClick={() => fileInputRef.current.click()}
//                 >
//                   <img
//                     src={profileImage}
//                     alt="User"
//                     className="edit-profile-avatar"
//                     title="Click to change profile picture"
//                   />
//                   <div className="profile-image-overlay">
//                     <i className="fas fa-camera"></i>
//                   </div>
//                   <input
//                     ref={fileInputRef}
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                     style={{ display: "none" }}
//                   />
//                 </div>

//                 <div className="edit-profile-user-info">
//                   <div className="edit-profile-user-name">
//                     John Doe
//                     <i className="fas fa-check-circle edit-profile-badge"></i>
//                   </div>
//                   <div className="edit-profile-user-email">
//                     johndoe@gmail.com
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Personal Information */}
//             <div className="edit-profile-section">
//               <div className="edit-profile-card">
//                 <div className="edit-profile-card-title">
//                   Personal Information
//                 </div>
//                 <div className="edit-profile-grid edit-profile-grid-two">
//                   <input
//                     type="text"
//                     placeholder="First name"
//                     className="edit-profile-input"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Last name"
//                     className="edit-profile-input"
//                   />
//                   <input
//                     type="email"
//                     placeholder="Email"
//                     className="edit-profile-input"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Phone Number"
//                     className="edit-profile-input"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Address */}
//             <div className="edit-profile-section">
//               <div className="edit-profile-card">
//                 <div className="edit-profile-card-title">Address</div>
//                 <div className="edit-profile-grid edit-profile-grid-three">
//                   <input
//                     type="text"
//                     placeholder="Country"
//                     className="edit-profile-input"
//                   />
//                   <input
//                     type="text"
//                     placeholder="City"
//                     className="edit-profile-input"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Postal code"
//                     className="edit-profile-input"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Work Information */}
//             <div className="edit-profile-section">
//               <div className="edit-profile-card">
//                 <div className="edit-profile-card-title">Work Information</div>
//                 <div className="edit-profile-grid edit-profile-grid-three">
//                   <input
//                     type="text"
//                     placeholder="Occupation"
//                     className="edit-profile-input"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Expertise"
//                     className="edit-profile-input"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Years of experience"
//                     className="edit-profile-input"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Save Button */}
//             <div className="edit-profile-save-wrapper">
//               <button className="edit-profile-save-btn">Save changes</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default EditProfile;














import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar";
import ProfileNav from "../components/ProfileNav";
import { profileAPI, userAPI } from "../services/profileAPI";
import "../styles/EditProfile.css";

const EditProfile = () => {
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    description: '',
    phone: '',
    website: '',
    yearsOfExperience: '',
    street: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    fullAddress: '',
    specializations: [],
    countries: [],
    isAvailable: true
  });

  const [changedFields, setChangedFields] = useState(new Set());

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
        const profileData = profileResponse.data;
        setProfile(profileData);
        setFormData({
          businessName: profileData.businessName || '',
          businessType: profileData.businessType || '',
          description: profileData.description || '',
          phone: profileData.phone || '',
          website: profileData.website || '',
          yearsOfExperience: profileData.yearsOfExperience || '',
          street: profileData.address?.street || '',
          city: profileData.address?.city || '',
          state: profileData.address?.state || '',
          country: profileData.address?.country || '',
          postalCode: profileData.address?.postalCode || '',
          fullAddress: profileData.address?.fullAddress || '',
          specializations: profileData.specializations || [],
          countries: profileData.countries || [],
          isAvailable: profileData.isAvailable !== false
        });
      }
      if (userResponse.success) {
        setUser(userResponse.data);
      }
    } catch (err) {
      setMessage('Failed to load profile');
      console.error('Profile fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: fieldValue
    }));

    // Track changed fields
    setChangedFields(prev => new Set(prev).add(name));
  };

  const handleSpecializationChange = (specialization) => {
    const newSpecializations = formData.specializations.includes(specialization)
      ? formData.specializations.filter(s => s !== specialization)
      : [...formData.specializations, specialization];

    setFormData(prev => ({
      ...prev,
      specializations: newSpecializations
    }));

    setChangedFields(prev => new Set(prev).add('specializations'));
  };

  const handleCountryChange = (country) => {
    const newCountries = formData.countries.includes(country)
      ? formData.countries.filter(c => c !== country)
      : [...formData.countries, country];

    setFormData(prev => ({
      ...prev,
      countries: newCountries
    }));

    setChangedFields(prev => new Set(prev).add('countries'));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setSaving(true);
        const uploadResponse = await profileAPI.uploadProfileImage(file);
        if (uploadResponse.success) {
          await profileAPI.updateProfile({ profileImage: uploadResponse.data.url });
          setMessage('Profile image updated successfully!');
          fetchProfile(); // Refresh profile data
        }
      } catch (err) {
        setMessage('Failed to upload image');
      } finally {
        setSaving(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      // Only include fields that were actually changed
      const updateData = {};

      if (changedFields.has('businessName')) updateData.businessName = formData.businessName;
      if (changedFields.has('businessType')) updateData.businessType = formData.businessType;
      if (changedFields.has('description')) updateData.description = formData.description;
      if (changedFields.has('phone')) updateData.phone = formData.phone;
      if (changedFields.has('website')) updateData.website = formData.website;
      if (changedFields.has('yearsOfExperience')) {
        updateData.yearsOfExperience = parseInt(formData.yearsOfExperience) || 0;
      }
      if (changedFields.has('isAvailable')) updateData.isAvailable = formData.isAvailable;
      if (changedFields.has('specializations')) updateData.specializations = formData.specializations;
      if (changedFields.has('countries')) updateData.countries = formData.countries;

      // Handle address fields - only update if any address field changed
      const addressFields = ['street', 'city', 'state', 'country', 'postalCode'];
      const addressChanged = addressFields.some(field => changedFields.has(field));
      
      if (addressChanged) {
        updateData.address = {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          postalCode: formData.postalCode,
          fullAddress: formData.fullAddress || `${formData.street}, ${formData.city}, ${formData.country}`
        };
      }

      // Check if there are any changes to submit
      if (Object.keys(updateData).length === 0) {
        setMessage('No changes detected');
        setSaving(false);
        return;
      }

      const response = await profileAPI.updateProfile(updateData);
      
      if (response.success) {
        setMessage('Profile updated successfully!');
        setChangedFields(new Set()); // Reset changed fields
        fetchProfile(); // Refresh data
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    // Reset form to original data
    if (profile) {
      setFormData({
        businessName: profile.businessName || '',
        businessType: profile.businessType || '',
        description: profile.description || '',
        phone: profile.phone || '',
        website: profile.website || '',
        yearsOfExperience: profile.yearsOfExperience || '',
        street: profile.address?.street || '',
        city: profile.address?.city || '',
        state: profile.address?.state || '',
        country: profile.address?.country || '',
        postalCode: profile.address?.postalCode || '',
        fullAddress: profile.address?.fullAddress || '',
        specializations: profile.specializations || [],
        countries: profile.countries || [],
        isAvailable: profile.isAvailable !== false
      });
    }
    setChangedFields(new Set());
    setMessage('');
  };

  const specializationsList = [
    'engine_fault', 'brake_system', 'suspension_noise', 'engine_knocking'
  ];

  const countriesList = ['germany', 'china', 'japan', 'usa', 'korea'];

  const hasChanges = changedFields.size > 0;

  if (loading) {
    return (
      <div className="edit-profile-app-container dashboard-container">
        <Sidebar />
        <div className="edit-profile-main-content">
          <div className="loading-spinner">Loading profile...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

      <div className="edit-profile-app-container dashboard-container">
        <Sidebar />

        <div className="edit-profile-main-content">
          <div className="edit-profile-top-card">
            <ProfileNav />
            
            <div className="profile-page-title edit-main">
              Edit Workshop Profile
              {hasChanges && <span className="unsaved-changes"> • Unsaved Changes</span>}
            </div>

            {message && (
              <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
                {message}
              </div>
            )}

            {/* Profile Card */}
            <div className="edit-profile-card">
              <div className="edit-profile-user-header">
                <div
                  className="profile-image-wrapper"
                  onClick={() => fileInputRef.current.click()}
                >
                  <img
                    src={profile?.profileImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"}
                    alt="Workshop"
                    className="edit-profile-avatar"
                    title="Click to change profile picture"
                  />
                  <div className="profile-image-overlay">
                    <i className="fas fa-camera"></i>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                    disabled={saving}
                  />
                </div>

                <div className="edit-profile-user-info">
                  <div className="edit-profile-user-name">
                    {profile?.businessName || `${user?.firstName} ${user?.lastName}`}
                    {profile?.isVerified && (
                      <i className="fas fa-check-circle edit-profile-badge"></i>
                    )}
                  </div>
                  <div className="edit-profile-user-email">
                    {user?.email}
                  </div>
                  <div className="availability-toggle">
                    <label>
                      <input
                        type="checkbox"
                        name="isAvailable"
                        checked={formData.isAvailable}
                        onChange={handleInputChange}
                      />
                      Available for new jobs
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Business Information */}
              <div className="edit-profile-section">
                <div className="edit-profile-card">
                  <div className="edit-profile-card-title">Business Information</div>
                  <div className="edit-profile-grid edit-profile-grid-two">
                    <div className="input-group">
                      <input
                        type="text"
                        name="businessName"
                        placeholder="Business Name"
                        className="edit-profile-input"
                        value={formData.businessName}
                        onChange={handleInputChange}
                      />
                      {changedFields.has('businessName') && <span className="field-changed-indicator">•</span>}
                    </div>
                    <div className="input-group">
                      <select
                        name="businessType"
                        className="edit-profile-input"
                        value={formData.businessType}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Business Type</option>
                        <option value="individual">Individual Mechanic</option>
                        <option value="workshop">Workshop</option>
                        <option value="dealership">Dealership</option>
                        <option value="mobile">Mobile Service</option>
                      </select>
                      {changedFields.has('businessType') && <span className="field-changed-indicator">•</span>}
                    </div>
                    <div className="input-group">
                      <input
                        type="number"
                        name="yearsOfExperience"
                        placeholder="Years of Experience"
                        className="edit-profile-input"
                        value={formData.yearsOfExperience}
                        onChange={handleInputChange}
                      />
                      {changedFields.has('yearsOfExperience') && <span className="field-changed-indicator">•</span>}
                    </div>
                    <div className="input-group">
                      <input
                        type="url"
                        name="website"
                        placeholder="Website URL"
                        className="edit-profile-input"
                        value={formData.website}
                        onChange={handleInputChange}
                      />
                      {changedFields.has('website') && <span className="field-changed-indicator">•</span>}
                    </div>
                  </div>
                  <div className="input-group">
                    <textarea
                      name="description"
                      placeholder="Business Description"
                      className="edit-profile-textarea"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="3"
                    />
                    {changedFields.has('description') && <span className="field-changed-indicator">•</span>}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="edit-profile-section">
                <div className="edit-profile-card">
                  <div className="edit-profile-card-title">Contact Information</div>
                  <div className="edit-profile-grid edit-profile-grid-two">
                    <div className="input-group">
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        className="edit-profile-input"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                      {changedFields.has('phone') && <span className="field-changed-indicator">•</span>}
                    </div>
                    <input
                      type="email"
                      placeholder="Email"
                      className="edit-profile-input"
                      value={user?.email}
                      disabled
                    />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="edit-profile-section">
                <div className="edit-profile-card">
                  <div className="edit-profile-card-title">Workshop Address</div>
                  <div className="edit-profile-grid edit-profile-grid-two">
                    <div className="input-group">
                      <input
                        type="text"
                        name="street"
                        placeholder="Street Address"
                        className="edit-profile-input"
                        value={formData.street}
                        onChange={handleInputChange}
                      />
                      {changedFields.has('street') && <span className="field-changed-indicator">•</span>}
                    </div>
                    <div className="input-group">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        className="edit-profile-input"
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                      {changedFields.has('city') && <span className="field-changed-indicator">•</span>}
                    </div>
                    <div className="input-group">
                      <input
                        type="text"
                        name="state"
                        placeholder="State"
                        className="edit-profile-input"
                        value={formData.state}
                        onChange={handleInputChange}
                      />
                      {changedFields.has('state') && <span className="field-changed-indicator">•</span>}
                    </div>
                    <div className="input-group">
                      <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        className="edit-profile-input"
                        value={formData.country}
                        onChange={handleInputChange}
                      />
                      {changedFields.has('country') && <span className="field-changed-indicator">•</span>}
                    </div>
                    <div className="input-group">
                      <input
                        type="text"
                        name="postalCode"
                        placeholder="Postal Code"
                        className="edit-profile-input"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                      />
                      {changedFields.has('postalCode') && <span className="field-changed-indicator">•</span>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Specializations */}
              <div className="edit-profile-section">
                <div className="edit-profile-card">
                  <div className="edit-profile-card-title">
                    Specializations
                    {changedFields.has('specializations') && <span className="field-changed-indicator">•</span>}
                  </div>
                  <div className="specializations-grid">
                    {specializationsList.map(spec => (
                      <label key={spec} className="specialization-checkbox">
                        <input
                          type="checkbox"
                          checked={formData.specializations.includes(spec)}
                          onChange={() => handleSpecializationChange(spec)}
                        />
                        <span>{spec.replace('_', ' ')}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Countries Served */}
              <div className="edit-profile-section">
                <div className="edit-profile-card">
                  <div className="edit-profile-card-title">
                    Countries Served
                    {changedFields.has('countries') && <span className="field-changed-indicator">•</span>}
                  </div>
                  <div className="countries-grid">
                    {countriesList.map(country => (
                      <label key={country} className="country-checkbox">
                        <input
                          type="checkbox"
                          checked={formData.countries.includes(country)}
                          onChange={() => handleCountryChange(country)}
                        />
                        <span>{country}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="edit-profile-actions">
                {hasChanges && (
                  <button 
                    type="button"
                    className="edit-profile-cancel-btn"
                    onClick={handleCancel}
                    disabled={saving}
                  >
                    Cancel
                  </button>
                )}
                <button 
                  type="submit" 
                  className="edit-profile-save-btn"
                  disabled={saving || !hasChanges}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;