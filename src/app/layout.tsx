import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import KakaoSDK from "@/components/KakaoSDK";
import AdClickTracker from "@/components/AdClickTracker";
import MobileStickyBar from "@/components/MobileStickyBar";
import Link from "next/link";
import { WebSiteSchema, OrganizationSchema, PersonSchema } from "@/components/JsonLd";

// Google Fonts 최적화: next/font로 자동 셀프호스팅 + display swap
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

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
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "머니위키" }],
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
    other: {
      "msvalidate.01": "1945B725690D183CB7825C0D0FB24443",
      "daum-verification": "9f5b7b51c6f32d3f0e5b6db2a8fc13839e7936f1ef2870bb85967b978c0ffe08:XNG90a1lomEQ6b3Rh86ohQ==",
      "naver-site-verification": "c59c1c6975687fa229b95b038b1de462b43ff320",
    },
  },
  // 실존 파일만 참조 — /icon, /apple-icon 등 미생성 경로는 404를 유발 (네이버 접근불가 진단)
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={inter.variable}>
      <head>
        {/* Google AdSense - lazyOnload (LCP 개선, pharm-jjyu 검증 배치) */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2442517902625121"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        {/* Microsoft Clarity */}
        <Script id="clarity-analytics" strategy="lazyOnload">
          {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "vvx2cjclu4");`}
        </Script>
      </head>
      <body className="antialiased bg-white min-h-screen flex flex-col font-sans">
        {/* 전역 JSON-LD 스키마 - 위키트리 벤치마킹 */}
        <WebSiteSchema />
        <OrganizationSchema />
        <PersonSchema />
        <KakaoSDK />
        <AdClickTracker />
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <MobileStickyBar />
        <Analytics debug={process.env.NODE_ENV === 'development'} />
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="bg-[#F9FAFB] border-t border-gray-200">
      <div className="max-w-[1100px] mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">카테고리</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/category/부동산" className="hover:text-[#1D9E75] transition-colors">부동산</Link></li>
              <li><Link href="/category/세금" className="hover:text-[#1D9E75] transition-colors">세금</Link></li>
              <li><Link href="/category/금융" className="hover:text-[#1D9E75] transition-colors">금융·투자</Link></li>
              <li><Link href="/category/근로" className="hover:text-[#1D9E75] transition-colors">근로·급여</Link></li>
              <li><Link href="/category/법률" className="hover:text-[#1D9E75] transition-colors">법률</Link></li>
              <li><Link href="/category/복지" className="hover:text-[#1D9E75] transition-colors">복지·지원금</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">계산기</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/w/퇴직금-계산기" className="hover:text-[#1D9E75] transition-colors">퇴직금 계산기</Link></li>
              <li><Link href="/w/연봉-실수령액-계산기" className="hover:text-[#1D9E75] transition-colors">연봉 실수령액</Link></li>
              <li><Link href="/w/양도소득세-계산기" className="hover:text-[#1D9E75] transition-colors">양도소득세</Link></li>
              <li><Link href="/w/대출이자-계산기" className="hover:text-[#1D9E75] transition-colors">대출이자</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">인기 가이드</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/w/퇴직금" className="hover:text-[#1D9E75] transition-colors">퇴직금 완벽 가이드</Link></li>
              <li><Link href="/w/연말정산" className="hover:text-[#1D9E75] transition-colors">연말정산 절세</Link></li>
              <li><Link href="/w/전세자금대출" className="hover:text-[#1D9E75] transition-colors">전세자금대출</Link></li>
              <li><Link href="/w/실업급여" className="hover:text-[#1D9E75] transition-colors">실업급여 신청</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">안내</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-[#1D9E75] transition-colors">소개</Link></li>
              <li><Link href="/privacy" className="hover:text-[#1D9E75] transition-colors">개인정보처리방침</Link></li>
              <li><Link href="/terms" className="hover:text-[#1D9E75] transition-colors">이용약관</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#1D9E75] rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">M</span>
            </div>
            <span className="text-sm text-gray-400">© 2026 머니위키. All rights reserved.</span>
          </div>
          <p className="text-xs text-gray-300">
            본 사이트의 정보는 참고용이며, 법적 효력이 없습니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
