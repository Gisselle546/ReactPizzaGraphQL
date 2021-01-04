import React from 'react';
import { Dialog,DialogActions,DialogContent,DialogTitle,Button } from '@material-ui/core';
import {withRouter} from 'react-router-dom';

function CustomDialog(props) {
    

    

return(
    <Dialog open={props.open} close={props.onCloseModal}>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogContent > <img height="350px" width="350px" src={props.content}/> </DialogContent>
          <DialogActions> <Button onClick={props.onCloseModal} color="primary">Close</Button><Button onClick={()=>props.history.push('/cart')}>Go To Cart</Button></DialogActions>

    </Dialog>


    )


}

export default withRouter(CustomDialog);