import React, { useState, useContext } from 'react';
import { FormGroup, Label, Col, Input, FormText, Button, Form, Fade } from 'reactstrap';
import { PlacesContext } from './Places.context';
import { AuthContext } from '../admin-login/Auth.context';

const AddPlaceImage = ({ categoryId, placeId }) => {
  const [poster, setposter] = useState('');
  const { updatePlace, getImagesForSite } = useContext(PlacesContext);
  const { addImageToStorage } = useContext(AuthContext);
  const updateDoc = async (posterImg) => {
    try {
      const currentImages = await getImagesForSite(categoryId, placeId);
      const imageUrl = await addImageToStorage(`sites${new Date(Date.now())}`, posterImg);
      console.log(imageUrl);
      updatePlace({
        images: [...currentImages, imageUrl]
      }, categoryId, placeId);
    } catch (error) {
      console.log(error.mesage);
    }
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
    updateDoc(poster.files[0]);
  };
  return (
    <div className="image-form m-1 p-2">
      <Fade>
        <Form onSubmit={handleSubmit}>
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
          <Button type="submit" className="black-bg no-outline" >
            Submit
          </Button>
        </Form>
      </Fade>
    </div>
  );
};

export default AddPlaceImage;
