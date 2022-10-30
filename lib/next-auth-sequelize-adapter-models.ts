/**
 * Defines default models, but with text fields using TEXT type instead of STRING,
 * to avoid 255 character limit.
 */

import SequelizeAdapter, { models } from "@next-auth/sequelize-adapter";
import { DataTypes, Sequelize } from "sequelize";

type SequelizeAdapterOptions = NonNullable<
  Parameters<typeof SequelizeAdapter>[1]
>;

export function getModels(
  sequelize: Sequelize
): SequelizeAdapterOptions["models"] {
  return {
    Account: sequelize.define("account", changeFieldTypes(models.Account)),
    User: sequelize.define("user", changeFieldTypes(models.User)),
    Session: sequelize.define("session", changeFieldTypes(models.Session)),
    VerificationToken: sequelize.define(
      "verificationToken",
      changeFieldTypes(models.VerificationToken)
    ),
  };
}

function changeFieldTypes<T extends Record<string, Object>>(fields: T): T {
  const result = {} as any;
  for (const [fieldName, fieldDefinition] of Object.entries(fields)) {
    result[fieldName] = { ...fieldDefinition };
    if (result[fieldName].type === DataTypes.STRING) {
      result[fieldName] = DataTypes.TEXT;
    }
  }
  return result;
}
