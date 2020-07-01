import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography,Grid } from '@material-ui/core';



const useStyles = makeStyles(theme=>({
    root:{
        display:"flex",
        margin:"1rem",
        justifyContent:"space-between"
        
    },

    item:{
        maxWidth: 240,
        height:350,
        
    },
    
    image:{
        height: 150,
        maxWidth:150,
        marginTop:"0.4rem"
    },
    container:{
        marginTop:"4.5rem",
        display: "flex",
        alignItems:"start"
    }

}));







function OrderItem(props){
    const classes = useStyles();
console.log(props)

return(
    <>
       
            <div className={classes.root}>
                <div>
                <Typography variant="h5">{props.data.name}</Typography>
                 <img className={ classes.image }alt="pizza" src={props.data.thumbnail}/>
                 
                </div>
                
              <Typography variant="h5" style={{marginTop:"20px"}}>${props.data.total}</Typography>
                
           </div>  
           
   
   </>

);


}


export default OrderItem; 