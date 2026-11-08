import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "匿名台灣 | Anonymous Taiwan",
  description: "匿名投稿平台。投稿內容將透過 Zernio 自動發布至社群平台，並可選擇以 Canva 自動匯入文字產生設計。",
  keywords: ["匿名", "台灣", "投稿", "Anonymous Taiwan"],
  openGraph: {
    title: "匿名台灣",
    description: "匿名投稿，自動發布。",
    locale: "zh_TW",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className="min-h-screen bg-anon-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
