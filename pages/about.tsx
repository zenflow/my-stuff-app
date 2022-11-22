import { useMySession } from "../common/auth";
import type { MyPage } from "./_app";

const AboutPage: MyPage = () => {
  const session = useMySession();
  return (
    <>
      <h1>About</h1>
      <h2>Session</h2>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </>
  );
};

export default AboutPage;
