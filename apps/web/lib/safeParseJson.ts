export function safeParseJson<T>(value: string | null | undefined): T | null {
  if (value === undefined || value === null) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export default safeParseJson;
