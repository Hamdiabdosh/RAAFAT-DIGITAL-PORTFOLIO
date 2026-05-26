const API_ORIGIN = (
  import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1"
).replace(/\/api\/v1\/?$/, "");

export function mediaUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${API_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}
