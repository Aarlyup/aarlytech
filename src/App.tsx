import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { UiProvider } from './contexts/UiContext';
import ConfirmDialog from './components/ui/ConfirmDialog';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      <UiProvider>
        <div className="min-h-screen bg-gray-50">
          <RouterProvider router={router} />
          <ConfirmDialog />
        </div>
      </UiProvider>
    </HelmetProvider>
  );
}

export default App;