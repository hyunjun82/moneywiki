import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "가사근로자 근로계약 체결 방법: 필수 기재사항 및 작성 절차 | 머니위키",
  description: "가사근로자로 일하는데 근로계약서가 없다는 거 아시나요? 법으로 보장된 근로조건과 계약서 작성 방법을 명확히 알려드려요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/가사근로자-근로계약-체결-방법" },
  openGraph: {
    title: "가사근로자 근로계약 체결 방법: 필수 기재사항 및 작성 절차",
    description: "가사근로자로 일하는데 근로계약서가 없다는 거 아시나요? 법으로 보장된 근로조건과 계약서 작성 방법을 명확히 알려드려요",
    url: "https://www.jjyu.co.kr/w/가사근로자-근로계약-체결-방법",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
