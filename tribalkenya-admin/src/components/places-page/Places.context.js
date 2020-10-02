import React, { useReducer, createContext, useContext } from 'react';
import firebase from 'gatsby-plugin-firebase';
import { AuthContext } from '../admin-login/Auth.context';

const PlacesContext = createContext();

// Create initial state
const initialState = {
  placesForm: false,
  places: []
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'activate_form':
      return {
        ...state,
        placesForm: action.placesForm
      };
    case 'add_places':
      return {
        ...state,
        places: action.places
      };
    default:
      return state;
  }
};

// Create Provider for passing down states to child components
const PlacesProvider = ({ children }) => {
  const { alertMessage } = useContext(AuthContext);
  // get the reducer and initial states
  const [state, dispatch] = useReducer(reducer, initialState);
};
