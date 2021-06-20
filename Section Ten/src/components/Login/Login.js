import React, { useEffect, useState, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';

import Input from '../UI/Input/Input';

const emailReducer = (state, action) => {

  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') }
  } else if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.valid }
  }

  return { value: '', isValid: false }
}

const passwordReducer = (state, action) => {

  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6 }
  } else if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.valid }
  }

  return { value: '', isValid: false }
}

const Login = (props) => {
  const authCtx = useContext(AuthContext)

  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  //  const [enteredPassword, setEnteredPassword] = useState('');
  //  const [passwordIsValid, setPasswordIsValid] = useState();  
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: true })
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: '', isValid: true })

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500)
    return () => {
      clearTimeout(identifier)
    }
  }, [emailIsValid, passwordIsValid])

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value })

    // setFormIsValid(event.target.value.includes('@') && passwordState.value.trim().length > 6);
  }

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value })

    // setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  }

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' })
  }

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'INPUT_BLUR' })
  }



  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {

    } else {

    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>

        <Input id="email" type="email" value={emailState.value} onChange={emailChangeHandler} onBlur={validateEmailHandler} isValid={emailState.isValid}> </Input>
        <Input id="password" type="password" value={passwordState.value} onChange={passwordChangeHandler} onBlur={validatePasswordHandler} isValid={passwordState.isValid}> </Input>

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
