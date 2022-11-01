/**
 * @generated SignedSource<<c47546f04410d351857c9f60d2f93ba3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type page_Query$variables = {};
export type page_Query$data = {
  readonly users: {
    readonly nodes: ReadonlyArray<{
      readonly email: string | null;
      readonly name: string | null;
    }>;
  } | null;
};
export type page_Query = {
  response: page_Query$data;
  variables: page_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "page_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "UsersConnection",
        "kind": "LinkedField",
        "name": "users",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "nodes",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              (v1/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "page_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "UsersConnection",
        "kind": "LinkedField",
        "name": "users",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "nodes",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "nodeId",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8b2a9a68281fa2599b2fddd7efaa1f2b",
    "id": null,
    "metadata": {},
    "name": "page_Query",
    "operationKind": "query",
    "text": "query page_Query {\n  users {\n    nodes {\n      email\n      name\n      nodeId\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "647c165fa37fa4d7c5ab95c33b44f86d";

export default node;
