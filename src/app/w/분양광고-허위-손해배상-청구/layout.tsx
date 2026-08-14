import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "분양광고가 거짓이면 배상받을 수 있을까? 허위광고 손해배상 청구",
  description: "입주자모집공고에 허위 정보가 있었다면 사업주체에게 손해배상을 청구할 수 있어요. 증거 확보부터 소송까지 절차와 소멸시효 3년 기한을 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/분양광고-허위-손해배상-청구",
  },
  openGraph: {
    title: "분양광고가 거짓이면 배상받을 수 있을까? 허위광고 손해배상 청구",
    description: "입주자모집공고는 법적 구속력 있는 문서. 허위 기재 시 손해배상 가능. 입주 후 3년 내 청구.",
    url: "https://www.jjyu.co.kr/w/분양광고-허위-손해배상-청구",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
