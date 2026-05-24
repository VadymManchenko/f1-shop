export function assetUrl(path: string): string {
  const cleaned = path.replace(/^\//, '');
  return `/${cleaned}`;
}
