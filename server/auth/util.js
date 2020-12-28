const jwt = require('jsonwebtoken')


function getUserId(context) {
   
    
    if(context){
      const token = context.split(' ')[1];
      

      const data = jwt.verify(token, process.env.JWT_SECRET);
        
     return data.id
    }
  
    throw new Error('Not authenticated')
  }
  
  module.exports = {
    
    getUserId,
  }