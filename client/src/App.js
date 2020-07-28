import React from 'react';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {ApolloProvider} from '@apollo/react-hooks';
import {BrowserRouter, Route,Switch,Redirect} from 'react-router-dom';
import {ThemeProvider} from '@material-ui/styles';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { ApolloLink} from 'apollo-link';
import theme from './UI/Theme';
import Header from './Components/header';
import Toolbar from './Components/Menu/Toolbar';
import Footer from './Components/footer';
import {CartProvider} from './context/cart'
import {useStore} from './context/token';
import SignUp from './Components/signup';
import Signin from './Components/signin';
import Homepage from './Components/homepage'
import ShoppingCart from './Components/cart';
import Checkout from './Components/checkout';

function App() {

  
  
 
 

  const httpLink = new HttpLink({
    uri: 'http://localhost:2000/graphql',
    credentials: 'include',
    

  });

  
  const {token} = useStore()
  
  
  const authLink = setContext((_, { headers }) => {
    
   
 console.log(token)
  
      
    return {
      headers: {
        ...headers,
        authorization:  token ? `Bearer ${token}` : '',
      },
    };
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.log('GraphQL error', message);
  
        if (message === 'jwt expired') {
          sessionStorage.clear();
        }
      });
    }
  
    if (networkError) {
      console.log('Network error', networkError);
  
      if (networkError.statusCode === 401) {
        sessionStorage.clear();
      }
    }
  });

  const link = ApolloLink.from([authLink, httpLink,errorLink]); 
   
   
  
  
  
  
  
  const client = new ApolloClient({
    link,
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
             render={props =>
              token ? (
                <Checkout props={props} />
              ) : (
                <Redirect to='/signin' />
              )
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
