import Database from "better-sqlite3";

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
}
