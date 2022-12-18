import { useEffect } from "react";
import { RaRecord, useRecordContext } from "react-admin";
import { MAIN_TITLE } from "../config";

export type GetTitleCallback = (params: {
  record: RaRecord | null;
}) => string | null;

export function getTitle(title: string | GetTitleCallback): JSX.Element {
  const TitleComponent: React.FC = () => {
    const record = useRecordContext();
    const appBarTitle =
      typeof title === "function" ? title({ record }) ?? "" : title;
    const documentTitle = appBarTitle
      ? `${appBarTitle} - ${MAIN_TITLE}`
      : MAIN_TITLE;
    useEffect(() => {
      window.document.title = documentTitle;
    }, [documentTitle]);
    return <>{appBarTitle}</>;
  };
  return <TitleComponent />;
}
