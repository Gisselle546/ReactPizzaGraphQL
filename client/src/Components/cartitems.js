import React,{useState} from 'react';
import {Typography, Button,Select,MenuItem} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import {useStore} from '../context/cart';

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
        marginTop:"0.4rem",
        [theme.breakpoints.down('xs')]: {
         
            width:"100px",
            height:"100px"
             
             
         }

    },
    buttonContainer:{
        marginTop:"4.5rem",
        display: "flex",
        alignItems:"start"

    },
    button:{
        width:"20px",
        height:"25px",
        [theme.breakpoints.down('xs')]: {
         
            width:"15px",
            height:"20px"
             
             
         }
    },
    deletebutton:{
        backgroundColor:"#c40303",
        display:"block"
    },

    dropdown:{
        
        
        cursor:"none "
    },
    total:{
        backgroundColor:"black"
    },
    price:{
        [theme.breakpoints.down('xs')]: {
         
            margin:"0px 0px",
            fontSize:"1.0rem"
             
             
         }
    }
   
}));





function CartItems(props){
    const [open, setOpen] = useState(false);
     const classes = useStyles();
     const {deleteProduct,increment,decrement} = useStore()


const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  console.log(props)

return(
   
    <div className={classes.root}>
        <div className={classes.item}>
            <Typography variant="h5">{props.data.name}</Typography>
            <img className={ classes.image }alt="pizza" src={props.data.thumbnail}/>
            <Button className={classes.deletebutton}variant="contained" color="primary" onClick={()=>deleteProduct(props.data.id)}>Delete</Button>
        </div>
        <div className={classes.buttonContainer}>
        {(props.data.quantity===1)?
            <Button className={classes.button} disabled={true} variant="contained" color="primary">-</Button>:
            <Button className={classes.button} onClick={()=>{decrement(props.data.id)}}variant="contained" color="primary">-</Button>
        }
        
        <Select
          className={classes.dropdown}
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={props.data.quantity}
          IconComponent="none"
          disableUnderline={true}
          
          
          
        >
          <MenuItem value={props.data.quantity}>
            {props.data.quantity}
          </MenuItem>
          
          
        </Select>
        <Button className={classes.button} variant="contained" onClick={()=>increment(props.data.id)}color="primary">+</Button>
        <div  style={{marginLeft:"20px"}}><Typography className={classes.price} variant="h5">${props.data.total}</Typography></div>
               
          
        </div>
        
    </div>
   
)

}
export default CartItems;