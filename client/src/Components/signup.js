import React,{useState} from 'react';
import { useMutation } from '@apollo/react-hooks';
import {SIGNUP_USER} from '../graphql/mutation';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useStore } from '../context/token';



const useStyles = makeStyles(theme=>({
    root:{
        backgroundColor:"	#8a211e",
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
           
       },

       field:{
        color:"#000"
       },



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
    const [signupUser,{error}]= useMutation(SIGNUP_USER);
    const {addToken,setUser} = useStore()
  
   function handleError(field){
     return error&& field===""
   }

  

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
        props.history.push("/menu/pizza")

        }catch(error){
          
          console.dir(error)
        }
       
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
      
    }catch(error){
      throw (error);
     } 
     
       const{token}=response.data.signupUser
       setUser(response.data.signupUser.user);
       
       
       return {token, user:response.data.signupUser.user};
  
    }
  
return(
    <form className={classes.root} onSubmit={event=>submitHandle(event)} autoComplete="off">
      <div>
        
        <TextField className={classes.field}label="Name" name="name" value={signup.name}onChange={handleChange} error={handleError(signup.name)} helperText={error&&' cannot be empty'}/>
      </div>
      <div>
        
        <TextField className={classes.field} label="Email" name="email" value={signup.email}onChange={handleChange} error={handleError(signup.email)} helperText={error&&error.graphQLErrors[0].message&&' cannot be empty'}/>
      </div>
      <div>
       
        <TextField
          label="Password"
          className={classes.field}
          value={signup.password}
          id="outlined-size-normal"
          onChange={handleChange}
          type="password"
          name="password"
          error={handleError(signup.password)}
          helperText={error&&' cannot be empty'}
         
        />
      </div>
      <Button className={classes.button} variant="contained" type="submit" color="primary" >
        Sign Up
      </Button>

    </form>
);

}

export default Signup;