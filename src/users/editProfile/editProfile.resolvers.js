import bcrypt from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../users.utils";
import { processFile } from "../../shared/shared.utils";

export default {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        {
          username,
          email,
          name,
          password,
          location,
          avatarURL,
          githubUsername,
        },
        { loggedInUser }
      ) => {
        let avatarStaticUrl = null;
        if (avatarURL) {
          avatarStaticUrl = await processFile(avatarURL, loggedInUser.id);
        }
        let uglyPassword = null;
        if (password) {
          uglyPassword = await bcrypt.hash(password, 10);
        }

        const editUser = await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            username,
            email,
            name,
            ...(uglyPassword && { password: uglyPassword }),
            location,
            ...(avatarStaticUrl && { avatarURL: avatarStaticUrl }),
            githubUsername,
          },
        });

        if (editUser.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "Could not update profile :-(",
          };
        }
      }
    ),
  },
};
