import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const VerifyEmail = () => {
  const { token } = useParams();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/verify-email/${token}`);
        console.log('Response from backend:', response);
        setMessage(response.data);
      } catch (error) {
        console.error('Error verifying email:', error);
        
      }
    };
    verifyEmail();
  }, [token]);

  return (
    <div style={{
      border: '2px solid #ccc',
      borderRadius: '8px',
      padding: '20px',
      textAlign: 'center',
      maxWidth: '400px',
      margin: 'auto',
      marginTop: '50px',
      backgroundColor: '#f0f0f0'
    }}>
      <h2>Email verified successfully. You can now log in.</h2>
      <p style={{ marginBottom: '20px' }}>
        <a href="/login" style={{
          display: 'inline-block',
          backgroundColor: '#007bff',
          color: '#fff',
          textDecoration: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          marginTop: '10px',
          transition: 'background-color 0.3s',
        }}>
          Go to Login
        </a>
      </p>
    </div>
  );
  
};

export default VerifyEmail;
