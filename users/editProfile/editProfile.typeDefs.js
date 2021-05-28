import { gql } from "apollo-server-core";

export default gql`
  type editProfileResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    editProfile(
      username: String
      email: String
      name: String
      password: String
      location: String
      avatarURL: Upload
      githubUsername: String
    ): editProfileResult!
  }
`;
