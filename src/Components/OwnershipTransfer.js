import React, { useState } from 'react';
import { Typography } from 'antd';
import './PetProfile.css';


const { Title, Text } = Typography;

const petData = {
  name: 'Coco',
  gender: 'Female',
  age: '2',
  breed: 'Cocker Spaniel',
  ownerName: 'Sakshi Singh',
  emailid: 'skhsingh@ucdavis.edu',
  phoneNumber: '(530) 123-8765',
  owneraddress: '403 Russell Park, Apt #1, Davis, CA 95616',
}

function OwnershipTransfer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    id: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    phone: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    id: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;

    // For numeric fields: Ensure input is a valid number sequence
    if ((id === 'id' || id === 'phone' || id === 'zip') && value !== '' && !/^\d+$/.test(value)) {
      return;
    }

    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: '' }); // Clear error on valid input
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email address is required';
    if (!formData.id.trim() || !/^\d+$/.test(formData.id)) newErrors.id = 'ID must be a number';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipcode.trim()) newErrors.zipcode = 'ZipCode is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      alert('Ownership transferred successfully!');
      // Perform form submission logic here
    }
  };


  return (

    <div
      className="pet-profile-container"
      style={{
        backgroundColor: '#EFBA55',
        backgroundSize: 'contain',
        backgroundPosition: 'top center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        className="pet-profile-card"
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          maxWidth: '600px',
          width: '100%',
        }}
      >
        <Title
          level={2}
          className="pet-profile-title"
          style={{
            textAlign: 'left',
            color: '#333',
            fontFamily: 'cursive',
            marginBottom: '20px',
          }}
        >
          Ownership Transfer
        </Title>

        <h3 style={{
          fontFamily: 'cursive',
          marginTop: "25px",
          marginBottom: "25px",
          textDecoration: 'underline'
        }}>
          Pet Information
        </h3>
        <div className="pet-profile-row">
          <Text
            strong
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              fontFamily: 'cursive',
            }}
          >
            Pet's Name:
          </Text>
          <Text style={{ fontSize: '16px', fontFamily: 'cursive' }}>
            {petData.name}
          </Text>
        </div>
        <div className="pet-profile-row">
          <Text
            strong
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              fontFamily: 'cursive',
            }}
          >
            Gender:
          </Text>
          <Text style={{ fontSize: '16px', fontFamily: 'cursive' }}>
            {petData.gender}
          </Text>
        </div>
        <div className="pet-profile-row">
          <Text
            strong
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              fontFamily: 'cursive',
            }}
          >
            Age:
          </Text>
          <Text style={{ fontSize: '16px', fontFamily: 'cursive' }}>
            {petData.age} years
          </Text>
        </div>
        <div className="pet-profile-row">
          <Text
            strong
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              fontFamily: 'cursive',
            }}
          >
            Breed:
          </Text>
          <Text style={{ fontSize: '16px', fontFamily: 'cursive' }}>
            {petData.breed}
          </Text>
        </div>

        <h3 style={{
          fontFamily: 'cursive',
          marginTop: "25px",
          marginBottom: "25px",
          textDecoration: 'underline'
        }}>
          Current Owner Information
        </h3>
        <div className="pet-profile-row">
          <Text
            strong
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              fontFamily: 'cursive',
            }}
          >
            Name:
          </Text>
          <Text style={{ fontSize: '16px', fontFamily: 'cursive' }}>
            {petData.ownerName}
          </Text>
        </div>
        <div className="pet-profile-row">
          <Text
            strong
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              fontFamily: 'cursive',
            }}
          >
            Email:
          </Text>
          <Text style={{ fontSize: '16px', fontFamily: 'cursive' }}>
            {petData.emailid}
          </Text>
        </div>
        <div className="pet-profile-row">
          <Text
            strong
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              fontFamily: 'cursive',
            }}
          >
            phoneNumber:
          </Text>
          <Text style={{ fontSize: '16px', fontFamily: 'cursive' }}>
            {petData.phoneNumber}
          </Text>
        </div>
        <div className="pet-profile-row">
          <Text
            strong
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              fontFamily: 'cursive',
            }}
          >
            Address:
          </Text>
          <Text style={{ fontSize: '16px', fontFamily: 'cursive' }}>
            {petData.owneraddress}
          </Text>
        </div>

        <h3 style={{
          fontFamily: 'cursive',
          marginTop: "25px",
          marginBottom: "25px",
          textDecoration: 'underline'
        }}>
          New Owner's Information
        </h3>

        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="name"
              style={{ display: 'inline-block', width: "100px" }}
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter new owner's name"
              style={{
                padding: "8px",
                fontSize: "14px",
                width: "300px",
              }}
            />
            {errors.name && <p style={{ color: 'red', fontSize: '12px' }}>{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="email"
              style={{ display: 'inline-block', width: "100px" }}
            >
              Email:
            </label>
            <input
              type="text"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter new owner's email"
              style={{
                padding: "8px",
                fontSize: "14px",
                width: "300px",
              }}
            />
            {errors.email && <p style={{ color: 'red', fontSize: '12px' }}>{errors.email}</p>}
          </div>

          {/* ID Field */}
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="id"
              style={{ display: 'inline-block', width: "100px" }}
            >
              ID:
            </label>
            <input
              type="text"
              id="id"
              value={formData.id}
              onChange={handleChange}
              placeholder="Enter new owner's id"
              style={{
                padding: "8px",
                fontSize: "14px",
                width: "300px",
              }}
            />
            {errors.id && <p style={{ color: 'red', fontSize: '12px' }}>{errors.id}</p>}
          </div>

          <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "20px auto" }}>
            <h3 style={{ marginBottom: "15px" }}>Address:</h3>

            {/* Street Address */}
            <div >
              <input
                type="text"
                value={formData.address}
                onChange={handleChange}
                style={{ width: "100%", padding: "10px", fontSize: "14px", border: "1px solid #ccc", borderRadius: "4px" }}
              />
              {errors.address && <p style={{ color: 'red', fontSize: '12px' }}>{errors.address}</p>}
            </div>
            <p style={{ marginBottom: "15px", fontSize: "14px" }}>Street Address</p>

            {/* Street Address Line 2 */}
            <div>
              <input
                type="text"
                style={{ width: "100%", padding: "10px", fontSize: "14px", border: "1px solid #ccc", borderRadius: "4px" }}
              />
            </div>
            <p style={{ marginBottom: "15px", fontSize: "14px" }}>Street Address Line 2</p>

            { /* City and State/Province */}
            <div style={{ display: "flex", gap: "15px" }}>
              <input
                type="text"
                value={formData.city}
                onChange={handleChange}
                style={{ flex: 1, padding: "10px", fontSize: "14px", border: "1px solid #ccc", borderRadius: "4px" }}
              />
              {errors.city && <p style={{ color: 'red', fontSize: '12px' }}>{errors.city}</p>}
              <input
                type="text"
                value={formData.state}
                onChange={handleChange}
                style={{ flex: 1, padding: "10px", fontSize: "14px", border: "1px solid #ccc", borderRadius: "4px" }}
              />
              {errors.state && <p style={{ color: 'red', fontSize: '12px' }}>{errors.state}</p>}
            </div>
            <div style={{ display: "flex", gap: "265px", marginBottom: "15px" }}>
              <p style={{ marginBottom: "15px", fontSize: "14px" }}>City</p>
              <p style={{ marginBottom: "15px", fontSize: "14px" }}>State/ Province</p>
            </div>


            {/* Postal / Zip Code */}
            <div>
              <input
                type="text"
                value={formData.zipcode}
                onChange={handleChange}
                style={{ width: "30%", padding: "10px", fontSize: "14px", border: "1px solid #ccc", borderRadius: "4px" }}
              />
              {errors.zipcode && <p style={{ color: 'red', fontSize: '12px' }}>{errors.zipcode}</p>}
            </div>
            <p style={{ marginBottom: "15px", fontSize: "14px" }}>Postal/ Zip Code</p>
          </div>

          {/* Phone Field */}
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="phone"
              style={{ display: 'inline-block', width: "100px" }}
            >
              Phone:
            </label>
            <input
              type="text"
              id="phone"
              onChange={handleChange}
              placeholder="(000) 000-0000"
              style={{
                padding: "8px",
                fontSize: "14px",
                width: "300px",
              }}
            />
            {errors.phone && <p style={{ color: 'red', fontSize: '12px' }}>{errors.phone}</p>}
          </div>
          <button
            type="submit"
            style={{
              marginTop: "20px",
              justifyContent: 'center',
              alignItems: 'center',
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
              cursor: "pointer"
            }}
          >
            Transfer
          </button>
        </form>
      </div >
    </div >
  );
};

export default OwnershipTransfer;