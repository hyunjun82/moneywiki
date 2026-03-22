"use client";

// Q1. 청년월세지원이 있다는 건 알겠는데, 내 나이·소득·재산으로 진짜 받을 수 있는지 조건을 정확히 알고 싶은 상황
// Q2. 자격 조건 4가지(나이·소득·재산·주거)를 하나씩 확인해서 내가 대상인지 판단한다
// Q3. 만19~34세, 중위소득60%(1인가구 124만원), 재산 1.22억, 무주택·부모독립·월세계약, 원가구 소득 100% 이하
// Q4. EligibilityChecker(자가진단) + GreenBox(조건 요약표) + BorderBox(조건별 상세) + FAQ

import Link from "next/link";
import {
  H2, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 청년월세지원_SIDEBAR, 청년월세지원_HIGHLIGHT } from "@/data/청년월세지원-guide";

const SIDEBAR_ITEMS = 청년월세지원_SIDEBAR;

const ELIGIBILITY = [
  { id: "c1", label: "만 19~34세예요 (신청일 기준)" },
  { id: "c2", label: "부모와 따로 살고 있어요 (주민등록 세대 분리 완료)" },
  { id: "c3", label: "무주택이에요 (본인 명의 주택 없음)" },
  { id: "c4", label: "월세 임대차계약을 맺고 살고 있어요" },
  { id: "c5", label: "세전 월 소득이 중위소득 60% 이하예요 (1인 약 124만원)" },
  { id: "c6", label: "총 재산이 1억 2,200만원 이하예요 (자동차 포함)" },
  { id: "c7", label: "원가구(부모) 소득이 중위소득 100% 이하예요" },
  { id: "c8", label: "공공임대 거주나 주거급여를 받고 있지 않아요" },
];

const FAQS = [
  { q: "군 복무 기간은 나이에서 빠지나요?", a: "네, 군 복무 기간은 나이 계산에서 최대 6년까지 제외돼요. 만 34세를 넘더라도 복무 기간만큼 연장해서 판단하기 때문에, 전역 후 얼마 안 된 분이라면 대상이 될 수 있어요." },
  { q: "대학생도 신청할 수 있나요?", a: "나이와 소득, 재산 조건만 충족하면 학생 여부와 관계없이 신청할 수 있어요. 다만 부모와 같이 살면 안 되고, 본인 명의 월세 계약이 있어야 해요. 기숙사에 사는 경우에는 별도 월세 계약이 아니라 대상에서 빠져요." },
  { q: "자동차를 가지고 있으면 재산에 포함되나요?", a: "네, 본인 명의 자동차는 재산에 포함돼요. 차량 시가가 높으면 1.22억 기준을 넘길 수 있어요. 부모가 사준 차라도 본인 명의면 내 재산으로 잡혀요." },
  { q: "소득이 0원이어도 신청이 되나요?", a: "소득이 없어도 신청할 수 있어요. 소득 기준은 '이하'이기 때문에 0원도 해당돼요. 다만 재산 기준은 별도로 충족해야 하고, 원가구(부모) 소득도 조건에 맞아야 해요." },
  { q: "부모와 같은 동네에 살아도 되나요?", a: "같은 동네에 사는 건 상관없어요. 중요한 건 주민등록상 세대가 분리되어 있느냐예요. 같은 아파트 단지라도 다른 호수에 살면서 세대 분리가 되어 있으면 문제없어요." },
  { q: "혼인한 경우에도 받을 수 있나요?", a: "결혼 여부는 조건에 영향이 없어요. 기혼이어도 나이, 소득, 재산 조건만 충족하면 신청할 수 있어요. 다만 혼인한 경우 배우자 소득·재산이 합산돼서 기준을 넘길 수 있으니 미리 합산해봐야 해요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "청년월세 한시 특별지원사업 안내 (국토교통부)", url: "https://www.molit.go.kr" },
    { label: "복지로 청년월세지원", url: "https://www.bokjiro.go.kr" },
    { label: "마이홈포털 자가진단", url: "https://www.myhome.go.kr" },
  ]},
];

const RELATED = [
  { slug: "청년월세지원-소득기준-중위소득60-계산", title: "소득 기준 중위소득 60% 계산법", description: "내 소득이 기준에 맞는지 직접 계산하는 방법을 정리했어요." },
  { slug: "청년월세지원-부모님-소득-합산-분리", title: "부모 소득 합산 기준", description: "원가구 소득은 어떻게 계산하고, 면제받는 경우는 뭔지 정리했어요." },
  { slug: "청년월세지원-오피스텔-고시원-반지하-가능", title: "주거 유형별 지원 가능 여부", description: "오피스텔, 고시원, 반지하도 되는지 확인해봐요." },
];

