import SubmitForm from "@/components/SubmitForm";

export default function Home() {
  return (
    <main className="min-h-screen">
      <header className="border-b border-white/5">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-anon-green/20 text-anon-green font-bold text-lg">
              匿
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">匿名台灣</h1>
              <p className="text-xs text-anon-muted">Anonymous Taiwan</p>
            </div>
          </div>
          <nav className="text-sm text-anon-muted">
            <a href="#about" className="hover:text-white transition">
              關於
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            匿名投稿
          </h2>
          <p className="mt-4 text-anon-muted max-w-xl mx-auto leading-relaxed">
            你的文字將透過 Zernio 自動發布至已連結的社群平台。
            <br />
            可選擇同時使用 Canva 自動匯入文字產生設計。
            <br />
            本站不儲存任何投稿內容，無資料庫。
          </p>
        </div>

        <SubmitForm />
      </section>

      <section id="about" className="border-t border-white/5 bg-anon-dark">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h3 className="text-xl font-semibold mb-6">關於本站</h3>
          <div className="space-y-4 text-anon-muted leading-relaxed text-sm">
            <p>
              <strong className="text-white">匿名台灣</strong>{" "}
              是一個不保存投稿資料的匿名發布入口。投稿送出後，內容會立即透過{" "}
              <a
                href="https://zernio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-anon-green hover:underline"
              >
                Zernio
              </a>{" "}
              API 發布到已設定的社群帳號。
            </p>
            <p>
              若啟用 Canva 選項，系統會使用 Canva Connect API 的 Autofill
              功能，將文字匯入指定的 Brand Template，產生設計稿（需事先在環境變數設定
              Canva token 與 template ID）。
            </p>
            <p>
              本專案不使用任何資料庫。所有處理皆在 Vercel Serverless Function
              即時完成，投稿內容不會被本站持久化儲存。
            </p>
            <p className="pt-4 text-xs">
              請勿投稿違法、仇恨、騷擾或侵害他人權益的內容。投稿者需自行對內容負責。
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-8 text-center text-xs text-anon-muted">
        <p>匿名台灣 · 無資料庫 · 即時發布</p>
      </footer>
    </main>
  );
}
