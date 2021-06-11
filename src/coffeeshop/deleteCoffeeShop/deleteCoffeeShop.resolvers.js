import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteCoffeeShop: protectedResolver(async (_, { id }) => {
      const shop = await client.coffeeShop.findUnique({
        where: { id },
        include: {
          categories: true,
          photos: true,
        },
      });
      if (!shop) {
        return {
          ok: false,
          error: "coffeeshop doesn't exist.",
        };
      }
      console.log(shop);

      const categoryObj = shop.categories.map((cat) => ({ id: cat.id }));
      const photosObj = shop.photos.map((photo) => ({ id: photo.id }));
      console.log(categoryObj);
      console.log(photosObj);
      await client.coffeeShop.update({
        where: { id },
        data: {
          ...(categoryObj.length > 0 && {
            categories: {
              disconnect: categoryObj,
            },
          }),
          ...(photosObj.length > 0 && {
            photos: {
              disconnect: photosObj,
            },
          }),
        },
      });

      const deleteShop = await client.coffeeShop.delete({ where: { id } });
      if (deleteShop) {
        return {
          ok: true,
        };
      }
      return {
        ok: false,
        error: "Can't delete the shop :-(",
      };
    }),
  },
};
