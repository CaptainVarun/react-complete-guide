import React, { createContext } from 'react';

const defaultValue = {
    items: [],
    totalAmount: 0,
    addItem: (item) => { },
    removeItem: (id) => { }
}

const CartContext = createContext(defaultValue)

export default CartContext