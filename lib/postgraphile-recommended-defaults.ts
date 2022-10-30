/**
 * Recommended default options for PostGraphile
 * https://www.graphile.org/postgraphile/usage-library/#recommended-options
 */

import type { PostGraphileOptions } from "postgraphile";

export const defaultsForDevelopment: PostGraphileOptions = {
  subscriptions: true,
  watchPg: true,
  dynamicJson: true,
  setofFunctionsContainNulls: false,
  ignoreRBAC: false,
  showErrorStack: "json",
  extendedErrors: ["hint", "detail", "errcode"],
  appendPlugins: [require("@graphile-contrib/pg-simplify-inflector")],
  exportGqlSchemaPath: "schema.graphql",
  graphiql: true,
  enhanceGraphiql: true,
  allowExplain(req) {
    return true;
  },
  enableQueryBatching: true,
  legacyRelations: "omit",
  pgSettings(req) {
    return {};
  },
};

export const defaultsForProduction: PostGraphileOptions = {
  subscriptions: true,
  retryOnInitFail: true,
  dynamicJson: true,
  setofFunctionsContainNulls: false,
  ignoreRBAC: false,
  extendedErrors: ["errcode"],
  appendPlugins: [require("@graphile-contrib/pg-simplify-inflector")],
  graphiql: false,
  enableQueryBatching: true,
  disableQueryLog: true, // "our default logging has performance issues, but do make sure you have a logging system in place!"
  legacyRelations: "omit",
  pgSettings(req) {
    return {};
  },
};

export function getDefaults(development: boolean = false): PostGraphileOptions {
  return development ? defaultsForDevelopment : defaultsForProduction;
}
