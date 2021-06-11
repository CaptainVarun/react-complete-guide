import React from "react";
import Card from "../../UI/Card/Card";
import styles from "./UsersList.module.css";

const UserList = ({ users }) => {
  return (
    <Card className={styles.users}>
      <ul> 
        {users.map((e) => {
          return <li key={e.id}> {e.username} ({e.age} years old) </li>;
        })}
      </ul>
    </Card>
  );
};

export default UserList;
