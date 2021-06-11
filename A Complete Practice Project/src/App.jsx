import React, { useState } from 'react';
import UserForm from './components/Users/UserForm/UserForm';
import Modal from './components/UI/Modal/Modal.jsx';
import UserList from './components/Users/UserList/UserList';

const defaultList = [
   {username: 'Test', age: 12, id: '3353'}
]

function App() {
 
  const [users, setUsers] = useState(defaultList)
 
  const userAddHandler = (e) => {
    setUsers(prev => {
      return [...prev, {...e, id: Math.random().toString()}]
    })  
  }
    
  return (
    <div> 
      <UserForm onUserAdd={userAddHandler}/>
      <UserList users={users} />
    </div>
  );
}

export default App;
