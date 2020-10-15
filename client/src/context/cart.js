import React, { useReducer, createContext,useContext,useEffect } from "react";




const CartContext = createContext()

const initialState = {
    cart: JSON.parse(localStorage.getItem("cart")) || [],
   

    
  };

  
  const reducer = (state, action) => {

    let updatedCart;
    let updatedItemIndex;
    

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
            updatedItem.total=(updatedItem.price*updatedItem.quantity)
            updatedCart[updatedItemIndex] = updatedItem;
        }

        return {...state, cart: updatedCart};
     
      case "DEL_SONG":
        updatedCart = [...state.cart];
        updatedItemIndex = updatedCart.findIndex(
            item => item.id === action.payload
        );

        updatedCart.splice(updatedItemIndex, 1);

        return {...state, cart: updatedCart};

        case "INCREMENT":
          updatedCart = [...state.cart];
          updatedItemIndex = updatedCart.findIndex(
              item => item.id === action.payload
          );

          const incrementedItem = {
              ...updatedCart[updatedItemIndex]
          };

          incrementedItem.quantity++;

          updatedCart[updatedItemIndex] = incrementedItem;


          return {...state, cart: updatedCart};

          case "DECREMENT":
            updatedCart = [...state.cart];
            updatedItemIndex = updatedCart.findIndex(
                item => item.id === action.payload
            );

            const decrementedItem = {
                ...updatedCart[updatedItemIndex]
            };

            decrementedItem.quantity--;

            updatedCart[updatedItemIndex] = decrementedItem;

            return {...state, cart: updatedCart};

            case "DeleteALL":
              const deleteCart = [];

              return {cart:deleteCart};

      
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

      const increment = id =>{
        dispatch({
          type:"INCREMENT",
          payload:id
        });
      };

      const decrement = id =>{
        dispatch({
          type:"DECREMENT",
          payload:id
        })
      }
    
      

      const deleteProduct = id => {
        
        dispatch({
          type: "DEL_SONG",
          payload: id
        });
      };
    
      const addCart = product => {
        
        dispatch({
          type: "ADD_SONG",
          payload: product
        });
      };

      const deleteCart=()=>{
        dispatch({
          type:"DeleteALL"
        })
      }

      return(
        <CartContext.Provider value={{cart:state.cart,addCart,deleteProduct, increment,decrement,deleteCart}}>
            {props.children}

        </CartContext.Provider>

      )



  };

  export const useStore=()=>useContext(CartContext);