"use client";
// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     IRP에 퇴직금이나 추가 납입금을 넣어뒀는데 급하게 돈이 필요해서 55세 전에 뺄 수 있는지 찾고 있는 사람
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     내 상황이 중도인출 사유에 해당하는지 판단하고, 해당되면 금융회사에 신청한다
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     6가지 법정 중도인출 사유, 사유별 증빙서류, 중도인출 시 세금(기타소득세 16.5%), 일부 인출 가능 여부
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     EligibilityChecker로 사유 해당 여부 체크 + DocTable로 사유별 서류 + BorderBox로 세금 구조

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, DocTable, Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const ELIGIBILITY_ITEMS = [
  { id: "house", label: "무주택자이고 본인 명의로 주택을 구입하려고 해요" },
  { id: "medical", label: "본인 또는 부양가족이 6개월 이상 요양이 필요해요" },
  { id: "bankruptcy", label: "파산 선고 또는 개인회생 개시 결정을 받았어요" },
  { id: "disaster", label: "화재·홍수·태풍 등 천재지변 피해를 입었어요" },
  { id: "rent", label: "IRP 5년 이상 가입한 무주택자로 전세금을 올려야 해요" },
  { id: "etc", label: "기타 대통령령으로 정한 사유에 해당해요" },
];

const DOCS_TABLE = {
  headers: ["중도인출 사유", "필요 서류", "비고"],
  rows: [
    ["무주택 주택구입", "주택매매계약서, 무주택확인서", "전세 보증금 마련은 해당 안 됨"],
    ["6개월 이상 요양", "병원 진단서, 요양 확인서", "암·뇌졸중·희귀질환 등"],
    ["파산·개인회생", "법원 결정문", "5년 이내 결정"],
    ["천재지변", "피해 사실 확인서", "화재·홍수·태풍 등"],
    ["무주택자 전세금 (5년 이상 가입)", "전세계약서, 무주택확인서", "본인 추가 납입분만 해당"],
  ],
};

const APPLY_STEPS = [
  { title: "IRP 가입 금융회사 확인", desc: "은행, 증권사, 보험사 중 IRP를 개설한 곳을 확인해요." },
  { title: "중도인출 신청", desc: "모바일 앱, 홈페이지, 또는 영업점 방문으로 신청해요." },
  { title: "증빙서류 제출", desc: "인출 사유에 맞는 서류(매매계약서, 진단서 등)를 제출해요." },
  { title: "심사 후 입금", desc: "보통 3~5영업일 내에 지정 계좌로 입금돼요." },
];

const FAQS = [
  { q: "IRP 일부만 빼는 것도 되나요?", a: "네. 필요한 금액만 인출하고 나머지는 IRP에 그대로 두면 돼요. 세금 손해를 최소화할 수 있어요." },
  { q: "무주택자인데 전세 보증금 마련은 안 되나요?", a: "주택 '구입'은 가입 기간 관계없이 되지만, 전세금 마련은 IRP 가입 5년 이상이어야 해요. 그리고 본인 추가 납입분에서만 인출 가능하고 퇴직금 부분은 안 돼요." },
  { q: "중도인출하면 세금을 얼마나 내나요?", a: "세액공제 받은 금액과 운용 수익에 대해 기타소득세 16.5%를 내야 해요. 퇴직금 부분은 퇴직소득세율이 적용돼요." },
  { q: "중도인출 횟수에 제한이 있나요?", a: "개인형 IRP는 횟수 제한이 없어요. 사유에 해당하면 여러 번 신청할 수 있어요." },
  { q: "중도인출 말고 IRP 담보대출은 안 되나요?", a: "IRP는 담보대출이 안 돼요. 돈이 필요하면 중도인출하거나 다른 금융상품을 이용해야 해요." },
  { q: "55세 넘으면 자유롭게 빼나요?", a: "55세 이상이고 가입 5년 이상이면 연금으로 수령 가능해요. 연금 수령 시 3.3~5.5% 낮은 세율이 적용돼서 중도인출보다 훨씬 유리해요." },
];

const SOURCES = [
  { name: "근로자퇴직급여보장법 시행령 제2조", href: "https://www.law.go.kr/법령/근로자퇴직급여보장법시행령" },
  { name: "금융감독원 통합연금포털", href: "https://100lifeplan.fss.or.kr/retire/retireInfo.do" },
  { name: "국세청 퇴직연금 안내", href: "https://www.nts.go.kr" },
];

