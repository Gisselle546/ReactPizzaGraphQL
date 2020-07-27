const Product = require('./models/Product')
const Category = require('./models/Category');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const {getUserId} = require('./auth/util');
const stripe = require("stripe")(process.env.STRIPESECRET);
const { AuthenticationError, UserInputError } = require('apollo-server'); 


 const signintoken = user =>{
    console.log(user)
    return jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:process.env.JWTEXP})
} 





const resolvers={

Query:{
    allFood: async(_,{})=>{
        try{
                
            const getFoods = await Product.find({}).populate('category').exec()
           return getFoods;
       
       }catch(err){
           throw err;
       }
    },
    filterFood:async(_,{filter})=>{
         
        
            try{
               // const data = await Product.find({}).populate({path: 'category', match: { brand:{$regex: filter}}}).exec()
                
          const data = await Product.find()
               .populate('category', null, { brand: { $regex: filter} } ).exec();

               
             
              return data.filter(datas=>{
                    return datas.category!==null;
              })
            }
            catch(err){
                throw err;
            }
          


        
         
           
    },
    me:async(_,args,context)=>{
        
        const data = getUserId(context.token);
       
            const user = await User.findById(data)
            
           
           
            return user;
        
       
        
    }

},




Product:{
    categorys: async(parent)=>{
       
       
      const getCategory = await Category.findById(parent.category)
      
      return getCategory;
      
    }

},

User:{
    address:async(parent)=>{
            
           let address;

           if(parent.address.length===0){
               return [];
           }
           else if(parent.address.length>0){
               const useraddress = await User.findById(parent.id);
                return useraddress.address;
            
           }
             
           return [parent.address];
            }
        
    
},

Mutation:{
    signinUser:async(_,args,context)=>{
       
        
        const email= args.input.email;
        const password = args.input.password;

        const user = await User.findOne({email});
        

        if(!user||!(await user.comparepasswords(password,user.password))) {
            throw new AuthenticationError('Incorrect email or password',401);
        }
        
        context.res.cookie("refreshcookie", jwt.sign({id:user._id},
            process.env.REFRESH_SECRET,{expiresIn:process.env.JWTEXPREFREDJ}),{
                httpOnly:true
            });
          
          const token = signintoken(user);
          
          

          return{token,user}
        
       

    },

    signupUser: async(_,args)=>{
        
            const email= args.input.email;
            const user = await User.findOne({email})
            if(user){
              throw new UserInputError("Email in use",401);
            }
            const newUser = new User({
                name: args.input.name,
                password: args.input.password,
                email
                
            })
            newUser.address=[];
            await newUser.save();
            const token=signintoken(newUser);
           
            return {token,user:newUser}
        
      
    },

   updateUser:async(_,args)=>{
       
            const options={
                address:args.address.address,
                city:args.address.city,
                state:args.address.state
            };

            

            const user = await User.findById(args.id);
           
            user.address.push(options);
            
            await user.save();
           
           
            
            
            
            
           
            return {id:user.id, address:options}
        
      
   },
  stripeCharge:async(_,args)=>{
      const {id,amount}=args.input;
    try{
        console.log(args)
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            payment_method:id,
            confirm:true
          });
          
           

          return{id,amount}
    }catch(err){
        throw err;
    }


  }

}



}



module.exports = resolvers;