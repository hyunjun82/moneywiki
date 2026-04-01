"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 국가유공자·유족이 "올해 얼마 오른 거야?" 궁금해서 2026년 지급액 확인하려는 상황
// Q2. 자기 유형(독립유공자/국가유공자/참전유공자)의 2026년 월 지급액을 바로 확인한다
// Q3. 유형별 월 지급액 표 + 인상 내용 + 신규 혜택 + 문의처
// Q4. GreenBox(금액표) + BorderBox(신규 혜택) + Checklist(신청 포인트) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

// ─── 데이터 ──────────────────────────────────────────

const CHECKLIST = [
  "이미 등록된 유공자·유족은 별도 신청 없이 1월분부터 자동 인상 금액 지급",
  "생활조정수당·생활지원금: 별도 신청 필요 — 관할 보훈지청 방문 또는 1577-0606",
  "참전유공자 배우자 생계지원금 신설(월 15만원): 2026년 신규 — 신청 필요",
  "재해부상군경 7급 부양가족수당: 2026년 신설 — 신청 필요",
  "신규 등록이 필요한 경우: 관할 보훈지청 방문 또는 국가보훈부 홈페이지",
];

const FAQS = [
  {
    q: "인상된 금액은 언제부터 받을 수 있나요?",
    a: "2026년 1월분부터 인상된 금액이 적용돼요. 보통 1월 말~2월 초에 입금되는 금액부터 확인하시면 돼요. 별도 신청 없이 자동으로 적용돼요.",
  },
  {
    q: "참전유공자 배우자도 보훈급여금을 받을 수 있나요?",
    a: "2026년부터 참전유공자 배우자 생계지원금이 신설됐어요. 월 15만원 받을 수 있어요. 기존에는 없던 혜택이라서 신청이 필요해요. 관할 보훈지청에 문의하세요.",
  },
  {
    q: "7급 상이군경은 왜 인상률이 더 높은가요?",
    a: "7급 상이군경은 다른 등급 대비 보상 수준이 상대적으로 낮았어요. 격차를 줄이기 위해 기본 5%에 3.8%를 추가해 총 8.8% 인상됐어요. 2026년 기준 월 70만 8,000원이에요.",
  },
  {
    q: "생활조정수당은 어떻게 신청하나요?",
    a: "관할 보훈지청에 방문하거나 국가보훈부 상담센터(1577-0606)에 전화해 신청할 수 있어요. 가족 수에 따라 월 24만 2,000원~37만원을 추가로 받을 수 있어요.",
  },
  {
    q: "보훈급여금과 국민연금을 동시에 받을 수 있나요?",
    a: "네, 받을 수 있어요. 보훈급여금은 국민연금·기초연금과 중복 수령이 가능해요. 단, 일부 생활지원금의 경우 소득·재산 기준이 적용될 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "국가보훈부: 2026년 보훈급여금 월지급액표", url: "https://www.mpva.go.kr" },
      { label: "국가보훈법: 보훈급여금 지급 기준", url: "https://www.law.go.kr/법령/국가보훈법" },
    ],
  },
];

