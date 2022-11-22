import type { ISODateString } from "next-auth/core/types";
import { useSession } from "next-auth/react";

export type MyUser = {
  id: string;
  name: string;
  email: string;
  image: string;
};

export type MySession = {
  user: MyUser;
  expires: ISODateString;
};

export const useMySession = (): MySession | null => {
  return useSession().data as MySession | null;
};
