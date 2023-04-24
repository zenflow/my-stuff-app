import * as Types from '../schema.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type MemesPage_MemesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MemesPage_MemesQuery = { __typename?: 'Query', memes?: { __typename?: 'MemesConnection', nodes: Array<{ __typename?: 'Meme', id: string, createdAt: string, caption: string, image: string, owner?: { __typename?: 'User', name: string } | null }> } | null };


export const MemesPage_MemesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MemesPage_memes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"memes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"CREATED_AT_DESC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MemesPage_MemesQuery, MemesPage_MemesQueryVariables>;