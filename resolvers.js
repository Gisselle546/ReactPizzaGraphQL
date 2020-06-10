const Product = require('./models/Product')
const Category = require('./models/Category');


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

}


}



module.exports = resolvers;