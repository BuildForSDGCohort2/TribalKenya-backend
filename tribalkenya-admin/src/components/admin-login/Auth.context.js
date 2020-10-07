import React, { createContext, useReducer, useEffect } from 'react';
import { navigate } from '@reach/router';
import firebase from 'gatsby-plugin-firebase';

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
      await firebase.auth().signInWithEmailAndPassword(email, password);
      dispatch({ type: 'message', message: 'Access Granted', success: true });
      navigate('home');
    } catch (error) {
      dispatch({ type: 'message', message: 'Access Denied', success: false });
    }
  };

  const logOut = async () => {
    try {
      await firebase.auth().signOut();
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

  const addImageToStorage = async (folder, image) => {
    try {
      const storageRef = firebase.storage().ref();
      const addImage = storageRef.child(`${folder}/${image.name}`);
      await addImage.put(image, { contentType: image.type });
      const imageUrl = await addImage.getDownloadURL();
      return imageUrl;
    } catch (error) {
      return error.message;
    }
  };

  // Sort list by date posted
  // eslint-disable-next-line id-length
  const sortDescending = (arr) => arr.sort((a, b) => new Date(b.date) - new Date(a.date));

  // check if user is logged in
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user.getIdTokenResult().then((idToken) => {
          if (idToken.claims.admin === true) {
            dispatch({ type: 'addUser', user: { id: user.uid, email: user.email } });
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
        dispatch,
        addImageToStorage,
        sortDescending
      }}>
          {children}
      </AuthContext.Provider>
  );
};

export default AuthProvider;
