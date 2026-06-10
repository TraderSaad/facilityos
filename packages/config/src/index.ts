export function getConfig(key: string, fallback = ''): string {
  return process.env[key] ?? fallback;
}
