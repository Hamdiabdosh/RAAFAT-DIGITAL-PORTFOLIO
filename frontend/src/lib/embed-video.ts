/** Returns an embeddable URL for YouTube or Loom, or null if not supported. */
export function embedVideoUrl(url: string | null | undefined): string | null {
  if (!url?.trim()) return null;

  try {
    const parsed = new URL(url.trim());

    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.slice(1);
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    if (parsed.hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    if (parsed.hostname.includes("loom.com") && parsed.pathname.includes("/share/")) {
      const id = parsed.pathname.split("/share/")[1]?.replace(/\/$/, "");
      return id ? `https://www.loom.com/embed/${id}` : null;
    }
  } catch {
    return null;
  }

  return null;
}
