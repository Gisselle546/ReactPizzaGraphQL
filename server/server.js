const express = require('express');
const { ApolloServer, AuthenticationError} = require('apollo-server-express');
const cors = require( `cors` );
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 2000;
const mongoose = require('mongoose');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const User = require('./models/User')



app.use( cors({origin:"http://localhost:3000",credentials:true}) );
app.use('/refreshtoken', cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));




 app.post("/refreshtoken", async (req,res)=>{
   const token = req.cookies.refreshcookie;
    
   if(!token){
     return res.send({accesstoken:""})
   }
 
   let decodedToken;

   try{
     decodedToken = jwt.verify(token, process.env.REFRESH_SECRET);
   }catch(err){
     return res.send({accesstoken:""})
   }

    
  const user = await User.findById(decodedToken.id);
   return res.send({accesstoken:jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:process.env.JWTEXP})});
 
 })


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
    

    context: ({ req, connection,res }) => ({
      
      token: req ? req.headers.authorization : connection.context.authorization,
      res,
      
      
    }),
   
  });
  
  server.applyMiddleware({app, path: '/graphql',cors:false});

  app.listen(port,()=>{
      console.log('App is running');
  })