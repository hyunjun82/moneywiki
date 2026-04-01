"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     연금저축으로 세액공제 받으려는데 한도와 공제율, IRP 합산이 헷갈리는 직장인
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     연금저축 최적 납입액을 결정하고, 12월 전에 한도를 채운다
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     연금저축 600만원 한도, IRP 합산 900만원, 공제율 16.5%/13.2%, 중도해지 페널티 16.5%, 연금수령 세율, 12월 납입 반영
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     DocTable로 납입별 환급액 + GreenBox로 핵심 공식 + Steps로 신청 절차 + BorderBox로 중도해지 경고

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const REFUND_TABLE = {
  headers: ["납입 조합", "총급여 5,500만원 이하", "총급여 5,500만원 초과"],
  rows: [
    ["연금저축 300만원", "49만 5천원", "39만 6천원"],
    ["연금저축 600만원", "99만원", "79만 2천원"],
    ["연금저축 600 + IRP 300", "148만 5천원", "118만 8천원"],
    ["IRP만 900만원", "148만 5천원", "118만 8천원"],
  ],
};

const COMPARE_TABLE = {
  headers: ["항목", "연금저축", "IRP"],
  rows: [
    ["세액공제 단독 한도", "600만원", "900만원"],
    ["합산 한도", "900만원", "900만원"],
    ["공제율", "16.5% / 13.2%", "16.5% / 13.2%"],
    ["위험자산 투자", "제한 없음 (100%)", "70%까지"],
    ["중도 인출", "비교적 자유", "법정 사유만"],
    ["수수료", "낮음 (증권사)", "상대적 높음"],
  ],
};

const HOW_STEPS = [
  { title: "12월 31일까지 납입 완료", desc: "12월 마지막 날까지 넣으면 해당 연도 연말정산에 반영돼요. 남은 한도가 있으면 연말 전에 추가 납입하세요.", tip: "연금저축 600만원 먼저, 여유 있으면 IRP 300만원 추가" },
  { title: "홈택스 간소화서비스 확인 (1월 15일~)", desc: "금융기관이 국세청에 납입 내역을 자동 제출해요. 간소화서비스에서 '연금계좌' 항목을 확인하세요." },
  { title: "금액 일치 확인 후 PDF 제출", desc: "실제 납입액과 간소화 금액이 같은지 확인하고, PDF를 다운받아 회사에 제출하면 끝이에요." },
];

const FAQS = [
  { q: "연금저축만 600만원 넣으면 얼마 돌려받나요?", a: "총급여 5,500만원 이하면 99만원(600만원 x 16.5%), 초과면 79만 2천원(600만원 x 13.2%)이에요." },
  { q: "IRP 없이 연금저축만 해도 되나요?", a: "네. 연금저축만으로 600만원 한도까지 공제 가능해요. IRP는 추가로 300만원 더 공제받고 싶을 때 합산하는 거예요." },
  { q: "연금저축펀드와 연금저축보험 차이가 뭔가요?", a: "연금저축펀드는 ETF·주식형 투자가 가능하고 수수료가 낮아요. 연금저축보험은 안정적이지만 수익률이 낮고 중도해지 불이익이 커요." },
  { q: "중도에 빼면 어떻게 되나요?", a: "기타소득세 16.5%가 붙어요. 세액공제받은 금액을 토해내는 셈이에요. 연금으로 받으면 3.3~5.5%인데, 중도 인출은 3배 이상 세금이에요." },
  { q: "600만원 초과 납입하면 어떻게 되나요?", a: "공제는 600만원까지만 돼요. 초과 납입분은 세액공제 못 받지만, 나중에 연금으로 수령할 때 비과세라서 손해는 아니에요." },
  { q: "55세 이후 연금 수령 세율은?", a: "55~69세 5.5%, 70~79세 4.4%, 80세 이상 3.3%예요. 10년 이상 나눠 받으면 이 낮은 세율이 적용돼요." },
];

