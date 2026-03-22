"use client";

// Q1. 청년월세지원을 신청했는데 탈락했거나, 탈락할까 봐 걱정되는 상황
// Q2. 탈락 사유를 파악하고, 조건을 맞춰서 재신청할 수 있는지 판단한다
// Q3. 흔한 탈락 사유 5가지(세대미분리, 부모소득초과, 재산초과, 전세계약, 공공임대), 재신청 가능 여부, 이의신청 방법
// Q4. BorderBox(탈락 사유별 상세) + Steps(재신청 절차) + GreenBox(재신청 체크) + FAQ

import Link from "next/link";
import {
  H2, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 청년월세지원_SIDEBAR, 청년월세지원_HIGHLIGHT } from "@/data/청년월세지원-guide";

const SIDEBAR_ITEMS = 청년월세지원_SIDEBAR;

const REAPPLY_STEPS = [
  { title: "탈락 사유 확인", desc: "복지로 마이페이지에서 탈락 사유를 확인해요. 사유가 명확하지 않으면 거주지 주민센터에 전화해서 구체적인 탈락 이유를 물어봐야 해요." },
  { title: "조건 보완", desc: "탈락 사유에 해당하는 조건을 보완해요. 세대 미분리라면 전입신고, 소득 초과라면 소득 변동 후 재신청, 서류 미비라면 서류를 보완해야 해요." },
  { title: "재신청", desc: "조건을 보완한 뒤 복지로에서 다시 신청하면 돼요. 상시 접수라 특정 시기를 기다릴 필요 없이 바로 신청할 수 있어요." },
];

const FAQS = [
  { q: "탈락하면 재신청 횟수 제한이 있나요?", a: "횟수 제한은 없어요. 탈락 사유를 해결한 뒤 언제든 다시 신청할 수 있어요. 상시 접수라 기다릴 필요 없이 바로 넣으면 돼요." },
  { q: "이의신청을 할 수 있나요?", a: "선정 결과에 이의가 있으면 통보받은 날로부터 90일 이내에 이의신청을 할 수 있어요. 복지로 또는 거주지 주민센터에서 접수하면 돼요. 소득·재산 산정에 오류가 있다고 생각되면 증빙 서류를 함께 제출하면 재심사를 받을 수 있어요." },
  { q: "부모 소득 때문에 탈락했는데 방법이 없나요?", a: "부모 소득이 기준을 넘으면 현재로서는 방법이 없어요. 다만 부모가 사망, 실종, 관계 단절된 경우에는 원가구 기준이 면제될 수 있어요. 해당되면 주민센터에서 상담받아보면 돼요." },
  { q: "서류 보완 기간을 놓쳤는데 어떻게 하나요?", a: "보완 기간을 놓치면 해당 건은 반려 처리돼요. 하지만 상시 접수이기 때문에 서류를 다시 갖춰서 새로 신청하면 돼요. 이전 신청과 별개의 새 건으로 접수돼요." },
  { q: "소득이 일시적으로 높았는데 탈락한 경우는요?", a: "소득은 연 환산 기준으로 보기 때문에, 한 달만 높았다고 바로 탈락하지는 않아요. 하지만 심사 시점의 기준으로 판단되니까, 소득이 안정된 시기에 다시 신청하는 게 유리해요." },
  { q: "청년월세지원 말고 다른 월세 지원은 없나요?", a: "지자체별로 별도의 청년 월세 지원사업이 있을 수 있어요. 서울시, 경기도 등 광역 지자체에서 자체 사업을 운영하는 경우가 있으니, 거주지 시·군·구청 홈페이지를 확인해보면 돼요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "복지로 청년월세지원", url: "https://www.bokjiro.go.kr" },
    { label: "청년월세 한시 특별지원사업 안내 (국토교통부)", url: "https://www.molit.go.kr" },
    { label: "마이홈포털", url: "https://www.myhome.go.kr" },
  ]},
];

const RELATED = [
  { slug: "청년월세지원-자격조건-나이-소득-재산", title: "자격 조건 상세", description: "내가 어떤 조건에서 걸렸는지 하나씩 확인해봐요." },
  { slug: "청년월세지원-부모님-소득-합산-분리", title: "부모 소득 합산 기준", description: "부모 소득 때문에 탈락한 경우 기준을 자세히 확인해봐요." },
  { slug: "청년월세지원-vs-청년주거급여-차이", title: "주거급여 차이 비교", description: "청년월세지원이 안 되면 주거급여가 가능한지 비교해봐요." },
];

