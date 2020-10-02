import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/storage';
import React from 'react';
import AuthProvider from './src/components/admin-login/Auth.context';

export const wrapRootElement = ({ element }) => (
    <AuthProvider>{element}</AuthProvider>
);
