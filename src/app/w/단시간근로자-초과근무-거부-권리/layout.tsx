import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "단시간근로자 초과근무 거부할 수 있나요? 법적 근거와 대응 | 머니위키",
  description: "파트타임 초과근무는 본인 동의 없이 시킬 수 없어요. 기간제법 제6조 근거, 주 12시간 한도, 가산수당 50%, 강요 시 신고 방법까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/단시간근로자-초과근무-거부-권리" },
  openGraph: {
    title: "단시간근로자 초과근무 거부할 수 있나요? 법적 근거와 대응 | 머니위키",
    description: "파트타임 초과근무는 본인 동의 없이 시킬 수 없어요. 기간제법 제6조 근거, 주 12시간 한도, 가산수당 50%, 강요 시 신고 방법까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/단시간근로자-초과근무-거부-권리",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
