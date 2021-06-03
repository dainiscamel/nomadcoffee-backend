import { gql } from "apollo-server-core";

export default gql`
  type User {
    id: Int!
    username: String!
    email: String!
    name: String
    location: String
    avatarURL: String
    githubUsername: String
    coffeeShop: [CoffeeShop]
    following(page: Int!): [User]
    followers(page: Int!): [User]
    totalFollowing: Int!
    totalFollowers: Int!
    createdAt: String!
    updatedAt: String!
  }
`;
