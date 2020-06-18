import React, { useReducer, createContext,useContext,useEffect } from "react";
import _ from 'lodash';



const CartContext = createContext()

const initialState = {
    cart: JSON.parse(localStorage.getItem("cart")) || [],
   

    
  };

  
  const reducer = (state, action) => {

    let updatedCart;
    let updatedItemIndex;
    
console.log(state)

    switch (action.type) {
      case "ADD_SONG":
        
       
        updatedCart = [...state.cart];
        updatedItemIndex = updatedCart.findIndex(item => item.id === action.payload.id);
        

        if(updatedItemIndex < 0) {
            updatedCart.push({...action.payload, quantity: 1, total:action.payload.price});
        } else {
            
            const updatedItem = {
                ...updatedCart[updatedItemIndex]
            };
            
            updatedItem.quantity++;
            updatedItem.total=updatedItem.price*updatedItem.quantity
            updatedCart[updatedItemIndex] = updatedItem;
        }

        return {...state, cart: updatedCart};
     
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