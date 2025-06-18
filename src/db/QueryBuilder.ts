type Operator = "=" | "!=" | "<" | ">" | "<=" | ">=";

export class QueryBuilder {
  private table: string;
  private fields: string[] = ["*"];
  private conditions: string[] = [];
  private values: any[] = [];

  constructor(table: string) {
    this.table = table;
  }

  select(fields: string[] = ["*"]) {
    this.fields = fields;
    return this;
  }

  where(obj: Record<string, any>) {
    for (const key in obj) {
      this.conditions.push(`${key} = ?`);
      this.values.push(obj[key]);
    }
    return this;
  }

  build() {
    const sql =
      `SELECT ${this.fields.join(", ")} FROM ${this.table}` +
      (this.conditions.length > 0
        ? ` WHERE ${this.conditions.join(" AND ")}`
        : "");
    return { sql, values: this.values };
  }
}

export const query = (table: string) => new QueryBuilder(table);
