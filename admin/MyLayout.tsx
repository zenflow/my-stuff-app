import { Layout, LayoutProps } from "react-admin";
import { MyAppBar } from "./MyAppBar";

export function MyLayout(props: LayoutProps) {
  return <Layout {...props} appBar={MyAppBar} />;
}
