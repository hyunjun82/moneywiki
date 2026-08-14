import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "건축허가 변경하면 산지전용허가도 바뀌나요? 의제허가 변경 절차",
  description: "건축허가 변경 시 의제받은 산지전용허가는 자동 변경되지 않아요. 별도로 변경허가를 신청해야 하고, 미신청 시 원상복구 명령이나 형사처벌을 받을 수 있어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/건축허가-산지전용허가-의제-변경",
  },
  openGraph: {
    title: "건축허가 변경 시 산지전용허가 의제 처리 방법",
    description: "의제허가는 자동 변경 안 됨. 별도 변경 절차와 주의사항 정리.",
    url: "https://www.jjyu.co.kr/w/건축허가-산지전용허가-의제-변경",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
