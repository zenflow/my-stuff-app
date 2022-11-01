/**
 * TODO
 * - error authenticating user before db schema has been auto-initialized (second try works)
 *   [next-auth][error][OAUTH_CALLBACK_HANDLER_ERROR]
 *   https://next-auth.js.org/errors#oauth_callback_handler_error relation "users" does not exist Error
 *   at Query.run (C:\Users\matt_\Documents\dev\my-stuff-app\node_modules\sequelize\lib\dialects\postgres\query.js:50:25)
 */

import { Sequelize } from "sequelize";
import NextAuth from "next-auth";
import SequelizeAdapter from "@next-auth/sequelize-adapter";
import GoogleProvider from "next-auth/providers/google";
import { getModels } from "../../../lib/next-auth-sequelize-adapter-models";

const sequelize = new Sequelize(process.env.DATABASE_URL!, { logging: false });
const adapter = SequelizeAdapter(sequelize, { models: getModels(sequelize) });

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter,
  session: {
    strategy: "jwt",
  },
});

export default (req: any, res: any): any => {
  console.log("got auth request");
  return handler(req, res);
};
