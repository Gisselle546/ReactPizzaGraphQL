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

type Token {
    token: String!
}

input SignUpInput{
    name: String!
    email: String!
    password: String!

}

input SignInInput{
    email: String!
    password: String!
}


type User{
    id:ID
    name:String
    email:String!
    password:String!

}

type Query{
    allFood:[Product]
    filterFood(filter:String):[Product]

   
}

type Mutation{
    signupUser(input:SignUpInput):Token
    signinUser(input:SignInInput):Token
}





`;
module.exports = typeDefs;