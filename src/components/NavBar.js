import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  return (
    <Nav
      defaultActiveKey='/home'
      as='ul'
      className='navbar-dark bg-dark  sticky-top  nav-wrapper'
    >
      <Nav.Item as='li' className='w-100'>
        <Nav.Link as={Link} to={'/'} className='text-white  '>
          <div className='d-flex w-100 justify-content-center align-items-center flex-column'>
            <span className='fs-4 fw-bolder nav-text mx-1 '>Contact App</span>
            <FontAwesomeIcon
              icon={faPhone}
              className='fs-4 hover-zoom nav-info my-2'
            />
          </div>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default NavBar;
