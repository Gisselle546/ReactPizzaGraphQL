import React, { createContext,useContext, useReducer,useEffect } from "react";

 const AuthContext = createContext()
 
const initialState={
    token: JSON.parse(sessionStorage.getItem("token")) || ""
}
const reducer =(state,action)=>{
    switch(action.type){
        case "SIGNIN":
            return{
                token:action.payload
            };
            case "SIGNOUT":
              sessionStorage.clear();
              return{
                token:""
              };

              default:
                throw new Error();
   
  }
}
   

 export const AuthProvider = props =>{
    const [state, dispatch] = useReducer(reducer, initialState);
    


    useEffect(() => {
        sessionStorage.setItem(
          "token",
          JSON.stringify(state.token)
        );
        
      },[state.token]);
    
    const addToken = token => {

        dispatch({
          type: "SIGNIN",
          payload: token
        });
      };
    
    
     const signout=()=>{
       
   
      dispatch({type:"SIGNOUT", });
     

     
     }
   
     
     
     
     
     return(
        <AuthContext.Provider value={{addToken, token:state.token, signout}}>
            {props.children}
        </AuthContext.Provider>
        );

 };

 export const useStore = () => useContext(AuthContext);