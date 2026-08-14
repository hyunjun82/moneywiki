import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "결혼 전에도 신혼특공 신청 가능해요 예비 신혼부부 특별공급 자격과 절차",
  description: "공공주택은 예비 신혼부부도 신혼특공 신청 가능해요. 입주 전까지 혼인신고 완료 조건. 자격 요건, 소득 기준, 신청 절차를 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/예비-신혼부부-특별공급-신청-방법",
  },
  openGraph: {
    title: "결혼 전에도 신혼특공 신청 가능해요 예비 신혼부부 특별공급 자격과 절차",
    description: "공공주택 예비 신혼 신청 가능. 입주 전 혼인신고 필수.",
    url: "https://www.jjyu.co.kr/w/예비-신혼부부-특별공급-신청-방법",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
