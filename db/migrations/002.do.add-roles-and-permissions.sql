-- user `role` field

create type user_roles as enum ('USER', 'ADMIN');
alter table users add column role user_roles not null;

-- database roles

create role app;
create role app_anonymous;
create role app_user;
create role app_admin;
grant app_anonymous to app;
grant app_user to app;
grant app_admin to app;

-- auth helpers

create function current_user_id() returns text as $$
  select nullif(current_setting('user.id'), '')
$$ language sql stable;
comment on function current_user_id is E'@omit';

create function _current_user() returns users as $$
  select * from users where id::text = current_user_id();
$$ language sql stable;
comment on function _current_user is E'@name currentUser';

-- users table permissions

grant select on users to app_anonymous, app_user, app_admin;
grant update (name) on users to app_admin;

alter table users enable row level security;
create policy select_users
  on users for select
  using (true);
create policy update_users_admin
  on users for update to app_admin
  using (id::text = current_user_id());
