import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "이사 후 전학 절차, 초·중·고가 다른가요? 학교급별 서류와 신청 방법",
  description: "초등학교는 전입신고로 자동 배정, 중학교는 교육지원청 신청, 고등학교는 학군 변경 시만 가능해요. 서류 목록도 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/이사-전학절차-초등학교-중학교-고등학교" },
  openGraph: {
    title: "이사 후 전학 절차, 초·중·고가 다른가요? 학교급별 서류와 신청 방법 | 머니위키",
    description: "초등학교는 전입신고로 자동 배정, 중학교는 교육지원청 신청, 고등학교는 학군 변경 시만 가능해요. 서류 목록도 정리했어요.",
    url: "https://www.jjyu.co.kr/w/이사-전학절차-초등학교-중학교-고등학교",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
