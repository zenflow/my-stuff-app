/** @type {import('@graphql-codegen/cli').CodegenConfig} */
module.exports = {
  schema: "./schema.graphql",
  documents: ["{components,pages}/**/*.graphql"],
  ignoreNoDocuments: true,
  config: {
    scalars: {
      UUID: "string",
      Datetime: "string",
    },
  },
  generates: {
    "./schema.generated.ts": {
      plugins: ["typescript"],
    },
    "./": {
      preset: "near-operation-file",
      presetConfig: {
        extension: ".generated.ts",
        baseTypesPath: "schema.generated.ts",
      },
      plugins: ["typescript-operations", "typed-document-node"],
    },
  },
};
