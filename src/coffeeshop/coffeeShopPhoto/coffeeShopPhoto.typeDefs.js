import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    coffeeShopPhoto(photo: Upload): CoffeeShopPhoto
  }
`;
