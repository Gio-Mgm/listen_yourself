import React from 'react';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const NotFound = () => {
  return (
    <div className='not-found reset-container'>
    <Alert id="not-found" className="center" variant="danger">
      <h1>Error 404</h1>
      <p>This page doesn't exist</p>
      <Link to="/">Back to login page</Link>
    </Alert>
    </div>
  );
}

export default NotFound;
