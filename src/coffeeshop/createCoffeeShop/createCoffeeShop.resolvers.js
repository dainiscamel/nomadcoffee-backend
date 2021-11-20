import client from "../../client";
import {
  getImageUrls,
  processCategory,
  uploadS3,
} from "../../shared/shared.utils";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (
        _,
        { name, latitude, longitude, photos, categories },
        { loggedInUser }
      ) => {
        // console.log(name, latitude, longitude, photos, categories);
        let categoryObj = null;
        let url = null;

        if (categories && categories !== []) {
          categoryObj = processCategory(categories);
        }

        if (photos && photos !== []) {
          // url = await getImageUrls(photos, loggedInUser);
          url = await uploadS3(photos, loggedInUser.id, "uploads");
        }
        console.log("카테고리", categoryObj);
        console.log("사진", url);
        const ok = await client.coffeeShop.create({
          data: {
            name,
            latitude,
            longitude,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            ...(categoryObj?.length > 0 && {
              categories: {
                connectOrCreate: categoryObj,
              },
            }),
            // photos: photosObj,
            ...(url?.length > 0 && {
              photos: {
                connectOrCreate: {
                  where: { url },
                  create: { url },
                },
              },
            }),
          },
          include: {
            user: true,
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
            error: "Can't create coffee shop :-(",
          };
        }
      }
    ),
  },
};
