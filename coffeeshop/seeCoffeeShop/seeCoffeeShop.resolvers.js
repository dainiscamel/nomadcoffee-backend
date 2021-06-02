import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeCoffeeShop: protectedResolver((_, { id }) => {
      return client.coffeeShop.findUnique({
        where: {
          id,
        },
        include: {
          categories: true,
        },
      });
    }),
  },
};
