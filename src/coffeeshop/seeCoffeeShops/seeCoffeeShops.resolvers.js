import client from "../../client";

export default {
  Query: {
    seeCoffeeShops: (_, { page }) =>
      client.coffeeShop.findMany({
        include: {
          photos: true,
          categories: true,
        },
        take: 5,
        skip: (page - 1) * 5,
      }),
  },
};
