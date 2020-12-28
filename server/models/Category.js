const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
 brand:{
     type:String,
     required:true
 },
 size:{
    type: String,
    enum : ['Medium','Large','Extra Large'],
    default: 'Large'
 },
 toppings:[String],

 

},{ collection: 'categorys' } )

module.exports = mongoose.model('Category',categorySchema);