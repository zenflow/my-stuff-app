import { useEffect } from "react";
import { RaRecord, useRecordContext } from "react-admin";

export const mainTitle = "My Stuff";

export type GetResourceTitleCallback = (params: {
  record: RaRecord | null;
}) => string | null;

export function getResourceTitle(
  title: string | GetResourceTitleCallback
): JSX.Element {
  const TitleComponent: React.FC = () => {
    const record = useRecordContext();
    const appBarTitle =
      typeof title === "function" ? title({ record }) ?? "" : title;
    const documentTitle = appBarTitle
      ? `${appBarTitle} | ${mainTitle}`
      : mainTitle;
    useEffect(() => {
      window.document.title = documentTitle;
    }, [documentTitle]);
    return <>{appBarTitle}</>;
  };
  return <TitleComponent />;
}
