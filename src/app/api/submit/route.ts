import { NextRequest, NextResponse } from "next/server";
import { createZernioPost, getConfiguredPlatforms } from "@/lib/zernio";
import {
  createCanvaAutofillJob,
  waitForCanvaAutofill,
  buildAutofillDataFromSubmission,
} from "@/lib/canva";

export const runtime = "nodejs";
export const maxDuration = 60;

type SubmitBody = {
  title?: string;
  content: string;
  useCanva?: boolean;
  tags?: string[];
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SubmitBody;
    const content = (body.content || "").trim();
    const title = (body.title || "").trim();

    if (!content || content.length < 10) {
      return NextResponse.json(
        { error: "內容至少需要 10 個字" },
        { status: 400 }
      );
    }

    if (content.length > 4000) {
      return NextResponse.json(
        { error: "內容過長（上限 4000 字）" },
        { status: 400 }
      );
    }

    // Optional Canva autofill (text import → design)
    let canvaResult: unknown = null;
    if (body.useCanva && process.env.CANVA_ACCESS_TOKEN && process.env.CANVA_BRAND_TEMPLATE_ID) {
      try {
        const data = buildAutofillDataFromSubmission(title, content);
        const job = await createCanvaAutofillJob(
          process.env.CANVA_BRAND_TEMPLATE_ID,
          data
        );
        const jobId = job?.job?.id;
        if (jobId) {
          canvaResult = await waitForCanvaAutofill(jobId);
        }
      } catch (e) {
        // Canva failure should not block Zernio publish
        console.error("Canva autofill failed:", e);
        canvaResult = { error: String(e) };
      }
    }

    // Zernio publish
    const platforms = getConfiguredPlatforms();
    if (platforms.length === 0) {
      return NextResponse.json(
        {
          error:
            "尚未設定 ZERNIO_ACCOUNT_IDS。請在 Vercel 環境變數設定 platform:accountId 格式。",
        },
        { status: 503 }
      );
    }

    if (!process.env.ZERNIO_API_KEY) {
      return NextResponse.json(
        { error: "尚未設定 ZERNIO_API_KEY" },
        { status: 503 }
      );
    }

    const postText = title ? `【${title}】\n\n${content}` : content;
    const hashtags = ["匿名台灣", "AnonymousTaiwan", ...(body.tags || [])];

    const zernioResult = await createZernioPost({
      content: postText,
      title: title || undefined,
      platforms,
      publishNow: true,
      timezone: "Asia/Taipei",
      hashtags,
      tags: body.tags,
    });

    return NextResponse.json({
      ok: true,
      message: "投稿已送出並透過 Zernio 發布",
      zernio: zernioResult,
      canva: canvaResult,
    });
  } catch (err) {
    console.error("Submit error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "伺服器錯誤" },
      { status: 500 }
    );
  }
}
