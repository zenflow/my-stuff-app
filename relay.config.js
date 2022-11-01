// See https://github.com/facebook/relay/tree/main/packages/relay-compiler#supported-compiler-configuration-options

module.exports = {
  src: ".",
  schema: "./schema.graphql",
  language: "typescript",
  excludes: ["/.next/", "/node_modules/"],
  schemaConfig: {
    nodeInterfaceIdField: "nodeId",
  },
};
