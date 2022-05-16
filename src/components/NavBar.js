import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  return (
    <Nav defaultActiveKey='/home' as='ul' className='navbar-dark bg-dark p-2'>
      <Nav.Item as='li' className='w-100'>
        <Nav.Link as={Link} to={'/'} className='text-white mx-5 '>
          <FontAwesomeIcon
            icon={faPhone}
            className='fs-4 hover-zoom nav-info'
          />{' '}
          <span className='mx-1 fs-4 fw-bolder '>Contact App</span>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default NavBar;
