import React from 'react';
import {useStore} from '../context/cart';
import { makeStyles } from '@material-ui/core/styles';
import {Typography,Grid,Paper} from '@material-ui/core/';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import OrderItem from './orderItem';
import StripeButton from './checkoutCredit';


const useStyles = makeStyles(theme=>({
    root:{
        margin:"70px"

    },
    heading:{
        textTransform:"uppercase",
        fontFamily:'Chelsea Market'
        
    },
    paper:{
         borderRadius: 20,
         borderColor: "#000", 
         padding: 40,
         margin: "auto"

         
    },
    checkoutbutton:{
        backgroundColor:"#c40303",
        color:"#fff",
        "&:hover": {
            transform: "scale(0.9)",
            backgroundColor:"#c40303",
          }
       

        
    }
    
   
}));






function OrderSummary(){

    const classes = useStyles();
    const {cart} = useStore()
    const total=cart.reduce((prev, cur) => prev + cur.total, 0);
    const quantity= cart.reduce((prev, cur) => prev + cur.quantity, 0);
    
    const promise = loadStripe(process.env.REACT_APP_STRIPE_SECRET);

    function tax(total){
        const fee=total*0.07
        return fee.toFixed(2)
   }
   
   
   function completeTotal(total){
    return parseFloat(tax(total.toFixed(2)))+parseFloat(4.00)+parseFloat(total.toFixed(2));
   }

    return(
        <div className={classes.root}>
            <Typography className={classes.heading}variant="h3">Order</Typography>
                <Grid container spacing={3}>
            <      Grid item xs={12} md={8}>
                {
                    cart.map(item=>{
                        return <OrderItem  key={item.id} data={item}/>
                })
                }          
                    

                
                </Grid>
                <Grid item xs={12} md={4}>
        <Paper
      className={classes.paper}
      variant="outlined"
      square={true}
    >
        
      
                <Typography variant="h6">Subtotal: ${total.toFixed(2)}</Typography>
                {(total)?<Typography variant="h6">Delivery Fee: $4.00</Typography>:<Typography variant="h6">Delivery Fee: $0.00</Typography>}
                
                <Typography variant="h6">Tax: ${tax(total)}</Typography>
                {(total)?
                <Typography variant="h6"><em>Total: ${completeTotal(total)}</em></Typography>:<Typography variant="h6"><em>Total: $0.00</em></Typography>
                 }

        <Elements stripe={promise}>
           <StripeButton sum={completeTotal(total)}/>
        </Elements>
    
    
    </Paper>
  
      


        </Grid>

        </Grid>
        </div>
    )


}

export default OrderSummary;