import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "계약갱신청구권, 한 번 쓰면 끝인가요? 재계약과 갱신 횟수",
  description: "계약갱신청구권은 1회만 사용 가능해요. 갱신 후 재계약(신규 계약)은 별도 협의가 필요해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/계약갱신청구권-재계약" },
  openGraph: { title: "계약갱신청구권, 한 번 쓰면 끝인가요? 재계약과 갱신 횟수 | 머니위키", description: "계약갱신청구권은 1회만 사용 가능해요. 갱신 후 재계약(신규 계약)은 별도 협의가 필요해요.", url: "https://www.jjyu.co.kr/w/계약갱신청구권-재계약", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
