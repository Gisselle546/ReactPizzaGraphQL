import React,{useState} from 'react'
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation } from '@apollo/react-hooks';
import {STRIPEPAYMENT} from '../graphql/mutation';
import CustomDialog from './dialog';
import { withRouter } from 'react-router-dom';
import { useStore } from '../context/cart'


const useStyles = makeStyles(theme=>({


card:{
  color: "#32325d",
  fontFamily: 'Arial, sans-serif',
  fontSmoothing: "antialiased",
  fontSize: "16px",
  "::placeholder": {
    color: "#32325d"
  }
},
button:{
  width:"100%"
}


}));

function StripeButton(props){
  const stripe = useStripe();
  const elements = useElements();
  const classes = useStyles()
  const [stripeCharge]= useMutation(STRIPEPAYMENT);
  const [modal,showModal]=useState(false);
  const {deleteCart} = useStore();
  
  function closeDialog(){
    showModal(false)
    props.history.push('/')
  }
 
 const handleSubmit = async(event) => {
    event.preventDefault();
    
    const {error,paymentMethod} = await stripe.createPaymentMethod({
      type:"card",
      card: elements.getElement(CardElement), 
  
     
    });
    const {id} = paymentMethod;
    
    let response;

    

    try{
      response = await stripeCharge({
        variables:{
          id,
          amount:props.sum*100
          
    }});
    if(!error){
      showModal(true);
    }

    
    deleteCart();
    
   

 
    
    
    
    }catch(error){
      console.log(error);
    }
  };

  // ...
  
  
    return (
      <div style={{marginTop:"10px"}}>
      <CustomDialog title='Success!' open={modal} content="Payment Completed" onCloseModal={closeDialog}/>
      <form onSubmit={handleSubmit}>
      <CardElement className={classes.card}/>
      <Button className={classes.button} variant="contained" color="secondary" type="submit">
        Pay
     </Button>
    </form>
    </div>
    )
  
}

export default withRouter(StripeButton);