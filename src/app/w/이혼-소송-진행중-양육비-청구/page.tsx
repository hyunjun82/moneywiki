"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1. 이혼 소송이 진행 중인데 당장 아이 양육비가 필요한 상황이에요. 소송 끝날 때까지 기다려야 하는지 궁금해요.
// Q2. 이혼 소송과 별도로 양육비 청구 소장을 가정법원에 제출하는 행동.
// Q3. 별도 청구 가능(민법 837조), 소장 제출 서류, 산정기준표(2021), 가처분 신청 가능, 이행 강제 방법.
// Q4. GreenBox(핵심 결론) + Steps(청구 절차) + 표(산정 기준) + BorderBox(서류) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";
import { Steps } from "@/components/article-ui/Steps";
import { DocTable } from "@/components/article-ui/DocTable";

const DOCS = [
  { name: "양육비청구 소장", required: true, where: "직접 작성 (법원 양식 참고)" },
  { name: "혼인관계증명서", required: true, where: "주민센터 또는 정부24" },
  { name: "가족관계증명서", required: true, where: "주민센터 또는 정부24" },
  { name: "기본증명서 (자녀)", required: true, where: "주민센터 또는 정부24" },
  { name: "주민등록등본", required: true, where: "주민센터 또는 정부24" },
  { name: "재산목록", required: false, where: "법원 명령 시 제출" },
];

const STEPS = [
  { title: "소장 작성", desc: "청구 취지(매월 양육비 금액)와 청구 원인(혼인 경위, 양육 상황)을 구체적으로 써요.", tip: "양육비이행관리원에서 무료 법률지원을 받을 수 있어요" },
  { title: "관할 가정법원에 제출", desc: "자녀 주소지 관할 가정법원에 소장과 서류를 제출해요." },
  { title: "재산조회·재판 진행", desc: "법원이 양쪽 소득·재산을 조사해요. 3~6개월 정도 걸려요." },
  { title: "법원 결정·급여 수령", desc: "법원이 양육비 금액을 결정하면 매월 지급받아요. 안 주면 강제집행 가능해요." },
];

const FAQS = [
  { q: "이혼 소송 중에도 양육비를 따로 청구할 수 있나요?", a: "네. 이혼 소송과 별도로 가정법원에 양육비 청구 소송을 제기할 수 있어요. 이혼 판결을 기다릴 필요 없어요." },
  { q: "긴급하게 양육비가 필요하면 어떻게 하나요?", a: "가처분 신청을 하면 재판 결과 전에 임시로 양육비를 받을 수 있어요. 법원에 긴급성을 소명해야 해요." },
  { q: "양육비 소급 청구도 가능한가요?", a: "과거 양육비도 청구할 수 있어요. 다만 법원은 보통 소송 제기 시점부터 인정하는 경우가 많고, 증거가 충분하면 더 이전도 가능해요." },
  { q: "양육비 청구 소송은 얼마나 걸리나요?", a: "보통 3~6개월이에요. 재산조회나 증거 제출이 복잡하면 더 걸릴 수 있어요." },
  { q: "상대방이 양육비를 안 주면 어떻게 하나요?", a: "판결문을 근거로 강제집행을 신청할 수 있어요. 급여 압류, 재산 압류가 가능하고, 양육비이행관리원에서 도움받을 수 있어요." },
  { q: "양육비이행관리원에서 뭘 도와주나요?", a: "무료 법률지원(소송 대리), 양육비 이행 독촉, 추심 지원까지 해줘요. 한부모가정이면 꼭 신청하세요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "민법 제837조 (양육에 관한 사항)", url: "https://www.law.go.kr/법령/민법" },
    { label: "가사소송법", url: "https://www.law.go.kr/법령/가사소송법" },
    { label: "서울가정법원 양육비 산정기준표", url: "https://slfamily.scourt.go.kr" },
    { label: "양육비이행관리원", url: "https://www.childsupport.or.kr" },
  ]},
];

const RELATED = [
  { slug: "이혼-소송-증거-제시-필요", title: "이혼 소송 증거 준비", description: "이혼 사유별 필요 증거와 효력 기준이에요." },
  { slug: "이혼-무료-법률상담-소송구조", title: "이혼 무료 법률상담", description: "법률구조공단 무료 상담 신청 방법이에요." },
  { slug: "이혼-재산분할-협의-불가-대응", title: "이혼 재산분할 대응", description: "재산분할 협의가 안 될 때 대처 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>가정법률 · 양육비 · 청구</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        이혼 소송 중에 양육비 받을 수 있나?<br />
        청구 방법과 산정 기준
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        이혼 소송이 끝날 때까지 아이 양육비를 못 받는 건 아니에요.
        소송 진행 중에도 별도로 양육비를 청구할 수 있어요.
        <a href="https://www.law.go.kr/법령/민법" style={{ color: "#1D9E75", textDecoration: "underline" }}>민법 제837조</a>에서
        이 권리를 보장하고 있어요. 신청 방법과 금액 기준을 정리했어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>이혼 전에도 양육비 청구가 가능해요</H2>
      <p style={body}>
        이혼이 확정되기 전이라도 양육비를 청구할 수 있어요.
        합의가 안 되면 가정법원에 별도로 청구 소송을 제기하면 돼요.
      </p>

      <GreenBox>
        핵심 결론이에요.<br />
        · 이혼 소송과 <strong>별도로</strong> 양육비 청구 소송 가능<br />
        · <strong>가처분 신청</strong>으로 판결 전 임시 수령도 가능<br />
        · 과거 양육비 <strong>소급 청구</strong>도 가능 (입증 필요)<br />
        · 안 주면 급여 압류 등 <strong>강제집행</strong> 가능
      </GreenBox>

      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>양육비 금액은 어떻게 정해지나요?</H2>
      <p style={body}>
        <a href="https://slfamily.scourt.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>서울가정법원 양육비 산정기준표</a>를
        참고해요. 부모 소득 합계와 자녀 나이를 교차해서 표준 금액을 산출해요.
      </p>

      <SectionBadge>양육비 산정 기준 (2021년 기준표)</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>부모 소득 합계</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>0~5세</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>6~11세</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>12~17세</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["200만원 미만", "62~65만원", "71만원", "83~89만원"],
              ["400~500만원", "95~100만원", "114만원", "133~140만원"],
              ["800만원 이상", "150~158만원", "180만원", "210~222만원"],
            ].map(([income, young, mid, old], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{income}</td>
                <td style={{ padding: "9px 12px" }}>{young}</td>
                <td style={{ padding: "9px 12px" }}>{mid}</td>
                <td style={{ padding: "9px 12px" }}>{old}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        이 기준표는 법적 구속력은 없고 참고자료예요. 실제로는 부모 재산, 자녀의 특별한 필요(학원비, 병원비)를 종합해서 법원이 최종 결정해요.
        자녀가 1명이면 6.5% 가산, 3명 이상이면 21.7% 감산돼요.
      </p>

      <Divider />

      <H2>청구 절차와 필요 서류</H2>
      <p style={body}>
        관할 가정법원에 소장을 제출하면 돼요.
        <a href="https://www.childsupport.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>양육비이행관리원</a>에서
        무료 법률지원(소송 대리 포함)을 받을 수 있어요.
      </p>

      <SectionBadge>청구 절차</SectionBadge>
      <Steps steps={STEPS} />

      <SectionBadge>필요 서류</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 민법·가사소송법과 서울가정법원 양육비 산정기준표를 바탕으로 작성됐어요. 구체적인 사건은 변호사나 양육비이행관리원 상담을 받아보세요." />
    </ArticleLayout>
  );
}
