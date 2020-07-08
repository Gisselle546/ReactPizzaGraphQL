import React,{useState} from 'react';
import { useMutation } from '@apollo/react-hooks';
import {SIGNIN_USER} from '../graphql/mutation';
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
            
        },
        [theme.breakpoints.down('xs')]: {
         
          margin:" 0px",
          padding:"50px",
          left:"0%"
           
       }



    },
    button:{
        margin:"1rem 0.5rem"
    }
   
}));


const DEFAULT_SIGNIN={
    
    email:"",
    password:"",
    
}


function Signin(props){
    const classes = useStyles();
    const[signin,setSignin] = useState(DEFAULT_SIGNIN);
    const [signinUser]= useMutation(SIGNIN_USER);
    const {addToken,setUser} = useStore()
    

    function handleChange (event) {
        const{name,value}=event.target;
        setSignin(prevsignin=>({
          ...prevsignin,
          [name]:value
        })); 
      }


      async function submitHandle(event){
        event.preventDefault();
        try{
        const token = await signinHandler();
        addToken(token);
         
         
        }catch(err){
          
          throw err;
        }
       
        props.history.push("/menu/pizza")
      }

       async function signinHandler(){
        const{email,password}=signin
        
        let response;
        try{
          
        
        response = await signinUser({
            variables:{
              
              email,
              password
        }});
        
         
      }catch(err){
           throw(err)
       } 
       const {token}=response.data.signinUser;
       
       setUser(response.data.signinUser.user)
       console.log(response.data.signinUser.user);
       
       return {token};
        
      
      }


    return(
        <form className={classes.root} onSubmit={event=>submitHandle(event)}noValidate autoComplete="off">
          
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
            Sign In
          </Button>
    
        </form>
    );


}

export default Signin;