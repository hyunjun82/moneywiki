// Q1. 미성년자가 이혼 후 재혼할 수 있는지, 법적 지위가 어떻게 되는지 궁금한 상황
// Q2. 성년의제 효과가 유지되므로 부모 동의 없이 재혼 가능하다는 걸 확인
// Q3. 민법 826조의2 성년의제, 807조 혼인적령(18세), 808조 부모동의, 이혼 후 지위 유지
// Q4. GreenBox(결론) + BorderBox(법적 근거 정리) + Steps(재혼 절차) + FAQ

"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

export const dynamic = "force-static";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

// ─── 데이터 ──────────────────────────────────────────

const STEPS_DATA = [
  {
    title: "이혼 확정 확인",
    desc: "협의이혼이면 이혼 신고 수리 시점, 재판이혼이면 판결 확정일이에요. 이혼이 완전히 끝나야 재혼할 수 있어요. 진행 중이면 중혼이 돼요.",
  },
  {
    title: "혼인신고서 작성",
    desc: "당사자 쌍방과 성년자 증인 2명이 필요해요. 성년의제를 받은 미성년자는 당사자로서 별도 부모 동의 없이 서명할 수 있어요.",
  },
  {
    title: "시·구청 가족관계등록과에 제출",
    desc: "주소지 관할 시·구청에 직접 방문하거나 대법원 전자가족관계등록시스템에서 온라인으로 신고할 수 있어요.",
    link: { label: "전자가족관계등록시스템", href: "https://efamily.scourt.go.kr" },
  },
];

const FAQS = [
  { q: "이혼하면 미성년자로 돌아가나요?", a: "아니에요. 민법 제826조의2에 따라 한 번 혼인으로 얻은 성년의제 효력은 이혼 후에도 유지돼요. 다시 미성년자로 돌아가지 않아요." },
  { q: "재혼 대기 기간이 있나요?", a: "없어요. 과거 여성 6개월 재혼 금지 기간은 폐지됐어요. 이혼 확정 즉시 재혼 가능해요." },
  { q: "상대방이 미성년자면 어떻게 되나요?", a: "상대방이 처음 결혼하는 미성년자라면 상대방만 부모 동의를 받으면 돼요. 본인은 성년의제로 동의가 필요 없어요." },
  { q: "성년의제로 술이나 담배도 가능한가요?", a: "아니에요. 민법상 행위능력만 인정될 뿐, 청소년보호법이나 공직선거법 등에서는 여전히 미성년자로 취급돼요." },
  { q: "18세 미만은 결혼할 수 없나요?", a: "네, 민법 제807조에 따라 18세 이상이어야 혼인할 수 있어요. 부모 동의가 있어도 18세 미만은 불가능해요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "민법 제826조의2 (성년의제)", url: "https://www.law.go.kr/법령/민법/제826조의2" },
      { label: "민법 제807조 (혼인적령)", url: "https://www.law.go.kr/법령/민법/제807조" },
      { label: "찾기쉬운 생활법령 - 결혼 성립요건", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1894&ccfNo=1&cciNo=1&cnpClsNo=1" },
    ],
  },
];

const RELATED = [
  { slug: "협의이혼-절차-방법", title: "협의이혼 절차 방법", description: "협의이혼 절차와 기간을 정리했어요." },
  { slug: "이혼-무료-법률상담-소송구조", title: "이혼 무료 법률상담", description: "비용 부담 없이 법률 상담받는 방법이에요." },
  { slug: "이혼-시부모-고부갈등-사유", title: "고부갈등으로 이혼 가능한가?", description: "시부모 갈등이 이혼 사유가 되는지 확인하세요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>가정법률 · 혼인 · 이혼</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        미성년자 이혼 후 재혼, 가능할까?<br />
        성년의제와 법적 지위 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        19세 미만인데 결혼했다가 이혼했어요. 다시 결혼할 수 있을까요? 결론부터 말하면 <strong>가능해요.</strong>{" "}
        <a href="https://www.law.go.kr/법령/민법/제826조의2" style={{ color: "#1D9E75", textDecoration: "underline" }}>민법 제826조의2</a>에 따라{" "}
        한 번 결혼하면 법적으로 성년자가 되고, 이혼해도 그 지위가 유지되거든요. 부모 동의도 필요 없어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>이혼해도 성년자 지위가 유지돼요</H2>
      <p style={body}>
        미성년자가 결혼하면 민법상 성년의제가 적용돼요. 쉽게 말하면 법적으로 어른이 되는 거예요.
        핵심은 <strong>이혼해도 이 지위가 사라지지 않는다</strong>는 점이에요. 한 번 성년자로 인정받으면 다시 미성년자로 돌아가지 않아요.
      </p>

      <GreenBox title="핵심 정리">
        혼인 전: 미성년자 (부모 동의 필요)<br />
        혼인 후: 성년자 (완전한 행위능력)<br />
        이혼 후: 성년자 유지 (부모 동의 없이 재혼 가능)
      </GreenBox>

      <p style={body}>
        다만 민법상 행위능력만 인정되는 거예요. 청소년보호법이나 공직선거법에서는 여전히 실제 나이 기준으로 미성년자 취급을 받아요.
        음주, 투표 같은 건 실제 나이가 19세 이상이 돼야 가능해요.
      </p>

      <Divider />

      <H2>재혼에 필요한 조건은?</H2>
      <p style={body}>
        이혼이 완전히 확정되면 바로 재혼할 수 있어요. 과거 여성에게 있던 6개월 재혼 금지 기간은 폐지됐고, 대기 기간 없이 즉시 혼인신고가 돼요.
      </p>

      <BorderBox>
        <strong>재혼 조건 요약</strong><br />
        - 이혼 확정 완료 (협의이혼 신고 수리 또는 재판 판결 확정)<br />
        - 중혼 상태 아닐 것 (이전 혼인관계 완전 종료)<br />
        - 18세 이상일 것 (민법 제807조 혼인적령)<br />
        - 부모 동의: 성년의제로 <strong>불필요</strong>
      </BorderBox>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>재혼 절차는 어떻게 되나요?</H2>
      <p style={body}>
        일반적인 혼인신고와 동일해요. 이혼 경력이 있다고 추가 서류가 필요하지도 않아요.
      </p>

      <Steps steps={STEPS_DATA} />

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 민법상 미성년자 이혼 후 재혼 관련 안내예요. 법령 개정에 따라 기준이 변경될 수 있으니 법제처 또는 법률구조공단에서 최신 정보를 확인하세요." />
    </ArticleLayout>
  );
}