const GREEN = "#1D9E75";

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="청년월세지원 가이드" items={SIDEBAR_ITEMS} highlightSlugs={청년월세지원_HIGHLIGHT} currentSlug="청년월세지원-탈락사유-재신청-방법" />}>
      <p style={{ fontSize: 13, color: GREEN, fontWeight: 600, marginBottom: 10 }}>
        청년 지원 · 주거 · 탈락·재신청
      </p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        청년월세지원 탈락했다면?<br />
        탈락 사유와 재신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        분명 될 줄 알았는데 탈락 통보를 받으면 황당하죠.
        왜 떨어졌는지 사유를 정확히 알아야 다음에 다시 넣을 수 있어요.
      </p>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        흔한 탈락 사유는 크게 5가지예요. 대부분은 조건을 보완하면 재신청이 가능하니까,
        아래에서 사유별로 확인하고 해결 방법을 찾아봐요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>흔한 탈락 사유 5가지</H2>
      <p style={body}>
        실제로 많은 분이 걸리는 사유를 순서대로 정리했어요.
      </p>

      <BorderBox>
        <strong style={{ color: GREEN }}>1. 부모와 세대 미분리</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          실제로 독립해서 살고 있어도, 주민등록상 부모와 같은 세대에 등록돼 있으면 탈락이에요.
          이사했으면 반드시 전입신고를 해야 해요. 전입신고는 주민센터에서 당일 처리 가능하고,
          전입신고 후 다시 신청하면 돼요.
        </p>
      </BorderBox>

      <BorderBox>
        <strong style={{ color: GREEN }}>2. 원가구(부모) 소득 초과</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          본인 소득이 낮아도 부모 합산 소득이 중위소득 100%를 넘으면 탈락이에요.
          부모 소득은 본인이 바꿀 수 없는 부분이라, 이 사유로 탈락하면 현실적으로 어려워요.
          다만 부모가 사망, 실종, 관계 단절된 경우에는 원가구 기준이 면제되니 해당되면 주민센터에 상담받아봐야 해요.
        </p>
      </BorderBox>

      <BorderBox>
        <strong style={{ color: GREEN }}>3. 재산 기준 초과</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          본인 명의 재산(예적금+부동산+자동차) 합산이 1.22억을 넘으면 탈락이에요.
          부모가 사준 차도 본인 명의면 내 재산으로 잡혀요.
          차량 명의를 이전하거나 예적금을 정리한 뒤 재신청할 수 있어요.
        </p>
      </BorderBox>

      <BorderBox>
        <strong style={{ color: GREEN }}>4. 월세 계약이 아닌 경우</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          전세 계약이거나 보증금 전용 계약이면 대상이 아니에요.
          임대차계약서에 &lsquo;월세&rsquo; 항목이 없으면 탈락이에요.
          보증부 월세(보증금+월세)는 월세 부분이 명시돼 있으면 돼요.
        </p>
      </BorderBox>

      <BorderBox>
        <strong style={{ color: GREEN }}>5. 공공임대 거주 또는 주거급여 수급</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          공공임대주택에 살거나 주거급여를 이미 받고 있으면 중복 수급이 안 돼서 탈락이에요.
          주거급여를 포기하고 청년월세지원으로 전환할 수 있는지는 주민센터에서 상담받아봐야 해요.
        </p>
      </BorderBox>

      <Divider />

      <H2>재신청 방법 3단계</H2>
      <p style={body}>
        탈락 사유를 해결했다면 다시 신청할 수 있어요. 상시 접수라 기다릴 필요 없어요.
      </p>

      <Steps steps={REAPPLY_STEPS} />

      <p style={body}>
        재신청은 이전 건과 별개로 처리돼요. 새로 신청서를 작성하고 서류를 다시 첨부해야 해요.
        이전에 제출한 서류는 재사용이 안 되니까 미리 준비해두면 좋아요.
      </p>

      <Divider />

      <H2>이의신청 방법</H2>
      <p style={body}>
        탈락 사유에 동의하지 않는다면 이의신청을 할 수 있어요.
        통보받은 날로부터 90일 이내에 복지로 또는 거주지 주민센터에서 접수하면 돼요.
      </p>
      <p style={body}>
        소득이나 재산 산정에 오류가 있다고 생각되면 증빙 서류를 함께 제출해요.
        예를 들어 건강보험료 정정이 반영되지 않았거나, 해지된 예적금이 재산에 잡힌 경우라면 재심사를 받을 수 있어요.
      </p>
      <p style={body}>
        이의신청이 아니라 조건 자체를 보완해서 새로 신청하는 게 더 빠른 경우도 많아요.
        어떤 방법이 유리한지는 주민센터 직원과 상담해보면 돼요.
      </p>

      <CategoryButton label="청년월세지원 가이드" count={SIDEBAR_ITEMS.length} href="/w/청년월세지원-2026-신청조건-소득기준" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 국토교통부 청년월세지원사업 안내를 기준으로 작성됐어요. 탈락 사유와 재신청 절차는 지자체별로 다를 수 있으니 주민센터에서 확인해야 해요." />
    </ArticleLayout>
  );
}
