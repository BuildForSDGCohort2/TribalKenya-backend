import React, { useReducer, createContext, useContext } from 'react';
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
    case 'fetch_places':
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

  // Function for getting the list of places in a category
  const getListOfPlaces = async () => {
    try {
      const response = await fetch('https://us-central1-tribalkenya-ff470.cloudfunctions.net/places/');
      const results = await response.json();
      dispatch({ type: 'fetch_places', places: results });
    } catch (error) {
      console.log(error.message);
    }
  };

  // Function for adding a new category to database
  const addPlace = async (place) => {
    try {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      const options = {
        method: 'POST',
        headers,
        body: JSON.stringify(place)
      };
      // Create request
      const request = new Request('https://us-central1-tribalkenya-ff470.cloudfunctions.net/categories/place/add', options);
      await fetch(request);
      alertMessage('success');
    } catch (error) {
      alertMessage('error', error.message);
    }
  };

  return (
      <PlacesContext.Provider value={{
        ...state,
        getListOfPlaces,
        addPlace
      }}>
          {children}
      </PlacesContext.Provider>
  );
};

export default PlacesProvider;
