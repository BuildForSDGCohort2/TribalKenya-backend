import React, { useReducer, createContext, useContext } from 'react';
import { storageRef } from '../firebase';
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
  const { user, alertMessage } = useContext(AuthContext);
  // get the reducer and initial states
  const [state, dispatch] = useReducer(reducer, initialState);

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
      const email = await user.email;
      // Create request
      const request = new Request(`https://us-central1-tribalkenya-ff470.cloudfunctions.net/app/api/categories/add/${email}`, options);
      await fetch(request);
      alertMessage('success');
    } catch (error) {
      alertMessage('error', error.message);
    }
  };

  const addImageToStorage = async (folder, image) => {
    try {
      const addImage = storageRef.child(`${folder}/${image.name}`);
      await addImage.put(image, { contentType: image.type });
      const imageUrl = await addImage.getDownloadURL();
      return imageUrl;
    } catch (error) {
      return error.message;
    }
  };

  // Function for getting the list of categories from the database
  const getListOfCategories = async () => {
    try {
      const response = await fetch('https://us-central1-tribalkenya-ff470.cloudfunctions.net/app/api/categories/');
      const results = await response.json();
      dispatch({ type: 'fetch_categories', categories: results });
    } catch (error) {
      alertMessage('error', error.message);
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
      const request = new Request(`https://us-central1-tribalkenya-ff470.cloudfunctions.net/app/api/categories/update/${category.id}`, options);
      await fetch(request);
      alertMessage('success');
    } catch (error) {
      alertMessage('error', error.message);
    }
  };

  // Function fo deleting a category
  const deleteCategory = async (category) => {
    try {
      const newState = [...state.categories];
      newState.forEach((key) => {
        if (key.id === category.id) {
          newState.splice(newState.indexOf(key), 1);
        }
      });
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      const options = {
        method: 'DELETE',
        headers
      };
      const request = new Request(`https://us-central1-tribalkenya-ff470.cloudfunctions.net/app/api/categories/delete/${category.id}`, options);
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
        deleteCategory,
        dispatch
      }}>
          {children}
      </HomeContext.Provider>
  );
};

export default HomeProvider;
