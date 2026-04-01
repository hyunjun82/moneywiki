"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 장애인이 창업하려는데 점포 보증금이나 운영자금이 부족한 상황
// Q2. 장애인자립자금대여 + 고용공단 창업지원금 파악 → 주민센터/공단 신청 → 창업
// Q3. 자립자금: 점포보증금 7천만원/운영자금 3천만원 무보증 연2~3% / 공단지원금: 최대 1억(시설7천+보증금5천) / 소득 150% 이하
// Q4. GreenBox(대출·지원 비교표) + GreenBox(신청 기관별 지원 내용) + BorderBox(신청 서류 + 주의사항) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "장애인 창업 대출은 얼마까지 받을 수 있나요?",
    a: "장애인자립자금대여는 점포보증금 최대 7천만원, 운영자금 최대 3천만원까지 무보증으로 빌릴 수 있어요. 둘을 합치면 최대 1억원 규모예요. 금리는 연 2~3%로 일반 대출보다 훨씬 낮아요.",
  },
  {
    q: "장애인고용공단 창업지원금은 대출과 다른가요?",
    a: "공단 창업지원금은 상환 의무가 없는 지원금이에요. 시설·장비 구입비 최대 7천만원, 임차보증금 최대 5천만원으로 총 1억원까지 받을 수 있어요. 대출은 갚아야 하지만 지원금은 갚지 않아도 돼요.",
  },
  {
    q: "소득 기준이 어떻게 되나요?",
    a: "장애인자립자금대여는 가구 평균소득 150% 이하 기준이에요. 예를 들어 4인 가구 기준 월 평균소득 150%는 약 730만원 이하예요. 장애인등록증이 있고 소득 기준을 충족하면 신청할 수 있어요.",
  },
  {
    q: "창업 지원 신청은 어디서 하나요?",
    a: "장애인자립자금대여는 주민센터나 구청 장애인복지과에 신청해요. 고용공단 창업지원금은 한국장애인고용공단 홈페이지(kead.or.kr)에서 신청해요. 두 가지를 중복으로 신청할 수 있어요.",
  },
  {
    q: "창업 후 추가 지원도 있나요?",
    a: "네, 창업 후 장애인 직원을 채용하면 고용장려금을 받을 수 있어요. 작업장비나 보조기기도 무상 지원되고, 임대료 감면이나 세금 감면 혜택도 있어요. 지속적인 지원 제도를 활용하면 운영비 부담을 줄일 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "장애인복지법 제39조 (자립자금 대여)", url: "https://www.law.go.kr/법령/장애인복지법" },
      { label: "한국장애인고용공단 창업지원", url: "https://www.kead.or.kr" },
      { label: "정부24 장애인자립자금 신청", url: "https://www.gov.kr" },
    ],
  },
];

