const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    name:{
      type:String,
      required:true
    },

    email:{
        type:String,
        required:true
    },

    password:{
        type: String,
        required:true
    }

    


});

userSchema.pre('save',async function(next){
    try{
        const user = this;
          if(!user.isModified('password')||!user.isNew) return next();

          const salt = await bcrypt.genSalt(12);
          const hash = await bcrypt.hash(user.password,salt);
          user.password = hash;
          



    }catch(e){
        next(e);
    }
});


userSchema.methods.comparepasswords = async function(passq,userpassword){

    try{

    return await bcrypt.compare(passq,userpassword);

  }catch(err){
     throw (err)
  }
}



module.exports = mongoose.model('User',userSchema);