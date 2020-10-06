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

const AddPlaceForm = ({ placesForm, categoryId }) => {
  const [name, setname] = useState('');
  const [des, setdes] = useState('');
  const [poster, setposter] = useState('');
  const [geolocation, setgeolocation] = useState('');
  const [location, setlocation] = useState('');
  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (name !== '' && poster && des !== '') {
      console.log(name, des, poster.files[0], categoryId, geolocation, location);
    }
  };
  return (
    <Fade in={placesForm} tag="h5" className="mt-3">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="place-name">Name</Label>
          <Input type="text" name="place-name" id="place-name" onChange={(ev) => setname(ev.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="place-des">Description</Label>
          <Input type="textarea" name="place-des" id="place-des" onChange={(ev) => setdes(ev.target.value)} />
        </FormGroup>
        <FormGroup row>
          <Label for="place-poster" sm={2}>
            Poster
          </Label>
          <Col sm={10}>
            <Input
              accept="image/*"
              type="file"
              name="place-poster"
              id="place-poster"
              onChange={(ev) => setposter(ev.target)}
            />
            <FormText color="muted">
              Choose a poster for this site
            </FormText>
          </Col>
        </FormGroup>
        <FormGroup>
          <Label for="geolocation">Geo-location</Label>
          <Input type="text" name="geolocation" id="geolocation" onChange={(ev) => setgeolocation(ev.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="location">Location</Label>
          <Input type="text" name="location" id="location" onChange={(ev) => setlocation(ev.target.value)} />
        </FormGroup>
        <Button type="submit" className="black-bg no-outline" >
          Submit
        </Button>
      </Form>
    </Fade>
  );
};

export default AddPlaceForm;
