import { DefaultHeader } from "./DefaultHeader";

export const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div>
      <DefaultHeader />
      {children}
    </div>
  );
};
