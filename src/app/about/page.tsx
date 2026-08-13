import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "머니위키 소개",
  description:
    "머니위키는 퇴직금·세금·부동산·복지 정보를 정부 공식 출처 기준으로 정리하는 정보 위키입니다. 모든 수치는 법령·공식 고시 원문과 대조해 게재합니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/about" },
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-[720px] px-6 py-14 text-[#3C424A]">
      <h1 className="text-3xl font-extrabold text-[#1A1D21]">머니위키 소개</h1>

      <p className="mt-6 leading-7">
        머니위키(jjyu.co.kr)는 퇴직금, 세금, 부동산, 대출, 복지 제도처럼 생활과 직결된
        경제 정보를 다루는 정보 위키입니다. 정부 사이트보다 쉽게, 블로그보다 정확하게
        읽을 수 있는 문서를 목표로 합니다.
      </p>

      <h2 className="mt-10 text-xl font-bold text-[#1A1D21]">문서 작성 원칙</h2>
      <ul className="mt-4 space-y-2 leading-7 list-disc pl-5">
        <li>모든 수치·기한·금액은 법제처, 국세청, 보건복지부, 고용노동부 등 공식 출처 원문과 대조해 게재합니다.</li>
        <li>각 문서 하단에 근거 출처를 표기하며, 마지막 확인일을 함께 기재합니다.</li>
        <li>신청·조회가 필요한 제도는 해당 공식 사이트로 바로 이동할 수 있는 버튼을 제공합니다.</li>
      </ul>

      <h2 className="mt-10 text-xl font-bold text-[#1A1D21]">책임 한계</h2>
      <p className="mt-4 leading-7">
        머니위키의 문서는 일반 정보 제공을 목적으로 하며 법률·세무·투자 자문이 아닙니다.
        개별 사안의 적용 여부는 관할 기관 또는 전문가 확인이 필요합니다. 제도 변경으로
        내용과 실제가 다를 수 있으며, 오류를 발견하시면 아래 연락처로 알려주세요.
      </p>

      <h2 className="mt-10 text-xl font-bold text-[#1A1D21]">문의</h2>
      <p className="mt-4 leading-7">이메일: 33han58@gmail.com</p>

      <p className="mt-10 text-sm text-[#6C727B]">
        <Link href="/privacy" className="underline">개인정보처리방침</Link> ·{" "}
        <Link href="/terms" className="underline">이용약관</Link>
      </p>
    </main>
  );
}
