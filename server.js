const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require( `cors` );
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 2000;
const mongoose = require('mongoose');
require('dotenv').config();

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use( '*',cors() );

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'))
  .catch(err => console.log(err));


  const server = new ApolloServer({
    typeDefs,
    resolvers,
    
   
  });
  
  server.applyMiddleware({app, path: '/graphql'});

  app.listen(port,()=>{
      console.log('App is running');
  })