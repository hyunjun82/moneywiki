import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "주택 누수 하자담보책임 배상 청구 조건 절차 | 머니위키",
  description: "집 매매 후 누수 발견하면 매도인에게 하자담보책임으로 배상받을 수 있어요. 6개월 기한 안에 증거 확보하고 청구하는 방법을 정리했어요.",
  openGraph: {
    title: "주택 누수 하자담보책임 배상 청구 조건 절차",
    description: "숨겨진 누수 발견 시 매도인 배상 청구 조건과 절차.",
    url: "https://jjyu.co.kr/w/주택-누수-하자담보책임-배상",
  },
  alternates: { canonical: "https://jjyu.co.kr/w/주택-누수-하자담보책임-배상" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