const RELATED = [
  { slug: "장애인-공동-창업-자금-마련", title: "장애인 공동 창업 자금 마련", description: "여럿이 함께 창업할 때 자금 마련 방법이에요." },
  { slug: "장애인등록증-발급-신청", title: "장애인등록증 발급 신청 방법", description: "창업 지원 신청 전 필요한 등록증 발급 방법이에요." },
  { slug: "장애인-의무고용-100명-기준-비율", title: "장애인 의무고용 비율", description: "직원 채용 시 고용장려금 받는 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>복지 · 장애인 · 창업 지원</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        장애인 창업 대출·보증금 지원<br />
        최대 1억원 무보증 저금리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        장애인이 가게를 열 때 점포 보증금이나 운영자금이 부족하면 정부에서 무보증으로 도와줘요.
        장애인자립자금대여로 최대 1억원을 연 2~3% 저금리로 빌릴 수 있고,
        고용공단 창업지원금은 상환 없이 받을 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>창업 지원 제도 비교</H2>
      <p style={body}>
        대출과 지원금 두 가지를 중복으로 활용할 수 있어요.
        지원금은 갚지 않아도 되니 먼저 챙기는 게 유리해요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>제도</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>최대 금액</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>금리</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>상환 여부</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: "장애인자립자금대여\n(점포보증금)", amount: "7천만원", rate: "연 2~3%", repay: "상환 필요" },
              { name: "장애인자립자금대여\n(운영자금)", amount: "3천만원", rate: "연 2~3%", repay: "상환 필요" },
              { name: "고용공단 창업지원금\n(시설·장비)", amount: "7천만원", rate: "무이자", repay: "상환 없음" },
              { name: "고용공단 창업지원금\n(임차보증금)", amount: "5천만원", rate: "무이자", repay: "상환 없음" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)", background: i >= 2 ? "rgba(29,158,117,0.05)" : undefined }}>
                <td style={{ padding: "5px 8px", whiteSpace: "pre-line", fontSize: 12 }}>{row.name}</td>
                <td style={{ textAlign: "center", padding: "5px 8px", color: "#1D9E75", fontWeight: 600 }}>{row.amount}</td>
                <td style={{ textAlign: "center", padding: "5px 8px" }}>{row.rate}</td>
                <td style={{ textAlign: "right", padding: "5px 8px", fontSize: 12, fontWeight: i >= 2 ? 700 : 400 }}>{row.repay}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ※ 자립자금 거치기간 3년, 상환기간 5년 / 두 제도 중복 신청 가능
        </p>
      </GreenBox>

      <H2>신청 기관과 절차</H2>
      <p style={body}>
        두 제도는 신청 기관이 달라요. 주민센터와 공단에 각각 따로 신청해야 해요.
      </p>

      <GreenBox>
        <strong>장애인자립자금대여 (주민센터)</strong><br />
        신청처: 주민센터·구청 장애인복지과<br />
        조건: 등록 장애인 + 가구 평균소득 150% 이하<br />
        서류: 장애인등록증, 사업계획서, 소득증명서<br />
        대출 한도: 점포보증금 7천만원 + 운영자금 3천만원<br />
        <br />
        <strong>장애인고용공단 창업지원금 (공단)</strong><br />
        신청처: 한국장애인고용공단 홈페이지 (kead.or.kr)<br />
        조건: 등록 장애인 + 사업 계획서 심사 통과<br />
        서류: 장애인등록증, 사업계획서, 임차계약서<br />
        지원 한도: 시설·장비 7천만원 + 임차보증금 5천만원<br />
        <br />
        ★ 두 제도를 합치면 최대 2억원 규모 지원 가능
      </GreenBox>

      <H2>신청 주의사항</H2>
      <p style={body}>
        소득 기준과 사업계획서가 핵심이에요. 서류를 꼼꼼히 준비해야 승인률이 높아요.
      </p>

      <BorderBox>
        <strong>자립자금대여 주의사항</strong><br />
        소득 기준: 가구 평균소득 150% 이하 (4인 기준 약 730만원/월)<br />
        대출 목적 외 사용 시 회수 조치 가능<br />
        사업계획서에 수익 구조와 상환 계획 구체적으로 기재<br />
        <br />
        <strong>공단 지원금 주의사항</strong><br />
        경쟁 심사 방식 → 사업 타당성이 중요<br />
        지원 결정 후 지정 기간 내 사업 착수 필수<br />
        지원 후 일정 기간 사업 유지 의무 있음<br />
        <br />
        <strong>창업 후 추가 혜택</strong><br />
        장애인 직원 채용 시 월 40~80만원 고용장려금<br />
        작업장비·보조기기 무상 지원 (공단 신청)<br />
        <br />
        ★ 장애인등록증 없으면 신청 불가 → 먼저 등록 필요
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준으로 작성됐어요. 지원 한도와 금리는 예산 상황에 따라 변경될 수 있으니 신청 전 해당 기관에 최신 정보를 확인하세요." />
    </ArticleLayout>
  );
}
