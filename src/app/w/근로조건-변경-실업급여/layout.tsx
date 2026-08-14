import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "근로조건 바뀌어서 퇴사했다면? 수급 인정 조건",
  description: "임금 삭감, 근무지 변경, 업무 변경 등 회사가 일방적으로 근로조건을 바꾸면 정당한 퇴사 사유로 인정돼요. 수급 인정 조건과 증빙자료를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/근로조건-변경-실업급여" },
  openGraph: {
    title: "근로조건 바뀌어서 퇴사했다면? 수급 인정 조건 | 머니위키",
    description: "임금 삭감, 근무지 변경, 업무 변경 등 회사가 일방적으로 근로조건을 바꾸면 정당한 퇴사 사유로 인정돼요. 수급 인정 조건과 증빙자료를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/근로조건-변경-실업급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
