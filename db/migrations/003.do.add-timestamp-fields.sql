alter table users add column created_at timestamp with time zone not null;
alter table users add column updated_at timestamp with time zone not null;

create function before_insert_user() returns trigger as $$
begin
  new.created_at := current_timestamp;
  new.updated_at := current_timestamp;
  return new;
end;
$$ language plpgsql;

create function before_update_user() returns trigger as $$
begin
  new.updated_at := current_timestamp;
  return new;
end;
$$ language plpgsql;

create trigger before_insert_user before insert
  on users for each row execute procedure before_insert_user();
create trigger before_update_user before update
  on users for each row execute procedure before_update_user();
