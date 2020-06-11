import React from 'react';

import { useStore } from '../../context/cart';
import {Card,CardActionArea,CardActions,CardContent,CardMedia,Button,Typography,} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles(theme=>({
   container:{
    marginLeft:"70px",
    
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


function MenuItem(props){
    const classes = useStyles();
    const {addCart} = useStore();
    
    
    
    return(
       <div className={classes.container}>
        <Card className={classes.root} >
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.data.thumbnail}
          title="pizza"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.data.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.data.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button  onClick ={()=>addCart(props.data)} variant="contained" className={classes.orderButton}>
        <Typography variant="body2" color="primary" component="p"> Order</Typography>
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
    <div className={classes.toolbarMargin}/>
</div>



    );
}

export default MenuItem;