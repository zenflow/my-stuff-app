import BaseApp, {
  AppContext,
  AppInitialProps,
  AppProps,
  AppType,
} from "next/app";
import type { Session } from "next-auth";
import { SessionProvider, SessionProviderProps } from "next-auth/react";

export type CreateWithSessionOptions = {
  internalBaseUrl: string;
} & Omit<SessionProviderProps, "children" | "session">;

type SessionAppProps = {
  session: Session | null | undefined;
};

export function createWithSession(options: CreateWithSessionOptions) {
  function withSession(App: AppType): AppType {
    const AppWithSession = ({
      session,
      ...props
    }: AppProps & SessionAppProps) => {
      const { internalBaseUrl: _, ...providerOptions } = options;
      return (
        <SessionProvider session={session} {...providerOptions}>
          <App {...props} />
        </SessionProvider>
      );
    };

    AppWithSession.getInitialProps = async (
      ctx: AppContext
    ): Promise<AppInitialProps & SessionAppProps> => {
      const session = await getSession(ctx, options);
      const getInitialProps = App.getInitialProps || BaseApp.getInitialProps;
      const props = (await getInitialProps(ctx)) as AppInitialProps;
      return { ...props, session };
    };

    return AppWithSession as unknown as AppType;
  }
  return withSession;
}

async function getSession(
  ctx: AppContext,
  options: CreateWithSessionOptions
): Promise<Session | null | undefined> {
  if (!ctx.ctx.req) {
    // on client-side, sessions are kept up-to-date by SessionProvider
    return undefined;
  }
  const url = `${options.internalBaseUrl}${
    options.basePath || "/api/auth"
  }/session`;
  const cookie = ctx.ctx.req.headers.cookie; // forward cookie from client to api
  const response = await fetch(url, { headers: cookie ? { cookie } : {} });
  const setCookie = response.headers.get("Set-Cookie"); // forward Set-Cookie from api to client
  if (setCookie) ctx.ctx.res?.setHeader("Set-Cookie", setCookie);
  const session = await response.json();
  return session.user ? (session as Session) : null;
}
