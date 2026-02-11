import React, { createContext, useContext, useReducer } from "react";

const cartStateContext = createContext();
const cartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          price: action.price,
          qty: action.qty,
          size: action.size,
          img: action.img,
        },
      ];

    case "REMOVE":
      let newArr = [...state];
      newArr.splice(action.index, 1);
      return newArr;
      
      case "UPDATE":
        return state.map((food) => {
          if (food.id === action.id && food.size === action.size) {
            const updatedQty = parseInt(action.qty) + food.qty;
            const updatedPrice = action.price + food.price;
            console.log("Updating item in state:", { ...food, qty: updatedQty, price: updatedPrice });
            return {
              ...food,
              qty: updatedQty,
              price: updatedPrice,
            };
          }
          return food;
        });

      case "DROP": let emptyArr=[]
                   return emptyArr

    default:
      break;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <cartStateContext.Provider value={state}>
      <cartDispatchContext.Provider value={dispatch}>
        {children}
      </cartDispatchContext.Provider>
    </cartStateContext.Provider>
  );
};

export const useCartStateContext = () => useContext(cartStateContext);
export const useCartDispatchContext = () => useContext(cartDispatchContext);
