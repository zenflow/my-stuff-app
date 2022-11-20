/**
 * "@next-auth/sequelize-adapter" models,
 * but with fields using TEXT type instead of STRING,
 * to avoid 255 character limit.
 */

import { models as _models } from "@next-auth/sequelize-adapter";
import { DataTypes, ModelAttributes } from "sequelize";

export const defaultModels = {
  Account: stringFieldsToText(_models.Account),
  Session: stringFieldsToText(_models.Session),
  User: stringFieldsToText(_models.User),
  VerificationToken: stringFieldsToText(_models.VerificationToken),
};

function stringFieldsToText<T extends ModelAttributes>(fields: T): T {
  const result = {} as any;
  for (const [fieldName, fieldDefinition] of Object.entries(fields)) {
    result[fieldName] = { ...(fieldDefinition as any) };
    if (result[fieldName].type === DataTypes.STRING) {
      result[fieldName] = DataTypes.TEXT;
    }
  }
  return result;
}
