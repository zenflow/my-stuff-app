create function set_updated_at() returns trigger as $$
begin
  new."updatedAt" := current_timestamp;
  return new;
end;
$$ language plpgsql;

create trigger person_updated_at before update
  on users for each row execute procedure set_updated_at();
