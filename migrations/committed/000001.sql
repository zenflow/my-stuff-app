--! Previous: -
--! Hash: sha1:7f3b26d8c995603ec732c14a4a5135fe21177aeb

CREATE TABLE public.accounts (
    id uuid NOT NULL,
    type text,
    provider text,
    "providerAccountId" text,
    refresh_token text,
    access_token text,
    expires_at integer,
    token_type text,
    scope text,
    id_token text,
    session_state text,
    "userId" uuid,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
ALTER TABLE public.accounts OWNER TO postgres;
CREATE TABLE public.sessions (
    id uuid NOT NULL,
    expires timestamp with time zone NOT NULL,
    "sessionToken" text,
    "userId" uuid,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
ALTER TABLE public.sessions OWNER TO postgres;
CREATE TABLE public.users (
    id uuid NOT NULL,
    name text,
    email text,
    "emailVerified" timestamp with time zone,
    image text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
ALTER TABLE public.users OWNER TO postgres;
CREATE TABLE public."verificationTokens" (
    id integer NOT NULL,
    token text,
    identifier text,
    expires timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
ALTER TABLE public."verificationTokens" OWNER TO postgres;
CREATE SEQUENCE public."verificationTokens_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE public."verificationTokens_id_seq" OWNER TO postgres;
ALTER SEQUENCE public."verificationTokens_id_seq" OWNED BY public."verificationTokens".id;
ALTER TABLE ONLY public."verificationTokens" ALTER COLUMN id SET DEFAULT nextval('public."verificationTokens_id_seq"'::regclass);
ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public."verificationTokens"
    ADD CONSTRAINT "verificationTokens_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
