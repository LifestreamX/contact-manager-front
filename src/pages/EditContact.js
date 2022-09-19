import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import {
  Col,
  Container,
  Row,
  Form,
  Button,
  ProgressBar,
  Spinner,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

const EditContact = ({
  loading,
  setLoading,
  setErrorMessage,
  individualContact,
  groupData,
  setGroupData,
}) => {
  const { contactId } = useParams();
  let navigate = useNavigate();
  const [editName, setEditName] = useState();
  const [editPhoto, setEditPhoto] = useState();
  const [editNumber, setEditNumber] = useState();
  const [editEmail, setEditEmail] = useState();
  const [editCompany, setEditCompany] = useState();
  const [editTitle, setEditTitle] = useState();
  const [userId, setUserId] = useState();
  const [editRelationShip, setEditRelationship] = useState();


  // Using id from view contact id to grab data from server
  const getContactDataById = (contactId) => {
    const serverURL = 'https://contact-manager-site.herokuapp.com';
    let dataURL = `${serverURL}/contacts/${contactId}`;
    return axios.get(dataURL);
  };

  const settingContactData = async () => {
    try {
      setLoading(true);
      let res = await getContactDataById(contactId);
      // setIndividualContact(res.data);
      setEditName(res.data.name);
      setEditPhoto(res.data.photo);
      setEditNumber(res.data.number);
      setEditEmail(res.data.email);
      setEditTitle(res.data.title);
      setEditCompany(res.data.company);
      setUserId(res.data.id);
      setEditRelationship(res.data.relationship);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrorMessage('Error');
    }
  };

  useEffect(() => {
    settingContactData();
  }, [contactId]);


  // Matching group number to groups to display group name
  const grabGroupData = () => {
    const serverURL = 'https://contact-manager-site.herokuapp.com';
    let dataURL = `${serverURL}/groups`;
    return axios.get(dataURL);
  };

  const settingGroupData = async () => {
    try {
      let res = await grabGroupData();
      setGroupData(res.data);
    } catch (error) {
      setErrorMessage('Error');
    }
  };

  useEffect(() => {
    settingGroupData();
  }, []);

  const foundGroupName = groupData.find((obj) => {
    return obj.id === individualContact ? individualContact.relationship : '';
  });


  const contactInfo = {
    id: userId,
    name: editName,
    photo: editPhoto,
    number: editNumber,
    email: editEmail,
    title: editTitle,
    company: editCompany,
    relationship: editRelationShip,
  };

  const EditContact = (contactInfo) => {
    const serverURL = 'https://contact-manager-site.herokuapp.com';
    let dataURL = `${serverURL}/contacts/${contactId}`;
    return axios.put(dataURL, contactInfo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await EditContact(contactInfo);

      if (res) {
        navigate('/', { replace: true });
      }
    } catch (error) {
      navigate(`/edit/${contactId}`, { replace: false });
    }
  };


  return (
    <>
      {loading ? (
        <Spinner
          animation='border'
          role='status'
          className='loading-spinner '
          style={{ width: '120px', height: '120px' }}
        >
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      ) : (
        <Container className=' d-flex edit-contact-wrapper mt-5 w-100  '>
          <Row
            className='position-absolute top-50 start-50 translate-middle border border-success border border-2 rounded shadow bg-body rounded position-relative  d-flex flex-column w-50 pb-5 px-5'
            id='edit-contact'
          >
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

              <Link to='/' className='position-absolute top-0 end-0 mx-4 my-3'>
                <FontAwesomeIcon
                  icon={faX}
                  className='cancel-new-contact-icon text-dark'
                />
              </Link>
            </Col>

            <Col>
              <Form className='fs-4' onSubmit={handleSubmit}>
                <Form.Group controlId='name' className='mb-3'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    size='lg'
                    type='text'
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className='mb-3' controlId='photo'>
                  <Form.Label>Photo Url</Form.Label>
                  <Form.Control
                    size='lg'
                    value={editPhoto}
                    onChange={(e) => setEditPhoto(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId='number' className='mb-3'>
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    size='lg'
                    type='tel'
                    value={editNumber}
                    onChange={(e) => setEditNumber(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className='mb-3' controlId='email'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    size='lg'
                    type='email'
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className='mb-3' controlId='company'>
                  <Form.Label>Company</Form.Label>
                  <Form.Control
                    size='lg'
                    type='text'
                    value={editCompany}
                    onChange={(e) => setEditCompany(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className='mb-3' controlId='title'>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    size='lg'
                    type='text'
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                </Form.Group>
                <Form.Label>Relationship</Form.Label>

                <Form.Select
                  aria-label='Default select example'
                  size='lg'
                  value={editRelationShip}
                  onChange={(e) => setEditRelationship(e.target.value)}
                >
                  <option hidden>
                    {foundGroupName ? foundGroupName.name : ''}
                  </option>
                  {groupData.map((rele) => {
                    return (
                      <option key={rele.id} value={rele.id}>
                        {rele.name}
                      </option>
                    );
                  })}
                </Form.Select>
                <Button
                  type='submit'
                  className='mt-5 w-100 fs-4 text-center'
                  variant='success'
                >
                  Save Changes
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default EditContact;
