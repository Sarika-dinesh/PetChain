import React, { useState } from 'react';
import { Typography, Button, Input } from 'antd';
import './PetProfile.css';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const PetProfile = () => {
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

  // Example pet profile data
  const petData = {
    name: 'Coco',
    ID: '123',
    gender: 'Female',
    ownerName: 'Sakshi Singh',
    ownerID: '456',
    age: 2,
    breed: 'Cocker Spaniel',
    color: 'Golden',
    additionalInfo: 'Loves playing fetch and enjoys long walks in the park.',
    picture: '/images/istockphoto-1164917271-1024x1024.jpg', // Correct path
  };

  const handleLost = () => {
    setShowAdditionalInfo(true);
    console.log('Pet marked as LOST');
  };

  const handleFound = () => {
    setShowAdditionalInfo(false);
    console.log('Pet marked as FOUND');
  };

  return (
    <div
      className="pet-profile-container"
      style={{
        backgroundColor: '#EFBA55',
        backgroundImage: `url('/images/vecteezy_set-of-pets-animals_11143527-removebg-preview.png')`,
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
          Pet Profile
        </Title>
        <div
          className="pet-profile-content"
          style={{
            display: 'flex',
            flexDirection: 'row-reverse',
          }}
        >
          <div className="pet-profile-image">
            <img
              src={petData.picture}
              alt="Pet"
              style={{
                width: '100%',
                borderRadius: '16px',
                height: 'auto',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              }}
            />
          </div>
          <div
            className="pet-profile-left-aligned"
            style={{
              flex: 1,
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              fontFamily: 'cursive',
            }}
          >
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
                Pet ID:
              </Text>
              <Text style={{ fontSize: '16px', fontFamily: 'cursive' }}>
                {petData.ID}
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
            <div className="pet-profile-row">
              <Text
                strong
                style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  fontFamily: 'cursive',
                }}
              >
                Color:
              </Text>
              <Text style={{ fontSize: '16px', fontFamily: 'cursive' }}>
                {petData.color}
              </Text>
            </div>
            <h4
              style={{
                fontFamily: 'cursive',
                marginTop: '20px',
                marginBottom: '10px',
              }}
            >
              Owner
            </h4>
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
                ID:
              </Text>
              <Text style={{ fontSize: '16px', fontFamily: 'cursive' }}>
                {petData.ownerID}
              </Text>
            </div>
          </div>
        </div>
        <div className="button-group">
          <Button type="button" className="lost-button" onClick={handleLost}>
            LOST
          </Button>
          <Button type="button" className="found-button" onClick={handleFound}>
            FOUND
          </Button>
        </div>
        {showAdditionalInfo && (
          <div
            className="pet-profile-row"
            style={{
              marginTop: '20px',
              fontFamily: 'cursive',
            }}
          >
            <Text
              strong
              style={{
                fontSize: '16px',
                fontWeight: 'bold',
                fontFamily: 'cursive',
              }}
            >
              Additional Information:
            </Text>
            <Input.TextArea
              placeholder="Enter additional info"
              rows={4}
              style={{
                marginTop: '10px',
                fontFamily: 'cursive',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
          </div>
        )}
        {showAdditionalInfo && (
          <Button
            type="button"
            className="lost-button"
            style={{ marginTop: '10px' }}
          >
            SUBMIT
          </Button>
        )}
      </div>
    </div>
  );
};

export default PetProfile;
