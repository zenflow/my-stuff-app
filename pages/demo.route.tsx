import { useQuery } from "@apollo/client";
import type { MyPage } from "./_app.route";
import { useMySession } from "../common/auth";
import { UserRoles } from "../schema.generated";
import { DemoPage_UsersDocument } from "./demo.generated";

const DemoPage: MyPage = () => {
  const session = useMySession();
  const { error, data: { users } = {} } = useQuery(DemoPage_UsersDocument);
  if (error) throw error;
  return (
    <>
      <h1>Demo</h1>
      <h2>session</h2>
      <JsonDisplay object={session} />
      <h2>users</h2>
      <ul>
        {users?.nodes.map((user) => {
          const created = new Date(user.createdAt).toDateString();
          return (
            <li key={user.id}>
              <span>{`${user.name} (created ${created})`}</span>
              <span style={{ fontWeight: "bold" }}>
                {user.role === UserRoles.Admin && <span> (admin)</span>}
                {user.id === session?.user.id && <span> (you)</span>}
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
};

const JsonDisplay: React.FC<{ object: unknown }> = ({ object }) => (
  <pre>{JSON.stringify(object, null, 2)}</pre>
);

export default DemoPage;
