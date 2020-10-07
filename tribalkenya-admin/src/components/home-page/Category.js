import React, { useContext, useState } from 'react';
import {
  Card, CardImg, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { navigate } from '@reach/router';
import { HomeContext } from './Home.context';
import UpdateCategory from './UpdateCategory';

const Category = ({ category }) => {
  const { deleteCategory } = useContext(HomeContext);
  const [modal, setModal] = useState(false);
  const close = () => setModal(false);
  const toggle = (categoryId) => categoryId === category.id ? setModal(!modal) : close();
  const goToCategory = () => {
    navigate('/places', { state: { id: category.id, name: category.name } });
  };
  return (
    <>
    <div className="mt-2 custom-card">
        <Card className="custom-card">
          <CardImg top width="100%" src={category.poster} alt={`${category.name}`} className="custom-card-img" />
          <CardBody className="custom-card-body">
            <CardTitle>{category.name}</CardTitle>
            <CardSubtitle className="tag">#{category.name}</CardSubtitle>
            <Button outline color="info" className="mr-2" onClick={() => toggle(category.id)}>Edit</Button>
            <Button outline color="danger" onClick={() => deleteCategory(category)}>Delete</Button>
            <Button outline color="primary" className="ml-2" onClick={() => goToCategory()}>Sites</Button>
          </CardBody>
        </Card>
    </div>
    <UpdateCategory openModal={modal} toggle={close} category={category} />
    </>
  );
};

export default Category;
