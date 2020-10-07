import React, { useState, useContext } from 'react';
import {
  Card, CardImg, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import AddPlaceImage from './AddPlaceImage';
import './places.css';
import { PlacesContext } from './Places.context';

const Place = ({ place, categoryId }) => {
  const [imagesForm, setimagesForm] = useState(false);
  const toggleForm = () => setimagesForm(!imagesForm);
  const { deleteSite, getListOfPlaces, places, dispatch } = useContext(PlacesContext);
  const deleteS = async () => {
    try {
      const currentState = places;
      currentState.splice(currentState.indexOf(place), 1);
      dispatch({ type: 'fetch_places', places: currentState });
      await deleteSite(categoryId, place.id);
      await getListOfPlaces(categoryId);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (

        <Card>
          <CardImg top width="300" height="400" src={place.poster} alt={`${place.name}`} />
          <CardBody className="custom-card-body">
            <CardTitle>{place.name}</CardTitle>
            <CardSubtitle className="small-text">{place.description}</CardSubtitle>
            {imagesForm ? <AddPlaceImage categoryId={categoryId} placeId={place.id} /> : null}
            <div className="mt-2">
              <Button outline color="info" className="mr-2" onClick={toggleForm}>
                {imagesForm ? 'Cancel' : 'Add image'}
              </Button>
              <Button outline color="danger" onClick={deleteS}>Delete</Button>
            </div>
          </CardBody>
        </Card>
  );
};

export default Place;
