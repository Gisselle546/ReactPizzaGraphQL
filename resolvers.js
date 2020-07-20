const Product = require('./models/Product')
const Category = require('./models/Category');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const {getUserId} = require('./auth/util');
const stripe = require("stripe")(process.env.STRIPESECRET);



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
       
        
        try{
            const user = await User.findById(data)
            
           
           
            return user;
        
        }catch(err){
            throw new Error('ERR',err)
        }
        
    }

},




Product:{
    categorys: async(parent)=>{
       
        try{
      const getCategory = await Category.findById(parent.category)
      
      return getCategory;
        }catch(err){
            throw err;
        }
    }

},

User:{
    address:async(parent)=>{
        try{
            let address;
            if(parent.address!==undefined){
                parent.address.map(item=>{
                   address=item;
                });
                return address;
            }
        }catch(err){
            throw err;
        }
    }
},

Mutation:{
    signinUser:async(_,args,context)=>{
        try{
        
        const email= args.input.email;
        const password = args.input.password;

        const user = await User.findOne({email});
        

        if(!user||!(await user.comparepasswords(password,user.password))) {
            return(new Error('Incorret email or password',401));
        }
        
        context.res.cookie("refreshcookie", jwt.sign({id:user._id},
            process.env.REFRESH_SECRET,{expiresIn:process.env.JWTEXPREFREDJ}),{
                httpOnly:true
            });
          
          const token = signintoken(user);
          
          

          return{token,user}
        }
        catch(err){
            throw (err);
        }

    },

    signupUser: async(_,args)=>{
        try{
            const email= args.input.email;
            const user = await User.findOne({email})
            if(user){
                throw new Error("email in use")
            }
            const newUser = new User({
                name: args.input.name,
                password: args.input.password,
                email
                
            })
            
            await newUser.save();
            const token=signintoken(newUser);
           
            return {token,user:newUser}
        }
        catch(err){
            console.log(err)
        }
    },

   updateUser:async(_,args)=>{
       try{
            const options={
                address:args.address.address,
                city:args.address.city,
                state:args.address.state
            };

            console.log(args)

            const user = await User.findById(args.id);
            user.address.push(options);
            
            await user.save();
           console.log(user)
            let useraddress
            user.address.map(item=>{
                useraddress={item}
            })
            
            
            return {id:user.id, address:options}
        
       }catch(err){
           throw err;
       }
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