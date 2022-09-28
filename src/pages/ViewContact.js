import React, { useEffect } from 'react';
import {
  Col,
  Container,
  Row,
  Button,
  ListGroup,
  Spinner,
} from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const ViewContact = ({
  loading,
  setLoading,
  setErrorMessage,
  individualContact,
  setIndividualContact,
  groupData,
  setGroupData,
}) => {
  const { contactId } = useParams();

  // Using id from view contact id to grab data from server
  const getContactDataById = (contactId) => {
    const serverURL = 'https://contact-manager-back.onrender.com';
    let dataURL = `${serverURL}/contacts/${contactId}`;
    return axios.get(dataURL);
  };

  const settingContactData = async () => {
    try {
      setLoading(true);
      let res = await getContactDataById(contactId);
      setLoading(false);
      setIndividualContact(res.data);
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
    // const serverURL = '  http://localhost:9000';
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

  // Get the right Group by compareing IDs

  const foundGroupName = groupData.find((obj) => {
    return obj.id === individualContact
      ? individualContact.relationship
      : individualContact;
  });

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
        <Container
          className='  position-absolute top-50 start-50 translate-middle border-2 rounded shadow bg-body rounded position-relative w-50 view-contact-wrapper'
          id='view-contact'
        >
          <Row
            id='view-contact-container'
            className='border border-warning border border-2 p-5 d-flex justify-content-between '
          >
            <Col className='d-flex justify-content-center align-items-center px-5'>
              <img
                src={individualContact ? individualContact.photo : ''}
                alt=''
                className='view-contact-avatar'
              />
            </Col>
            <Col>
              <ListGroup className='w-100 mb-4 fs-3 view-list'>
                <ListGroup.Item className='view-list-item'>
                  Name: {individualContact ? individualContact.name : ''}
                </ListGroup.Item>
                <ListGroup.Item className='view-list-item'>
                  Number: {individualContact ? individualContact.number : ''}
                </ListGroup.Item>
                <ListGroup.Item className='view-list-item'>
                  Email: {individualContact ? individualContact.email : ''}
                </ListGroup.Item>
                <ListGroup.Item className='view-list-item'>
                  Title: {individualContact ? individualContact.title : ''}
                </ListGroup.Item>
                <ListGroup.Item className='view-list-item'>
                  Relationship: {foundGroupName ? foundGroupName.name : ''}
                </ListGroup.Item>
              </ListGroup>
              <Link to='/'>
                <Button
                  variant='warning'
                  className='w-100 fs-3'
                  id='view-contact-back-button'
                >
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
