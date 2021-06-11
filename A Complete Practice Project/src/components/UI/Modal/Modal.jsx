import React from "react";
import styles from "./Modal.module.css";
import Card from "../Card/Card";
import Button from "../Button/Button";

const Modal = (props) => {
  return (
    <div> 
    <div onClick={props.handleClose} className={styles.backdrop} />  
      <Card className={styles.modal}>
        <header className={styles.header}>
          <h2>{props.fields.title}</h2>
        </header>
        <div className={styles.content}>{props.fields.message}</div>
        <footer className={styles.actions}>
          <Button onClick={props.handleClose}>Okay</Button>
        </footer> 
      </Card>
    </div>
  );
};

export default Modal;
