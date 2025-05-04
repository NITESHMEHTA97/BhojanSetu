// src/services/authService.js
const users = [];

export const generateOTP = (mobile) => {
  // In production, this would call an SMS service
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log(`OTP for ${mobile}: ${otp}`); // For demo purposes
  return { success: true, otp };
};

export const verifyOTP = (mobile, otp) => {
  // In a real app, this would verify against your backend
  return { success: true, user: users.find(u => u.mobile === mobile) };
};

export const registerUser = (userData) => {
  const user = { ...userData, id: users.length + 1 };
  users.push(user);
  return { success: true, user };
};

export const loginWithPassword = (mobile, password) => {
  const user = users.find(u => u.mobile === mobile && u.password === password);
  return user 
    ? { success: true, user } 
    : { success: false, message: "Invalid credentials" };
};