import React, { useContext, useEffect, useState } from 'react';

import classes from './HeaderCartButton.module.css';

import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {
  const context = useContext(CartContext);

  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const { items } = context;

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ''
  }`;

  useEffect(() => {
    if (items.length === 0) return;
    setBtnIsHighlighted(true);
    const identifier = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(identifier);
    };
  }, [items]);

  const numberOfItems = items.reduce((current, item) => {
    return current + item.amount;
  }, 0);

  return (
    <button className={btnClasses} onClick={props.clickHandler}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfItems}</span>
    </button>
  );
};

export default HeaderCartButton;
