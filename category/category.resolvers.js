import client from "../client";

export default {
  Category: {
    totalShops: (_, { page }) =>
      client.coffeeShop.count({
        take: 5,
        skip: (page - 1) * 5,
      }),
  },
};
