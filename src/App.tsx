import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { UiProvider } from './contexts/UiContext';
import { AuthProvider } from './contexts/AuthContext';
import ConfirmDialog from './components/ui/ConfirmDialog';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <UiProvider>
          <div className="min-h-screen bg-gray-50">
            <RouterProvider router={router} />
            <ConfirmDialog />
          </div>
        </UiProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;