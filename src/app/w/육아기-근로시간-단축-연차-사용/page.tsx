// Q1. 육아기 단축근무 쓰면 연차가 줄어드는지 걱정되는 워킹맘/워킹대디
// Q2. 법 개정으로 연차가 줄어들지 않는다는 걸 확인하고 안심하고 단축근무 사용
// Q3. 2024.10.22 이후 시작 시 출근 인정, 이전 시작은 비례 감소, 단축 중 연차 사용 방법
// Q4. GreenBox(결론) + CompareTable(개정 전후 비교) + BorderBox(연차 사용 방법) + FAQ

"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

export const dynamic = "force-static";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { CompareTable } from "@/components/article-ui/CompareTable";

// ─── 데이터 ──────────────────────────────────────────

const COMPARE_ROWS = [
  { label: "연차 산정 기준", optionA: "단축 시간도 출근 인정", optionB: "실제 근무시간만 인정" },
  { label: "5개월 단축 시 연차", optionA: "15개 (변동 없음)", optionB: "약 11.7개 (비례 감소)" },
  { label: "연차수당 계산", optionA: "전체 근무일수 기준", optionB: "근무시간 비율 환산" },
  { label: "적용 법령", optionA: "근로기준법 제60조 개정", optionB: "구 근로기준법" },
];

const FAQS = [
  { q: "육아기 단축근무 중 연차를 쓰면 몇 시간으로 차감되나요?", a: "단축된 근무시간 기준으로 차감돼요. 예를 들어 6시간 근무 중이라면 연차 1일 = 6시간이에요. 8시간 기준 연차를 6시간 근무에 맞춰 비례 사용하는 거예요." },
  { q: "2024년 10월 22일 이전에 시작한 단축근무는 어떻게 되나요?", a: "기존 방식대로 실제 근무시간 비율로 연차가 비례 감소해요. 법 개정 효과는 2024년 10월 22일 이후 새로 시작한 경우에만 적용돼요." },
  { q: "단축근무 중 퇴사하면 연차수당은 어떻게 받나요?", a: "2024년 10월 22일 이후 시작한 경우 전체 근무일수 기준으로 미사용 연차수당을 받아요. 단축근무 시간이 아닌 정상 근무일수로 계산돼요." },
  { q: "육아기 근로시간 단축 급여는 얼마나 받나요?", a: "2026년 기준 주당 최초 10시간 단축분은 통상임금의 100%(상한 250만원), 나머지 단축분은 통상임금의 80%(상한 160만원)를 받아요." },
  { q: "단축근무와 육아휴직을 번갈아 쓸 수 있나요?", a: "네, 가능해요. 육아휴직 미사용 기간을 단축근무로 전환할 수 있고, 두 제도를 합쳐 최대 3년 6개월까지 사용할 수 있어요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 육아기 근로시간 단축 안내", url: "https://m.work24.go.kr/cm/c/f/1100/selecSystInfo.do?systClId=SC00000252&systId=SI00000397" },
      { label: "근로기준법 제60조 (연차유급휴가)", url: "https://www.law.go.kr/법령/근로기준법/제60조" },
    ],
  },
];

const RELATED = [
  { slug: "육아휴직급여", title: "육아휴직급여 금액과 조건", description: "육아휴직 시 받을 수 있는 급여를 정리했어요." },
  { slug: "육아휴직-후-연차-발생-여부", title: "육아휴직 후 연차 발생 여부", description: "육아휴직 복직 후 연차가 생기는지 확인하세요." },
  { slug: "연차유급휴가", title: "연차유급휴가 계산법", description: "연차 발생 기준과 계산 방법을 안내해요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 육아 · 연차</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        육아기 단축근무 쓰면 연차 줄어들까?<br />
        2024년 법 개정 이후 달라진 점
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        육아기 근로시간 단축을 쓰고 싶은데, 연차가 깎일까 봐 망설이고 있죠. 결론부터 말하면 <strong>2024년 10월 22일 이후 시작한 단축근무는 연차가 줄어들지 않아요.</strong>{" "}
        <a href="https://www.law.go.kr/법령/근로기준법/제60조" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제60조</a> 개정으로 단축 기간도 출근한 것으로 인정받거든요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>연차가 줄어들지 않는 이유</H2>
      <p style={body}>
        2024년 10월 22일 시행된 근로기준법 개정으로, 육아기 근로시간 단축 기간이 연차 산정 시 출근한 것으로 간주돼요.
        예를 들어 1년 중 5개월 단축근무하고 7개월 정상근무해도 12개월 전부 출근한 걸로 계산해요. 연차 15개가 그대로 나와요.
      </p>

      <GreenBox title="핵심 정리">
        2024년 10월 22일 이후 육아기 단축근무 시작 → 연차 변동 없음 (15개 그대로)<br />
        2024년 10월 22일 이전 시작 → 기존 방식대로 비례 감소
      </GreenBox>

      <Divider />

      <H2>개정 전후 뭐가 달라졌나요?</H2>
      <p style={body}>
        이전에는 단축된 시간만큼만 출근으로 쳐서 연차가 비례 감소했어요. 하루 8시간에서 6시간으로 줄이면 6/8만큼만 인정됐죠.
        개정 후에는 단축한 2시간도 출근으로 인정받아요.
      </p>

      <SectionBadge>개정 전후 비교</SectionBadge>
      <CompareTable titleA="2024.10.22 이후" titleB="2024.10.22 이전" rows={COMPARE_ROWS} />

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>단축근무 중에 연차는 어떻게 쓰나요?</H2>
      <p style={body}>
        단축근무 기간에도 연차를 자유롭게 쓸 수 있어요. 다만 연차 1일의 시간이 달라져요.
        하루 6시간 근무 중이라면 연차 1일 = 6시간이에요.
      </p>

      <BorderBox>
        단축근무(6시간) 중 연차 1일 사용 = 6시간 차감<br />
        정상근무(8시간) 복귀 후 남은 연차 = 8시간 기준 사용<br />
        연차 15개를 가진 사람이 단축근무 중 1일 쓰면 → 남은 시간: 15×8 - 6 = 114시간
      </BorderBox>

      <p style={body}>
        복직 후에는 남은 연차 시간을 8시간으로 나눠서 사용하면 돼요. 단축근무 중에 많이 써도 시간 단위로 정확하게 관리되니 손해 볼 건 없어요.
      </p>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 육아기 근로시간 단축과 연차 관련 안내예요. 법령 개정에 따라 기준이 변경될 수 있으니 고용노동부 또는 고용24에서 최신 정보를 확인하세요." />
    </ArticleLayout>
  );
}
