import { gql } from "apollo-server-core";

export default gql`
  scalar Upload
  type CreateCoffeeShopResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    createCoffeeShop(
      name: String!
      latitude: String!
      longitude: String!
      photos: Upload
      categories: String!
    ): CreateCoffeeShopResult
  }
`;
