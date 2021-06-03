import { gql } from "apollo-server-core";

export default gql`
  type CoffeeShop {
    id: Int!
    name: String!
    latitude: String!
    longitude: String!
    user: User!
    photos: [CoffeeShopPhoto]
    categories: [Category]!
    createdAt: String!
    updatedAt: String!
  }

  type CoffeeShopPhoto {
    id: Int!
    url: String!
    shop: [CoffeeShop]
    createdAt: String!
    updatedAt: String!
  }
`;
