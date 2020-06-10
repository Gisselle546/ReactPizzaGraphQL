const {gql} = require('apollo-server-express');

const typeDefs=gql`


type Category {
    id:ID
    brand: String
    size:String
    toppings:[String]
  }

type Product{
    id:ID
    name:String!
    thumbnail:String!
    price:Float
    categorys:Category
    description:String
}



type Query{
    allFood:[Product]
    filterFood(filter:String):[Product]

   
}





`;
module.exports = typeDefs;