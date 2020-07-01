import React,{useState} from 'react';
import { useMutation } from '@apollo/react-hooks';
import {SIGNUP_USER} from '../graphql/mutation';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useStore } from '../context/token';



const useStyles = makeStyles(theme=>({
    root:{
        backgroundColor:"#ff0000",
        height:"270px",
        padding:"50px",
       
        width:"270px",
        position:"absolute",
        top:"38%",
        left:"38%",
        justifyContent: 'center',
        
        
        
        
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            
            
            width: 270,
            
        }
    },
    button:{
        margin:"1rem 0.5rem"
    }
   
}));

const DEFAULT_SIGNUP={
    name:"",
    email:"",
    password:"",
     
}





function Signup (props){

    const classes = useStyles();
    const[signup,setSignup] = useState(DEFAULT_SIGNUP)
    const [signupUser]= useMutation(SIGNUP_USER);
    const {addToken,setUser} = useStore()

   
    
    

    function handleChange (event) {
        const{name,value}=event.target;
        setSignup(prevsignup=>({
          ...prevsignup,
          [name]:value
        })); 
      }

      async function submitHandle(event){
        event.preventDefault();
        
        try{
        const token = await signupHandler();
        addToken(token);
    
        }catch(err){
          
          throw err;
        }
       
        props.history.push("/menu/pizza")
      }


  async function signupHandler(){
    
    const{name,email,password}=signup
    
    let response;
    try{
          response = await signupUser({
          variables:{
            name,
            email,
            password
      }})
      
    }catch(err){
         throw(err)
     } 
       const{token}=response.data.signupUser
       setUser(response.data.signupUser.user);
       
       
       return {token, user:response.data.signupUser.user};
  
    }
  
return(
    <form className={classes.root} onSubmit={event=>submitHandle(event)} noValidate autoComplete="off">
      <div>
        
        <TextField label="Name" name="name" onChange={handleChange}/>
      </div>
      <div>
        
        <TextField label="Email" name="email" onChange={handleChange} />
      </div>
      <div>
       
        <TextField
          label="Password"
          id="outlined-size-normal"
          onChange={handleChange}
          type="password"
          
          name="password"
          
         
        />
      </div>
      <Button className={classes.button} variant="contained" type="submit" color="primary" >
        Sign Up
      </Button>

    </form>
);

}

export default Signup;