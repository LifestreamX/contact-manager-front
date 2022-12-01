import React, { useEffect, useState, Fragment, useMemo } from 'react';

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
  Modal,
  Alert,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faEye,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';
import axios from 'axios';

const ContactList = ({ loading, setLoading, contacts, setContacts }) => {
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(false);
  const [modalIdInfo, setModalIdInfo] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Grabbing contact data on original page load
  const grabServerContactData = () => {
    const serverURL = 'https://contact-manager-back.onrender.com';
    let dataURL = `${serverURL}/contacts`;
    return axios.get(dataURL);
  };

  const data = async () => {
    setLoading(true);
    let res = await grabServerContactData();
    setContacts(res.data);
    setLoading(false);
  };

  useEffect(() => {
    data();
  }, []);

  // Search logic
  const filteredItems = useMemo(() => {
    if (!search) return contacts;

    return contacts.filter((contact) => {
      return contact.name.toLowerCase().startsWith(search.toLowerCase());
    });
  }, [search, contacts]);

  // Delete logic
  const deleteContact = (contactId) => {
    // const serverURL = 'http://localhost:9000';
    const serverURL = 'https://contact-manager-back.onrender.com';
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

  // Window length responsive hook
  const size = useWindowSize();

  function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
    useEffect(() => {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      // Add event listener
      window.addEventListener('resize', handleResize);
      // Call handler right away so state gets updated with initial window size
      handleResize();
      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
  }

  return (
    <>
      {/* While data is loading spinner */}
      {loading ? (
        <div className='spinner-wrapper'>
          <Spinner
            animation='border'
            role='status'
            className='loading-spinner '
            style={{ width: '120px', height: '120px' }}
          >
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Container className=' contact-list-wrapper position-relative  px-5 py-4 '>
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
            <Col classname='search-col'>
              {contacts.length > 1 && (
                <InputGroup
                  className='mb-3 mx-2  w-25 d-flex justify-content-evenly'
                  id='search-input'
                >
                  <FormControl
                    placeholder={'Search Contact ...'}
                    aria-label='contact'
                    aria-describedby='basic-addon2'
                    className='fs-4 search-input'
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </InputGroup>
              )}
            </Col>
          </Row>

          {/* Card section */}
          <Row className=' contact-list-section w-100 justify-content-center'>
            {filteredItems.map((contact) => (
              <React.Fragment key={contact.id}>
                {/* Contact profile information */}
                <Col className='d-flex w-100 g-5 card-col  '>
                  <Row className='w-100 card-wrap'>
                    <Card className='p-3 contact-row  card '>
                      {/* Left of card avatar */}
                      <Card.Body className='d-flex card-body w-100 '>
                        <Col className='d-flex align-items-center p-1 '>
                          <Card.Img
                            variant='top'
                            src={contact.photo}
                            className='avatar-images '
                          />
                        </Col>
                        {/* Middle of card information */}
                        <Col
                          className='card-info d-flex align-items-center justify-content-center p-1 '
                          xs={7}
                        >
                          <ListGroup className='fs-5 '>
                            <ListGroup.Item className='contact-text'>
                              Name:{size.width < 768 && <br />} {contact.name}
                            </ListGroup.Item>
                            <ListGroup.Item className='contact-text'>
                              Phone Number: {size.width < 768 && <br />}{' '}
                              {contact.number}
                            </ListGroup.Item>
                            <ListGroup.Item className='contact-text'>
                              Email: {size.width < 768 && <br />}{' '}
                              {contact.email}
                            </ListGroup.Item>
                          </ListGroup>
                        </Col>
                        {/* Right side of card icons */}
                        <Col
                          className='d-flex p-1 mx-1 d-flex flex-column justify-content-between align-items-start'
                          id='card-icons'
                        >
                          {/* View Button */}
                          <Link
                            to={`/view/${contact.id}`}
                            className='card-icon'
                          >
                            <Button variant='warning'>
                              <FontAwesomeIcon icon={faEye} />
                            </Button>
                          </Link>
                          {/* Edit button */}
                          <Link
                            to={`/edit/${contact.id}`}
                            className='card-icon'
                          >
                            <Button variant='success'>
                              <FontAwesomeIcon icon={faPen} />
                            </Button>
                          </Link>

                          {/* Modal for delete confirm */}
                          <Button
                            variant='danger'
                            onClick={() => {
                              handleShow();
                              setModalIdInfo(contact.id);
                            }}
                            className='card-icon'
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>

                          <Modal
                            show={show}
                            onHide={handleClose}
                            animation={false}
                            className='delete-modal '
                          >
                            <Modal.Header closeButton></Modal.Header>
                            <Modal.Body>
                              <Alert
                                variant='danger'
                                className='fs-4 text-black'
                              >
                                Are you sure you want to permanently delete this
                                contact?
                              </Alert>
                            </Modal.Body>
                            <Modal.Footer className='d-flex justify-content-center'>
                              <Button
                                variant='danger'
                                className='btn btn-lg  w-25 fs-4  '
                                onClick={() => {
                                  handleDelete(modalIdInfo);
                                  handleClose();
                                }}
                              >
                                DELETE
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </Col>
                      </Card.Body>
                    </Card>
                  </Row>
                </Col>
              </React.Fragment>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
};

export default ContactList;
