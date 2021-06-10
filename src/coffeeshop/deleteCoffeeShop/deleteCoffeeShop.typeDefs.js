import { gql } from "apollo-server-core";

export default gql`
  type RemoveCoffeeShopResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    removeCoffeeShop(id: Int!): RemoveCoffeeShopResult!
  }
`;
