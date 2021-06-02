import client from "../client";

export default {
  User: {
    totalFollowing: ({ id }) =>
      client.user.count({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
      }),
    totalFollowers: ({ id }) =>
      client.user.count({
        where: {
          following: {
            some: {
              id,
            },
          },
        },
      }),
    followers: async ({ id }, { page }) => {
      const ok = await client.user.findUnique({
        where: { id },
        select: { id: true },
      });
      if (!ok) {
        return [];
      }
      const aFollowers = await client.user
        .findUnique({ where: { id } })
        .followers({
          take: 5,
          skip: (page - 1) * 5,
        });
      //console.log("followers", aFollowers);

      return aFollowers;
    },
    following: async ({ id }, { page }) => {
      const ok = await client.user.findUnique({
        where: { id },
        select: { id: true },
      });
      if (!ok) {
        return [];
      }

      const aFollowing = await client.user
        .findUnique({ where: { id } })
        .following({
          take: 5,
          skip: (page - 1) * 5,
        });
      //console.log("following", aFollowing);

      return aFollowing;
    },
  },
};
