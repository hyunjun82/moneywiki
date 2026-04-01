"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1. 사업을 시작하려는데 사업자등록을 어떻게 하는지 모르는 상황
// Q2. 홈택스에서 사업자등록 신청을 완료한다
// Q3. 20일 이내 신고의무, 간이과세자 기준 8,000만원, 필요 서류, 미등록 가산세
// Q4. Steps로 등록 절차 + DocTable로 서류 + GreenBox로 간이/일반 구분

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const REG_STEPS = [
  { title: "사업 형태 결정", desc: "개인사업자인지 법인사업자인지 먼저 정해요. 소규모 사업이면 개인사업자가 간편해요." },
  { title: "필요 서류 준비", desc: "신분증, 임대차계약서(자가면 건축물대장), 사업자등록 신청서를 준비해요.", tip: "업종에 따라 추가 서류(허가증, 자격증)가 필요할 수 있음" },
  { title: "홈택스 또는 세무서 방문", desc: "홈택스(hometax.go.kr)에서 온라인 신청하면 가장 빨라요. 세무서 방문 신청도 가능해요.", tip: "홈택스 > 신청/제출 > 사업자등록 신청" },
  { title: "과세유형 선택", desc: "연 매출 8,000만원 미만 예상이면 간이과세자, 이상이면 일반과세자로 신청해요." },
  { title: "사업자등록증 수령", desc: "접수 후 즉시~3영업일 이내에 사업자등록증을 받아요. 홈택스 신청이면 PDF로 바로 출력 가능해요." },
];

const DOCS = [
  { name: "사업자등록 신청서", required: true, where: "홈택스 또는 세무서" },
  { name: "신분증 (대표자)", required: true, where: "본인 지참" },
  { name: "임대차계약서 사본", required: true, where: "사업장 임대 시" },
  { name: "동업계약서", required: false, where: "공동사업자인 경우" },
  { name: "허가증·등록증 사본", required: false, where: "인허가 업종인 경우 (음식점, 학원 등)" },
];

const FAQS = [
  { q: "사업자등록 안 하고 사업하면 어떻게 되나요?", a: "미등록 가산세가 나와요. 공급가액의 1%를 가산세로 내야 하고, 매입세액 공제도 못 받아요. 세금계산서 발급도 불가능해서 거래처와 문제가 생길 수 있어요." },
  { q: "간이과세자랑 일반과세자 중 뭐가 유리한가요?", a: "매출이 적으면 간이과세자가 유리해요. 부가세 부담이 낮고 신고도 연 1회라 간편해요. 단, 세금계산서 발급이 제한되니 B2B 거래가 많으면 일반과세자가 나아요." },
  { q: "집에서 온라인 사업하면 사업장 주소는 어떻게 하나요?", a: "자택을 사업장으로 등록할 수 있어요. 임대차계약서 대신 건축물대장이나 주민등록등본으로 증빙하면 돼요." },
  { q: "프리랜서도 사업자등록 해야 하나요?", a: "계속적·반복적으로 용역을 제공하면 사업자등록 대상이에요. 일시적 용역이면 3.3% 원천징수로 처리하고 사업자등록 없이도 가능해요." },
  { q: "사업자등록 하면 건강보험료가 올라가나요?", a: "지역가입자로 전환되면 소득에 따라 건보료가 달라져요. 직장 다니면서 부업으로 하는 경우 연 소득 2,000만원 이하면 추가 건보료 부담이 크지 않아요." },
  { q: "사업자등록 후 폐업하려면 어떻게 하나요?", a: "홈택스에서 폐업 신고하면 돼요. 폐업일이 속하는 달의 다음 달 25일까지 부가세 확정신고도 해야 해요." },
];

const SOURCES = [
  { name: "부가가치세법", href: "https://www.law.go.kr/법령/부가가치세법" },
  { name: "국세청 홈택스", href: "https://www.hometax.go.kr" },
];

