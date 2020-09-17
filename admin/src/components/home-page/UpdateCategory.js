import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import UpdateCategoryForm from './UpdateCategoryForm';

const UpdateCategory = ({ className, openModal, toggle, category }) => {
  return (
    <div>
      <Modal isOpen={openModal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Update Category</ModalHeader>
        <ModalBody>
            <UpdateCategoryForm category={category} close={toggle} />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default UpdateCategory;
