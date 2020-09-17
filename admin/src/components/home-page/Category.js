import React from 'react';
import {
  Card, CardImg, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

const Category = ({ category }) => {
  return (
    <div className="mt-2 custom-card">
        <Card className="custom-card">
          <CardImg top width="100%" src={category.poster} alt={`${category.name}`} className="custom-card-img" />
          <CardBody className="custom-card-body">
            <CardTitle>{category.name}</CardTitle>
            <CardSubtitle className="tag">#{category.name}</CardSubtitle>
            <Button outline color="info" className="mr-2">Update</Button>
            <Button outline color="danger">Delete</Button>
          </CardBody>
        </Card>
    </div>
  );
};

export default Category;
