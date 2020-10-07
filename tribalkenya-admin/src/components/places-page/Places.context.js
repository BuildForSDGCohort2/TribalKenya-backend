import React, { useReducer, createContext, useContext } from 'react';
import firebase from 'gatsby-plugin-firebase';
import { AuthContext } from '../admin-login/Auth.context';

export const PlacesContext = createContext();

// Create initial state
const initialState = {
  placesForm: false,
  imagesForm: false,
  places: []
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'toggle_form':
      return {
        ...state,
        placesForm: action.placesForm
      };
    case 'toggle_image_form':
      return {
        ...state,
        imagesForm: action.imagesForm
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
  const { alertMessage, sortDescending } = useContext(AuthContext);
  // get the reducer and initial states
  const [state, dispatch] = useReducer(reducer, initialState);

  // Function for getting the list of places in a category
  const getListOfPlaces = async (categoryId) => {
    try {
      const response = await fetch(`https://us-central1-tribalkenya-ff470.cloudfunctions.net/places/${categoryId}`);
      const results = await response.json();
      sortDescending(results);
      dispatch({ type: 'fetch_places', places: results });
      console.log(results);
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
      const request = new Request('https://us-central1-tribalkenya-ff470.cloudfunctions.net/places/place/add', options);
      await fetch(request);
      alertMessage('success');
    } catch (error) {
      alertMessage('error', error.message);
    }
  };

  // Update site
  const updatePlace = async (data, categoryId, placeId) => {
    try {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      const options = {
        method: 'PUT',
        headers,
        body: JSON.stringify(data)
      };
      const request = new Request(`https://us-central1-tribalkenya-ff470.cloudfunctions.net/places/update/${categoryId}/${placeId}`, options);
      await fetch(request);
      alertMessage('success');
    } catch (error) {
      alertMessage('error', error.message);
    }
  };

  // Get all the images for one site/place
  const getImagesForSite = async (categoryId, placeId) => {
    try {
      const place = await firebase.firestore().collection('categories').doc(categoryId).collection('places')
        .doc(placeId)
        .get();
      alertMessage('success');
      return place.data().images;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  };

  // Delete site
  const deleteSite = async (categoryId, placeId) => {
    try {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      const options = {
        method: 'DELETE',
        headers
      };
      const request = new Request(`https://us-central1-tribalkenya-ff470.cloudfunctions.net/places/delete/${categoryId}/${placeId}`, options);
      await fetch(request);
      alertMessage('successfully deleted');
    } catch (error) {
      alertMessage('error', error.message);
    }
  };

  return (
      <PlacesContext.Provider value={{
        ...state,
        getListOfPlaces,
        addPlace,
        dispatch,
        updatePlace,
        getImagesForSite,
        deleteSite
      }}>
          {children}
      </PlacesContext.Provider>
  );
};

export default PlacesProvider;
