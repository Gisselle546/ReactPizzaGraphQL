import React from 'react';
import { Dialog,DialogActions,DialogContent,DialogTitle,Button } from '@material-ui/core';


function CustomDialog(props) {
    

    

return(
    <Dialog open={props.open} close={props.onCloseModal}>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogContent > {props.content}</DialogContent>
          <DialogActions> <Button onClick={props.onCloseModal} color="primary">Close</Button></DialogActions>

    </Dialog>


    )


}

export default CustomDialog;