import React, { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { UiProvider } from './contexts/UiContext';
import { AuthProvider } from './contexts/AuthContext';
import { FundingProvider } from './contexts/FundingContext';
import ConfirmDialog from './components/ui/ConfirmDialog';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "white" }} />
  );
}

export default App;
