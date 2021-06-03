import { gql } from "apollo-server-core";

export default gql`
  type EditCoffeeShopResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editCoffeeShop(
      name: String!
      latitude: String
      longitude: String
      photos: Upload
      categories: String!
    ): EditCoffeeShopResult
  }
`;
