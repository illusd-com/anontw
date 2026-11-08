import { NextRequest, NextResponse } from "next/server";
import { createZernioPost, getConfiguredPlatforms } from "@/lib/zernio";
import { isOverlySexual } from "@/lib/moderation";

export const runtime = "nodejs";
export const maxDuration = 60;

type SubmitBody = {
  content: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SubmitBody;
    const content = (body.content || "").trim();

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

    if (isOverlySexual(content)) {
      return NextResponse.json(
        { error: "內容過於色情，無法投稿" },
        { status: 400 }
      );
    }

    const platforms = getConfiguredPlatforms();
    // Prefer Threads + Instagram if configured; otherwise use all configured accounts
    const preferred = platforms.filter((p) =>
      ["threads", "instagram"].includes(p.platform.toLowerCase())
    );
    const targets = preferred.length > 0 ? preferred : platforms;

    if (targets.length === 0) {
      return NextResponse.json(
        {
          error:
            "尚未設定 ZERNIO_ACCOUNT_IDS。請設定 threads:帳號ID,instagram:帳號ID",
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

    // Title fixed; body = submission content. Same text to all targets.
    const postText = `【匿名台灣】\n\n${content}`;

    const zernioResult = await createZernioPost({
      content: postText,
      title: "匿名台灣",
      platforms: targets,
      publishNow: true,
      timezone: "Asia/Taipei",
      hashtags: ["匿名台灣", "AnonymousTaiwan"],
    });

    return NextResponse.json({
      ok: true,
      message: "投稿已送出",
      zernio: zernioResult,
    });
  } catch (err) {
    console.error("Submit error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "伺服器錯誤" },
      { status: 500 }
    );
  }
}
