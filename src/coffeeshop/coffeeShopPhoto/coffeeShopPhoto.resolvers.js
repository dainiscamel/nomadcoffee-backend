import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { createWriteStream } from "fs";

export default {
  Mutation: {
    coffeeShopPhoto: protectedResolver(
      async (_, { photo }, { loggedInUser }) => {
        const coffeeShop = await client.coffeeShop.findFirst({
          where: {
            user: {
              id: loggedInUser.id,
            },
          },
        });

        let coffeeShopUrl = null;
        if (photo) {
          const { filename, createReadStream } = await photo;
          const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
          const readStream = createReadStream();
          const writeStream = createWriteStream(
            process.cwd() + "/uploads/" + newFilename
          );
          readStream.pipe(writeStream);
          coffeeShopUrl = `http://localhost:4000/static/${newFilename}`;
        }
        console.log(coffeeShopUrl);
        return client.coffeeShopPhoto.create({
          data: {
            url: coffeeShopUrl,
            shop: {
              connect: {
                id: coffeeShop.id,
              },
            },
          },
        });
      }
    ),
  },
};
