import { gql } from "apollo-server-core";

export default gql`
  type Category {
    id: Int!
    name: String!
    slug: String!
    shops: [CoffeeShop]
    totalShops(page: Int!): Int!
    createdAt: String!
    updatedAt: String!
  }
`;
