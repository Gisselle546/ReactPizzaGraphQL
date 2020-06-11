import { createMuiTheme} from '@material-ui/core/styles';

export default createMuiTheme({
    palette:{
        common:{
            black:"#000000",
            white:"#fff"

        },
        primary:{
            main:"#ffc100"
        }
    },
        typography:{
            headerFont:{
                fontFamily:"Roboto",
                textTransform:"none",
                fontWeight: 500,
                marginRight:"0px"
                
            }
        }
});