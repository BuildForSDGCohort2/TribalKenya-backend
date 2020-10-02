import React, { useReducer, createContext, useContext } from 'react';
import firebase from 'gatsby-plugin-firebase';
import { AuthContext } from '../admin-login/Auth.context';

export const HomeContext = createContext();

// Create initial state
const initialState = {
  categoryForm: false,
  categories: []
};

// Create reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'show_category_form':
      return {
        ...state,
        categoryForm: action.categoryForm
      };
    case 'fetch_categories':
      return {
        ...state,
        categories: action.categories
      };
    default:
      return state;
  }
};

// Create Provider for passing down states to child components
const HomeProvider = ({ children }) => {
  const { alertMessage } = useContext(AuthContext);
  // get the reducer and initial states
  const [state, dispatch] = useReducer(reducer, initialState);

  // Function for getting the list of categories from the database
  const getListOfCategories = async () => {
    try {
      const response = await fetch('https://us-central1-tribalkenya-ff470.cloudfunctions.net/categories/');
      const results = await response.json();
      dispatch({ type: 'fetch_categories', categories: results });
    } catch (error) {
      console.log(error.message);
    }
  };

  // Function for adding a new category to database
  const addCategory = async (category) => {
    try {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      const options = {
        method: 'POST',
        headers,
        body: JSON.stringify(category)
      };
      // Create request
      const request = new Request('https://us-central1-tribalkenya-ff470.cloudfunctions.net/categories/category/add', options);
      await fetch(request);
      alertMessage('success');
    } catch (error) {
      alertMessage('error', error.message);
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

  // Function for updating a category
  const updateCategory = async (category) => {
    try {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      const options = {
        method: 'PUT',
        headers,
        body: JSON.stringify(category)
      };
      const request = new Request(`https://us-central1-tribalkenya-ff470.cloudfunctions.net/categories/category/update/${category.id}`, options);
      await fetch(request);
      alertMessage('success');
    } catch (error) {
      alertMessage('error', error.message);
    }
  };

  // Function for updating a category in the state while waiting update response from API
  const updateCategoryInState = (category) => {
    const newState = [...state.categories];
    newState.forEach((key) => {
      if (key.id === category.id) {
        newState.splice(newState.indexOf(key), 1, category);
      }
    });
    dispatch({ type: 'fetch_categories', categories: newState });
  };

  // Delete from state
  const deleteFromState = (category) => {
    const newState = [...state.categories];
    newState.forEach((key) => {
      if (key.id === category.id) {
        newState.splice(newState.indexOf(key), 1);
      }
    });
    dispatch({ type: 'fetch_categories', categories: newState });
  };

  // Function fo deleting a category
  const deleteCategory = async (category) => {
    try {
      deleteFromState(category);
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      const options = {
        method: 'DELETE',
        headers
      };
      const request = new Request(`https://us-central1-tribalkenya-ff470.cloudfunctions.net/categories/category/delete/${category.id}`, options);
      await fetch(request);
      alertMessage('success');
    } catch (error) {
      alertMessage('error', error.message);
    }
  };

  return (
      <HomeContext.Provider value={{
        ...state,
        addCategory,
        addImageToStorage,
        getListOfCategories,
        updateCategory,
        updateCategoryInState,
        deleteCategory,
        dispatch
      }}>
          {children}
      </HomeContext.Provider>
  );
};

export default HomeProvider;
