// import React, { useState } from "react";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "../styles/ProfileForm.css";

// const CompleteProfileForm = () => {
//   const [formData, setFormData] = useState({
//     occupation: "",
//     expertise: "",
//     yearsOfExperience: "",
//     countryOfIncorporation: "",
//     city: "",
//     state: "",
//   });

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleNext = () => {
//     console.log("Form data:", formData);
//   };

//   return (
//     <div className="complete-profile-container">
//       <div className="complete-profile-content">
//         {/* Header */}
//         <div className="complete-profile-header">
//           <button className="complete-profile-back-button" aria-label="Go back">
//             <i className="fas fa-arrow-left"></i>
//           </button>

//           <div className="complete-profile-header-text">
//             <h1 className="complete-profile-title">Complete your Profile</h1>
//             <p className="complete-profile-subtitle">
//               Finish setting up your account to get started
//             </p>
//           </div>
//         </div>

//         {/* Form */}
//         <form className="complete-profile-form-container">
//           <div className="complete-profile-grid">
//             <input
//               type="text"
//               placeholder="Occupation"
//               value={formData.occupation}
//               onChange={(e) => handleInputChange("occupation", e.target.value)}
//               className="complete-profile-input-field"
//             />

//             <input
//               type="text"
//               placeholder="Expertise"
//               value={formData.expertise}
//               onChange={(e) => handleInputChange("expertise", e.target.value)}
//               className="complete-profile-input-field"
//             />

//             <input
//               type="text"
//               placeholder="Years of Experience"
//               value={formData.yearsOfExperience}
//               onChange={(e) =>
//                 handleInputChange("yearsOfExperience", e.target.value)
//               }
//               className="complete-profile-input-field"
//             />

//             <input
//               type="text"
//               placeholder="Country of Incorporation"
//               value={formData.countryOfIncorporation}
//               onChange={(e) =>
//                 handleInputChange("countryOfIncorporation", e.target.value)
//               }
//               className="complete-profile-input-field"
//             />

//             <input
//               type="text"
//               placeholder="City"
//               value={formData.city}
//               onChange={(e) => handleInputChange("city", e.target.value)}
//               className="complete-profile-input-field"
//             />

//             <input
//               type="text"
//               placeholder="State"
//               value={formData.state}
//               onChange={(e) => handleInputChange("state", e.target.value)}
//               className="complete-profile-input-field"
//             />
//           </div>
//         </form>

//         {/* Button */}
//         <button onClick={handleNext} className="complete-profile-next-button">
//           Next <i className="fas fa-arrow-right"></i>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CompleteProfileForm;













import React, { useState } from "react";
import { profileAPI } from "../services/profileAPI";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/ProfileForm.css";

const CompleteProfileForm = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    description: "",
    yearsOfExperience: "",
    street: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    fullAddress: "",
    phone: "",
    website: "",
    specializations: [],
    countries: [],
    latitude: "",
    longitude: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSpecializationChange = (specialization) => {
    setFormData(prev => ({
      ...prev,
      specializations: prev.specializations.includes(specialization)
        ? prev.specializations.filter(s => s !== specialization)
        : [...prev.specializations, specialization]
    }));
  };

  const handleCountryChange = (country) => {
    setFormData(prev => ({
      ...prev,
      countries: prev.countries.includes(country)
        ? prev.countries.filter(c => c !== country)
        : [...prev.countries, country]
    }));
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }));
        },
        (error) => {
          setError('Unable to retrieve your location');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate required fields
      if (!formData.businessName || !formData.businessType || !formData.street || 
          !formData.city || !formData.country || !formData.phone) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }

      const completeData = {
        ...formData,
        yearsOfExperience: parseInt(formData.yearsOfExperience) || 0,
        fullAddress: formData.fullAddress || `${formData.street}, ${formData.city}, ${formData.country}`,
        latitude: parseFloat(formData.latitude) || 0,
        longitude: parseFloat(formData.longitude) || 0
      };

      const response = await profileAPI.completeProfile(completeData);
      
      if (response.success) {
        // Redirect to dashboard
        window.location.href = '/dashboard';
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to complete profile');
    } finally {
      setLoading(false);
    }
  };

  const specializationsList = [
    'engine_fault', 'brake_fault', 'suspension', 'body_work',
    'electrical', 'transmission', 'ac_repair', 'oil_change',
    'diagnostics', 'tire_service', 'battery', 'exhaust'
  ];

  const countriesList = ['germany', 'china', 'japan', 'usa', 'korea'];

  return (
    <div className="complete-profile-container">
      <div className="complete-profile-content">
        {/* Header */}
        <div className="complete-profile-header">
          <button 
            className="complete-profile-back-button" 
            onClick={() => window.history.back()}
            aria-label="Go back"
          >
            <i className="fas fa-arrow-left"></i>
          </button>

          <div className="complete-profile-header-text">
            <h1 className="complete-profile-title">Complete Your Workshop Profile</h1>
            <p className="complete-profile-subtitle">
              Set up your mechanic profile to start receiving job requests
            </p>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        {/* Form */}
        <form className="complete-profile-form-container" onSubmit={handleSubmit}>
          <div className="complete-profile-grid">
            {/* Business Information */}
            <input
              type="text"
              placeholder="Business Name *"
              value={formData.businessName}
              onChange={(e) => handleInputChange("businessName", e.target.value)}
              className="complete-profile-input-field"
              required
            />

            <select
              value={formData.businessType}
              onChange={(e) => handleInputChange("businessType", e.target.value)}
              className="complete-profile-input-field"
              required
            >
              <option value="">Select Business Type *</option>
              <option value="individual">Individual Mechanic</option>
              <option value="workshop">Workshop</option>
              <option value="dealership">Dealership</option>
              <option value="mobile">Mobile Service</option>
            </select>

            <input
              type="number"
              placeholder="Years of Experience"
              value={formData.yearsOfExperience}
              onChange={(e) => handleInputChange("yearsOfExperience", e.target.value)}
              className="complete-profile-input-field"
            />

            <input
              type="text"
              placeholder="Business Description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="complete-profile-input-field"
            />

            {/* Contact Information */}
            <input
              type="tel"
              placeholder="Phone Number *"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="complete-profile-input-field"
              required
            />

            <input
              type="url"
              placeholder="Website"
              value={formData.website}
              onChange={(e) => handleInputChange("website", e.target.value)}
              className="complete-profile-input-field"
            />

            {/* Address Information */}
            <input
              type="text"
              placeholder="Street Address *"
              value={formData.street}
              onChange={(e) => handleInputChange("street", e.target.value)}
              className="complete-profile-input-field"
              required
            />

            <input
              type="text"
              placeholder="City *"
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              className="complete-profile-input-field"
              required
            />

            <input
              type="text"
              placeholder="State"
              value={formData.state}
              onChange={(e) => handleInputChange("state", e.target.value)}
              className="complete-profile-input-field"
            />

            <input
              type="text"
              placeholder="Country *"
              value={formData.country}
              onChange={(e) => handleInputChange("country", e.target.value)}
              className="complete-profile-input-field"
              required
            />

            <input
              type="text"
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={(e) => handleInputChange("postalCode", e.target.value)}
              className="complete-profile-input-field"
            />

            {/* Location */}
            <div className="location-section">
              <input
                type="number"
                step="any"
                placeholder="Latitude"
                value={formData.latitude}
                onChange={(e) => handleInputChange("latitude", e.target.value)}
                className="complete-profile-input-field"
              />
              <input
                type="number"
                step="any"
                placeholder="Longitude"
                value={formData.longitude}
                onChange={(e) => handleInputChange("longitude", e.target.value)}
                className="complete-profile-input-field"
              />
              <button
                type="button"
                onClick={getCurrentLocation}
                className="location-button"
              >
                <i className="fas fa-location-crosshairs"></i> Use Current Location
              </button>
            </div>
          </div>

          {/* Specializations */}
          <div className="specializations-section">
            <h3>Specializations</h3>
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

          {/* Countries Served */}
          <div className="countries-section">
            <h3>Countries Served</h3>
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

          {/* Submit Button */}
          <button 
            type="submit" 
            className="complete-profile-next-button"
            disabled={loading}
          >
            {loading ? 'Completing Profile...' : 'Complete Profile'} 
            <i className="fas fa-check"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfileForm;