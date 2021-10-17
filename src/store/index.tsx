import React from 'react';
import { AuthProvider } from './auth';

const Store: React.FC = ({children}) => {
  return <AuthProvider>{children}</AuthProvider>
}

export default Store;