const SOURCES = [
  { name: "국세청 연금계좌 세액공제 안내", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6596&cntntsId=7875" },
  { name: "소득세법 제59조의3 (연금계좌 세액공제)", href: "https://www.law.go.kr/법령/소득세법" },
];

const RELATED = [
  { slug: "연말정산-IRP-세액공제", title: "연말정산 IRP 세액공제", description: "IRP 900만원 한도와 최대 148만원 환급." },
  { slug: "연말정산-세액공제", title: "연말정산 세액공제 항목", description: "의료비, 교육비, 기부금 등 전체 정리." },
  { slug: "연금저축펀드-세액공제-한도", title: "연금저축펀드 세액공제 한도", description: "연금저축펀드 600만원 한도와 최적 조합." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 연금저축 · 세액공제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연금저축 공제, 600만원 넣으면 99만원 환급?<br />
        한도와 IRP 합산 전략
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        연금저축에 얼마를 넣어야 하고, IRP랑 어떻게 조합하는 게 좋은지 헷갈리죠.
      </p>
      <p style={body}>
        <a href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6596&cntntsId=7875" style={{ color: "#1D9E75", textDecoration: "underline" }}>국세청 연금계좌 공제 안내</a>에 따르면 연금저축에 <strong>600만원 넣으면 최대 99만원을 돌려받아요</strong>. 연이자 16.5%짜리 적금인 셈이에요. <a href="/w/연말정산-IRP-세액공제" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP</a>까지 추가하면 900만원 한도에 148만원 환급이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>납입 금액별 환급액, 바로 확인하세요</H2>
      <p style={body}>
        연금저축은 세액공제라서 계산이 간단해요. 납입액에 공제율(16.5% 또는 13.2%)을 곱하면 환급액이에요.
      </p>

      <SectionBadge>납입 조합별 환급액 (2025년 귀속)</SectionBadge>
      <DocTable headers={REFUND_TABLE.headers} rows={REFUND_TABLE.rows} />

      <GreenBox>
        총급여 5,500만원 이하: 공제율 16.5%{"\n"}
        총급여 5,500만원 초과: 공제율 13.2%{"\n\n"}
        연금저축 600만원 + IRP 300만원 = 최대 조합
      </GreenBox>

      <CategoryButton label="연말정산 정보" count={10} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>연금저축과 IRP, 뭐가 다른가요?</H2>
      <p style={body}>
        공제율은 같아요. 차이는 투자 자유도와 인출 조건에 있어요.
      </p>

      <SectionBadge>연금저축 vs IRP 비교</SectionBadge>
      <DocTable headers={COMPARE_TABLE.headers} rows={COMPARE_TABLE.rows} />

      <p style={body}>
        연금저축이 수수료 낮고 운용이 자유로워서 먼저 600만원 채우고, 나머지 300만원은 IRP로 채우는 게 일반적인 전략이에요.
      </p>

      <Divider />

      <H2>중도 해지하면 큰 손해예요</H2>
      <p style={body}>
        연금저축을 55세 전에 해지하면 기타소득세 16.5%가 붙어요. 세액공제받은 금액을 고스란히 토해내는 셈이에요.
      </p>

      <BorderBox>
        <strong>중도 인출 시</strong>: 기타소득세 16.5%{"\n"}
        <strong>연금 수령 시</strong>: 55~69세 5.5%, 70~79세 4.4%, 80세 이상 3.3%{"\n\n"}
        중도 인출 세율이 연금 수령 세율의 3~5배예요.{"\n"}
        장기 투자 목적이 아니면 넣지 마세요.
      </BorderBox>

      <Divider />

      <H2>연말정산에서 공제받는 절차</H2>
      <p style={body}>
        따로 서류 준비할 필요 없어요. 금융기관이 국세청에 자동으로 제출하거든요.
      </p>

      <Steps steps={HOW_STEPS} />

      <Divider />

      <H2>연금저축 공제, 자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준으로 소득세법과 국세청 안내를 바탕으로 작성했어요. 공제율과 한도는 법 개정에 따라 달라질 수 있으니 최신 정보는 국세청(126)이나 홈택스에서 확인해보세요." />
    </ArticleLayout>
  );
}
