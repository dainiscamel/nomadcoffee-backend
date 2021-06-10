import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeCategory(id: Int!, page: Int!): [CoffeeShop]
  }
`;
