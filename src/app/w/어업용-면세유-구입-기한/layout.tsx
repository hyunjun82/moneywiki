import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "어업용 면세유 구입 기한",
  description: "어업용 면세유 카드 받았는데 언제까지 써야 하는지 궁금하시죠?",
  alternates: { canonical: "https://www.jjyu.co.kr/w/어업용-면세유-구입-기한" },
  openGraph: {
    title: "어업용 면세유 구입 기한",
    description: "어업용 면세유 카드 받았는데 언제까지 써야 하는지 궁금하시죠?",
    url: "https://www.jjyu.co.kr/w/어업용-면세유-구입-기한",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
