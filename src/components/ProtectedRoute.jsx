import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../components/firebase';

const ProtectedRoute = ({ children }) => {
  if (!auth.currentUser) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;