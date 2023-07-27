import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import axios from 'axios';

import { productionServerUrl, devServerUrl } from '../ServerUrl';

const AddContact = ({
  name,
  setName,
  photo,
  setPhoto,
  number,
  setNumber,
  email,
  setEmail,
  title,
  setTitle,
  company,
  setCompany,
  relationship,
  setRelationship,
  relationshipInfo,
  setRelationshipInfo,
  errorMessage,
}) => {
  let navigate = useNavigate();

  const grabRelationshipsData = () => {
    let dataURL = `${productionServerUrl}/groups`;
    return axios.get(dataURL);
  };

  const settingGroupData = async () => {
    let res = await grabRelationshipsData();
    setRelationshipInfo(res.data);
  };

  useEffect(() => {
    settingGroupData();
  }, []);

  // logic for handle submit form to add new contact post

  const contactInfo = {
    name: name,
    photo: photo,
    number: number,
    email: email,
    title: title,
    company: company,
    relationship: relationship,
  };

  const createContact = (contactInfo) => {
    let dataURL = `${productionServerUrl}/contacts`;
    return axios.post(dataURL, contactInfo);
  };

  const handleSubmit = async (e) => {
    navigate('/', { replace: true });
    e.preventDefault();
    try {
      await createContact(contactInfo);

      navigate('/', { replace: true });
    } catch (error) {
      errorMessage();
      navigate('/', { replace: false });
    }
  };

  return (
    <Container className='d-flex flex-column justify-content-center align-items-center my-3 h-100 mt-5'>
      <Row
        id='add-contact-row'
        className='border border-primary border border-2 rounded shadow bg-body rounded position-relative d-flex flex-column w-50 px-5 pb-3 '
      >
        <Col>
          <p className=' d-flex justify-content-center fs-4 fw-bolder mt-4  flex-column align-items-center '>
            <span className='text-center add-title fs-1 mb-4'>
              Create Contact
            </span>
            <ProgressBar animated now={100} className='w-100' />
          </p>

          <Link to='/' className='position-absolute top-0 end-0 mx-3 my-2'>
            <FontAwesomeIcon
              icon={faX}
              className='cancel-new-contact-icon text-dark'
            />
          </Link>
        </Col>

        <Col className='p-3'>
          <Form className='fs-4' onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                size='lg'
                type='text'
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='photo'>
              <Form.Label>Photo Url</Form.Label>
              <Form.Control
                required
                size='lg'
                onChange={(e) => setPhoto(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='number'>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                required
                size='lg'
                type='tel'
                onChange={(e) => setNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                size='lg'
                type='email'
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='company'>
              <Form.Label>Company</Form.Label>
              <Form.Control
                required
                size='lg'
                type='text'
                onChange={(e) => setCompany(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                size='lg'
                type='text'
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Label>Relationship Status</Form.Label>
            <Form.Select
              aria-label='Default select example'
              size='lg'
              onChange={(e) => setRelationship(e.target.value)}
              required
            >
              <option hidden></option>

              {relationshipInfo.map((rele) => {
                return (
                  <option key={rele.id} value={rele.id}>
                    {rele.name}
                  </option>
                );
              })}
            </Form.Select>

            <Button type='submit' className='mt-5 w-100 fs-4'>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddContact;
