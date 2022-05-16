import React from 'react';

import {
  Col,
  Container,
  Row,
  Form,
  Button,
  ProgressBar,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
// import avatar1 from '../images/man.png';

const EditContact = () => {
  return (
    <Container className='d-flex  justify-content-between align-items-center my-3 h-100 position-absolute top-50 start-50 translate-middle'>
      <Row className='border border-success border border-2 rounded shadow   bg-body rounded position-relative  d-flex flex-column w-50 p-5 '>
        <Col>
          <p className=' d-flex justify-content-center fs-4 fw-bolder mt-4  flex-column align-items-center'>
            <span className='text-center add-title fs-1 mb-4'>
              Edit Contact
            </span>
            <ProgressBar
              animated
              now={100}
              className='w-100'
              variant='success'
            />
          </p>

          <Link to='/' className='position-absolute top-0 end-0 mx-3 my-1'>
            <FontAwesomeIcon
              icon={faX}
              className='cancel-new-contact-icon text-dark'
            />
          </Link>
        </Col>

        <Col className='p-3'>
          <Form className='fs-4'>
            <Form.Group className='mb-3' controlId=''>
              <Form.Label>Name</Form.Label>
              <Form.Control size='lg' type='text' />
            </Form.Group>
            <Form.Group className='mb-3' controlId=''>
              <Form.Label>Photo Url</Form.Label>
              <Form.Control size='lg' />
            </Form.Group>
            <Form.Group className='mb-3' controlId=''>
              <Form.Label>Number</Form.Label>
              <Form.Control size='lg' type='number' />
            </Form.Group>
            <Form.Group className='mb-3' controlId=''>
              <Form.Label>Email</Form.Label>
              <Form.Control size='lg' type='email' />
            </Form.Group>
            <Form.Group className='mb-3' controlId=''>
              <Form.Label>Company</Form.Label>
              <Form.Control size='lg' type='text' />
            </Form.Group>
            <Form.Group className='mb-3' controlId=''>
              <Form.Label>Title</Form.Label>
              <Form.Control size='lg' type='text' />
            </Form.Group>
            <Form.Select aria-label='Default select example' size='lg'>
              <option>Select Group</option>
              <option value='1'>One</option>
              <option value='2'>Two</option>
              <option value='3'>Three</option>
            </Form.Select>
            <Button type='submit' className='mt-5 w-100 fs-4' variant='success'>
              Save Changes
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          {/* <img src={avatar1} alt='' /> */}
        </Col>
      </Row>
    </Container>
  );
};

export default EditContact;
