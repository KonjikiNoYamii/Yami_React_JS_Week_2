import { createContext, useContext, useReducer } from "react";
import { cartReducers, initialCart } from "../reducers/cartReducers";

export const CartContext = createContext()

export function CartProvider({children}) {
    const [state, dispatch] = useReducer(cartReducers, initialCart)

    const addCart= (product) =>{
        dispatch({type:"addCart", payload: product})
    }

    const removeCart = (id) =>{
        dispatch({type: "removeCart", payload: id})
    }

    return(
        <CartContext.Provider value={{item: state.item, addCart,removeCart}}>
            {children}
        </CartContext.Provider>
    )
}
