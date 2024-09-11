import React, { createContext, useContext, useReducer } from 'react';

// Define the context for cart state and dispatch
const CartStateContext = createContext();
const CartDispatchContext = createContext();

// Reducer to handle actions related to the cart
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      // Check if the item already exists in the cart
      const existingItem = state.find(item => item._id === action.payload._id && item.size === action.payload.size);

      if (existingItem) {
        // Update the quantity of the existing item
        return state.map(item =>
          item._id === action.payload._id
            ? { ...item, qty: item.qty + action.payload.qty }
            : item
        );
      } else {
        // Add new item to the cart
        return [...state, action.payload];
      }
    case 'REMOVE_ITEM':
      // Remove the item with matching _id
      return state.filter(item => item._id !== action.payload._id);

    case 'EMPTY_CART':
      // Remove all items from the cart
      return [];

    default:
      return state;
  }
};


// Custom Provider component
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(reducer, []); // useReducer inside a component

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={cart}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

// Custom hooks to use the cart state and dispatch
export const useCart = () => useContext(CartStateContext);
export const useCartDispatch = () => useContext(CartDispatchContext);
