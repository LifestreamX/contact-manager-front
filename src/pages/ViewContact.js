import React, { useEffect, useState } from 'react';
import {
  Col,
  Container,
  Row,
  Form,
  Button,
  ProgressBar,
  ListGroup,
  Spinner,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

// import avatar1 from '../../public/images/man.png';

const ViewContact = ({
  loading,
  setLoading,
  errorMessage,
  setErrorMessage,
  contacts,
  setContacts,
  individualContact,
  setIndividualContact,
  groupData,
  setGroupData,
}) => {
  const { contactId } = useParams();

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
      console.log(individualContact.relationship);
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

  // Get the right Group by compareing IDs

  const foundGroupName = groupData.find((obj) => {
    return obj.id === individualContact.relationship;
  });
  // console.log(foundGroupName);

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
        <Container className='position-absolute top-50 start-50 translate-middle border-2 rounded shadow   bg-body rounded position-relative w-50 '>
          <Row className='border border-warning border border-2 p-5 d-flex justify-content-between '>
            <Col className='d-flex justify-content-center '>
              <img
                src={individualContact.photo}
                alt=''
                className='view-contact-avatar  rounded-circle'
              />
            </Col>
            <Col>
              <ListGroup className='w-100 mb-4 fs-3'>
                <ListGroup.Item>Name: {individualContact.name}</ListGroup.Item>
                <ListGroup.Item>
                  Number: {individualContact.number}
                </ListGroup.Item>
                <ListGroup.Item>
                  Email: {individualContact.email}
                </ListGroup.Item>
                <ListGroup.Item>
                  Title: {individualContact.title}
                </ListGroup.Item>
                <ListGroup.Item>
                  Relationship: {foundGroupName.name}
                </ListGroup.Item>
              </ListGroup>
              <Link to='/'>
                <Button variant='warning' className='w-75 fs-3'>
                  Back
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default ViewContact;
