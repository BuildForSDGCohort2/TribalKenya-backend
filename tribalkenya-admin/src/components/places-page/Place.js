import React, { useState } from 'react';
import {
  Card, CardImg, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import AddPlaceImage from './AddPlaceImage';
import './places.css';

const Place = ({ place, categoryId }) => {
  const [imagesForm, setimagesForm] = useState(false);
  const toggleForm = () => setimagesForm(!imagesForm);
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
              <Button outline color="danger" onClick={() => console.log(place)}>Delete</Button>
            </div>
          </CardBody>
        </Card>
  );
};

export default Place;
