export const ADMIN_TOKEN_KEY = "raafat-admin-token";

export function getAdminToken(): string | null {
  if (typeof localStorage === "undefined") return null;
  return localStorage.getItem(ADMIN_TOKEN_KEY);
}

export function setAdminToken(token: string) {
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
}

export function clearAdminToken() {
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
  }
}

export function isAdminAuthenticated(): boolean {
  return !!getAdminToken();
}
