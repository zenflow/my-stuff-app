import { promisify } from "node:util";
import { postgraphile, PostGraphileOptions } from "postgraphile";
import type { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
import { Pool } from "pg";
import { getDefaults } from "../../../modules/postgraphile-recommended-defaults";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
pool.on("connect", (client) => {
  client.query("SET ROLE app").catch((error) => {
    console.error(error);
    process.exit(1);
  });
});

const defaults = getDefaults(process.env.NODE_ENV === "development");
export const options: PostGraphileOptions = {
  ...defaults,
  graphqlRoute: "/api/data/graphql",
  graphiqlRoute: "/api/data/graphiql",
  appendPlugins: [
    ...defaults.appendPlugins!,
    require("postgraphile-plugin-connection-filter"),
  ],
  ownerConnectionString: process.env.DATABASE_URL,
  pgSettings: async (req) => {
    const token: any = await getToken({ req: req as NextApiRequest });
    return {
      role: `app_${token?.userRole.toLowerCase() ?? "anonymous"}`,
      "user.id": token?.userId ?? "",
    };
  },
};

export default promisify(postgraphile(pool, options));

export const config = {
  api: {
    bodyParser: false,
  },
};
