import React from 'react';
import AuthProvider from './src/components/admin-login/Auth.context';

export const wrapRootElement = ({ element }) => (
    <AuthProvider>{element}</AuthProvider>
);
