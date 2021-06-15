import React, { useRef, useState } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import classes from './AddUser.module.css';

const AddUser = (props) => {
  const [error, setError] = useState();

  const inUsername = useRef()
  const inAge = useRef()

  const addUserHandler = (event) => {
    event.preventDefault();

    const enteredName = inUsername.current.value
    const enteredUserAge = inAge.current.value

    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      setError({ title: 'Invalid input', message: 'Please enter a valid name and age (non-empty values).', });
      return;
    }
    if (+enteredUserAge < 1) {
      setError({ title: 'Invalid age', message: 'Please enter a valid age (> 0).', });
      return;
    }

    props.onAddUser(enteredName, enteredUserAge);

    inUsername.current.value = ''
    inAge.current.value = ''

  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text" 
            ref={inUsername}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number" 
            ref={inAge}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </>
  );
};

export default AddUser;
