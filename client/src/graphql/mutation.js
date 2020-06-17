import {gql} from 'apollo-boost';


export const SIGNUP_USER =gql`

mutation signupUser($name:String!,$email:String!,$password:String!){
    signupUser(input:{name:$name,email:$email,password:$password}){
        token
    }

}
`;

export const SIGNIN_USER = gql`

mutation signinUser($email:String!,$password:String!){
    signinUser(input:{email:$email,password:$password}){
        token
    }
}

`;