import React from 'react';
import pizzaLanding from '../assets/pizza.jpg'
import Typography from '@material-ui/core/Typography';
import {Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import pizza from '../assets/MenuLinkItem/pizza.jpg';
import desserts from '../assets/MenuLinkItem/desserts.jpg';
import sides from '../assets/MenuLinkItem/sides.jpg';
import pasta from '../assets/MenuLinkItem/pasta.jpg';
import wings from  '../assets/MenuLinkItem/wings.jpg';
import drinks from '../assets/MenuLinkItem/drinks.jpg';
import {Link} from 'react-router-dom';

const useStyles = makeStyles(theme=>({
    
    
backgroundimage:{
    backgroundImage:`url(${pizzaLanding})`,
    height:"80vh",
    backgroundSize:"cover",
    position:"relative",
    width:"100%",
    [theme.breakpoints.down('sm')]: {
         
        backgroundPosition:"30% 60%"
    }
    
},

intro:{
    position:"absolute",
    backgroundColor:"#c40303",
    color:"white",
    padding:"76px",
    clipPath: "polygon(1% 9%, 77% 8%, 100% 95%, 22% 95%)",
    top:"44%",
    left:"60%",
    boxShadow :"inset 0 0 10px #000000",
    [theme.breakpoints.down('xs')]: {
         
        
        top:"50%",
        left:"1%",
        clipPath: "polygon(1% 1%, 89% 5%, 80% 92%, 15% 92%)",
    }
   
},

heading:{
    textAlign:'center',
    [theme.breakpoints.down('xs')]: {
         
        
        position:"relative"
    }
   
},

price:{
    fontFamily:'Chelsea Market',
    fontSize:'1.7rem',
    
},

landtite:{
...theme.typography.headerFont,
    fontSize:"2.3rem",
    fontFamily: 'Chelsea Market',
    marginRight:'40px',
    [theme.breakpoints.down('xs')]: {
         
        position:"absolute",
        margin:"0px",
        top:"20%",
        left:"12%",
        textAlign:"left"
        
        
    }
    

},







menuheaading:{
    fontFamily: 'Chelsea Market',
    textAlign:"center",
    margin:"55px 0",
    [theme.breakpoints.down('xs')]: {
         
        margin:"3px 0px"
        
        
    }
},


menu:{
    backgroundColor:"#400000",
    color:"#c40303",
    padding:"1rem",
    [theme.breakpoints.down('xs')]: {
         
        padding:"2rem"
        
        
    }
   
},

container:{
    height: "600px"
},

menupics:{
    
    backgroundSize:"cover",
    height: "22vh",
    backgroundPosition:"5% 20%",
    borderRadius:"100px",
    position:"relative",
    transition: "transform .2s",
    "&:hover": {
        transform: "scale(0.9)"
      },
      [theme.breakpoints.down('xs')]: {
         
        height:"15vh"
        
        
    }

    
},
menuitems:{
    position:"absolute",
    top:"0",
    right:"60%",
    color:"#fff",
    fontSize:"2.9rem",
    fontFamily: 'Chelsea Market',
    "&:hover": {
        color: "#c40303"
      },
      [theme.breakpoints.down('xs')]: {
         
       fontSize:"1.9rem"
        
        
    }
},
blank:{
    height:"300px"
}


  }));

function Homepage(){
            
    
    const classes = useStyles();
    
   
    return(
        <>
        <div className={classes.backgroundimage}>
            <div className={classes.intro}>
              <h3 className={classes.landtite}>   Margherita Pizza </h3>
              <div className={classes.heading}>
              <p className={classes.price}>$6</p>
              <Button variant="contained" size="large" color="primary" className={classes.margin}>Order Now</Button>
              </div>
            </div>
        </div>
        <div className={classes.menu}>
        <Typography className={classes.menuheaading}variant="h2">Menu</Typography>
        <Grid container className={classes.container} spacing={3}>
        
           <Grid item xs={12} md={4}><Link to="/menu/pizza"> <div style={{backgroundImage:`url(${pizza}`}}className={classes.menupics}><p className={classes.menuitems}>Pizza</p></div></Link></Grid>
           <Grid item xs={12} md={4}><Link to="/menu/desserts"><div style={{backgroundImage:`url(${desserts}`}}className={classes.menupics} ><p className={classes.menuitems}>Desserts</p></div></Link></Grid>
           <Grid item xs={12} md={4}><Link to="/menu/sides"><div style={{backgroundImage:`url(${sides}`}}className={classes.menupics} ><p className={classes.menuitems}>Sides</p></div></Link></Grid>
           <Grid item xs={12} md={4}><Link to="/menu/pasta"><div style={{backgroundImage:`url(${pasta}`}}className={classes.menupics} ><p className={classes.menuitems}>Pasta</p></div></Link></Grid>
           <Grid item xs={12} md={4}><Link to="/menu/drinks"><div style={{backgroundImage:`url(${drinks}`}}className={classes.menupics} ><p className={classes.menuitems}>Drinks</p></div></Link></Grid>
           <Grid item xs={12} md={4}><Link to="/menu/wings"><div style={{backgroundImage:`url(${wings}`}}className={classes.menupics} ><p className={classes.menuitems}>Wings</p></div></Link></Grid>
       
        </Grid>
        <div className={classes.blank}></div>
       </div>
       
       </> 
    );

}

export default Homepage;