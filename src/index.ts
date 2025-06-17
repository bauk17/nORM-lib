import { DatabaseWrapper } from "./db/Database";
import { query } from "./db/QueryBuilder";
import { User } from "./models/User";

const database = new DatabaseWrapper("testingOrm.db");
User.setDatabase(database);

database.run(`
  CREATE TABLE IF NOT EXISTS testing (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE
  )
`);

const users = User.find({ name: "John Doe" });
console.log(users);
database.close();
