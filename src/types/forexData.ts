export type ForexResult = "success" | "error";

export interface ForexData {
  result: ForexResult;
  base_code: string;
  time_last_update_utc: string;
  rates: Record<string, number>;
}
