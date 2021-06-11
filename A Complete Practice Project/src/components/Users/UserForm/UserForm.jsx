import React, { useState } from "react";
import Card from "../../UI/Card/Card";
import Modal from "../../UI/Modal/Modal";
import Button from "../../UI/Button/Button";

import styles from "./UserForm.module.css";

const UserForm = (props) => {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState();

  const usernameSetter = (e) => setUsername(e.target.value);

  const ageSetter = (e) => setAge(e.target.value);

  const handleClose = () => setError(null);

  const addUserHandler = (e) => {
    e.preventDefault();

    if (username.trim().length === 0 || age.trim().length === 0)
      return setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values).",
      });

    if (+age < 1)
      return setError({
        title: "Invalid input",
        message: "Please enter a valid age (>0).",
      });

    props.onUserAdd({
      username: username,
      age: age,
    });

    setUsername("");
    setAge("");
  };

  return (
    <div>
      {error && <Modal fields={error} handleClose={handleClose} />}
      <Card className={styles.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            value={username}
            id="username"
            type="text"
            onChange={usernameSetter}
          />
          <label htmlFor="age">Age</label>
          <input value={age} id="age" type="text" onChange={ageSetter} />
          <Button type="submit">Submit</Button>
        </form>
      </Card>
    </div>
  );
};

export default UserForm;
