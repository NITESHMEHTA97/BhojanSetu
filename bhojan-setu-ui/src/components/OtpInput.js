// src/components/OtpInput.js
import React, { useState, useRef, useEffect } from 'react';
import { TextField, Box } from '@mui/material';

const OtpInput = ({ length = 6, onComplete }) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Submit if all fields are filled
    if (newOtp.every(num => num !== '')) {
      onComplete(newOtp.join(''));
    }

    // Move to next field
    if (value && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
      {otp.map((digit, index) => (
        <TextField
          key={index}
          type="text"
          inputMode="numeric"
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          inputRef={(el) => (inputsRef.current[index] = el)}
          inputProps={{
            maxLength: 1,
            style: { textAlign: 'center', fontSize: '1.5rem' }
          }}
          sx={{
            width: 50,
            '& input': { padding: '10px 0', textAlign: 'center' }
          }}
        />
      ))}
    </Box>
  );
};

export default OtpInput;