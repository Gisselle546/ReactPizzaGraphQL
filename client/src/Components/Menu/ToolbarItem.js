import React,{useState} from 'react';
import CustomDialog from '../dialog';
import { useStore } from '../../context/cart';
import {Card,CardActionArea,CardActions,CardContent,CardMedia,Button,Typography,Dialog,DialogActions,DialogContent,DialogTitle,FormControl,FormControlLabel,RadioGroup,Radio,
  FormLabel,Checkbox,FormGroup} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles(theme=>({
   container:{
    marginLeft:"70px",
    [theme.breakpoints.down('xs')]: {
         
      margin:" 25px",
      padding:"0px"
       
       
   }
    
   },
    
    root: {
        maxWidth: 345,
        height:440
      },
      media: {
        height: 240,
      },
      toolbarMargin:{
        ...theme.mixins.toolbar,
        marginTop: '100px'
    },
    orderButton:{
        backgroundColor:"#c40303",
        color:"primary",
        transition: "transform .3s",
        "&:hover": {
            transform: "scale(0.9)",
            backgroundColor:"#c40303"
          }

    }
      
      }));


function ToolbarItem(props){
    const classes = useStyles();
    const {addCart} = useStore();
    const [modal,showModal]=useState(false);
    const [cartmodal,showCartModal]= useState(false);


const [value, setValue] = useState('normal');
const [meat, setMeat] =  useState({
  pepperoni: false,
  sausage: false,
  bacon: false,
});

const [veggies,setVeggies] = useState({
  Bananapeppers:false,
  Pineapple:false,
  Onions:false,
  Greenpeppers:false
})

const handleChangeMeat = (event) => {
  setMeat({ ...meat, [event.target.name]: event.target.checked });
};

const handleChangeVeggies = (event) => {
  setVeggies({ ...veggies, [event.target.name]: event.target.checked });
};

const { pepperoni, sausage, bacon} = meat;
const {bananapeppers,pineapple,onions,greenpeppers}= veggies;
const {brand}=props.data.categorys;


  const handleChange = (event) => {
    setValue(event.target.value);
  };

    
    function closeDialog(){
      showModal(false)
    }

     async function handleAddCustomization(){
      const toppings = {...meat, ...veggies }
        const filtered = Object.keys(toppings).filter((data)=>{
            return toppings[data]
        });
        const topps={...props.data}
        
        
       const newArry= [...new Set(topps.categorys.toppings.concat(filtered))];
       topps.categorys.toppings=newArry;
      await addCart(topps);
       showModal(false);
       
       
        
    }

    function cartHandler(){
      addCart(props.data);
      showCartModal(true);
    }

   
    return(
      
      
       <div className={classes.container}>
         <Dialog className={classes.modal} open={modal} close={closeDialog}>
          <DialogTitle>Customize Pizza</DialogTitle>
          <DialogContent className={classes.thumbnail}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Cheese</FormLabel>
            <RadioGroup aria-label="cheese" name="cheese1" value={value} onChange={handleChange}>
              <FormControlLabel value="normal" control={<Radio />} label="Normal" />
              <FormControlLabel value="extra" control={<Radio />} label="Extra" />
            </RadioGroup>
          </FormControl>
          <div>
          <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Meat</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={pepperoni} onChange={handleChangeMeat} name="pepperoni" />}
            label="Pepperoni"
          />
          <FormControlLabel
            control={<Checkbox checked={sausage} onChange={handleChangeMeat} name="sausage" />}
            label="Sausage"
          />
          <FormControlLabel
            control={<Checkbox checked={bacon} onChange={handleChangeMeat} name="bacon" />}
            label="Bacon"
          />
        </FormGroup>
      
      </FormControl>
      <FormControl  component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Veggies</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={bananapeppers} onChange={handleChangeVeggies} name="bananapeppers" />}
            label="Banana Peppers"
          />
          <FormControlLabel
            control={<Checkbox checked={pineapple} onChange={handleChangeVeggies} name="pineapple" />}
            label="Pineapple"
          />
          <FormControlLabel
            control={<Checkbox checked={onions} onChange={handleChangeVeggies} name="onions" />}
            label="Onions"
          />
           <FormControlLabel
            control={<Checkbox checked={greenpeppers} onChange={handleChangeVeggies} name="greenpeppers" />}
            label="Green Peppers"
          />
        </FormGroup>
       
      </FormControl>
      </div>
          
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog} color="primary">Cancel</Button>
            <Button onClick={handleAddCustomization}  color="secondary"> Add To Cart</Button>
          </DialogActions>


        </Dialog>
         
        <Card className={classes.root} >
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.data.thumbnail}
          title="pizza"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.data.name}  <strong>${props.data.price}</strong>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.data.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button  onClick ={cartHandler} variant="contained" className={classes.orderButton}>
        <Typography variant="body2" color="primary" component="p"> Order</Typography>
        </Button>
        {brand==='pizza'&&<Button  onClick={()=>{showModal(true)}} variant="contained" className={classes.orderButton}>
        <Typography variant="body2" color="primary" component="p"> Customize</Typography>
        </Button>
        }
      </CardActions>
    </Card>
    <div className={classes.toolbarMargin}/>
    <CustomDialog title='Great Choice!!' open={cartmodal} content={props.data} onCloseModal={closeDialog}/>
</div>



    );
}

export default ToolbarItem;