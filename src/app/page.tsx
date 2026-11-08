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
        </div>

        <SubmitForm />
      </section>

      <section id="about" className="border-t border-white/5 bg-anon-dark">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h3 className="text-xl font-semibold mb-6">關於本站</h3>
          <div className="space-y-4 text-anon-muted leading-relaxed text-sm">
            <p className="text-xs">
              請勿投稿違法、仇恨、騷擾或侵害他人權益的內容。投稿者需自行對內容負責。
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-8 text-center text-xs text-anon-muted">
        <p>匿名台灣</p>
      </footer>
    </main>
  );
}
