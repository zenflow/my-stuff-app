-- table

create table memes (
    id uuid primary key,
    created_at timestamp with time zone not null,
    updated_at timestamp with time zone not null,
    owner_id uuid references users(id) on update cascade on delete cascade,
    image text not null,
    caption text not null
);

-- table triggers

create function before_insert_meme() returns trigger as $$
begin
  new.id := gen_random_uuid();
  new.created_at := current_timestamp;
  new.updated_at := current_timestamp;
  new.owner_id = current_user_id();
  return new;
end;
$$ language plpgsql;

create function before_update_meme() returns trigger as $$
begin
  new.updated_at := current_timestamp;
  return new;
end;
$$ language plpgsql;

create trigger before_insert_meme before insert
  on memes for each row execute procedure before_insert_meme();
create trigger before_update_meme before update
  on memes for each row execute procedure before_update_meme();

-- table permissions

grant select on memes to app_anonymous, app_user, app_admin;
grant insert (image, caption) on memes to app_admin;
grant update (caption) on memes to app_admin;
grant delete on memes to app_admin;

alter table memes enable row level security;
create policy select_memes
  on memes for select
  using (true);
create policy insert_memes_admin
  on memes for insert to app_admin
  with check (owner_id::text = current_user_id());
create policy update_memes_admin
  on memes for update to app_admin
  using (owner_id::text = current_user_id());
create policy delete_memes_admin
  on memes for delete to app_admin
  using (owner_id::text = current_user_id());
