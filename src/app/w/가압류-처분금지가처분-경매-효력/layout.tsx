import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "경매 물건에 가압류·가처분이 있다면? 말소와 인수 판단법 | 머니위키",
  description: "경매 낙찰 시 말소기준권리 이후 가압류와 가처분은 모두 말소돼요. 선순위 가처분은 인수될 수 있으니 등기부 확인이 필수예요. 가압류와 가처분의 차이, 판단 절차를 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/가압류-처분금지가처분-경매-효력",
  },
  openGraph: {
    title: "경매 물건에 가압류·가처분이 있다면? 말소와 인수 판단법",
    description: "말소기준권리 전후로 인수·말소가 갈려요. 등기부 확인법과 가압류·가처분 차이를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/가압류-처분금지가처분-경매-효력",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
