import { Sequelize } from "sequelize";
import NextAuth from "next-auth";
import SequelizeAdapter from "@next-auth/sequelize-adapter";
import GoogleProvider from "next-auth/providers/google";
import { defaultModels } from "../../../modules/next-auth-sequelize-default-models";

const sequelize = new Sequelize(process.env.DATABASE_URL!, { logging: false });
const adapter = SequelizeAdapter(sequelize, {
  models: {
    Account: sequelize.define("account", defaultModels.Account),
    Session: sequelize.define("session", defaultModels.Session),
    User: sequelize.define("user", defaultModels.User),
    VerificationToken: sequelize.define(
      "verificationToken",
      defaultModels.VerificationToken
    ),
  },
});

export default NextAuth({
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
