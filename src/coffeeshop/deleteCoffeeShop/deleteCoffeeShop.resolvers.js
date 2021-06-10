import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    removeCoffeeShop: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const shop = await client.coffeeShop.findUnique({
        where: { id },
      });
      if (!shop) {
        return {
          ok: false,
          error: "coffeeshop doesn't exist.",
        };
      }

      const categoryObj = shop.categories.map((cat) => ({ id: cat.id }));
      const photosObj = shop.photos.map((photo) => ({ id: photo.id }));

      await client.coffeeShop.update({
        where: { id },
        data: {
          categories: {
            disconnect: categoryObj,
          },
          photos: {
            disconnect: photosObj,
          },
        },
      });

      const deleteShop = await client.coffeeShop.delete({ where: { id } });
      if (deleteShop) {
        return {
          ok: true,
        };
        return {
          ok: false,
          error: "Can't delete the shop :-(",
        };
      }
    }),
  },
};
