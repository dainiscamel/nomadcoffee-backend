import { processCategory } from "../../category/category.utils";
import client from "../../client";
import { createWriteStream } from "fs";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    editCoffeeShop: protectedResolver(
      async (
        _,
        { name, latitude, longitude, photos, categories },
        { loggedInUser }
      ) => {
        let photoObj = [];
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
          photoObj = photos;

          const { filename, createReadStream } = await photos;

          const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
          const readStream = createReadStream();
          const writeStream = createWriteStream(
            process.cwd() + "/uploads/" + newFilename
          );
          readStream.pipe(writeStream);

          photoUrl = `http://localhost:4000/static/${newFilename}`;
        }
        console.log("photoUrl", photoUrl);
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
        console.log(categoryObj);
        console.log(ok);
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
