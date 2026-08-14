import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "금융회사에 억울한 일 당했다면? 금융분쟁조정 신청 방법과 절차",
  description: "금융감독원에 무료로 분쟁조정 신청 가능해요. 최대 90일이면 결과 나오고, 조정안 수락 시 재판상 화해와 동일한 효력이에요. 온라인 신청 방법까지 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/금융분쟁조정-신청-방법",
  },
  openGraph: {
    title: "금융회사에 억울한 일 당했다면? 금융분쟁조정 신청 방법과 절차",
    description: "무료 신청, 최대 90일 처리. 조정안 수락 시 재판상 화해 효력.",
    url: "https://www.jjyu.co.kr/w/금융분쟁조정-신청-방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
