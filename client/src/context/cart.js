import React, { useReducer, createContext,useContext,useEffect } from "react";
import _ from 'lodash';



const CartContext = createContext()

const initialState = {
    cart: JSON.parse(localStorage.getItem("cart")) || [],
    
  };


  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_SONG":
       
        const item=action.payload
        console.log(item)
        return {
          cart:[...state.cart, item]
        };
     
      case "DEL_SONG":
     const removeElements = _.filter(state.cart, obj => action.payload!==obj.id);
    
      return {
            
           cart: removeElements
            
          
        };
      
      default:
        throw new Error();
    }
  };

  export const  CartProvider = props =>{
    const[state,dispatch] = useReducer(reducer,initialState);
  
    useEffect(() => {
        localStorage.setItem(
          "cart",
          JSON.stringify(state.cart)
        );
        
      });
    

      const deleteProduct = id => {
        console.log(id)
        dispatch({
          type: "DEL_CART",
          payload: id
        });
      };
    
      const addCart = product => {
        
        dispatch({
          type: "ADD_SONG",
          payload: product
        });
      };

      return(
        <CartContext.Provider value={{cart:state.cart,addCart,deleteProduct}}>
            {props.children}

        </CartContext.Provider>

      )



  };

  export const useStore=()=>useContext(CartContext);