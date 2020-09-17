import React, { useContext } from 'react';
import { Button } from 'reactstrap';
import { HomeContext } from './Home.context';
import AddCategoriesForm from './AddCategoriesForm';

const Home = () => {
  const { categoryForm, dispatch, addCategory, addImageToStorage } = useContext(HomeContext);
  const toggleForm = (ev) => {
    ev.preventDefault();
    dispatch({
      type: 'show_category_form',
      categoryForm: !categoryForm
    });
  };

  return (
    <div className="container-fluid white-bg p-2 curved-border">
        <h1 className="medium-text">Categories</h1>
      <Button className="black-bg no-outline" onClick={toggleForm}>
        {categoryForm ? 'Cancel' : 'Add Category'}
      </Button>
      {categoryForm ? (
          <AddCategoriesForm categoryForm={categoryForm} addCategory={addCategory} addImage={addImageToStorage} />
      ) : null}
    </div>
  );
};

export default Home;
