import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "자녀가 2명 이상이면 얼마나 공제받나요? 2025 자녀세액공제 금액과 조건 | 머니위키",
  description: "2025년 귀속 자녀세액공제: 1명 25만원, 2명 55만원, 3명 95만원. 맞벌이는 한쪽으로 몰아서 공제받는 게 유리해요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-다자녀-추가공제",
  },
  openGraph: {
    title: "2025 자녀세액공제 금액과 조건",
    description: "1명 25만원, 2명 55만원, 3명 95만원. 맞벌이 전략까지.",
    url: "https://www.jjyu.co.kr/w/연말정산-다자녀-추가공제",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
