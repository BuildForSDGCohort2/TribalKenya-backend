import React from 'react';
import {
  Card, CardImg, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

const Place = ({ place }) => {
  return (
    <div className="mt-2 custom-card">
        <Card className="custom-card">
          <CardImg top width="100%" src={place.poster} alt={`${place.name}`} className="custom-card-img" />
          <CardBody className="custom-card-body">
            <CardTitle>{place.name}</CardTitle>
            <CardSubtitle className="small-text">{place.description}</CardSubtitle>
            <Button outline color="info" className="mr-2" onClick={() => console.log(place)}>Edit</Button>
            <Button outline color="danger" onClick={() => console.log(place)}>Delete</Button>
          </CardBody>
        </Card>
    </div>
  );
};

export default Place;
