import React from 'react'
import StripeCheckout from 'react-stripe-checkout';

 
function StripeButton(){
 const onToken = (token) => {
    console.log(token)
  }

  // ...

  
    return (
      // ...
      <StripeCheckout
        label='Pay Now'
        email={false}
        name='Pizza Palace'
        token={onToken}
        stripeKey={process.env.REACT_APP_STRIPE_SECRET}
      />
    )
  
}

export default StripeButton;