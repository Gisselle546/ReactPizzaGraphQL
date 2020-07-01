import React from 'react';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {ApolloProvider} from '@apollo/react-hooks';
import {BrowserRouter, Route,Switch,Redirect} from 'react-router-dom';
import {ThemeProvider} from '@material-ui/styles';
import { setContext } from 'apollo-link-context';

import theme from './UI/Theme';
import Header from './Components/header';
import Toolbar from './Components/Menu/Toolbar';
import Footer from './Components/footer';
import {CartProvider} from './context/cart'

import SignUp from './Components/signup';
import Signin from './Components/signin';
import Homepage from './Components/homepage'
import ShoppingCart from './Components/cart';
import Checkout from './Components/checkout';

function App() {

  
  const isAuthenticated = sessionStorage.getItem('token');
 
 

  const httpLink = new HttpLink({
    uri: 'http://localhost:2000/graphql',
    credentials: 'include',
    

  });

  let token

  const authLink = setContext((_, { headers }) => {
    
    token = JSON.parse(isAuthenticated);
  
      
    return {
      headers: {
        ...headers,
        authorization:  token ? `Bearer ${token}` : '',
      },
    };
  });


   
   
  
  
  
  
  
  const client = new ApolloClient({
    link:authLink.concat(httpLink),
    cache: new InMemoryCache(),
    
    
    
  })
 

 

  return (
    
    
    <ApolloProvider client = {client}>
    <BrowserRouter>
    < ThemeProvider theme={theme}>
 
    
      <CartProvider>
      
     <Header/>
          <div style={{minHeight: "839px", width:"100%"}}>
        <Switch > 
          <Route path="/" exact component={Homepage}/>
          <Route path='/menu/:brand' component={Toolbar}/>
          <Route path='/signup' component={SignUp}/>
          <Route path="/signin"  component={Signin}/>
          <Route path="/cart" component={ShoppingCart}/>
          <Route path='/checkout' 
            render={props=>isAuthenticated!==''?
              <Checkout/>:<Redirect to="/signin"/>
            
            }
          
          
          />
          
        </Switch>
        </div>
        <Footer/>
        </CartProvider>
       
      </ThemeProvider>
    </BrowserRouter>
  </ApolloProvider>
  
  );
}

export default App;
