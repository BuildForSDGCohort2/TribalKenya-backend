/* eslint-disable max-statements */
import React, { useState, useContext } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Col,
  Input,
  FormText,
  Button
} from 'reactstrap';
import { HomeContext } from './Home.context';

const UpdateCategoryForm = ({ category, close }) => {
  const [name, setname] = useState('');
  const [poster, setposter] = useState();
  const {
    addImageToStorage,
    getListOfCategories,
    updateCategory,
    updateCategoryInState
  } = useContext(HomeContext);
  const setUpCategory = async (posterFile) => {
    try {
      const updatedCategory = { id: category.id, name: name, poster: posterFile };
      updateCategoryInState(updatedCategory);
      await updateCategory(updatedCategory);
      await getListOfCategories();
    } catch (error) {
      console.log(error.message);
    }
  };
  const addNewDetails = async (newName, newPoster) => {
    try {
      const posterUrl = await addImageToStorage('categories', newPoster);
      const updatedCategory = { id: category.id, name: newName, poster: posterUrl };
      updateCategoryInState(updatedCategory);
      await updateCategory(updatedCategory);
      await getListOfCategories();
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (poster && name !== '') {
      addNewDetails(name, poster.files[0]);
    } else if (poster && name === '') {
      addNewDetails(category.name, poster.files[0]);
    } else {
      setUpCategory(category.poster);
    }
    close();
  };
  return (
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="category-name">Name</Label>
          <Input
            type="text"
            name="new-category-name"
            id="new-category-name"
            onChange={(ev) => setname(ev.target.value)}
            defaultValue={category.name}
          />
        </FormGroup>
        <FormGroup row>
          <Label for="category-poster" sm={2}>
            Poster
          </Label>
          <Col sm={10}>
            <Input
              accept="image/*"
              type="file"
              name="new-category-poster"
              id="new-category-poster"
              onChange={(ev) => setposter(ev.target)}
            />
            <FormText color="muted">Choose a poster for this category</FormText>
          </Col>
        </FormGroup>
        <div className="right">
          <Button type="submit" outline color="info" className="mr-2">
            Update
          </Button>
          <Button color="secondary" onClick={() => close()}>Cancel</Button>
        </div>
      </Form>
  );
};

export default UpdateCategoryForm;
