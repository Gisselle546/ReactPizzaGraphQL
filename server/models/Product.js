const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({

    name:{
        type:String,
        required:true
    },

    thumbnail:{
        type: String,
        required:true
    },

    price:{
        type:Number,
        required:true

    },
    category:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
    },

    description:{
        type:String,
        
    }



})

module.exports = mongoose.model('Product',productSchema);