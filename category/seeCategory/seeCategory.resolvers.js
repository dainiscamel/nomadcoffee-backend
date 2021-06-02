import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeCategory: protectedResolver((_, { id }) => {
      return client.category.findUnique({
        where: {
          id,
        },
      });
    }),
  },
};
