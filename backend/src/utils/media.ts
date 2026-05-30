import fs from "fs";
import path from "path";
import { env } from "../config/env";
import { cloudinary, isCloudinaryConfigured } from "../config/cloudinary";

export function isCloudinaryUrl(url: string): boolean {
  if (!env.CLOUDINARY_CLOUD_NAME) return false;
  return url.startsWith(`https://res.cloudinary.com/${env.CLOUDINARY_CLOUD_NAME}/`);
}

/** Extract public_id from a Cloudinary delivery URL (unsigned upload secure_url). */
export function parseCloudinaryPublicId(url: string): {
  publicId: string;
  resourceType: string;
} | null {
  if (!isCloudinaryUrl(url)) return null;

  const cloud = env.CLOUDINARY_CLOUD_NAME!;
  const prefix = `https://res.cloudinary.com/${cloud}/`;
  const rest = url.slice(prefix.length);
  const slash = rest.indexOf("/");
  if (slash === -1) return null;

  const resourceType = rest.slice(0, slash);
  const afterType = rest.slice(slash + 1);
  if (!afterType.startsWith("upload/")) return null;

  let pathAfterUpload = afterType.slice("upload/".length).split("?")[0];
  const segments = pathAfterUpload.split("/");

  let i = 0;
  if (segments[0]?.match(/^v\d+$/)) i = 1;

  while (i < segments.length - 1) {
    const seg = segments[i];
    if (seg.includes(",") || /^[a-z0-9]+_[a-z0-9]+/i.test(seg)) {
      i++;
    } else {
      break;
    }
  }

  const publicIdWithExt = segments.slice(i).join("/");
  const publicId = publicIdWithExt.replace(/\.[^/.]+$/, "");
  if (!publicId) return null;

  return { publicId, resourceType };
}

export async function deleteMediaFile(url: string | null | undefined): Promise<void> {
  if (!url) return;

  if (url.startsWith("/uploads/")) {
    const filePath = path.join(env.UPLOAD_DIR, url.replace("/uploads/", ""));
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    return;
  }

  if (!isCloudinaryUrl(url) || !isCloudinaryConfigured()) return;

  const parsed = parseCloudinaryPublicId(url);
  if (!parsed) return;

  await cloudinary.uploader.destroy(parsed.publicId, {
    resource_type: parsed.resourceType as "image" | "video" | "raw",
  });
}

export function isDeletableMediaUrl(url: string): boolean {
  return url.startsWith("/uploads/") || isCloudinaryUrl(url);
}
