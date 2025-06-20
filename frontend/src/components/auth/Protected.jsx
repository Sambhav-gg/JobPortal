// components/shared/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Protected = ({ children }) => {
  const { user } = useSelector((store) => store.auth);

  if (!user) {
    // If user is not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // If user exists, render the protected page
  return children;
};

export default Protected;
