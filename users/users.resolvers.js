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
    followers: async (_, { username, page }) => {
      const ok = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (!ok) {
        return [];
      }
      const aFollowers = await client.user
        .findUnique({ where: { username } })
        .followers({
          take: 5,
          skip: (page - 1) * 5,
        });
      //console.log("followers", aFollowers);

      return aFollowers;
    },
    following: async (_, { username, page }) => {
      const ok = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (!ok) {
        return [];
      }

      const aFollowing = await client.user
        .findUnique({ where: { username } })
        .following({
          take: 5,
          skip: (page - 1) * 5,
        });
      //console.log("following", aFollowing);

      return aFollowing;
    },
  },
};
