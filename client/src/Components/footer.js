import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid} from '@material-ui/core/';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';

 
const useStyles =  makeStyles(theme=>({
 
  Footer: {
    backgroundColor:"#26272b",
   marginTop:"-20px",
    fontSize:"15px",
    lineHeight:"24px",
    color:"#737373",
    width:"100%",
    
   
    
   
  },
 
  menu:{
    color:"#fff",
    fontSize:"16px",
    textTransform:"uppercase",
    marginTop:"3px",
    letterSpacing:"2px",
    
  },
  border:{
    borderTopColor:"#bbb",
    opacity:"0.5",
    margin:"20px 0"
  },
  footerlinks:{
    paddingLeft:0,
    listStyle:"none",
    
  },
  socialicons:{
   
    listStyle:"none"
  },
  icon:{
    display:"inline-block",
    marginBottom:"4px",
    marginRight:"15px",
    textTransform:"uppercase",
    color:"#96a2b2",
    fontWeight:"700",
    fontSize:"13px"


  }
}));
 
function Footer() {
  const classes = useStyles();
 
  return (
    <div className={classes.Footer}>
   
  <hr className={classes.border}/>  

  <Grid container spacing={0}>
  <Grid item xs={12} sm={6} md={8}>
  <p style={{marginLeft:"20px"}}>Copyright &copy; 2020 All Rights Reserved by <span>Pizza Palace</span>.</p>
  </Grid>

  <Grid item xs={12} sm={6} md={4}>
  <ul className={classes.socialicons}>
              <li className={classes.icon}><FacebookIcon/></li>
              <li className={classes.icon}><TwitterIcon/></li>
            </ul>





  </Grid>



  </Grid>



</div>
    
  );
}
 

export default Footer;