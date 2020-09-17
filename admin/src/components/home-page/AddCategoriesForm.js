import React, { useState } from 'react';
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

const AddCategoriesForm = ({ categoryForm, addCategory, addImage }) => {
  const [name, setname] = useState('');
  const [poster, setposter] = useState();
  const setUpCategory = async (posterFile) => {
    try {
      const posterUrl = await addImage('categories', posterFile);
      addCategory({ name: name, poster: posterUrl });
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
    setUpCategory(poster.files[0]);
    ev.target.reset();
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
              This is some placeholder block-level help text for the above
              input. It&apos;s a bit lighter and easily wraps to a new line.
            </FormText>
          </Col>
        </FormGroup>
        <Button type="submit" className="black-bg no-outline">
          Submit
        </Button>
      </Form>
    </Fade>
  );
};

export default AddCategoriesForm;
