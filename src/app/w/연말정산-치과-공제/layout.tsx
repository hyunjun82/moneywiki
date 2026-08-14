import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "치과 치료비 연말정산 공제, 임플란트부터 교정까지 기준",
  description: "임플란트, 틀니, 충치 치료는 의료비 세액공제 15% 대상이에요. 500만원 임플란트 시 최대 52만원 환급 가능. 치아 미백은 불가, 치열교정은 진단서 필요해요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-치과-공제",
  },
  openGraph: {
    title: "치과 치료비 연말정산 공제, 임플란트부터 교정까지 기준",
    description: "임플란트·틀니는 15% 세액공제. 치열교정은 진단서 있으면 가능.",
    url: "https://www.jjyu.co.kr/w/연말정산-치과-공제",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
