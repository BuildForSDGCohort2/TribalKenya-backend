/* eslint-disable react/display-name */
import React, { useContext, useEffect } from 'react';
import { Button } from 'reactstrap';
import { HomeContext } from './Home.context';
import AddCategoriesForm from './AddCategoriesForm';
import Category from './Category';
import './home.css';

const Home = React.memo(() => {
  const { categoryForm, dispatch, categories, getListOfCategories } = useContext(HomeContext);
  const toggleForm = () => {
    dispatch({
      type: 'show_category_form',
      categoryForm: !categoryForm
    });
  };

  useEffect(() => {
    getListOfCategories();
  }, []);

  return (
    <>
    <div className="container-fluid white-bg p-2 curved-border">
        <h1 className="medium-text">Categories</h1>
      <Button className="black-bg no-outline" onClick={toggleForm}>
        {categoryForm ? 'Cancel' : 'Add Category'}
      </Button>
      {categoryForm ? (
          <AddCategoriesForm />
      ) : null}
    </div>
    <div className="container-fluid white-bg curved-border p-2 mt-2 custom-card-group">
      {categories.map((key) => (
          <Category category={key} key={key.id} />
      ))}
    </div>
    </>
  );
});

export default Home;