const GREEN = "#1D9E75";

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="청년월세지원 가이드" items={SIDEBAR_ITEMS} highlightSlugs={청년월세지원_HIGHLIGHT} currentSlug="청년월세지원-자격조건-나이-소득-재산" />}>
      <p style={{ fontSize: 13, color: GREEN, fontWeight: 600, marginBottom: 10 }}>
        청년 지원 · 주거 · 월세
      </p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        청년월세지원 자격 조건<br />
        나이·소득·재산 기준 한번에 확인
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        청년월세지원이 좋다는 건 알겠는데, 내가 진짜 해당되는지 헷갈리죠.
        나이는 되는 것 같은데 소득이나 재산은 어디까지 봐야 하는지, 부모 소득도 따지는지 궁금하고요.
      </p>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        자격 조건은 크게 4가지예요. 나이, 소득, 재산, 주거 형태.
        이 4가지를 하나씩 풀어서 정리해줄 테니, 아래 자가진단 체크리스트부터 해보면 돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>자격 자가진단 체크리스트</H2>
      <p style={body}>
        아래 항목을 전부 체크할 수 있으면 신청 자격이 있어요. 하나라도 안 되면 대상에서 빠져요.
      </p>

      <EligibilityChecker items={ELIGIBILITY} />

      <p style={body}>
        체크가 안 되는 항목이 있으면 해당 조건을 아래에서 자세히 확인해봐요.
        조건마다 예외가 있을 수 있어서, 하나 안 된다고 바로 포기하지 않아도 돼요.
      </p>

      <Divider />

      <H2>나이 기준: 만 19~34세</H2>
      <p style={body}>
        신청일 기준으로 만 19세 이상 34세 이하여야 해요.
        생년월일이 아니라 만 나이로 따지기 때문에, 주민등록상 태어난 해만 보고 판단하면 안 돼요.
      </p>
      <p style={body}>
        군 복무 기간이 있으면 복무 기간만큼 나이 상한이 올라가요. 최대 6년까지 인정되니까,
        의무 복무를 마친 분이라면 만 36세까지도 신청할 수 있는 거예요.
      </p>
      <p style={body}>
        예를 들어 1990년생이라도 군 복무를 2년 했다면 만 36세가 아니라 만 34세로 간주돼서 아직 대상이 될 수 있어요.
        정확한 만 나이 계산은 주민등록등본으로 확인하면 돼요.
      </p>

      <Divider />

      <H2>소득 기준: 중위소득 60% 이하</H2>
      <p style={body}>
        본인 가구의 소득인정액이 기준 중위소득 60% 이하여야 해요.
        1인 가구 기준 세전 월 소득 약 124만원이 한도예요. 아르바이트나 인턴 수준이면 대부분 충족하죠.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <tbody>
            {[
              { type: "1인 가구", val: "약 124만원" },
              { type: "2인 가구", val: "약 206만원" },
              { type: "3인 가구", val: "약 264만원" },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 600 }}>{r.type}</td>
                <td style={{ padding: "5px 8px" }}>중위소득 60%: {r.val}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#555", marginTop: 8, marginBottom: 0 }}>
          2026년 기준 / 소득인정액 = 근로소득 + 사업소득 + 재산의 소득환산액
        </p>
      </GreenBox>

      <p style={body}>
        여기에 원가구(부모) 소득도 봐요. 부모 합산 소득이 중위소득 100%를 넘으면 본인 소득이 낮아도 탈락이에요.
        부모 소득 기준이 궁금하면 <Link href="/w/청년월세지원-부모님-소득-합산-분리" style={{ color: GREEN, textDecoration: "none", fontWeight: 600 }}>부모 소득 합산 기준 페이지</Link>를 참고하면 돼요.
      </p>

      <Divider />

      <H2>재산·주거 기준</H2>
      <p style={body}>
        본인 명의 재산 합산이 1억 2,200만원 이하여야 해요. 여기에는 예적금, 부동산, 자동차 시가가 전부 포함돼요.
        부모가 사준 차도 본인 명의면 내 재산으로 잡혀요.
      </p>
      <p style={body}>
        주거 조건도 있어요. 무주택이어야 하고, 부모와 별도 거주해야 하며, 월세 임대차계약을 맺고 살아야 해요.
        전세나 보증금 전용 계약은 대상이 아니에요. 보증부 월세(보증금+월세)는 월세 부분만 지원 대상이에요.
      </p>
      <p style={body}>
        오피스텔, 고시원, 반지하도 전입신고가 가능하고 임대차계약서가 있으면 지원 대상이에요.
        주거 유형별 자세한 기준은 <Link href="/w/청년월세지원-오피스텔-고시원-반지하-가능" style={{ color: GREEN, textDecoration: "none", fontWeight: 600 }}>주거 유형별 기준 페이지</Link>에서 확인할 수 있어요.
      </p>

      <CategoryButton label="청년월세지원 가이드" count={SIDEBAR_ITEMS.length} href="/w/청년월세지원-2026-신청조건-소득기준" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 국토교통부 청년월세지원사업 안내 기준으로 작성됐어요. 소득·자산 기준은 매년 변경될 수 있으니 복지로 공고문을 확인해야 해요." />
    </ArticleLayout>
  );
}
