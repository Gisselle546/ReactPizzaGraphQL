import {gql} from 'apollo-boost';

export const GET_FOODS=gql`
query{
 
  allFood {
      id
      name
      thumbnail
      price
      description
         categorys{
       brand
       size
        toppings
        
        
      }
      
    }
  
  
  
  
  
  
  }
`
export const FILTER_FOOD= gql`

query ($filter: String!){
  filterFood(filter:$filter){
  id
  name
  thumbnail
  price
  description
  categorys{
    brand
    size
    toppings
  }
  description
 }
 
}
`;


export const ME=gql`
  query{
    me{
      id
      name
      email
      address{
        address
        city
        state
      }
    }
}



`;