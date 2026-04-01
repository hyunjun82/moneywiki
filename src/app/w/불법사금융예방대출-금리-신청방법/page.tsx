"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 급전이 필요해서 사금융을 알아보고 있는데, 정부지원 저금리 대출이 있다고 들은 상황이에요.
// Q2. 불법사금융예방대출 신청 조건을 확인하고, 서민금융 잇다 앱이나 센터에서 대출을 신청하는 행동.
// Q3. 금리 12.5%(배려자 9.9%), 이자 50% 페이백 구조, 소득·신용 조건, 한도 1,000만원, 신청 경로 2가지, 햇살론과 차이.
// Q4. GreenBox(금리 변경) + 표(비교) + Steps(신청 절차) + BorderBox(페이백 계산) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Steps, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  { q: "사금융 이용한 적 없어도 받을 수 있나요?", a: "네, 사금융 이용 여부와 상관없어요. 소득·신용 조건만 맞으면 누구나 신청할 수 있어요." },
  { q: "이자 50% 페이백은 언제 받나요?", a: "만기 전에 대출금 전액을 상환하면 그때까지 낸 이자의 50%를 돌려받아요. 상환 완료 후 별도 신청이에요." },
  { q: "다른 대출이 있어도 신청 가능한가요?", a: "가능해요. 다만 소득 대비 상환 능력을 심사해서 한도가 조정될 수 있어요." },
  { q: "재대출 금리 4.5%는 어떻게 받나요?", a: "불법사금융예방대출을 한 번 다 갚고 나서 다시 대출받으면 금리가 4.5%로 내려가요." },
  { q: "연체 중이어도 신청할 수 있나요?", a: "현재 연체이력이 있으면 서민금융통합지원센터 방문 신청만 가능해요. 앱으로는 안 돼요." },
  { q: "금융교육은 뭐예요?", a: "대출 전 필수로 이수해야 하는 교육이에요. 센터 방문 시 현장에서 받거나, 온라인으로 수강할 수 있어요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "서민금융진흥원 불법사금융예방대출", url: "https://sloan.kinfa.or.kr/" },
    { label: "서민금융진흥원 공식 사이트", url: "https://www.kinfa.or.kr" },
    { label: "금융위원회 2026년 달라지는 금융제도", url: "https://www.fsc.go.kr" },
  ] },
];

const RELATED = [
  { slug: "긴급복지-생계지원금-신청-방법", title: "긴급복지 생계지원금 신청", description: "급전이 필요한 상황이라면 생계지원금도 확인하세요." },
  { slug: "미환급금-조회-정부24-환급금-찾기", title: "미환급금 조회 방법", description: "정부24에서 숨은 환급금을 찾을 수 있어요." },
  { slug: "국민연금-조기수령-감액률-신청조건-손익분기점", title: "국민연금 조기수령 조건", description: "연금도 미리 받을 수 있어요. 감액률과 손익분기점을 확인하세요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>복지 · 서민금융 · 대출</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        불법사금융예방대출, 금리 12.5%에 이자 절반 환급?<br />
        조건부터 신청 방법까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        급전이 필요해서 사금융을 알아보고 계시다면 잠깐 멈추세요.
        정부가 운영하는 불법사금융예방대출은 금리도 낮고, 다 갚으면 이자의 절반을 돌려받아요.
        실질 금리가 6%대까지 내려가는 구조예요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>2026년 금리, 얼마나 내려갔나요?</H2>
      <p style={body}>
        2026년 1월 2일부터 금리가 대폭 인하됐어요.
        <a href="https://www.kinfa.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>서민금융진흥원</a> 발표 기준이에요.
      </p>

      <SectionBadge>금리 변경 비교표</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>대상</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>기존 금리</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>변경 금리</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>페이백 후</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["일반", "연 15.9%", "연 12.5%", "연 6.25%"],
              ["사회적 배려대상자", "연 15.9%", "연 9.9%", "연 4.95%"],
              ["재대출 (완제 후)", "-", "연 4.5%", "-"],
            ].map(([who, old, now, after], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{who}</td>
                <td style={{ padding: "9px 12px", color: "#999", textDecoration: "line-through" }}>{old}</td>
                <td style={{ padding: "9px 12px", fontWeight: 600, color: "#1D9E75" }}>{now}</td>
                <td style={{ padding: "9px 12px" }}>{after}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        대출 조건 요약이에요.<br />
        · 소득 조건: 연소득 <strong>3,500만원 이하</strong><br />
        · 신용 조건: 신용평점 <strong>하위 20%</strong> 이하<br />
        · 대출 한도: 최대 <strong>1,000만원</strong><br />
        · 상환 방식: 2년 원리금균등분할상환 (만기연장 불가)
      </GreenBox>

      <Divider />

      <H2>이자 50% 페이백, 어떻게 계산되나요?</H2>

      <BorderBox>
        <strong>페이백 계산 예시</strong><br /><br />
        대출금 1,000만원 / 금리 연 12.5% / 기간 2년<br />
        총 이자: 약 130만원<br />
        만기 전 전액 상환 시 페이백: 이자의 50% = <strong>약 65만원 환급</strong><br />
        실질 이자 부담: 약 65만원 (실질 금리 연 6.25%)<br /><br />
        사회적 배려대상자(기초수급·차상위·한부모·장애인)는 금리 9.9%, 페이백 후 실질 4.95%
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>신청은 이렇게 해요</H2>

      <Steps steps={[
        { title: "신청 방법 확인", desc: "처음 이용자·배려대상자·연체이력자는 센터 방문 필수. 완제 이력 있으면 서민금융 잇다 앱(비대면)으로 가능해요." },
        { title: "서류 준비", desc: "신분증, 소득 증빙(소득금액증명원·급여명세서), 금융교육 이수 확인서를 준비하세요." },
        { title: "금융교육 이수", desc: "대출 전 필수 교육이에요. 센터에서 현장 수강하거나 온라인으로 이수할 수 있어요." },
        { title: "심사 및 대출 실행", desc: "소득·신용 심사 후 승인되면 대출금이 계좌로 입금돼요. 보통 3~5영업일 내 실행돼요." },
      ]} />

      <p style={body}>
        가까운 서민금융통합지원센터는 <a href="https://www.kinfa.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>서민금융진흥원 사이트</a>에서
        검색하거나 서민금융콜센터 1397로 전화하면 안내받을 수 있어요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 서민금융진흥원·금융위원회 자료를 바탕으로 작성했어요. 대출 금리·조건은 정책 변경 시 달라질 수 있으니 공식 사이트에서 확인하세요." />
    </ArticleLayout>
  );
}
