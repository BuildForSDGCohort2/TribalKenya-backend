import React, { createContext, useReducer, useEffect } from 'react';
import { navigate } from '@reach/router';
import { firebaseAuth } from '../firebase';

export const AuthContext = createContext();

// Initial State
const initialState = {
  user: {},
  message: '',
  success: false,
  admin: false
};

// Create Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'addUser':
      return {
        ...state,
        user: action.user
      };
    case 'message':
      return {
        ...state,
        message: action.message,
        success: action.success
      };
    case 'addAdmin':
      return {
        ...state,
        admin: action.admin
      };
    default:
      return state;
  }
};

// Create Provider for passing down states to child components
const AuthProvider = ({ children }) => {
  // get the reducer and initial states
  const [state, dispatch] = useReducer(reducer, initialState);

  // Create Login function
  const login = async (email, password) => {
    try {
      await firebaseAuth.signInWithEmailAndPassword(email, password);
      dispatch({ type: 'message', message: 'Access Granted', success: true });
    } catch (error) {
      dispatch({ type: 'message', message: 'Access Denied', success: false });
    }
  };

  const logOut = async () => {
    try {
      await firebaseAuth.signOut();
      dispatch({ type: 'addUser', user: {} });
      navigate('/');
    } catch (error) {
      dispatch({ type: 'message', message: 'Error logging out', success: false });
    }
  };

  const alertMessage = (type, error = '') => {
    if (type === 'success') {
      dispatch({ type: 'message', message: 'Success', success: true });
    } else {
      dispatch({ type: 'message', message: error, success: false });
    }
  };

  // check if user is logged in
  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        user.getIdTokenResult().then((idToken) => {
          if (idToken.claims.admin === true) {
            dispatch({ type: 'addUser', user: { id: user.uid, email: user.email } });
            navigate('home');
          } else {
            logOut();
            dispatch({ type: 'message', message: 'Access Denied', success: false });
          }
        });
      }
    });
  }, []);

  return (
      <AuthContext.Provider
      value={{
        ...state,
        login,
        logOut,
        alertMessage,
        dispatch
      }}>
          {children}
      </AuthContext.Provider>
  );
};

export default AuthProvider;
