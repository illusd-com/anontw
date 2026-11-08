/**
 * Canva Connect API helpers for autofill (text import) and design generation.
 * Docs: https://www.canva.dev/docs/connect/api-reference/autofills/
 *
 * Requires env:
 * - CANVA_ACCESS_TOKEN (OAuth access token)
 * - CANVA_BRAND_TEMPLATE_ID (brand template with autofillable text fields)
 *
 * Typical flow:
 * 1. Create autofill job with text fields
 * 2. Poll job until success
 * 3. Optionally export design and use URL with Zernio
 */

const CANVA_BASE = "https://api.canva.com/rest/v1";

export type CanvaTextField = {
  type: "text";
  text: string;
};

export type CanvaAutofillData = Record<string, CanvaTextField>;

export async function createCanvaAutofillJob(
  brandTemplateId: string,
  data: CanvaAutofillData
) {
  const token = process.env.CANVA_ACCESS_TOKEN;
  if (!token) {
    throw new Error("CANVA_ACCESS_TOKEN is not configured");
  }

  const res = await fetch(`${CANVA_BASE}/autofills`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      brand_template_id: brandTemplateId,
      data,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Canva autofill error ${res.status}: ${text}`);
  }

  return res.json() as Promise<{ job: { id: string; status: string } }>;
}

export async function getCanvaAutofillJob(jobId: string) {
  const token = process.env.CANVA_ACCESS_TOKEN;
  if (!token) {
    throw new Error("CANVA_ACCESS_TOKEN is not configured");
  }

  const res = await fetch(`${CANVA_BASE}/autofills/${jobId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Canva job status error ${res.status}: ${text}`);
  }

  return res.json();
}

/**
 * Poll until job succeeds or fails (max ~30s).
 */
export async function waitForCanvaAutofill(
  jobId: string,
  maxAttempts = 15,
  intervalMs = 2000
) {
  for (let i = 0; i < maxAttempts; i++) {
    const result = await getCanvaAutofillJob(jobId);
    const status = result?.job?.status;
    if (status === "success" || status === "failed") {
      return result;
    }
    await new Promise((r) => setTimeout(r, intervalMs));
  }
  throw new Error("Canva autofill timed out");
}

export function buildAutofillDataFromSubmission(title: string, body: string) {
  // Map to common field names used in brand templates.
  // User should tag text elements in Canva as "TITLE" and "BODY" (or adjust here).
  return {
    TITLE: { type: "text" as const, text: title || "匿名投稿" },
    BODY: { type: "text" as const, text: body },
  };
}
