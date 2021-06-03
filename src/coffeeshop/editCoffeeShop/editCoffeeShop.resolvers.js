import { processCategory } from "../../category/category.utils";
import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processFile } from "../../shared/shared.utils";

export default {
  Mutation: {
    editCoffeeShop: protectedResolver(
      async (
        _,
        { name, latitude, longitude, photos, categories },
        { loggedInUser }
      ) => {
        let categoryObj = [];
        let photoUrl = [];
        const oldCoffeeShop = await client.coffeeShop.findFirst({
          where: {
            AND: [
              {
                user: {
                  id: loggedInUser.id,
                },
              },
              { name },
            ],
          },
          include: {
            categories: { select: { name: true } },
            photos: { select: { id: true } },
          },
        });

        if (!oldCoffeeShop) {
          throw new Error("There's no coffee shop you've created. :-(");
        }

        if (photos) {
          photoUrl = await processFile(photos, loggedInUser.id);
        }

        categoryObj = processCategory(categories);
        const ok = await client.coffeeShop.update({
          where: {
            id: oldCoffeeShop.id,
          },
          data: {
            name,
            latitude,
            longitude,

            photos: {
              deleteMany: oldCoffeeShop.photos,
              connectOrCreate: {
                where: { url: photoUrl },
                create: { url: photoUrl },
              },
            },

            ...(categoryObj.length > 0 && {
              categories: {
                disconnect: oldCoffeeShop.categories,
                connectOrCreate: categoryObj,
              },
            }),
          },
          include: {
            photos: true,
            categories: true,
          },
        });

        if (ok) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "can't edit coffee shop",
          };
        }
      }
    ),
  },
};
