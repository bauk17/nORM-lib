type Operator = "=" | "!=" | "<" | ">" | "<=" | ">=";

export class QueryBuilder {
  private table: string;
  private fields: string[] = ["*"];
  private whereClause: string[] = [];
  private orderClause: string = "";
  private limitClause: string = "";
  private values: any[] = [];

  constructor(table: string) {
    this.table = table;
  }

  select(fields: string[]) {
    this.fields = fields;
    return this;
  }

  where(column: string, operator: Operator, value: any) {
    this.whereClause.push(`${column} ${operator} ?`);
    this.values.push(value);
    return this;
  }

  orderBy(column: string, direction: "ASC" | "DESC" = "ASC") {
    this.orderClause = `ORDER BY ${column} ${direction}`;
    return this;
  }

  limit(count: number) {
    this.limitClause = `LIMIT ${count}`;
    return this;
  }

  build(): { sql: string; params: any[] } {
    let sql = `SELECT ${this.fields.join(", ")} FROM ${this.table}`;

    if (this.whereClause.length) {
      sql += ` WHERE ${this.whereClause.join(" AND ")}`;
    }

    if (this.orderClause) {
      sql += ` ${this.orderClause}`;
    }

    if (this.limitClause) {
      sql += ` ${this.limitClause}`;
    }

    return { sql, params: this.values };
  }
}

export const query = (table: string) => new QueryBuilder(table);
