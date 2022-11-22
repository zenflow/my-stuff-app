create table users (
    id uuid primary key,
    name text not null,
    email text unique not null,
    "emailVerified" timestamp with time zone,
    image text not null default '',
    "createdAt" timestamp with time zone not null,
    "updatedAt" timestamp with time zone not null
);

create table accounts (
    id uuid primary key,
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
    "userId" uuid references users(id) on update cascade on delete cascade,
    "createdAt" timestamp with time zone not null,
    "updatedAt" timestamp with time zone not null
);

create table sessions (
    id uuid primary key,
    expires timestamp with time zone not null,
    "sessionToken" text unique,
    "userId" uuid references users(id) on update cascade on delete cascade,
    "createdAt" timestamp with time zone not null,
    "updatedAt" timestamp with time zone not null
);

create table "verificationTokens" (
    id serial primary key,
    token text unique,
    identifier text,
    expires timestamp with time zone not null,
    "createdAt" timestamp with time zone not null,
    "updatedAt" timestamp with time zone not null
);