const RELATED = [
  { slug: "국가유공자-혜택", title: "국가유공자 혜택 총정리", description: "의료·교육·취업 혜택까지 한눈에 정리했어요." },
  { slug: "참전유공자-수당-신청", title: "참전유공자 수당 신청 방법", description: "참전명예수당 신청 절차를 정리했어요." },
  { slug: "보훈급여금-신청방법-대상-조회", title: "보훈급여금 신청 방법과 대상 조회", description: "처음 신청하는 분을 위한 안내예요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>복지 · 보훈 · 2026년 지급액</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        2026년 보훈급여금, 얼마나 올랐나요?<br />
        유형별 월 지급액 한눈에 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        2026년 보훈급여금이 전년 대비 평균 5% 인상됐어요.
        7급 상이군경은 추가 3.8%가 더 올라 총 8.8% 인상이에요.
        참전유공자 배우자 생계지원금(월 15만원)이 신설됐고, 재해부상군경 7급 부양가족수당도 새로 생겼어요.
        이미 등록된 유공자·유족은 1월분부터 자동으로 인상 금액이 지급돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>참전유공자 수당 (2026년)</H2>
      <p style={body}>
        참전명예수당이 월 4만원 올라 49만원이 됐어요.
        6·25전쟁이나 베트남전쟁 참전자가 대상이에요.
        2026년부터 배우자 생계지원금이 새로 생긴 게 가장 큰 변화예요.
      </p>

      <GreenBox>
        참전명예수당: 월 49만원 (전년 대비 +4만원)<br />
        무공영예수당: 태극무공훈장 57만원 / 을지 56만 5천원 / 충무 56만원 / 화랑 55만 5천원 / 인헌 55만원<br />
        배우자 생계지원금: 월 15만원 (2026년 신설)
      </GreenBox>

      <Divider />

      <H2>국가유공자 상이군경 보상금 (2026년)</H2>
      <p style={body}>
        전 등급 평균 5% 인상됐어요.
        7급 상이군경은 보상 격차를 줄이기 위해 8.8% 인상해 월 70만 8,000원이에요.
        1급은 중상이부가수당이 포함돼 700만원대예요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>등급</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>월 지급액</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>비고</th>
            </tr>
          </thead>
          <tbody>
            {[
              { grade: "1급 1항", amount: "719만 9,000원", note: "중상이부가수당 포함" },
              { grade: "2급", amount: "약 550만원", note: "" },
              { grade: "3급", amount: "약 450만원", note: "" },
              { grade: "4급", amount: "약 350만원", note: "" },
              { grade: "5급", amount: "약 250만원", note: "" },
              { grade: "6급", amount: "약 150만원", note: "" },
              { grade: "7급", amount: "70만 8,000원", note: "8.8% 인상" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px" }}>{row.grade}</td>
                <td style={{ textAlign: "right", padding: "5px 8px", fontWeight: row.grade === "1급 1항" ? 700 : 400 }}>{row.amount}</td>
                <td style={{ textAlign: "center", padding: "5px 8px", fontSize: 12, color: row.note === "8.8% 인상" ? "#E53E3E" : "#666" }}>{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GreenBox>

      <BorderBox>
        전몰·순직 배우자: 월 213만 8,000원 ~ 241만 2,000원<br />
        상이 1~5급, 6급 상이 사망 배우자: 월 185만 3,000원 ~ 212만 7,000원<br />
        6급 비상이·7급 사망 배우자: 월 68만원 ~ 95만 4,000원
      </BorderBox>

      <Divider />

      <H2>독립유공자 보상금 (2026년)</H2>
      <p style={body}>
        건국장 1~3등급은 월 1,257만 4,000원으로 가장 높아요.
        유족은 배우자가 기타 유족보다 조금 더 받아요.
        생활이 어려운 유족은 생활조정수당(월 최대 37만원)을 추가 신청할 수 있어요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>훈격·등급</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>본인</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>유족(배우자)</th>
            </tr>
          </thead>
          <tbody>
            {[
              { grade: "건국장 1~3등급", own: "1,257만 4,000원", spouse: "351만 1,000원" },
              { grade: "건국장 4등급", own: "805만 9,000원", spouse: "258만 6,000원" },
              { grade: "건국장 5등급", own: "678만 6,000원", spouse: "210만 6,000원" },
              { grade: "건국포장", own: "554만원", spouse: "147만 9,000원" },
              { grade: "대통령표창", own: "472만원", spouse: "100만원" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px" }}>{row.grade}</td>
                <td style={{ textAlign: "right", padding: "5px 8px" }}>{row.own}</td>
                <td style={{ textAlign: "right", padding: "5px 8px" }}>{row.spouse}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GreenBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>고엽제 후유의증·보훈보상대상자 수당 (2026년)</H2>
      <p style={body}>
        베트남전 참전 중 고엽제 노출 피해자와 2세 환자는 별도 수당이 있어요.
        장애 정도에 따라 달라지고, 재해부상군경은 국가유공자 상이군경보다 낮은 수준이에요.
      </p>

      <GreenBox>
        고도 장애: 월 129만 6,000원<br />
        중등도 장애: 월 95만 4,000원<br />
        경도 장애: 월 62만 6,000원<br />
        <br />
        고엽제 후유증 2세 환자 — 고도: 230만 8,000원 / 중등도: 179만 2,000원 / 경도: 144만원
      </GreenBox>

      <BorderBox>
        본인 1급 1항: 497만 2,000원 / 7급: 49만 6,000원<br />
        유족(재해사망군경 배우자): 149만 7,000원<br />
        유족(재해사망군경 자녀): 173만 6,000원<br />
        2026년 신설: 재해부상군경 7급 부양가족수당 (신청 필요)
      </BorderBox>

      <Divider />

      <H2>신청·확인 포인트</H2>
      <p style={body}>
        이미 등록된 분들은 자동으로 인상 금액이 지급돼요.
        새로 생긴 혜택(배우자 생계지원금, 재해부상군경 7급 부양가족수당)은 신청해야 받을 수 있어요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        국가보훈부 상담센터: 1577-0606 (평일 09:00~18:00)<br />
        국가보훈부 홈페이지: www.mpva.go.kr<br />
        신규 등록·이의신청: 관할 보훈지청 방문
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        보훈급여금 인상과 신청에 대해 많이 나오는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 국가보훈부 발표 기준으로 작성됐어요. 정확한 금액은 개인 등급·상황에 따라 다를 수 있으니 국가보훈부(1577-0606)에서 확인하세요." />
    </ArticleLayout>
  );
}
