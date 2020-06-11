import React,{useState,useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Link} from 'react-router-dom';
import Logo from '../assets/pizzapalacelogo.png';


const useStyles = makeStyles(theme=>({
    
  toolbarMargin:{
    ...theme.mixins.toolbar,
    marginTop: '40px'
},


    image: {
        height: "6.4rem",
        
        margin:"2px",
      },
      
      tabsContainer:{
        marginLeft: 'auto',
       
        
    },

      
      tab:{
        ...theme.typography.tab,
        color:"#650E15",
        letterSpacing:"1.1px",
        fontSize:"1rem",
        fontFamily:"oxygen",
        
    },
    miniToolbar:{
      position:"absolute",
      background: "linear-gradient(320deg, rgba(2,0,36,1) 0%, rgba(255,193,0,0.8379726890756303) 40%)",
      color:"white",
      clipPath: "polygon(20% 0%, 100% 0, 100% 100%, 0 100%)",
      display:"flex",
      justifyContent:"space-between",
      zIndex:"300",
      width:"40%",
      right:"0"
    },
    textFied:{
      marginTop:"8px",
      color:"red",
      backgroundColor:"white",
      marginLeft:"7.8rem"
    }


  }));

  function Header() {
   
    const classes = useStyles();
    const [value, setValue] = useState(0);
    //const [anchor, setAnchor] = useState(null);
    //const [open,setOpen] = useState(false);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    //const handleOpen = (e)=>{
      //setAnchor(e.current.target);
      //setOpen(true);
    //};

    //const handleClose=(e)=>{
      //setAnchor(null);
      //setOpen(false);
    //}
  
    const routes=[{name:"Menu",link:"/Menu", activeIndex:0},{name:"Deals",link:"/Deals",activeIndex:1},{name:"Sign Up",link:"/signup",activeIndex:2},{name:"Sign in", link:"/signin",activeIndex:3}]
   
    useEffect(()=>{
        [...routes].forEach(route=>{
            switch(window.location.pathname){
                case`${route.link}`:
                if(value!== route.activeIndex){
                    setValue(route.activeIndex)
                    
                  }
              break;
              default:
              break;
            }
        })
    },[value,routes])
   
   
    return (
      <>
       <AppBar position="fixed" color="primary">
        <ToolBar> 
        <img alt="pizza logo"  className={classes.image} src={Logo}/>
        <Tabs value={value}  onChange={handleChange} className={classes.tabsContainer} indicatorColor="primary">
            
            <Tab className={classes.tab} component={Link} to='/menu' label="Menu"/>,
            <Tab className={classes.tab} component={Link} to='/deals' label="Deals"/>,
            
            <Tab className={classes.tab} component={Link} to='/signup'label="Sign Up"/>,
            <Tab className={classes.tab} component={Link} to='/signin'label="Sign In"/>
        </Tabs> 
        </ToolBar>
       </AppBar>
       <div className={classes.toolbarMargin}/>
     <ToolBar className={classes.miniToolbar}>
     <TextField
    id="outlined-secondary"
    label="Promo Code"
    variant="outlined"
    color="secondary"
    className={classes.textFied}
  />
  <ShoppingCartIcon/>
      
     </ToolBar>
      </>
    );
  }
  
  export default Header;