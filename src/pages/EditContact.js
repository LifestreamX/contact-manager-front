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
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

const EditContact = ({
  setLoading,
  setErrorMessage,
  setIndividualContact,
  groupData,
  setGroupData,
}) => {
  const { contactId } = useParams();
  let navigate = useNavigate();
  const [editName, setEditName] = useState('');
  const [editPhoto, setEditPhoto] = useState('');
  const [editNumber, setEditNumber] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editCompany, setEditCompany] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editRelationShip, setEditRelationship] = useState([]);

  // Using id from view contact id to grab data from server
  const getContactDataById = (contactId) => {
    const serverURL = 'http://localhost:9000';
    let dataURL = `${serverURL}/contacts/${contactId}`;
    return axios.get(dataURL);
  };

  const settingContactData = async () => {
    try {
      setLoading(true);
      let res = await getContactDataById(contactId);
      setLoading(false);
      setIndividualContact(res.data);
      // console.log(individualContact.relationship);
    } catch (error) {
      setLoading(false);
      setErrorMessage('Error');
    }
  };

  useEffect(() => {
    settingContactData();
  }, [contactId]);

  // *****************************************************************************

  // Matching group number to groups to display group name
  const grabGroupData = () => {
    const serverURL = 'http://localhost:9000';
    let dataURL = `${serverURL}/groups`;
    return axios.get(dataURL);
  };

  const settingGroupData = async () => {
    try {
      let res = await grabGroupData();
      setGroupData(res.data);
      // console.log(groupData);
    } catch (error) {
      setErrorMessage('Error');
    }
  };

  useEffect(() => {
    settingGroupData();
  }, []);

  // const foundGroupName = groupData.find((obj) => {
  //   return obj.id === individualContact.relationship;
  // });

  // ****************************************************************

  const contactInfo = {
    name: editName,
    photo: editPhoto,
    number: editNumber,
    email: editEmail,
    title: editTitle,
    company: editCompany,
    relationship: editRelationShip,
  };

  const EditContact = (contactInfo) => {
    const serverURL = 'http://localhost:9000';
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
      // errorMessage();
      navigate(`/edit/${contactId}`, { replace: false });
    }
  };

  // useEffect(() => {
  //   setNewRelationship(editRelationShip);
  // }, [editRelationShip]);

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
          <Form className='fs-4' onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                size='lg'
                type='text'
                // placeholder={individualContact.name}
                onChange={(e) => setEditName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='photo'>
              <Form.Label>Photo Url</Form.Label>
              <Form.Control
                size='lg'
                // placeholder={individualContact.photo}
                onChange={(e) => setEditPhoto(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='number'>
              <Form.Label>Number</Form.Label>
              <Form.Control
                size='lg'
                type='number'
                // placeholder={individualContact.number}
                onChange={(e) => setEditNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                size='lg'
                type='email'
                // placeholder={individualContact.email}
                onChange={(e) => setEditEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='company'>
              <Form.Label>Company</Form.Label>
              <Form.Control
                size='lg'
                type='text'
                // placeholder={individualContact.company}
                onChange={(e) => setEditCompany(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                size='lg'
                type='text'
                // placeholder={individualContact.title}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Select
              aria-label='Default select example'
              size='lg'
              // placeholder={foundGroupName.name}
              onChange={(e) => setEditRelationship(e.target.value)}
            >
              {groupData.map((rele) => {
                return (
                  <option key={rele.id} value={rele.name}>
                    {rele.name}
                  </option>
                );
              })}
            </Form.Select>
            <Button type='submit' className='mt-5 w-100 fs-4' variant='success'>
              Save Changes
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>{/* <img src={avatar1} alt='' /> */}</Col>
      </Row>
    </Container>
  );
};

export default EditContact;
