import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import {GET_FOODS, FILTER_FOOD} from '../../graphql/query';
import { CircularProgress,Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ToolbarItems from './ToolbarItem';



const useStyles = makeStyles(theme=>({
 container:{
   marginTop:"100px"
 },
 
    
    }));





function Toolbar(props){

  const classes = useStyles();
  

  const {brand}=props.match.params
    const {data:datar,loading:load,error:erro} = useQuery(GET_FOODS);
    const {data,loading,error}= useQuery(FILTER_FOOD,{
      variables:{
        filter:brand
      }
    })
    
    console.log(datar);
    
    
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
    
     

     
     
      return (
        <div className={classes.container}>
        <Grid container spacing={3}>
       { data.filterFood.map((foods,i)=>(
        
        <Grid item xs={12} md={4}>  <ToolbarItems key={foods.id} data={foods} /> </Grid>
          
       ))
       }
       </Grid>
      </div>
      );
  
}

export default Toolbar;