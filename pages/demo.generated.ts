import * as Types from '../schema.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type DemoPage_UsersQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type DemoPage_UsersQuery = { __typename?: 'Query', users?: { __typename?: 'UsersConnection', nodes: Array<{ __typename?: 'User', id: string, role: Types.UserRoles, name: string, createdAt: string }> } | null };


export const DemoPage_UsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DemoPage_Users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<DemoPage_UsersQuery, DemoPage_UsersQueryVariables>;