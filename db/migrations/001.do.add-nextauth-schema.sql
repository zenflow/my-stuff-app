create table users (
    id uuid primary key,
    name text not null,
    email text unique not null,
    email_verified timestamp with time zone,
    image text not null default ''
);

create table accounts (
    id uuid primary key,
    type text,
    provider text,
    provider_account_id text,
    refresh_token text,
    access_token text,
    expires_at integer,
    token_type text,
    scope text,
    id_token text,
    session_state text,
    user_id uuid references users(id) on update cascade on delete cascade
);

create table sessions (
    id uuid primary key,
    expires timestamp with time zone not null,
    session_token text unique,
    user_id uuid references users(id) on update cascade on delete cascade
);

create table verification_tokens (
    id serial primary key,
    token text unique,
    identifier text,
    expires timestamp with time zone not null
);
