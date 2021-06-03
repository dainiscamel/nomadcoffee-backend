import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeCoffeeShops: protectedResolver((_, { page }) => {
      return client.coffeeShop.findMany({
        take: 5,
        skip: (page - 1) * 5,
      });
    }),
  },
};
