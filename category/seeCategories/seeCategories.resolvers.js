import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeCategories: protectedResolver((_, { page }) => {
      return client.category.findMany({
        take: 5,
        skip: (page - 1) * 5,
      });
    }),
  },
};
