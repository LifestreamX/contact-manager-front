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
  const [search, setSearch] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);

  // Grabbing contact data on original page load
  const grabServerContactData = () => {
    const serverURL = 'http://localhost:9000';
    let dataURL = `${serverURL}/contacts`;
    return axios.get(dataURL);
  };

  const data = async () => {
    setLoading(true);
    let res = await grabServerContactData();
    // console.log(res.data);
    setContacts(res.data);
    setLoading(false);
  };

  useEffect(() => {
    data();
  }, []);

  // Delete logic
  const deleteContact = (contactId) => {
    const serverURL = 'http://localhost:9000';
    let dataURL = `${serverURL}/contacts/${contactId}`;
    return axios.delete(dataURL);
  };

  const handleDelete = async (contactId) => {
    try {
      let res = await deleteContact(contactId);
      if (res) {
        data();
      }
    } catch {}
  };

  // Search logic

  // useEffect(() => {
  //   setContacts((prev) =>
  //     prev.filter((f) => f.name.toLowerCase().startsWith(search))
  //   );
  // }, [search]);

  const filter = () => {
    let result = contacts.filter((f) =>
      f.name.toLowerCase().startsWith(search)
    );

    setFilteredContacts(result);
  };

  useEffect(() => {
    filter();
  }, [search]);

  // Reset search
  const resetSearch = () => {
    const serverURL = 'http://localhost:9000';
    let dataURL = `${serverURL}/contacts`;
    return axios.get(dataURL);
  };

  const reset = async () => {
    let res = await resetSearch();
    setContacts(res.data);
  };

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
        <Container className='contact-list-wrapper position-relative  px-5 py-4 '>
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
              <InputGroup className='mb-3 mx-2  w-25 d-flex justify-content-evenly'>
                <FormControl
                  placeholder='Search Contact'
                  aria-label='contact'
                  aria-describedby='basic-addon2'
                  className='fs-4'
                  onChange={(e) => setSearch(e.target.value)}
                />
              </InputGroup>
            </Col>
          </Row>

          <Row className=' contact-list-section w-100 justify-content-center'>
            {filteredContacts.map((contact) => (
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
                        <Link to={`/edit/${contact.id}`}>
                          <Button variant='success'>
                            <FontAwesomeIcon icon={faPen} />
                          </Button>
                        </Link>
                        {/* Delete button */}
                        <Button
                          variant='danger'
                          onClick={() => handleDelete(contact.id)}
                        >
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
