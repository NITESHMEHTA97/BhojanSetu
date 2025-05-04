// src/pages/LoginPage.js
import React, { useState } from 'react';
import { 
  Container, Typography, TextField, Button, Box, Paper, 
  Divider, Alert, Link 
} from '@mui/material';
import { Phone, Email, Lock } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import OtpInput from '../components/OtpInput';
import { generateOTP, verifyOTP, loginWithPassword } from '../services/authService';

export default function LoginPage() {
  const [step, setStep] = useState('mobile'); // 'mobile', 'otp', or 'password'
  const [formData, setFormData] = useState({
    mobile: '',
    password: '',
    otp: '',
    email: ''
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
      if (result.user) {
        // Existing user - login successful
        navigate('/home');
      } else {
        // New user - proceed to optional email
        setStep('email');
      }
    } else {
      setMessage('Invalid OTP. Please try again.');
    }
  };

  const handlePasswordLogin = async () => {
    const result = await loginWithPassword(formData.mobile, formData.password);
    if (result.success) {
      navigate('/home');
    } else {
      setMessage(result.message);
    }
  };

  const handleSubmitEmail = () => {
    // In a real app, you would save the email to the user's profile
    navigate('/home');
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4, textAlign: 'center' }}>
        <Typography variant="h4">
          {step === 'mobile' && 'Login with Mobile'}
          {step === 'otp' && 'Enter OTP'}
          {step === 'password' && 'Enter Password'}
          {step === 'email' && 'Add Email (Optional)'}
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
            <Divider sx={{ my: 3 }}>OR</Divider>
            <Button
              fullWidth
              variant="outlined"
              sx={{ py: 1.5 }}
              onClick={() => setStep('password')}
            >
              Login with Password
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
              onClick={() => setStep('mobile')}
            >
              Resend OTP
            </Button>
          </>
        )}

        {step === 'password' && (
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
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                startAdornment: <Lock sx={{ mr: 1, color: 'action.active' }} />,
              }}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2, py: 1.5 }}
              onClick={handlePasswordLogin}
            >
              Login
            </Button>
            <Button
              fullWidth
              variant="text"
              sx={{ mt: 2 }}
              onClick={() => setStep('mobile')}
            >
              Login with OTP instead
            </Button>
          </>
        )}

        {step === 'email' && (
          <>
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
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2, py: 1.5 }}
              onClick={handleSubmitEmail}
            >
              Continue
            </Button>
          </>
        )}

        <Divider sx={{ my: 3 }} />
        <Box sx={{ textAlign: 'center' }}>
          <Link href={step === 'mobile' ? '/signup' : '/login'} variant="body2">
            {step === 'mobile' ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </Link>
        </Box>
      </Paper>
    </Container>
  );
}