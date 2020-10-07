/* eslint-disable max-statements */
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
import { AuthContext } from '../admin-login/Auth.context';
import { PlacesContext } from './Places.context';

const AddPlaceForm = ({ categoryId, close }) => {
  const { addImageToStorage, sortDescending } = useContext(AuthContext);
  const { addPlace, dispatch, places, placesForm, getListOfPlaces } = useContext(PlacesContext);
  const [name, setname] = useState('');
  const [des, setdes] = useState('');
  const [poster, setposter] = useState('');
  const [geolocation, setgeolocation] = useState('');
  const [location, setlocation] = useState('');
  const [phone, setphone] = useState('');
  const [facebook, setfacebook] = useState('');
  const [instagram, setinstagram] = useState('');
  const addDataToDB = async (posterImg, data) => {
    try {
      const currentState = places;
      currentState.push({ ...data, poster: posterImg, id: '' });
      sortDescending(currentState);
      dispatch({ type: 'fetch_places', places: currentState });
      const posterUrl = await addImageToStorage('sites', posterImg);
      const newPlace = {
        ...data,
        poster: posterUrl
      };
      await addPlace({ ...newPlace });
      await getListOfPlaces(categoryId);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (name !== '' && poster && des !== '') {
      const data = {
        name: name,
        description: des,
        category_id: categoryId,
        geo: geolocation,
        location: location,
        phone: phone,
        facebook: facebook,
        instagram: instagram,
        date: Date.now()
      };
      addDataToDB(poster.files[0], data);
      close();
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
        <FormGroup>
          <Label for="phone">Phone</Label>
          <Input type="phone" name="phone" id="phone" onChange={(ev) => setphone(ev.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="facebook">Facebook</Label>
          <Input type="text" name="facebook" id="facebook" onChange={(ev) => setfacebook(ev.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="instagram">Instagram</Label>
          <Input type="text" name="instagram" id="instagram" onChange={(ev) => setinstagram(ev.target.value)} />
        </FormGroup>
        <Button type="submit" className="black-bg no-outline" >
          Submit
        </Button>
      </Form>
    </Fade>
  );
};

export default AddPlaceForm;
