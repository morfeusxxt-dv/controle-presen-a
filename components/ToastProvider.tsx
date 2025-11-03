'use client';

import React from 'react';
import { Toaster } from 'react-hot-toast';

const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
        style: {
          background: '#363636',
          color: '#fff',
        },
        success: {
          iconTheme: {
            primary: '#10B981', // green-500
            secondary: '#fff',
          },
        },
        error: {
          iconTheme: {
            primary: '#EF4444', // red-500
            secondary: '#fff',
          },
        },
      }}
    />
  );
};

export default ToastProvider;