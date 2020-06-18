import React from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {useStore} from '../context/cart'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme=>({
    root:{
        
    }
   
}));




function MiniHeader(){
    const classes = useStyles();
    const {cart} = useStore();

   const total=cart.reduce((prev, cur) => prev + cur.total, 0)
   const quantity= cart.reduce((prev, cur) => prev + cur.quantity, 0)

return(
    <>
      <div> <div>{quantity}</div> <ShoppingCartIcon style={{verticalAlign: 'middle'}} /> </div>
    <h2>${total.toFixed(2)}</h2>


    </>
)

}

export default MiniHeader;