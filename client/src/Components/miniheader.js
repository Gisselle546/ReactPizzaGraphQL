import React from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {useStore} from '../context/cart'
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'

const useStyles = makeStyles(theme=>({

   
    quantity:{
        borderRadius:"100px",
        backgroundColor:"#ce0018",
        padding:"4px",

       

    }
   
   
}));




function MiniHeader(){
    const classes = useStyles();
    const {cart} = useStore();

   const total=cart.reduce((prev, cur) => prev + cur.total, 0)
   const quantity= cart.reduce((prev, cur) => prev + cur.quantity, 0)

return(
    <>
      <div style={{marginLeft:"100px"}}> <div  className={classes.quantity}>{quantity}</div> <Link to="/cart"> <ShoppingCartIcon style={{verticalAlign: 'middle', size:"medium", color:"white",marginRight:"10px" }} /></Link> </div>
    <h2 className={classes.total}>${total.toFixed(2)}</h2>


    </>
)

}

export default MiniHeader;