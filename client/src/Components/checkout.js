import React,{useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useStore } from '../context/token';
import {ADDADDRESS} from '../graphql/mutation';
import { useMutation } from '@apollo/react-hooks';
import {CircularProgress} from '@material-ui/core/';
import { useQuery } from '@apollo/react-hooks';
import {ME} from '../graphql/query';
import OrderSummary from './orderSummary';


const useStyles = makeStyles(theme=>({
    
    container:{
      margin:"70px"
    },
   
    button:{
      margin:"1rem 0.5rem"
  }
 
 }));

 const DEFAULT_CHECKOUT={
  address:"",
  city:"",
  state:"",
   
}

function Checkout(){
    const classes = useStyles()
    const{user,setUser} = useStore();
    const[updateUser] = useMutation(ADDADDRESS);
    const [modal,showModal]=useState(false)
    const[checkout,setCheckout] = useState(DEFAULT_CHECKOUT)
    const {data,loading,error, refetch } = useQuery(ME);


  console.log(user);

    function closeDialog(){
      showModal(false)
    }

   
    function handleChange (event) {
      const{name,value}=event.target;
      setCheckout(prevcheckout=>({
        ...prevcheckout,
        [name]:value
      })); 
    }

    

    async function signupHandler(event){
    
      event.preventDefault();

      const{address,city,state}=checkout
      
      
      let response;
      try{
            response = await updateUser({
            variables:{
              id:user.id,
              address,
              city,
              state
        }});
       
       
        
      }catch(err){
           console.log(err)
       } 
       

      
         console.log(response.data.address);

       const newuser ={...user};
       newuser.address.push(response.data.updateUser.address);
       
        setUser(newuser)
         
        return newuser;
      }

      if (loading) {
        return(
          <div style={{
             display:"flex",
             flexDirection:"column",
             alignItems:"center",
             marginTop:"40px"
          }}
          >
             <CircularProgress/>
          </div>
       )
        }
        if (error) {
          return console.dir(error)
        }
      
        
      
      console.log(data.me.address)
      
    return(
       
     <>
     

    
      
    
          {(data.me.address.length===0)?(

    
    <div className={classes.container}>
    <Typography variant="h6" gutterBottom>
        Delivery address
      </Typography>
      <Grid container spacing={3}>
        <Grid item md={6}>
        <form className={classes.root} onSubmit={event=>signupHandler(event)} noValidate autoComplete="off">
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="address1"
            name="address"
            label="Address"
            fullWidth
            autoComplete="shipping address-line1"
            onChange={handleChange}
          />
        </Grid>
       
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="state" name="state" label="State/Province/Region" fullWidth onChange={handleChange}/>
          <Button className={classes.button} variant="contained" onClick={()=>showModal(true)}type="submit" color="primary" >
        Submit
      </Button>
          
        </Grid>
      </form>
        
        
     </Grid>
     
      </Grid>
      </div>
    ):(
      <OrderSummary/>
    )



}
  
  </>
);


}
export default Checkout;