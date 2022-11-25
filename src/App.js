import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ContactList from './pages/ContactList';
import AddContact from './pages/AddContact';
import EditContact from './pages/EditContact';
import ViewContact from './pages/ViewContact';

function App() {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  // View contact state
  const [individualContact, setIndividualContact] = useState();
  const [groupData, setGroupData] = useState([]);
  // Add contact state
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [relationship, setRelationship] = useState('');
  const [relationShipInfo, setRelationshipInfo] = useState([]);

  return (
    <div className='app-wrapper'>
      <NavBar />
      <Routes>
        <Route
          path={'/'}
          element={
            <ContactList
              loading={loading}
              setLoading={setLoading}
              contacts={contacts}
              setContacts={setContacts}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          }
        />
        <Route
          path={'/add'}
          element={
            <AddContact
              name={name}
              setName={setName}
              photo={photo}
              setPhoto={setPhoto}
              number={number}
              setNumber={setNumber}
              email={email}
              setEmail={setEmail}
              title={title}
              setTitle={setTitle}
              company={company}
              setCompany={setCompany}
              relationship={relationship}
              setRelationship={setRelationship}
              relationshipInfo={relationShipInfo}
              setRelationshipInfo={setRelationshipInfo}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          }
        />
        <Route
          path={'/view/:contactId'}
          element={
            <ViewContact
              loading={loading}
              setLoading={setLoading}
              setErrorMessage={setErrorMessage}
              individualContact={individualContact}
              setIndividualContact={setIndividualContact}
              groupData={groupData}
              setGroupData={setGroupData}
            />
          }
        />
        <Route
          path={'/edit/:contactId'}
          element={
            <EditContact
              loading={loading}
              setLoading={setLoading}
              setErrorMessage={setErrorMessage}
              individualContact={individualContact}
              groupData={groupData}
              setGroupData={setGroupData}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
