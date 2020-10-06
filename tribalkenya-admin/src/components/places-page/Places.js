import React, { useContext, useEffect } from 'react';
import { Button } from 'reactstrap';
import { PlacesContext } from './Places.context';
import Place from './Place';
import AddPlaceForm from './AddPlaceForm';

const Places = ({ categoryId }) => {
  const { getListOfPlaces, dispatch, placesForm, places } = useContext(PlacesContext);
  const toggleForm = () => dispatch({ type: 'toggle_form', placesForm: !placesForm });
  useEffect(() => {
    getListOfPlaces(categoryId);
  }, []);
  return (
      <>
        <div className="container-fluid white-bg p-2 curved-border">
          <h1 className="medium-text">Places</h1>
          <Button onClick={toggleForm}>
              {placesForm ? 'Cancel' : 'Add Place' }
          </Button>
          {placesForm ? <AddPlaceForm placesForm={placesForm} categoryId={categoryId} /> : null}
        </div>
        <div className="container-fluid white-bg curved-border p-2 mt-2 custom-card-group">
            {places.map((key) => (
                <Place key={key.id} place={key} />
            ))}
        </div>
      </>
  );
};

export default Places;
