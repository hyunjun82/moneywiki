import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    default: "머니위키 - 경제 · 금융 · 법률 정보",
    template: "%s | 머니위키",
  },
  description: "퇴직금, 세금, 부동산, 대출 정보를 쉽게 찾아보세요. 정부 사이트보다 쉽고, 블로그보다 정확하게.",
  keywords: ["퇴직금", "연말정산", "세금", "부동산", "대출", "실업급여", "계산기", "경제", "금융", "법률"],
  authors: [{ name: "머니위키" }],
  creator: "머니위키",
  publisher: "머니위키",
  metadataBase: new URL("https://www.jjyu.co.kr"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://www.jjyu.co.kr",
    siteName: "머니위키",
    title: "머니위키 - 경제 · 금융 · 법률 정보",
    description: "퇴직금, 세금, 부동산, 대출 정보를 쉽게 찾아보세요.",
  },
  twitter: {
    card: "summary_large_image",
    title: "머니위키 - 경제 · 금융 · 법률 정보",
    description: "퇴직금, 세금, 부동산, 대출 정보를 쉽게 찾아보세요.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "kPe6sAN7cMBDG2OVVWHcI8hH-BxkT5Zv6U8TVWTxuwI",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2442517902625121"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="antialiased bg-white min-h-screen flex flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="border-t border-neutral-200 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-sm font-semibold mb-4">카테고리</h3>
            <ul className="space-y-3 text-sm text-neutral-500">
              <li><Link href="/category/경제" className="hover:text-black transition-colors">경제</Link></li>
              <li><Link href="/category/부동산" className="hover:text-black transition-colors">부동산</Link></li>
              <li><Link href="/category/세금" className="hover:text-black transition-colors">세금</Link></li>
              <li><Link href="/category/법률" className="hover:text-black transition-colors">법률</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">계산기</h3>
            <ul className="space-y-3 text-sm text-neutral-500">
              <li><Link href="/calc/severance" className="hover:text-black transition-colors">퇴직금 계산기</Link></li>
              <li><Link href="/calc/salary" className="hover:text-black transition-colors">연봉 실수령액</Link></li>
              <li><Link href="/calc/rent" className="hover:text-black transition-colors">전월세 전환</Link></li>
              <li><Link href="/calc/loan" className="hover:text-black transition-colors">대출이자 계산</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">인기 문서</h3>
            <ul className="space-y-3 text-sm text-neutral-500">
              <li><Link href="/w/퇴직금" className="hover:text-black transition-colors">퇴직금</Link></li>
              <li><Link href="/w/연말정산" className="hover:text-black transition-colors">연말정산</Link></li>
              <li><Link href="/w/전세자금대출" className="hover:text-black transition-colors">전세자금대출</Link></li>
              <li><Link href="/w/실업급여" className="hover:text-black transition-colors">실업급여</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">정보</h3>
            <ul className="space-y-3 text-sm text-neutral-500">
              <li><Link href="/about" className="hover:text-black transition-colors">소개</Link></li>
              <li><Link href="/contact" className="hover:text-black transition-colors">문의</Link></li>
              <li><Link href="/privacy" className="hover:text-black transition-colors">개인정보처리방침</Link></li>
              <li><Link href="/terms" className="hover:text-black transition-colors">이용약관</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-neutral-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-emerald-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">M</span>
            </div>
            <span className="text-sm text-neutral-500">© 2026 머니위키. All rights reserved.</span>
          </div>
          <p className="text-xs text-neutral-400">
            본 사이트의 정보는 참고용이며, 법적 효력이 없습니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
