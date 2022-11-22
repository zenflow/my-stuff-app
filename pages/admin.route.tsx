import { useEffect } from "react";
import dynamic from "next/dynamic";
import { signIn } from "next-auth/react";
import { useMySession } from "../common/auth";
import type { MyPage } from "./_app.route";

const MyAdmin = dynamic(
  () => import("../admin/MyAdmin").then((m) => m.MyAdmin),
  { ssr: false }
);

const AdminPage: MyPage = () => {
  const session = useMySession();
  const isSignedIn = !!session;
  const isAuthorized = session?.user.role === "ADMIN";
  useEffect(() => {
    if (!isSignedIn) signIn();
  }, [isSignedIn]);
  if (!isSignedIn) return null;
  if (!isAuthorized) return <h1>403 Forbidden</h1>;
  return <MyAdmin key={session.user.id} session={session} />;
};

AdminPage.Layout = false;

export default AdminPage;
