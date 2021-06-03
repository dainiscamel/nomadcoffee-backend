import { processCategory } from "../../category/category.utils.js";
import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (
        _,
        { name, latitude, longitude, categories },
        { loggedInUser }
      ) => {
        // 이미 존재하는 커피샵인지 찾기
        // const existingCoffeeShop = await client.coffeeShop.findFirst({
        //   where: {
        //     AND: [
        //       {
        //         name,
        //       },
        //       {
        //         latitude,
        //       },
        //       {
        //         longitude,
        //       },
        //     ],
        //   },
        // });
        // console.log("existingCoffeeShop", existingCoffeeShop);
        // 없으면 생성
        let categoryObj = [];
        categoryObj = processCategory(categories);
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
            ...(categoryObj.length > 0 && {
              categories: {
                connectOrCreate: categoryObj,
              },
            }),
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
