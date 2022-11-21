import { useEffect } from "react";
import dynamic from "next/dynamic";
import { signIn, useSession } from "next-auth/react";
import type { MyPage } from "./_app";

const MyAdmin = dynamic(
  () => import("../admin/MyAdmin").then((m) => m.MyAdmin),
  { ssr: false }
);

const AdminPage: MyPage = () => {
  const { data: session } = useSession();
  const hasAccess = session !== null; // user has access [to admin] if signed in
  useEffect(() => {
    if (!hasAccess) signIn();
  }, [hasAccess]);
  if (!hasAccess) return null;
  return <MyAdmin key={session.user?.email} session={session} />;
};

AdminPage.Layout = false;

export default AdminPage;