const RELATED = [
  { slug: "IRP-세액공제-한도", title: "IRP 세액공제 한도와 환급액", description: "IRP 납입 시 세액공제 구조와 최적 조합." },
  { slug: "퇴직연금-수령-일시금-연금-비교", title: "퇴직연금 일시금 vs 연금 수령 비교", description: "55세 이후 수령 방식별 세금 차이." },
  { slug: "연금저축펀드-세액공제-한도", title: "연금저축펀드 세액공제 한도", description: "연금저축과 IRP 합산 한도 전략." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · IRP · 중도인출</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        IRP 중도인출, 55세 전에 빼도 되나?<br />
        허용 사유 6가지와 세금 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        IRP에 퇴직금 넣어뒀는데 급하게 돈이 필요해졌죠. 55세까지 기다릴 수 없는 상황인데, 정말 한 푼도 못 빼는 걸까요?
      </p>
      <p style={body}>
        아니에요. <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 시행령</a>에서 정한 <strong>6가지 사유</strong>에 해당하면 55세 전에도 뺄 수 있어요. 다만 아무 때나 되는 건 아니고, 증빙서류를 내야 하고, 세금도 내야 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* H2-1: 중도인출 가능 여부 체크 */}
      <H2>내 상황이 중도인출 사유에 해당하나요?</H2>
      <p style={body}>
        아래 항목 중 하나라도 해당하면 IRP 중도인출이 가능해요. 체크해보세요.
      </p>

      <EligibilityChecker
        items={ELIGIBILITY_ITEMS}
        allMatchText="여러 사유에 해당하네요. 금융회사에 신청하면 중도인출 가능해요."
        partialMatchText="해당 사유로 중도인출 신청이 가능해요. 증빙서류를 준비하세요."
      />

      <p style={body}>
        실무적으로 가장 많이 쓰이는 사유는 <strong>무주택 주택구입</strong>과 <strong>장기요양</strong>이에요. 전세금 마련은 5년 이상 가입해야 하고, 본인 추가 납입분에서만 인출 가능하다는 제한이 있어요.
      </p>

      <CategoryButton label="세금 정보" count={12} href="/category/세금" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* H2-2: 사유별 서류 */}
      <H2>사유별로 어떤 서류가 필요한가요?</H2>
      <p style={body}>
        중도인출 사유에 따라 제출할 증빙서류가 달라요. 서류가 갖춰지지 않으면 심사에서 거절될 수 있으니 미리 준비하세요.
      </p>

      <SectionBadge>중도인출 사유별 필요 서류</SectionBadge>
      <DocTable headers={DOCS_TABLE.headers} rows={DOCS_TABLE.rows} />

      <Divider />

      {/* H2-3: 세금 */}
      <H2>중도인출하면 세금이 얼마나 나오나요?</H2>
      <p style={body}>
        IRP를 넣으면서 연말정산 때 세액공제를 받았잖아요. 중도인출하면 그 혜택을 돌려줘야 해요.
      </p>

      <BorderBox>
        <strong>중도인출 시 세금 구조</strong><br />
        세액공제 받은 금액: 기타소득세 16.5%<br />
        운용 수익: 기타소득세 16.5%<br />
        퇴직금 부분: 퇴직소득세 (원래 세율 적용)
      </BorderBox>

      <p style={body}>
        예를 들어 세액공제 받은 900만원과 운용 수익 100만원을 인출하면 1,000만원 x 16.5% = <strong>165만원</strong> 세금이에요.{" "}
        <a href="/w/IRP-세액공제-한도" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 세액공제</a>로 받은 148만원보다 더 많이 내는 셈이죠. 정말 급한 상황이 아니면 버티는 게 유리해요.
      </p>

      <GreenBox>
        핵심: 일부만 빼는 게 가능해요.{"\n"}
        급한 금액만 인출하고 나머지는 IRP에 그대로 두세요.{"\n"}
        세금 손해를 최소화하는 방법이에요.
      </GreenBox>

      <Divider />

      {/* H2-4: 신청 절차 */}
      <H2>중도인출 신청은 어떻게 하나요?</H2>
      <p style={body}>
        IRP를 개설한 금융회사에서 직접 신청해요. 은행, 증권사, 보험사 어디든 모바일 앱이나 영업점에서 처리할 수 있어요.
      </p>

      <Steps steps={APPLY_STEPS} />

      <p style={body}>
        처리 기간은 보통 3~5영업일이에요. 서류에 문제가 없으면 지정 계좌로 바로 입금돼요.{" "}
        <a href="https://100lifeplan.fss.or.kr/retire/retireInfo.do" style={{ color: "#1D9E75", textDecoration: "underline" }}>금감원 통합연금포털</a>에서 내 IRP 잔액과 가입 현황도 확인할 수 있어요.
      </p>

      <Divider />

      {/* FAQ */}
      <H2>IRP 중도인출, 이런 경우는 어떻게 되나요?</H2>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법 시행령과 금융감독원 안내를 바탕으로 작성했어요. 중도인출 세부 조건은 금융회사마다 다를 수 있으니 가입 금융사에 직접 확인해보세요." />
    </ArticleLayout>
  );
}
