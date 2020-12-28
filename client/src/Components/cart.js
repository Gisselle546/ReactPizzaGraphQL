import React from 'react';
import {useStore} from '../context/cart';
import { makeStyles } from '@material-ui/core/styles';
import {Typography,Grid,Paper,Button} from '@material-ui/core/';
import {Link} from 'react-router-dom';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import CartItems from './cartitems';


const useStyles = makeStyles(theme=>({
    root:{
        margin:"70px",
        [theme.breakpoints.down('xs')]: {
         
            margin:" 1px",
            padding:"0px"
             
             
         }

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




function ShoppingCart(){
   
    const classes = useStyles();
    const {cart} = useStore()
    const total=cart.reduce((prev, cur) => prev + cur.total, 0);
    const quantity= cart.reduce((prev, cur) => prev + cur.quantity, 0);
   

function tax(total){
     const fee=total*0.07*quantity
     return fee.toFixed(2)
}


function completeTotal(total){
 return parseFloat(tax(total.toFixed(2)))+parseFloat(4.00)+parseFloat(total.toFixed(2));
}



   
    return(
        
        <div className={classes.root}>
        <Typography className={classes.heading}variant="h3">cart</Typography>
        <Grid container spacing={3}>
         <Grid item xs={12} md={8}>
                <div>
                    {
                        !cart.length? <div> no items in cart</div>: cart.map(item=>{
                            return <CartItems key={item.id} data={item} />
                        })
                            
                    }

                </div>
        </Grid>
        <Grid item xs={12} md={4}>
        <Paper
      className={classes.paper}
      variant="outlined"
      square={true}
    >
       <Button disabled={!cart.length} size="large" endIcon={<ArrowForwardIcon/>} component={Link} to="/checkout"className={classes.checkoutbutton}>
          Checkout
        </Button>
                <Typography variant="h6">Subtotal: ${total.toFixed(2)}</Typography>
                {(total)?<Typography variant="h6">Delivery Fee: $4.00</Typography>:<Typography variant="h6">Delivery Fee: $0.00</Typography>}
                
                <Typography variant="h6">Tax: ${tax(total)}</Typography>
                {(total)?
                <Typography variant="h6"><em>Total: ${completeTotal(total)}</em></Typography>:<Typography variant="h6"><em>Total: $0.00</em></Typography>
                 }

    </Paper>



        </Grid>

        </Grid>
        </div>
    )
}

export default ShoppingCart;