import React, { useEffect, useState, Fragment } from 'react';

import {
  Container,
  Row,
  Col,
  InputGroup,
  Button,
  FormControl,
  Card,
  ListGroup,
  Spinner,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
// import avatar1 from '../images/man.png';
import axios from 'axios';

const ContactList = ({
  loading,
  setLoading,
  errorMessage,
  setErrorMessage,
  contacts,
  setContacts,
}) => {
  // Grabbing the data contacts from the server localhost9000 with axios
  const getAllContacts = () => {
    const serverURL = 'http://localhost:9000';
    const dataURL = `${serverURL}/contacts`;
    return axios.get(dataURL);
  };

  // Fetching the data that the ContactService component received
  let fetchData = async () => {
    try {
      setLoading(true);
      let res = await getAllContacts();
      setLoading(false);
      // console.log(res.data)
      setContacts(res.data);
      // console.log(contacts);
    } catch (error) {
      setLoading(false);
      setErrorMessage('Error');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {/* While data is loading spinner */}
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
        <Container className='contact-list-wrapper position-absolute top-50 start-50 translate-middle px-5 py-4 '>
          <Row>
            <Col className=' mx-2'>
              <div className='d-flex justify-content-start align-items-center my-5 '>
                {' '}
                <h1 className='text-center  fs-1'>Directory</h1>
                <div className='mx-3'>
                  {' '}
                  <Link to='add'>
                    <Button className='fs-5 mb-3'>
                      {' '}
                      Add <FontAwesomeIcon icon={faPlus} />
                    </Button>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
          {/* Input to search for Contacts */}
          <Row>
            <Col>
              <InputGroup className='mb-3 mx-2  w-25 '>
                <FormControl
                  placeholder='Search Contact'
                  aria-label='contact'
                  aria-describedby='basic-addon2'
                  className='fs-4'
                />

                <Button
                  variant='dark'
                  id='button-addon2'
                  type='submit'
                  value='Search'
                  className='fs-4'
                >
                  Search
                </Button>
              </InputGroup>
            </Col>
          </Row>

          <Row className=' contact-list-section w-100 justify-content-center'>
            {contacts.map((contact) => (
              <React.Fragment key={contact.id}>
                {/* Contact profile information */}
                <Col className='d-flex justify-content-start w-100'>
                  <Card className='p-2 m-2 '>
                    {/* Left of card avatar */}
                    <Card.Body className='d-flex '>
                      <Col className='d-flex align-items-center p-1 '>
                        <Card.Img
                          variant='top'
                          src={contact.photo}
                          className='avatar-images rounded-circle'
                        />
                      </Col>
                      {/* Middle of card information */}
                      <Col
                        className='d-flex align-items-center justify-content-center   p-1'
                        xs={7}
                      >
                        <ListGroup className='fs-5'>
                          <ListGroup.Item>Name: {contact.name}</ListGroup.Item>
                          <ListGroup.Item>
                            Number: {contact.number}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            Email: {contact.email}
                          </ListGroup.Item>
                        </ListGroup>
                      </Col>
                      {/* Right side of card icons */}
                      <Col className='d-flex  p-1 mx-1 d-flex flex-column justify-content-between align-items-start'>
                        {/* View Button */}
                        <Link to={`/view/${contact.id}`}>
                          <Button variant='warning'>
                            <FontAwesomeIcon icon={faEye} />
                          </Button>
                        </Link>
                        {/* Edit button */}
                        <Link to={`/edit/:contactId`}>
                          <Button variant='success'>
                            <FontAwesomeIcon icon={faPen} />
                          </Button>
                        </Link>
                        {/* Delete button */}
                        <Button variant='danger'>
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </Col>
                    </Card.Body>
                  </Card>
                </Col>

                {/* Bottom section contacts */}
                {/* <Row className='my-5 contact-list-section'></Row> */}
              </React.Fragment>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
};

export default ContactList;
