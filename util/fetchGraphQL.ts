import { cache as _cache } from "react";
// const cache = _cache;
const cache = <T>(fn: T): T => fn;
// const cache = <T extends Function>(fn: T): T => typeof window === "undefined" ? fn : _cache(fn);

export const fetchGraphQL = cache(async function fetchGraphQL(
  text: string,
  variables: Record<string, any> = {}
) {
  const response = await fetch("http://localhost:3000/api/data/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
    cache: "no-store",
  });
  return await response.json();
});
