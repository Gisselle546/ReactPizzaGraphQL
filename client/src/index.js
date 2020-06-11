import React from 'react';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {ApolloProvider} from '@apollo/react-hooks';
import {BrowserRouter, Route,Switch} from 'react-router-dom';
import {ThemeProvider} from '@material-ui/styles';
import ReactDOM from 'react-dom';
import './index.css';


import App from './App';
import Theme from './UI/Theme';
import Header from './Components/header';
import Menu from './Components/Menu/Menu';
import Footer from './Components/footer';
import {CartProvider} from './context/cart'



    
   
  


const httpLink = new HttpLink({
  uri: 'http://localhost:2000/graphql'
  
  
});

const client = new ApolloClient({
  link: httpLink,
  onError: (e) => { console.log(e) },
  cache: new InMemoryCache()
})


const app=(
  
  <ApolloProvider client = {client}>
    <BrowserRouter>
    < ThemeProvider theme={Theme}>
      <CartProvider>
      <Header/>
        <Switch > 
          <Route path="/" exact component={App}/>
          <Route path='/menu/:brand' component={Menu}/>
        </Switch>
        <Footer/>
        </CartProvider>
      </ThemeProvider>
    </BrowserRouter>
  </ApolloProvider>
)


ReactDOM.render(
  app,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

