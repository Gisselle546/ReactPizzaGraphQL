import React,{useState,useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {Link} from 'react-router-dom';
import Logo from '../assets/pizzapalacelogo.png';
import {useStore} from '../context/token';
import MiniHeader from './miniheader';
import { Button } from '@material-ui/core';


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
        
        [theme.breakpoints.down('xs')]: {
        
          margin: "0px 0px"
          
      }

        
    },

      
      tab:{
        ...theme.typography.tab,
        color:"#650E15",
        letterSpacing:"1.1px",
        fontSize:"1rem",
        fontFamily:"oxygen",
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
        
          fontSize:"0.8rem"
          
      }

        


        
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
      right:"0",
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        position:"relative",
        clipPath:"none",
        padding:"0px 0px"
          
    },

    },
    textFied:{
      marginTop:"8px",
      color:"red",
      backgroundColor:"white",
      marginLeft:"7.8rem",
      [theme.breakpoints.down('xs')]: {
        
        margin:"16px 0"
        
    }
    },

    menu:{
      
      color:"#650E15",
      borderRadius:"0px",
      backgroundColor: 	"#f2aa3a"
    },
    menuItem:{
      ...theme.typography.tab,
      width:"200px",
      opacity:0.7,
      "&hover":{
        opacity:{
          opacity:1
        }
      }
    }


  }));

const NOCODE=''




  function Header(props) {
    
   
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openMenu, setOpenMenu] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const {token,signout} = useStore();
    
    
  

    
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const handleOpen = (e)=>{
      setAnchorEl(e.currentTarget);
      setOpenMenu(true);
    };

    const handleMenuItemClick = (e, i) => {
      setAnchorEl(null);
      setOpenMenu(false);
      setSelectedIndex(i);
    };

    const handleClose=(e)=>{
      setAnchorEl(null);
      setOpenMenu(false);
    }
  
  
    
    const menuList =[
      {
        name:"Pizza",
        link:"/menu/pizza",
        activeIndex:0,
        selectedIndex:0
      },
      {
        name:"Desserts",
        link:"/menu/desserts",
        activeIndex:0,
        selectedIndex:1
      },
      {
        name:"Sides",
        link:"/menu/sides",
        activeIndex:0,
        selectedIndex:2
      },
      {
        name:"Pasta",
        link:"/menu/pasta",
        activeIndex:0,
        selectedIndex:3
      },
      {
        name:"Drinks",
        link:"/menu/drinks",
        activeIndex:0,
        selectedIndex:4
      },
      {
        name:"Wings",
        link:"/menu/wings",
        activeIndex:0,
        selectedIndex:5
      }
    ];
    
    const routes=[
      {
        name: "Menu",
        activeIndex: 0,
        ariaOwns: anchorEl ? "simple-menu" : undefined,
        ariaPopup: anchorEl ? "true" : undefined,
        mouseOver: event => handleOpen(event)
      },
      
      { name: "SignUp", link: "/signup", activeIndex: 1 },
      { name: "SignIn", link: "/signin", activeIndex: 2 }
    
    
    
    
    ]
    
    
    useEffect(()=>{
      [...menuList, ...routes].forEach(route => {
        switch (window.location.pathname) {
          case `${route.link}`:
                if(value!== route.activeIndex){
                    setValue(route.activeIndex)
                    if(route.selectedIndex && route.selectedIndex!==selectedIndex){
                      setSelectedIndex(route.selectedIndex);
                    }
                  }
              break;
              default:
              break;
            }
        })
    },[value,menuList,routes,selectedIndex])
   

    async function signouthandler(){
      try{
        await signout()
        props.history.push('/')
      }
      catch(err){
        throw(err);
      }
      
      
    }

    
   
    return (
    
      <div className={classes.container}>
     
       <AppBar position="fixed" color="primary">
        <ToolBar disableGutters={true}> 
        <img alt="pizza logo"  className={classes.image} style={{cursor:"pointer"}}src={Logo} onClick={()=>props.history.push('/')} />
        <Tabs value={value}  onChange={handleChange} className={classes.tabsContainer} indicatorColor="primary">
            
            <Tab className={classes.tab} component={Link} to='/menu' label={<div> Menu <ArrowDropDownIcon style={{verticalAlign: 'middle'}} /> </div>} aria-owns={anchorEl ? "simple-menu" : undefined} aria-haspopup={anchorEl ? "true" : undefined} onMouseOver={event => handleOpen(event)}/>
            
            
     

            {

             (token)?(
    
                <Tab className={classes.tab} label="Sign Out" onClick={signouthandler} />
      
                  ):(
                  [
                  <Tab className={classes.tab} component={Link} to='/signup'label="Sign Up"/>,
                  <Tab className={classes.tab} component={Link} to='/signin'label="Sign In"/>

                  ]

                  )

                }
          
      
        
        </Tabs> 
        </ToolBar>
       </AppBar>
       <div className={classes.toolbarMargin}/>
     <ToolBar className={classes.miniToolbar}>
      
  
  <MiniHeader />
 
     </ToolBar>
     <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        classes={{ paper: classes.menu }}
        MenuListProps={{
          onMouseLeave: handleClose
        }}
        elevation={0}
        
        
      >
        {menuList.map((option, i) => (
          <MenuItem
            key={`${option}${i}`}
            component={Link}
            to={option.link}
            classes={{ root: classes.menuItem }}
            onClick={event => {
              handleMenuItemClick(event, i);
              setValue(1);
              handleClose();
            }}
            selected={i === selectedIndex && value === 1}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
      
      </div>
          
    );
  }
  
  export default withRouter(Header);