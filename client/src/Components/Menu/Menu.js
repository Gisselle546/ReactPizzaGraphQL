import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import {GET_FOODS, FILTER_FOOD} from '../../graphql/query';
import { CircularProgress,Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuItems from './MenuItem';



const useStyles = makeStyles(theme=>({
 container:{
   marginTop:"100px"
 },
 
    
    }));





function Menu(props){

  const classes = useStyles();
  

  const {brand}=props.match.params
    const {data:datar,loading:load,error:erro} = useQuery(GET_FOODS);
    const {data,loading,error}= useQuery(FILTER_FOOD,{
      variables:{
        filter:brand
      }
    })
    
    
    if (loading||load) {
      return(
        <div style={{
           display:"flex",
           flexDirection:"column",
           alignItems:"center",
           marginTop:"40px"
        }}
        >
           <CircularProgress/>
        </div>
     )
      }
      if (error||erro) {
        return <div>Error</div>
        
      }
    
      console.log(data)

     
     
      return (
        <div className={classes.container}>
        <Grid container spacing={3}>
       { data.filterFood.map((foods,i)=>(
        
        <Grid item xs={12} md={4}>  <MenuItems key={foods.id} data={foods} /> </Grid>
          
       ))
       }
       </Grid>
      </div>
      );
  
}

export default Menu;