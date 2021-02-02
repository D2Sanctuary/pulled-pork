import moment from "moment";
import { Pool } from "pg";

type TimeUnit = "s" | "m" | "h" | "d" | "w" | "M" | "y";

function validTimeUnit(unit: string): unit is TimeUnit {
  return ["s", "m", "h", "d", "w", "M", "y"].includes(unit);
}

export function parseTimeString(timeString: string) {
  const amount = Number(timeString.slice(0, -1));
  const unit = timeString.slice(-1);
  if (isNaN(amount) || amount <= 0) {
    throw new Error("amount must be a positive integer");
  }
  if (!validTimeUnit(unit)) {
    throw new Error("unit must be one of s, m, h, d, w, M, y");
  }
  return moment().add(amount, unit).unix();
}

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
});

export const query = pool.query;
export type QueryFn = typeof query;
