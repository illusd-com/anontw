"use client";

import { useState, FormEvent } from "react";

export default function SubmitForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [useCanva, setUseCanva] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (content.trim().length < 10) {
      setStatus("error");
      setMessage("內容至少需要 10 個字");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim() || undefined,
          content: content.trim(),
          useCanva,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "送出失敗");
        return;
      }

      setStatus("success");
      setMessage(data.message || "投稿成功");
      setTitle("");
      setContent("");
      setUseCanva(false);
    } catch {
      setStatus("error");
      setMessage("網路錯誤，請稍後再試");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm text-anon-muted mb-2">
          標題（選填）
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={100}
          placeholder="簡短標題"
          className="w-full rounded-lg border border-white/10 bg-anon-gray px-4 py-3 text-white placeholder:text-anon-muted focus:border-anon-green focus:outline-none focus:ring-1 focus:ring-anon-green"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm text-anon-muted mb-2">
          投稿內容 <span className="text-red-400">*</span>
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          minLength={10}
          maxLength={4000}
          rows={10}
          placeholder="在此寫下你想匿名分享的內容……"
          className="w-full rounded-lg border border-white/10 bg-anon-gray px-4 py-3 text-white placeholder:text-anon-muted focus:border-anon-green focus:outline-none focus:ring-1 focus:ring-anon-green resize-y"
        />
        <p className="mt-1 text-xs text-anon-muted text-right">
          {content.length} / 4000
        </p>
      </div>

      <div className="flex items-center gap-3">
        <input
          id="useCanva"
          type="checkbox"
          checked={useCanva}
          onChange={(e) => setUseCanva(e.target.checked)}
          className="h-4 w-4 rounded border-white/20 bg-anon-gray text-anon-green focus:ring-anon-green"
        />
        <label htmlFor="useCanva" className="text-sm text-anon-muted">
          Canva 自動匯入文字產生設計
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-lg bg-anon-green px-6 py-3 font-medium text-black transition hover:bg-anon-accent disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "送出中…" : "匿名投稿"}
      </button>

      {status === "success" && (
        <div className="rounded-lg border border-anon-green/40 bg-anon-green/10 px-4 py-3 text-sm text-anon-accent">
          {message}
        </div>
      )}
      {status === "error" && (
        <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {message}
        </div>
      )}
    </form>
  );
}
