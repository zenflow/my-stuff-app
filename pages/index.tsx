import { gql, useQuery } from "@apollo/client";

const HOME_PAGE_QUERY = gql`
  query {
    users {
      nodes {
        name
        email
        createdAt
      }
    }
  }
`;

const HomePage: React.FC = () => {
  const { error, data } = useQuery(HOME_PAGE_QUERY);
  if (error) throw error;
  return (
    <>
      <h1>Home</h1>
      <h2>Users</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

export default HomePage;
