"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 기존 실손보험 갱신일이 다가왔거나 5세대 전환 안내문을 받은 가입자가 갱신을 그냥 해도 되는지 판단하는 상황
// Q2. 갱신일 확인 → 자동 전환 방식 이해 → 보험료 조정 내용 확인 → 거부 여부 결정
// Q3. 2026년 7월부터 갱신일 순서대로 자동 전환 / 건강 심사 없음 / 기본 보험료 30~50% 하락 but 비급여 보장 축소 / 거부 시 보험 종료
// Q4. GreenBox(전환 타임라인 표) + BorderBox(갱신 절차 3단계) + BorderBox(거부 시 주의사항) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "안내문에 적힌 새 보험료와 보장 변경 내용을 꼼꼼히 비교해봐요",
  "비급여 치료를 자주 받는다면 보장 축소 영향이 클 수 있어요",
  "갱신 거부 시 이후 실손보험 재가입은 건강 심사를 다시 받아야 해요",
  "1세대·2009년 이전 가입자는 강제 전환 대상이 아니에요",
  "갱신일 확인은 보험증권 또는 보험사 앱에서 해봐요",
];

const FAQS = [
  {
    q: "5세대 실손보험 갱신 시 보험료가 올라가나요?",
    a: "기본 보험료 자체는 30~50% 낮아지지만, 나이가 많아지거나 보험사의 위험률이 바뀌면 실제 납입 보험료가 조정돼요. 사람마다 달라서 안내문에 나온 새 보험료를 직접 확인해야 해요.",
  },
  {
    q: "갱신을 거부하면 어떻게 되나요?",
    a: "보험이 완전히 종료돼요. 갱신 거부 후에는 새로운 실손보험에 가입하려면 건강 심사를 다시 받아야 해요. 건강 문제가 생긴 후에는 가입이 어려울 수 있으니 신중하게 결정하세요.",
  },
  {
    q: "1세대 실손보험 가입자도 강제 전환되나요?",
    a: "아니에요. 1세대 및 초기 2세대(2009년 9월 이전 가입) 가입자는 강제 전환 대상에서 제외돼요. 원하면 별도 심사 없이 5세대로 자발적 전환은 가능해요.",
  },
  {
    q: "4세대 실손보험을 계속 유지하고 싶으면 어떻게 해야 하나요?",
    a: "5세대 출시(2026년 상반기) 전에 다른 보험사의 4세대 실손보험에 새로 가입하는 방법이 있어요. 다만 기존 보험사의 4세대는 5세대 출시 이후 판매가 중단될 예정이에요.",
  },
  {
    q: "갱신 후 비급여 보장이 얼마나 줄어드나요?",
    a: "5세대는 비급여 의료비 보장이 축소되는 게 핵심 변화예요. 도수치료, 주사치료 등 비급여 항목의 본인 부담률이 높아지고 보장 한도가 줄어들 수 있어요. 구체적인 내용은 갱신 안내문이나 금융위원회 공시자료를 살펴봐요.",
  },
  {
    q: "갱신일이 언제인지 모르면 어떻게 확인하나요?",
    a: "보험증권이나 보험사 앱에서 확인할 수 있어요. 보험사 고객센터에 전화해서 갱신일과 보험료 변경 내용을 물어보는 방법도 있어요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "금융위원회: 실손의료보험 개편안", url: "https://www.fsc.go.kr/no010101/84272" },
      { label: "금융감독원: 실손보험 정보 공시", url: "https://www.fss.or.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "5세대-실손보험-4세대-차이",
    title: "5세대 실손보험과 4세대 차이점",
    description: "보장 내용이 어떻게 달라지는지 비교했어요.",
  },
  {
    slug: "5세대-실손보험-갈아타기-시기",
    title: "5세대 실손보험 갈아타기 시기",
    description: "전환 타이밍을 판단하는 기준을 정리했어요.",
  },
  {
    slug: "5세대-실손보험-보장-내용",
    title: "5세대 실손보험 보장 내용",
    description: "5세대에서 보장받을 수 있는 항목을 살펴봐요.",
  },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>보험 · 실손보험 · 5세대 갱신</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        5세대 실손보험 갱신, 어떻게 진행되나요?<br />
        자동 전환 시기와 보험료 변화
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        실손보험 갱신 안내문을 받고 어떻게 해야 할지 모르겠죠?
        결론부터 말하면 <strong>별도로 신청할 것은 없어요</strong>.
        갱신일이 오면 자동으로 5세대 약관으로 바뀌고, 건강 심사도 없어요.
        다만 비급여 보장이 줄어들기 때문에 안내문에 나온 변경 내용은 꼭 확인해야 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>5세대 자동 전환, 언제부터 진행되나요?</H2>
      <SectionBadge>전환 일정</SectionBadge>

      <p style={body}>
        <a href="https://www.fsc.go.kr/no010101/84272" style={{ color: "#1D9E75", textDecoration: "underline" }}>금융위원회</a> 발표에 따르면
        5세대 실손보험은 2026년 상반기 출시 예정이에요.
        2013년 1월 이후 판매된 후기 2세대·3세대·4세대 실손보험 약 2천만 건이
        <strong>갱신일이 도래하는 순서대로</strong> 자동으로 5세대로 전환돼요.
      </p>
      <p style={body}>
        갱신일이 2026년 8월이면 그때 5세대로 바뀌고,
        2028년 3월이면 2028년 3월에 전환되는 방식이에요.
        전환은 2036년 6월까지 10년에 걸쳐 순차적으로 진행돼요.
        1세대 및 초기 2세대(2009년 9월 이전 가입자)는 강제 전환 대상이 아니에요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>갱신일</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>전환 시기</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>비고</th>
            </tr>
          </thead>
          <tbody>
            {[
              { 갱신: "2026년 7월~12월", 시기: "갱신일에 자동 전환", 비고: "가장 빠른 전환" },
              { 갱신: "2027~2030년", 시기: "갱신일에 자동 전환", 비고: "순차 전환" },
              { 갱신: "2031~2036년", 시기: "갱신일에 자동 전환", 비고: "늦은 전환" },
              { 갱신: "1세대·초기 2세대", 시기: "강제 전환 제외", 비고: "원하면 자발적 전환 가능" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px" }}>{row.갱신}</td>
                <td style={{ padding: "5px 8px", fontWeight: 700 }}>{row.시기}</td>
                <td style={{ padding: "5px 8px", fontSize: 12, color: "#555" }}>{row.비고}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GreenBox>

      <Divider />

      <H2>갱신 절차는 어떻게 되나요?</H2>

      <p style={body}>
        갱신 절차는 보험사 안내 → 자동 전환 → 보험증권 재발급 3단계예요.
        고객이 할 일은 사실상 없어요.
        별도 건강 고지나 심사 없이 약관만 자동으로 5세대로 바뀌죠.
        갱신일 1~2개월 전에 보험사가 안내문을 보내줘요.
      </p>

      <BorderBox>
        <p style={{ margin: "0 0 6px", fontWeight: 700 }}>5세대 갱신 3단계</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}>
          <strong>① 보험사 안내</strong>: 갱신일 1~2개월 전 안내문 수령 (새 보험료·보장 내용 포함)
        </p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}>
          <strong>② 자동 전환</strong>: 갱신일에 4세대 약관 → 5세대 약관으로 자동 변경 (별도 신청 불필요)
        </p>
        <p style={{ margin: 0, lineHeight: 1.9 }}>
          <strong>③ 보험증권 재발급</strong>: 5세대 보험증권 발급 + 보험료 납입 금액 조정
        </p>
      </BorderBox>

      <Checklist items={CHECKLIST} />

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>보험료와 보장 내용은 어떻게 바뀌나요?</H2>
      <SectionBadge>보험료·보장 변화</SectionBadge>

      <p style={body}>
        기본 보험료는 기존보다 <strong>30~50% 낮아질 것</strong>으로 예상돼요.
        하지만 나이가 높아지거나 보험사의 위험률이 바뀌면 실제 납입 보험료가 조정될 수 있어요.
        기본 보험료가 줄어도 나이가 늘면서 오히려 납입액이 비슷하거나 높아지는 경우도 있죠.
      </p>
      <p style={body}>
        비급여 보장이 축소되는 게 5세대의 핵심 변화예요.
        도수치료, 비급여 주사치료, 비급여 MRI 같은 항목의 본인 부담률이 높아져요.
        치료를 많이 받는 분들은 보험료가 낮아지더라도 실제 병원비 부담이 커질 수 있어요.
        안내문에서 현재 보장 내용과 새 보장 내용을 꼼꼼히 비교해보세요.
      </p>

      <BorderBox>
        <p style={{ margin: "0 0 6px", fontWeight: 700 }}>갱신 거부 전에 꼭 알아야 할 것</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}>갱신 예정일 전일까지 보험사 고객센터에 연락하면 거부 가능해요</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}>갱신 거부 = 보험 완전 종료 (보장 공백 발생)</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}>이후 새 실손보험 가입 시 건강 심사 필요 → 건강 이상이 있으면 가입 거절 가능성</p>
        <p style={{ margin: 0, fontSize: 13, color: "#555" }}>
          ★ 4세대 유지하려면 5세대 출시 전 다른 보험사 4세대에 새로 가입 (시기 촉박하면 불가능)
        </p>
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 2월 금융위원회 발표 기준으로 작성됐어요. 5세대 실손보험 출시 일정과 세부 내용은 보험사 공시 또는 금융감독원에서 최신 정보를 살펴봐요." />
    </ArticleLayout>
  );
}
