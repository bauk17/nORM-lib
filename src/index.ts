import { DatabaseWrapper } from "./db/Database";
import { query } from "./db/QueryBuilder";
import { User } from "./models/User";

const database = new DatabaseWrapper("testingOrm.db");
User.setDatabase(database);

const testing = database.define("testingOrm", {
  id: "INTEGER PRIMARY KEY AUTOINCREMENT",
  name: "TEXT",
  email: "TEXT",
  age: "INTEGER",
  createdAt: "DATETIME DEFAULT CURRENT_TIMESTAMP",
});

const users = User.find({ name: "John Doe" });
console.log(users);
database.close();
