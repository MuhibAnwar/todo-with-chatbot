// frontend/src/pages/_app.tsx
import React from 'react';
import { AuthProvider } from '../hooks/use-auth';
import '../../styles/globals.css'; // Adjust this path if you have global styles

function MyApp({ Component, pageProps }: any) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;