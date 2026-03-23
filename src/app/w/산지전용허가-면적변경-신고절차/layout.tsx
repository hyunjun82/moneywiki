import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "산지전용허가 면적 변경 신고 절차 | 머니위키",
  description: "산지전용허가 받은 땅의 면적이 바뀌었어요. 변경신고만 해도 되는지, 다시 허가받아야 하는지 알아봐요",
  openGraph: { title: "산지전용허가 면적 변경 신고 절차 | 머니위키", description: "산지전용허가 받은 땅의 면적이 바뀌었어요. 변경신고만 해도 되는지, 다시 허가받아야 하는지 알아봐요", url: "https://www.jjyu.co.kr/w/산지전용허가-면적변경-신고절차", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/산지전용허가-면적변경-신고절차" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
