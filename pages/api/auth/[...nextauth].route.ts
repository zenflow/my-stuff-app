import { DataTypes, Sequelize } from "sequelize";
import NextAuth from "next-auth";
import SequelizeAdapter, { models } from "@next-auth/sequelize-adapter";
import GoogleProvider from "next-auth/providers/google";

const sequelize = new Sequelize(process.env.DATABASE_URL!, { logging: false });
const UserModel = sequelize.define(
  "user",
  {
    ...models.User,
    role: {
      type: DataTypes.ENUM,
      values: ["USER", "ADMIN"],
    },
  },
  { underscored: true, timestamps: false }
);
UserModel.beforeCreate((user: any) => {
  const autoAdminEmails = process.env.AUTO_ADMIN_EMAILS?.split(",") ?? [];
  const isAutoAdmin = autoAdminEmails.includes(user.email);
  user.role = isAutoAdmin ? "ADMIN" : "USER";
});
const adapter = SequelizeAdapter(sequelize, {
  models: {
    User: UserModel as any,
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
  theme: {
    logo: "/images/android-chrome-192x192.png",
  },
  callbacks: {
    // generating jwt token
    async jwt({ token, user }) {
      if (user) {
        // new session
        // copy properties from `user` model while it's available
        token.userId = user.id;
        token.userRole = (user as any).role;
      } else {
        // token refresh for old session
        // Here we could refresh user properties from db, but that would defeat the point of jwt.
        // For up-to-date user properties, change session strategy from "jwt" to "database".
      }
      return token;
    },
    // defining session for client
    async session({ session, token }) {
      (session.user as any).id = token.userId;
      (session.user as any).role = token.userRole;
      return session;
    },
  },
});
