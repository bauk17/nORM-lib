import { DatabaseWrapper } from "../db/Database";

export class Model {
  static tableName: string;
  static db: DatabaseWrapper;

  static setDatabase(database: DatabaseWrapper) {
    this.db = database;
  }

  static async create(data: Record<string, any>) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map(() => "?").join(", ");

    const sql = `INSERT INTO ${this.tableName} (${keys.join(
      ", "
    )}) VALUES (${placeholders})`;
    this.db.run(sql, values);
  }

  static find(where: Record<string, any>) {
    const keys = Object.keys(where);
    const conditions = keys.map((k) => `${k} = ?`).join(" AND");

    const sql = keys.length
      ? `SELECT * FROM ${this.tableName} WHERE ${conditions}`
      : `SELECT * FROM ${this.tableName}`;

    const values = Object.values(where);

    return this.db.all(sql, values);
  }
}