const RELATED = [
  { slug: "부가가치세-신고-기한-대상", title: "부가가치세 신고 기한·대상", description: "부가세 신고 시기와 방법 정리." },
  { slug: "간이지급명세서-제출", title: "간이지급명세서 제출", description: "인건비 지급 시 제출해야 하는 서류." },
  { slug: "원천징수-신고-방법", title: "원천징수 신고 방법", description: "직원 급여에서 세금 떼는 방법." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 사업자 · 등록</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        사업자등록, 어떻게 하나요?<br />
        절차·서류·간이과세자 기준까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        사업을 시작하려고 하는데 사업자등록부터 막히죠. 생각보다 간단해요.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/부가가치세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>부가가치세법</a>에 따라 사업을 시작하면 사업개시일로부터 20일 이내에 사업자등록을 해야 해요. <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스</a>에서 온라인으로 신청하면 3영업일 이내에 등록증을 받을 수 있어요. 연 매출 8,000만원 미만이면 간이과세자로 등록하면 세금 부담이 줄어들어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>사업자등록 절차는 5단계로 끝나요</H2>
      <p style={body}>
        개인사업자 기준으로 홈택스 온라인 신청이 가장 빠르고 편해요. 서류만 제대로 준비하면 당일 처리도 가능해요.
      </p>

      <SectionBadge>사업자등록 5단계</SectionBadge>
      <Steps steps={REG_STEPS} />

      <p style={body}>
        사업 시작 전에 미리 등록해도 돼요. 오히려 미리 하면 사업자 통장도 만들 수 있고, 초기 비용에 대한 매입세액 공제도 받을 수 있어서 유리해요.
      </p>

      <CategoryButton label="세금" count={12} href="/category/세금" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>준비할 서류는 이것만 있으면 돼요</H2>
      <p style={body}>
        기본 서류는 3가지예요. 신청서, 신분증, 임대차계약서. 업종에 따라 허가증이 추가될 수 있어요.
      </p>

      <SectionBadge>사업자등록 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <p style={body}>
        온라인 쇼핑몰처럼 별도 사업장이 없는 경우에는 자택 주소로 등록 가능해요. 임대차계약서 대신 건축물대장을 제출하면 돼요.
      </p>

      <Divider />

      <H2>간이과세자 vs 일반과세자, 뭐가 다른가요?</H2>
      <p style={body}>
        사업자등록 시 가장 중요한 선택이에요. 연 매출 8,000만원을 기준으로 나뉘는데, 세금 부담과 신고 방식이 크게 달라져요.
      </p>

      <SectionBadge>간이과세자 vs 일반과세자</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 16 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
          <thead>
            <tr style={{ backgroundColor: "#E1F5EE" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>항목</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>간이과세자</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>일반과세자</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["매출 기준", "연 8,000만원 미만", "연 8,000만원 이상"],
              ["부가세율", "업종별 1.5~4%", "10%"],
              ["신고 횟수", "연 1회 (1월)", "연 2회 (1월, 7월)"],
              ["세금계산서 발급", "4,800만원 이상만 가능", "제한 없음"],
              ["매입세액 공제", "업종별 공제율 적용", "전액 공제"],
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "10px 12px", fontWeight: 600, color: "#374151" }}>{row[0]}</td>
                <td style={{ padding: "10px 12px", color: "#374151" }}>{row[1]}</td>
                <td style={{ padding: "10px 12px", color: "#374151" }}>{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        소규모 개인 사업이라면 간이과세자로 시작하는 게 유리해요. 나중에 매출이 8,000만원을 넘으면 자동으로 일반과세자로 전환돼요.
      </p>

      <Divider />

      <H2>사업자등록 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        미등록 가산세, 프리랜서 등록 여부, 건보료 영향 등 실제로 많이 궁금해하는 내용이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 부가가치세법과 국세청 안내를 바탕으로 작성했어요. 업종별 세부 조건이 다를 수 있으니 관할 세무서나 세무사에게 확인하세요." />
    </ArticleLayout>
  );
}
