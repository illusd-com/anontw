/**
 * Zernio API client for publishing posts across social platforms.
 * Docs: https://docs.zernio.com
 * Requires env: ZERNIO_API_KEY, ZERNIO_ACCOUNT_IDS (comma-separated)
 */

const ZERNIO_BASE = "https://zernio.com/api/v1";

export type ZernioPlatform = {
  platform: string;
  accountId: string;
};

export type CreatePostPayload = {
  content: string;
  title?: string;
  platforms: ZernioPlatform[];
  publishNow?: boolean;
  scheduledFor?: string;
  timezone?: string;
  mediaItems?: { type: string; url: string }[];
  tags?: string[];
  hashtags?: string[];
};

export async function createZernioPost(payload: CreatePostPayload) {
  const apiKey = process.env.ZERNIO_API_KEY;
  if (!apiKey) {
    throw new Error("ZERNIO_API_KEY is not configured");
  }

  const res = await fetch(`${ZERNIO_BASE}/posts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: payload.content,
      title: payload.title,
      platforms: payload.platforms,
      publishNow: payload.publishNow ?? true,
      scheduledFor: payload.scheduledFor,
      timezone: payload.timezone ?? "Asia/Taipei",
      mediaItems: payload.mediaItems,
      tags: payload.tags,
      hashtags: payload.hashtags,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Zernio API error ${res.status}: ${text}`);
  }

  return res.json();
}

export function getConfiguredPlatforms(): ZernioPlatform[] {
  const raw = process.env.ZERNIO_ACCOUNT_IDS || "";
  // Format: platform:accountId,platform:accountId
  // e.g. twitter:acc_xxx,instagram:acc_yyy
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((entry) => {
      const [platform, accountId] = entry.split(":");
      if (!platform || !accountId) return null;
      return { platform: platform.trim(), accountId: accountId.trim() };
    })
    .filter((p): p is ZernioPlatform => p !== null);
}
