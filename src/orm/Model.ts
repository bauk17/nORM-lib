import { DatabaseWrapper } from "../db/Database";
import { query, QueryBuilder } from "../db/QueryBuilder";

export class Model {
  private tableName: string;
  private db: DatabaseWrapper;

  constructor(tableName: string, db: DatabaseWrapper) {
    this.tableName = tableName;
    this.db = db;
  }

  create(data: Record<string, any>) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map(() => "?").join(", ");

    const sql = `INSERT INTO ${this.tableName} (${keys.join(
      ", "
    )}) VALUES (${placeholders})`;
    this.db.run(sql, values);
  }

  find(where: Record<string, any>) {
    const qb = new QueryBuilder(this.tableName);
    qb.select().where(where);

    const { sql, values } = qb.build();

    return this.db.all(sql, values);
  }
}
