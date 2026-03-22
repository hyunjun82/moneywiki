import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "원룸 전세계약, 이것만은 꼭 확인하세요 전세사기 예방 체크리스트 | 머니위키",
  description: "원룸 전세 계약 전 등기부등본·전입신고·확정일자 3가지는 필수예요. 전세사기 예방 체크리스트를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/원룸-전세계약-주의사항" },
  openGraph: { title: "원룸 전세계약, 이것만은 꼭 확인하세요 전세사기 예방 체크리스트 | 머니위키", description: "원룸 전세 계약 전 등기부등본·전입신고·확정일자 3가지는 필수예요. 전세사기 예방 체크리스트를 정리했어요.", url: "https://www.jjyu.co.kr/w/원룸-전세계약-주의사항", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
