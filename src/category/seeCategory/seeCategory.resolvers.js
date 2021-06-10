import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeCategory: (_, { id, page }) =>
      client.category
        .findUnique({
          where: {
            id,
          },
        })
        .shops({
          take: 5,
          skip: (page - 1) * 5,
        }),
  },
};
