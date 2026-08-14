import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "이사 체크리스트, 준비물부터 전입신고까지 절차 정리",
  description: "이사 전·당일·후 체크리스트와 전입신고·확정일자 절차를 정리했어요. 빠뜨리면 과태료 나오는 항목까지 포함돼요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/이사-체크리스트-준비물-절차" },
  openGraph: {
    title: "이사 체크리스트, 준비물부터 전입신고까지 절차 정리 | 머니위키",
    description: "이사 전·당일·후 체크리스트와 전입신고·확정일자 절차를 정리했어요. 빠뜨리면 과태료 나오는 항목까지 포함돼요.",
    url: "https://www.jjyu.co.kr/w/이사-체크리스트-준비물-절차",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
