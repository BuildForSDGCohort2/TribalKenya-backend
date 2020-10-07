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
    return () => dispatch({ type: 'fetch_places', places: [] });
  }, []);
  return (
      <>
        <div className="container-fluid white-bg p-2 curved-border">
          <h1 className="medium-text">Places</h1>
          <Button onClick={toggleForm}>
              {placesForm ? 'Cancel' : 'Add Place' }
          </Button>
          {placesForm ? <AddPlaceForm categoryId={categoryId} close={toggleForm} /> : null}
        </div>
        <div className="container-fluid white-bg curved-border p-2 mt-2">
            {places.map((key) => (
                <Place key={key.id} place={key} categoryId={categoryId} />
            ))}
        </div>
      </>
  );
};

export default Places;
