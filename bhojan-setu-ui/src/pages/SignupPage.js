// src/pages/SignupPage.js
import React, { useState } from 'react';
import {
  Container, Typography, TextField, Button, Box, Paper,
  Divider, Alert, Link
} from '@mui/material';
import { Phone, Email, Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import OtpInput from '../components/OtpInput';
import { generateOTP, verifyOTP, registerUser } from '../services/authService';

export default function SignupPage() {
  const [step, setStep] = useState('mobile'); // 'mobile', 'otp', or 'details'
  const [formData, setFormData] = useState({
    mobile: '',
    otp: '',
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSendOTP = async () => {
    if (!formData.mobile) {
      setErrors({ mobile: 'Mobile number is required' });
      return;
    }

    const result = await generateOTP(formData.mobile);
    if (result.success) {
      setStep('otp');
      setMessage(`OTP sent to ${formData.mobile}`);
    } else {
      setMessage('Failed to send OTP. Please try again.');
    }
  };

  const handleVerifyOTP = async (otp) => {
    const result = await verifyOTP(formData.mobile, otp);
    if (result.success) {
      setStep('details');
    } else {
      setMessage('Invalid OTP. Please try again.');
    }
  };

  const handleSubmitDetails = async () => {
    if (!formData.name) {
      setErrors({ name: 'Name is required' });
      return;
    }

    const result = await registerUser({
      mobile: formData.mobile,
      name: formData.name,
      email: formData.email,
      password: formData.password
    });

    if (result.success) {
      navigate('/home');
    } else {
      setMessage('Registration failed. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4, textAlign: 'center' }}>
        <Typography variant="h4">
          {step === 'mobile' && 'Sign Up with Mobile'}
          {step === 'otp' && 'Verify Mobile'}
          {step === 'details' && 'Complete Profile'}
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 4 }}>
        {message && <Alert severity={message.includes('success') ? 'success' : 'error'} sx={{ mb: 3 }}>{message}</Alert>}

        {step === 'mobile' && (
          <>
            <TextField
              fullWidth
              margin="normal"
              label="Mobile Number"
              name="mobile"
              type="tel"
              value={formData.mobile}
              onChange={handleChange}
              error={!!errors.mobile}
              helperText={errors.mobile}
              InputProps={{
                startAdornment: <Phone sx={{ mr: 1, color: 'action.active' }} />,
              }}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2, py: 1.5 }}
              onClick={handleSendOTP}
            >
              Send OTP
            </Button>
          </>
        )}

        {step === 'otp' && (
          <>
            <Typography variant="body1" sx={{ mb: 3, textAlign: 'center' }}>
              Enter the 6-digit OTP sent to {formData.mobile}
            </Typography>
            <OtpInput onComplete={handleVerifyOTP} />
            <Button
              fullWidth
              variant="text"
              sx={{ mt: 3 }}
              onClick={handleSendOTP}
            >
              Resend OTP
            </Button>
          </>
        )}

        {step === 'details' && (
          <>
            <TextField
              fullWidth
              margin="normal"
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              InputProps={{
                startAdornment: <Person sx={{ mr: 1, color: 'action.active' }} />,
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email (Optional)"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              InputProps={{
                startAdornment: <Email sx={{ mr: 1, color: 'action.active' }} />,
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Create Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              helperText="Set a password for future logins"
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2, py: 1.5 }}
              onClick={handleSubmitDetails}
            >
              Complete Registration
            </Button>
          </>
        )}

        <Divider sx={{ my: 3 }} />
        <Box sx={{ textAlign: 'center' }}>
          <Link href="/login" variant="body2">
            Already have an account? Sign In
          </Link>
        </Box>
      </Paper>
    </Container>
  );
}