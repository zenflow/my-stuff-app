import * as path from "node:path";
import * as url from "node:url";
import pg from "pg";
import Postgrator from "postgrator";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const target = process.argv[2] || "max";
console.log("parameters", { target });

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
});
await client.connect();

const postgrator = new Postgrator({
  migrationPattern: path.join(__dirname, "migrations/*"),
  driver: "pg",
  execQuery: (query) => client.query(query),
});

let migrations;
let error;
try {
  migrations = await postgrator.migrate(target);
} catch (_error) {
  migrations = _error.appliedMigrations;
  error = _error;
}

console.log("applied migrations", migrations);
if (error) {
  console.error(error);
} else {
  console.log("success");
}

await client.end();
