"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 국민연금을 일찍 받으면 얼마나 깎이는지, 내 상황에서 조기수령이 유리한지 궁금한 상황이에요.
// Q2. 감액률과 손익분기점을 비교해서 조기수령 여부를 결정하는 행동.
// Q3. 연 6% 감액률, 5년 최대 30% 감액, 손익분기점 11~12년, 소득 기준 지급정지 조건.
// Q4. GreenBox(감액률 요약) + BorderBox(손익분기점) + EligibilityChecker(신청 조건) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const ELIG_ITEMS = [
  { id: "age", label: "만 60세 미만이에요 (출생연도별 수령 나이 5년 전부터 가능)" },
  { id: "period", label: "국민연금 가입 기간이 10년 이상이에요" },
  { id: "income", label: "소득이 A값(2026년 약 309만원) 이하예요" },
  { id: "request", label: "본인이 직접 조기수령을 청구해요" },
];

const FAQS = [
  { q: "조기수령 시작하면 나중에 정상 수령으로 바꿀 수 있나요?", a: "한 번 조기수령을 시작하면 평생 감액된 금액으로 받아요. 정상 수령으로 되돌릴 수 없으니 신중하게 결정해야 해요." },
  { q: "조기수령 중 취업해서 소득이 생기면 어떻게 되나요?", a: "월소득이 A값(약 309만원)을 넘으면 연금 지급이 정지돼요. 정상 수령 나이가 되면 소득에 따라 감액 지급으로 바뀌고요." },
  { q: "배우자 연금도 조기수령할 수 있나요?", a: "본인 연금만 조기수령 가능해요. 유족연금이나 장애연금은 조기수령 대상이 아니에요." },
  { q: "감액률 6%는 매년 복리로 적용되나요?", a: "단리예요. 1년 일찍 받으면 6%, 2년이면 12%, 5년이면 30%. 단순하게 곱하는 구조예요." },
  { q: "조기수령 신청은 어디서 하나요?", a: "국민연금공단 지사를 방문하거나, 국민연금 홈페이지(nps.or.kr)에서 온라인으로 신청할 수 있어요. 신분증과 통장 사본이 필요해요." },
  { q: "건강이 안 좋으면 조기수령이 유리한가요?", a: "손익분기점이 11~12년이에요. 70세 이전에 건강이 나빠질 걱정이 크다면 일찍 받는 게 유리할 수 있어요. 개인 건강 상태에 따라 판단하세요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "국민연금공단", url: "https://www.nps.or.kr" },
    { label: "국민연금법(법제처)", url: "https://www.law.go.kr/법령/국민연금법" },
  ]},
];

const RELATED = [
  { slug: "2026년-국민연금", title: "2026년 국민연금 개정 보험료율", description: "2026년 보험료율 9.5%로 인상, 소득대체율 변경 내용이에요." },
  { slug: "노령연금-소득-감액", title: "노령연금 소득에 따른 감액", description: "소득이 있으면 연금이 깎이는 구조, 기준 금액을 정리했어요." },
  { slug: "국민연금-조기수령-감액률-신청조건-손익분기점", title: "국민연금 조기수령 상세 가이드", description: "신청 조건부터 손익분기점까지 더 자세히 다뤘어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>복지 · 연금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        국민연금 조기수령하면 얼마나 깎일까?<br />
        감액률과 손익분기점 계산
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "5년 빨리 받으면 30% 깎인다"는 말, 들어보셨죠? 맞는 말이에요. 국민연금 조기수령은 1년당 6%씩 감액되고, 한 번 시작하면 평생 그 금액이에요.
        그래서 손익분기점을 따져보는 게 중요해요. 대략 11~12년이 갈림길이에요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>감액률은 1년당 6%, 최대 30%예요</H2>
      <p style={body}>
        조기수령은 정상 수령 나이보다 최대 5년까지 당겨 받을 수 있어요. 1년 일찍 받을 때마다 6%씩 깎여요. 복리가 아니라 단리라서 단순 곱셈이에요.
      </p>

      <SectionBadge>조기수령 감액률 표</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>조기수령 시기</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>감액률</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>월 100만원 기준</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["1년 일찍", "6%", "94만원"],
              ["2년 일찍", "12%", "88만원"],
              ["3년 일찍", "18%", "82만원"],
              ["4년 일찍", "24%", "76만원"],
              ["5년 일찍", "30%", "70만원"],
            ].map(([time, rate, amount], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{time}</td>
                <td style={{ padding: "9px 12px" }}>{rate}</td>
                <td style={{ padding: "9px 12px" }}>{amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox title="핵심 포인트">
        5년 일찍 받으면 월 100만원이 70만원으로 줄어요.<br />
        이 금액은 평생 고정이에요. 나중에 정상 수령으로 돌아갈 수 없어요.
      </GreenBox>

      <Divider />

      <H2>손익분기점은 약 11~12년이에요</H2>
      <p style={body}>
        "일찍 받아서 쌓인 금액"이 "나중에 받아서 쌓인 금액"을 언제 따라잡느냐가 손익분기점이에요.
        5년 일찍 받는 경우, 대략 수령 시작 후 11~12년 지점에서 역전이 돼요.
      </p>

      <BorderBox>
        <strong>예시: 월 100만원 기준</strong><br /><br />
        · 조기수령(5년 빨리): 60세부터 월 70만원 → 71세까지 총 9,240만원<br />
        · 정상수령: 65세부터 월 100만원 → 71세까지 총 7,200만원<br />
        · <strong>76~77세 즈음에 정상수령 총액이 역전</strong>해요
      </BorderBox>

      <p style={body}>
        건강하게 오래 살 자신이 있다면 정상 수령이 유리하고, 70대 초반 이전에 건강 위험이 크다고 느낀다면 조기수령이 나을 수 있어요.
        답은 건강 상태와 경제 사정에 따라 달라져요.
      </p>

      <Divider />

      <H2>조기수령 신청 조건 4가지</H2>
      <p style={body}>
        아무나 조기수령할 수 있는 건 아니에요. <a href="https://www.law.go.kr/법령/국민연금법" style={{ color: "#1D9E75", textDecoration: "underline" }}>국민연금법</a>에서
        정한 4가지 조건을 모두 충족해야 해요.
      </p>

      <EligibilityChecker
        items={ELIG_ITEMS}
        allMatchText="조기수령 신청이 가능해요"
        partialMatchText="일부 조건이 충족되지 않아요"
      />

      <p style={body}>
        소득 조건이 까다로워요. 월소득이 A값(2026년 약 309만원)을 넘으면 조기수령을 시작할 수 없어요. 이미 받고 있다가 소득이 생겨도 지급이 정지되고요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 국민연금법을 기준으로 작성됐어요. 출생연도에 따라 수령 나이가 다르고, A값은 매년 변경되니 국민연금공단에서 본인 기준을 확인하세요." />
    </ArticleLayout>
  );
}
