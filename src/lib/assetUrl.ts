export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const cleaned = path.replace(/^\//, '');
  return `${base}/${cleaned}`;
}
