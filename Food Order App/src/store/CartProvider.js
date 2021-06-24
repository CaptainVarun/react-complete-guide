import React, { useReducer } from 'react'
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {

    if (action.type === `ADD_ITEM_TO_CART`) {

        const newTotalAmount = state.totalAmount + (action.item.price * action.item.amount);

        let existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id) // check if present, if it is then find index

        const existingCartItem = state.items[existingCartItemIndex] // if item is in state then grab that item

        let updatedItems

        if (existingCartItem) {
            // update cart items
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem
        } else {
            // new cart item
            updatedItems = state.items.concat(action.item)
        }

        return {
            items: updatedItems,
            totalAmount: newTotalAmount
        }
    }

    if (action.type === `REMOVE_ITEM_FROM_CART`) {

        const existingCartItemIndex = state.items.findIndex(item => item.id === action.id) // check if present, if it is then find index

        const existingCartEntry = state.items[existingCartItemIndex] // if item is in state thenn grab that item

        const newTotalAmount = state.totalAmount - existingCartEntry.price

        let currentUpdatedItems

        if (existingCartEntry) {
            if (existingCartEntry.amount === 1) {
                currentUpdatedItems = state.items.filter((item) => {
                    return item.id !== action.id
                })
            } else {
                let currentUpdatedItem = { ...existingCartEntry, amount: existingCartEntry.amount - 1 }
                currentUpdatedItems = [...state.items];
                currentUpdatedItems[existingCartItemIndex] = currentUpdatedItem
            }
        }

        return {
            items: currentUpdatedItems,
            totalAmount: newTotalAmount
        }

    }
    return defaultCartState
}

const CartProvider = props => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

    const addItemToCartHandler = (item) => {
        dispatchCartAction({ type: `ADD_ITEM_TO_CART`, item: item })
    }

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({
            type: `REMOVE_ITEM_FROM_CART`, id: id
        })
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }
    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider >
}

export default CartProvider;