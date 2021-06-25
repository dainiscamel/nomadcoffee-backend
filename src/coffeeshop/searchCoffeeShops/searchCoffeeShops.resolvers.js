import client from "../../client";

export default {
  Query: {
    searchCoffeeShops: async (_, { keyword }) => {
      return client.coffeeShop.findMany({
        where: {
          OR: [
            {
              name: {
                startsWith: keyword.toLowerCase(),
              },
            },
            {
              categories: {
                some: { name: { contains: keyword } },
              },
            },
          ],
        },
        include: {
          photos: true,
        },
      });
    },
  },
};
