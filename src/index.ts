import { DatabaseWrapper } from "./db/Database";
import { query } from "./db/QueryBuilder";

const database = new DatabaseWrapper("testingOrm.db");

const User = database.define("testingOrm", {
  id: "INTEGER PRIMARY KEY AUTOINCREMENT",
  name: "TEXT",
  email: "TEXT",
  age: "INTEGER",
  createdAt: "DATETIME DEFAULT CURRENT_TIMESTAMP",
});

User.create({
  name: "John Doe",
  email: "sexo_@hotmail.com",
});

console.log(User.find({ name: "John Doe" }));
database.close();
