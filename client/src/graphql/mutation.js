import {gql} from 'apollo-boost';


export const SIGNUP_USER =gql`

mutation signupUser($name:String!,$email:String!,$password:String!){
    signupUser(input:{name:$name,email:$email,password:$password}){
        token,
        user{
            id
            name
            address{
                city
                address
                state
            }
            
        }
    }

}
`;

export const SIGNIN_USER = gql`

mutation signinUser($email:String!,$password:String!){
    signinUser(input:{email:$email,password:$password}){
        token,
        user{
            id
            name
            address{
                city
                address
                state
            }
            
            
        }
    }
}

`;

export const ADDADDRESS = gql`
mutation updateUser($id:ID, $address:String,$city:String,$state:String){
    updateUser(id:$id, address:{address:$address, city:$city, state:$state}){
        id
        address{
          address
          city
          state
        }
    }
}


`;

export const STRIPEPAYMENT=gql`
mutation stripeCharge($id:ID,$amount:Float){
    stripeCharge(input:{id:$id, amount:$amount}){
        id
        amount
    }
}


`;
