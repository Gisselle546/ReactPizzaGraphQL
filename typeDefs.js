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
    user:User

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

type Address{
    address:String
    city:String
    state:String
}

input addressInput{
    address:String
    city:String
    state:String
}


type Stripe{
    id:ID
    amount: Float
}

input stripeInput{
    id:ID
    amount:Float
}

type User{
    id:ID
    name:String
    email:String
    address:Address
}



type Query{
    allFood:[Product]
    filterFood(filter:String):[Product]
    me: User

   
}

type Mutation{
    signupUser(input:SignUpInput):Token
    signinUser(input:SignInInput):Token
    updateUser(id:ID,address:addressInput):User
    stripeCharge(input:stripeInput):Stripe
  
   
    
    
    
}





`;
module.exports = typeDefs;