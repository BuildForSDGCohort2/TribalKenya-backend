import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import UpdateCategoryForm from './UpdateCategoryForm';

const UpdateCategory = ({ className, openModal, toggle, category }) => {
  return (
    <div>
      <Modal isOpen={openModal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Update Category</ModalHeader>
        <ModalBody>
            <UpdateCategoryForm category={category} close={toggle} />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default UpdateCategory;
