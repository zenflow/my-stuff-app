import { promisify } from "node:util";
import { postgraphile, PostGraphileOptions } from "postgraphile";
import { getDefaults } from "../../../lib/postgraphile-recommended-defaults";

const defaults = getDefaults(process.env.NODE_ENV === "development");
const options: PostGraphileOptions = {
  ...defaults,
  graphqlRoute: "/api/data/graphql",
  graphiqlRoute: "/api/data/graphiql",
  appendPlugins: [
    ...defaults.appendPlugins!,
    require("postgraphile-plugin-connection-filter"),
  ],
};

export default promisify(postgraphile(process.env.DATABASE_URL, options));

export const config = {
  api: {
    bodyParser: false,
  },
};
