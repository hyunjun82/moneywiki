import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "경업금지 약정, 대가 없으면 무효? 유효 조건과 대응법",
  description: "퇴사 시 경업금지 서약서 쓰라고 하나요? 대가 없는 약정은 무효 가능성이 높아요. 법원이 인정하는 유효 조건 4가지와 위반 시 대응법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/경업금지-약정-유효" },
  openGraph: {
    title: "경업금지 약정, 대가 없으면 무효? 유효 조건과 대응법 | 머니위키",
    description: "퇴사 시 경업금지 서약서 쓰라고 하나요? 대가 없는 약정은 무효 가능성이 높아요. 법원이 인정하는 유효 조건 4가지와 위반 시 대응법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/경업금지-약정-유효",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
