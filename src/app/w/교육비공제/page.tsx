"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 연말정산 시즌에 교육비를 많이 썼는데 얼마나 돌려받는지 계산하고 싶은 직장인
// Q2. 본인/자녀별 한도를 파악하고 실제 공제 금액을 계산해서 연말정산 신청
// Q3. 세액공제 15% 공식, 본인 무제한/대학생 900만원/초중고 300만원 한도, 취학전 아동 학원비 포함 여부, 2026년 예체능 학원비 신규, 맞벌이 주의사항
// Q4. GreenBox(대상별 한도 표) + GreenBox(실제 계산 예시) + BorderBox(초중고 공제 안 되는 항목) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "임대차계약서와 주민등록 주소가 일치하면 공제 가능해요",
  "간소화 서비스에 자동 수집 안 되는 항목은 영수증 직접 제출",
  "맞벌이 부부는 자녀 공제를 한 명에게만 몰아줘야 더 유리해요",
  "본인 대학원 등록금은 한도 없이 15% 전액 공제",
  "취학전 아동 + 만 9세 미만 예체능 학원비는 300만원 한도 합산",
];

const FAQS = [
  {
    q: "교육비 공제율은 얼마인가요?",
    a: "지출한 교육비의 15%를 세액공제 받아요. 소득공제가 아니라 세액공제라서 내야 할 세금에서 바로 빼줘요.",
  },
  {
    q: "본인 교육비 한도는 얼마인가요?",
    a: "한도가 없어요. 대학 등록금이든 대학원 등록금이든 얼마를 써도 전액 15% 공제받을 수 있어요.",
  },
  {
    q: "초중고 학원비도 공제되나요?",
    a: "안 돼요. 초중고 학원비는 공제 대상이 아니에요. 취학전 아동과 만 9세 미만 자녀의 예체능 학원비만 공제돼요.",
  },
  {
    q: "2026년에 새로 바뀐 게 뭔가요?",
    a: "만 9세 미만 자녀의 예체능 학원비(피아노, 태권도, 미술, 수영 등)가 공제 대상에 추가됐어요. 기존 취학전 아동 300만원 한도에 합산돼요.",
  },
  {
    q: "맞벌이 부부가 자녀 교육비를 나눠서 공제받을 수 있나요?",
    a: "안 돼요. 같은 자녀 교육비는 부부 중 한 명만 공제받을 수 있어요. 본인 교육비는 각자 따로 공제받으면 돼요.",
  },
  {
    q: "30살 자녀가 대학교 다니면 교육비공제 받을 수 있나요?",
    a: "나이 제한은 없어요. 자녀 소득이 연간 100만원 이하인 기본공제 대상자이기만 하면 나이 상관없이 900만원 한도로 공제받아요.",
  },
  {
    q: "간소화 서비스에 안 나오는 교육비는 어떻게 하나요?",
    a: "학원비, 체육시설, 해외 교육비는 간소화 서비스에 자동으로 안 나와요. 직접 영수증이나 납입증명서를 발급받아 제출해야 해요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "소득세법 제59조의4 (교육비 세액공제)", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "국세청 연말정산 간소화 서비스", url: "https://www.hometax.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "연말정산", title: "연말정산 완벽 가이드", description: "연말정산 전체 흐름을 정리했어요." },
  { slug: "부양가족공제", title: "부양가족공제 조건", description: "자녀·부모를 공제받는 요건이에요." },
  { slug: "세액공제", title: "세액공제 vs 소득공제 차이", description: "두 가지 공제 방식의 차이점이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 연말정산 · 교육비공제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        교육비공제 한도와 계산법<br />
        본인·자녀별 공제 한도와 계산법 2026
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        교육비의 15%를 세금에서 직접 빼주는 세액공제예요.
        대학생 자녀 등록금 800만원을 냈다면 120만원을 돌려받을 수 있어요.
        본인 교육비는 한도가 없고, 2026년부터 만 9세 미만 예체능 학원비도 공제 대상이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>대상별 공제 한도</H2>
      <p style={body}>
        누가 쓴 교육비냐에 따라 한도가 달라져요.
        본인은 한도 없이 전액 공제받고, 자녀는 학교급에 따라 다르게 적용돼요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>대상</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>한도</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>공제 가능 항목</th>
            </tr>
          </thead>
          <tbody>
            {[
              { target: "본인", limit: "무제한", items: "대학·대학원 등록금, 학점은행제, 직업훈련비" },
              { target: "대학생 자녀", limit: "연 900만원", items: "등록금, 입학금, 기숙사비" },
              { target: "초중고 자녀", limit: "연 300만원", items: "수업료, 급식비, 방과후학교, 교복 50만원, 현장체험 30만원" },
              { target: "취학전 아동", limit: "연 300만원", items: "어린이집·유치원비, 학원비, 체육시설" },
              { target: "만 9세 미만 (2026 신규)", limit: "연 300만원 (합산)", items: "예체능 학원비 (피아노·태권도·미술·수영 등)" },
              { target: "장애인 특수교육", limit: "무제한", items: "특수학교, 재활교육, 발달재활서비스" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 700, whiteSpace: "nowrap" }}>{row.target}</td>
                <td style={{ padding: "5px 8px", whiteSpace: "nowrap" }}>{row.limit}</td>
                <td style={{ padding: "5px 8px", fontSize: 12 }}>{row.items}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ★ 공제율 15% 공통 / 자녀는 소득 100만원 이하 기본공제 대상자만 / 맞벌이 부부는 한 명만 자녀 공제 가능
        </p>
      </GreenBox>

      <H2>실제 계산 예시</H2>
      <p style={body}>
        실제로 얼마나 돌려받는지 계산해볼게요.
        교육비 × 15% = 공제 금액이에요. 한도를 넘는 부분은 공제되지 않아요.
      </p>

      <GreenBox>
        <strong>케이스 1: 대학생 자녀 등록금만 낸 경우</strong><br />
        등록금 800만원 × 15% = <strong>120만원</strong> 세액공제<br />
        <br />
        <strong>케이스 2: 대학원생 본인 + 초등학생 자녀</strong><br />
        본인 등록금 1,200만원 × 15% = 180만원<br />
        초등학생 자녀 교육비 250만원 × 15% = 37.5만원<br />
        합계 <strong>217.5만원</strong> 세액공제<br />
        <br />
        <strong>케이스 3: 6살 자녀 유치원 + 예체능 학원 (2026년 신규)</strong><br />
        유치원비 200만원 + 피아노 학원 100만원 = 300만원<br />
        300만원 × 15% = <strong>45만원</strong> 세액공제<br />
        <br />
        ★ 한도 초과 예: 대학생 등록금 + 기숙사 1,100만원 → 900만원까지만 공제 → 135만원 세액공제
      </GreenBox>

      <H2>초중고 자녀 : 공제 되는 것 vs 안 되는 것</H2>
      <p style={body}>
        초중고 자녀 교육비에서 제일 헷갈리는 부분이 학원비예요.
        초중고 학원비는 공제가 안 되는 게 원칙이에요.
      </p>

      <BorderBox>
        <strong>공제 O (초중고)</strong><br />
        수업료, 입학금, 급식비, 교과서대, 방과후학교 수업료<br />
        교복 구입비 50만원 한도, 현장체험학습비 30만원 한도<br />
        방과후학교 도서 구입비<br />
        <br />
        <strong>공제 X (초중고)</strong><br />
        수학·영어 등 일반 학원비 : 이건 취학전 아동만 돼요<br />
        문구류·재료비, 통학버스비, 일반 도서 구입비<br />
        <br />
        <strong>2026년 신규 추가</strong><br />
        만 9세 미만(초등 3학년 1학기까지) 예체능 학원비 : 취학전 아동 300만원 한도에 합산<br />
        생일 기준 만 나이로 정확히 계산해야 해요<br />
        <br />
        ★ 간소화 서비스에 자동 수집 안 되는 학원비·체육시설비는 영수증 직접 제출 필요
      </BorderBox>

      <Checklist items={CHECKLIST} />

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 소득세법 기준으로 작성됐어요. 공제 한도와 대상 항목은 세법 개정으로 변경될 수 있어요. 정확한 공제 가능 여부는 국세청 홈택스 연말정산 간소화 서비스에서 살펴봐요." />
    </ArticleLayout>
  );
}
