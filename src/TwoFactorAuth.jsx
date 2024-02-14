qqimport React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID'
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const TwoFactorAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [verificationId, setVerificationId] = useState('');

  const handleSendCode = async () => {
    try {
      const confirmationResult = await firebase.auth().signInWithPhoneNumber(phoneNumber);
      setVerificationId(confirmationResult.verificationId);
    } catch (error) {
      console.error('Error sending code:', error);
    }
  };

  const handleVerifyCode = async () => {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        code
      );
      await firebase.auth().signInWithCredential(credential);
      console.log('User signed in successfully');
    } catch (error) {
      console.error('Error verifying code:', error);
    }
  };

  return (
    <div>
      <h2>Two Factor Authentication</h2>
      <label>
        Phone Number:
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </label>
      <button onClick={handleSendCode}>Send Code</button>
      <br />
      <label>
        Verification Code:
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </label>
      <button onClick={handleVerifyCode}>Verify Code</button>
    </div>
  );
};

export default TwoFactorAuth;



qq