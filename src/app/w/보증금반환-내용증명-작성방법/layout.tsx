import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "보증금 안 돌려주면 어떻게 하나요? 내용증명 작성법과 발송 절차",
  description: "전세 보증금 반환 내용증명은 우체국에서 4,000원이면 보낼 수 있어요. 계약 내용, 반환 금액, 기한, 입금 계좌를 적고 3부를 발송하면 돼요. 작성법부터 후속 법적 조치까지 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/보증금반환-내용증명-작성방법",
  },
  openGraph: {
    title: "보증금 안 돌려주면 어떻게 하나요? 내용증명 작성법과 발송 절차",
    description: "내용증명 4,000원. 작성 항목과 발송 절차 정리.",
    url: "https://www.jjyu.co.kr/w/보증금반환-내용증명-작성방법",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
