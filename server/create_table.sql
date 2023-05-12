-- psql -d <elephant-url> -f src/server/create_table.sql

CREATE TABLE login (
  "id" SERIAL PRIMARY KEY,
  "user" BIGINT NOT NULL,
  "server" VARCHAR NOT NULL,
  "key" VARCHAR NOT NULL,
  "secret" VARCHAR NOT NULL
)
