import React, { useState, useContext } from 'react';
import {
  Fade,
  Form,
  FormGroup,
  Label,
  Col,
  Input,
  FormText,
  Button
} from 'reactstrap';
import { HomeContext } from './Home.context';
import { AuthContext } from '../admin-login/Auth.context';

const AddCategoriesForm = () => {
  const [name, setname] = useState('');
  const [poster, setposter] = useState();
  const { addCategory, dispatch, categoryForm, getListOfCategories } = useContext(HomeContext);
  const { addImageToStorage } = useContext(AuthContext);
  const setUpCategory = async (posterFile) => {
    try {
      const posterUrl = await addImageToStorage('categories', posterFile);
      await addCategory({ name: name, poster: posterUrl });
      await getListOfCategories();
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (poster && name !== '') {
      setUpCategory(poster.files[0]);
      ev.target.reset();
      dispatch({
        type: 'show_category_form',
        categoryForm: !categoryForm
      });
    }
  };
  return (
    <Fade in={categoryForm} tag="h5" className="mt-3">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="category-name">Name</Label>
          <Input type="text" name="category-name" id="category-name" onChange={(ev) => setname(ev.target.value)} />
        </FormGroup>
        <FormGroup row>
          <Label for="category-poster" sm={2}>
            Poster
          </Label>
          <Col sm={10}>
            <Input
              accept="image/*"
              type="file"
              name="category-poster"
              id="category-poster"
              onChange={(ev) => setposter(ev.target)}
            />
            <FormText color="muted">
              Choose a poster for this category
            </FormText>
          </Col>
        </FormGroup>
        <Button type="submit" className="black-bg no-outline" >
          Submit
        </Button>
      </Form>
    </Fade>
  );
};

export default AddCategoriesForm;
