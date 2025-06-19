import Database from "better-sqlite3";
import { Model } from "../orm/Model";

export class DatabaseWrapper {
  private db: Database.Database;

  constructor(path: string) {
    this.db = new Database(path);
  }

  run(sql: string, params: any[] = []) {
    return this.db.prepare(sql).run(...params);
  }

  get(sql: string, params: any[] = []) {
    return this.db.prepare(sql).get(...params);
  }

  all(sql: string, params: any[] = []) {
    return this.db.prepare(sql).all(...params);
  }

  exec(sql: string) {
    return this.db.exec(sql);
  }

  close() {
    this.db.close();
  }

  define(tableName: string, columns: Record<string, any>) {
    const columnsName = Object.keys(columns);
    const columnsValues = Object.values(columns);

    const columnsDefinition = columnsName
      .map((name, index) => {
        const type = columnsValues[index];
        return `${name} ${type}`;
      })
      .join(", ");

    this.run(`CREATE TABLE IF NOT EXISTS ${tableName} (${columnsDefinition})`);

    return new Model(tableName, this);
  }
}
