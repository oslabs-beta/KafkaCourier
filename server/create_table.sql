-- psql -d <elephant-url> -f src/server/create_table.sql

CREATE TABLE public.login (
  "id" SERIAL PRIMARY KEY,
  "user_id" VARCHAR NOT NULL UNIQUE,
  "server" VARCHAR NOT NULL,
  "key" VARCHAR NOT NULL,
  "secret" VARCHAR NOT NULL,
)
