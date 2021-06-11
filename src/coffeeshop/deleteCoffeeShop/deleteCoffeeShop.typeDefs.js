import { gql } from "apollo-server-core";

export default gql`
  type DeleteCoffeeShopResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    deleteCoffeeShop(id: Int!): DeleteCoffeeShopResult!
  }
`;
