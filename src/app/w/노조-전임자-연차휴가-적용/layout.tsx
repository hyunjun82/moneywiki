import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "노조 전임자도 연차휴가를 받을 수 있나요? 발생 기준과 청구 방법 | 머니위키",
  description: "노조 전임자도 근로관계가 유지되니까 연차휴가가 발생해요. 전임기간은 출근으로 인정되고, 연차는 회사에 청구해요. 미사용 수당과 복귀 후 처리까지 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/노조-전임자-연차휴가-적용",
  },
  openGraph: {
    title: "노조 전임자도 연차휴가를 받을 수 있나요? 발생 기준과 청구 방법",
    description: "전임기간도 출근 인정, 연차 발생. 청구 방법과 수당 처리 정리.",
    url: "https://www.jjyu.co.kr/w/노조-전임자-연차휴가-적용",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
