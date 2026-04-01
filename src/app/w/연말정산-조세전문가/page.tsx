"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 연말정산이 복잡해서 세무사에게 맡기고 싶은데 비용이나 방법을 모르는 상황
// Q2. 전문가 도움이 필요한지 판단하고, 필요하면 적절한 전문가를 찾아 의뢰
// Q3. 세무사·회계사 대행 가능, 비용 10~30만원, 복잡한 소득구조일 때 필요, 경정청구 대행 가능
// Q4. GreenBox(전문가 필요 여부 판단) + BorderBox(서비스 종류·비용) + Steps(의뢰 절차) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  Steps,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "연말정산도 세무사에게 맡길 수 있나요?", a: "네, 세무사나 공인회계사에게 대행이나 자문을 받을 수 있어요. 세무사법에 따라 자격 등록된 전문가만 업무를 수행할 수 있어요." },
  { q: "비용은 얼마나 드나요?", a: "단순 근로소득만 있으면 10만원 정도, 사업소득·금융소득이 섞이면 20~30만원, 절세 컨설팅까지 포함하면 50만원 이상일 수 있어요." },
  { q: "환급액이 커야 맡기는 게 이득인가요?", a: "전문가 비용보다 추가 환급액이 크면 이득이에요. 예를 들어 비용 20만원 내고 환급이 50만원 늘면 30만원 이득이죠." },
  { q: "온라인으로도 대행 받을 수 있나요?", a: "네, 삼쩜삼 같은 온라인 세무 플랫폼이나 세무법인 홈페이지에서 비대면 대행 서비스를 이용할 수 있어요." },
  { q: "경정청구도 대행해 주나요?", a: "네, 연말정산 후 빠뜨린 공제가 있으면 세무사가 경정청구를 대신 신청해줘요. 최대 5년 전 소득까지 소급 가능해요." },
  { q: "회사 연말정산과 세무사 대행은 뭐가 다른가요?", a: "회사는 제출한 서류 기반으로 기본 계산만 해줘요. 세무사는 놓친 공제를 찾아주고, 유리한 전략을 알려줘요. 최적화 수준이 달라요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "국세청 연말정산 안내", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6591&cntntsId=7870" },
    { label: "세무사법", url: "https://www.law.go.kr/법령/세무사법" },
    { label: "한국세무사회", url: "https://www.kacpta.or.kr" },
  ]},
];

const RELATED = [
  { slug: "연말정산-환급금-지급일", title: "연말정산 환급금 지급일", description: "환급금이 언제 들어오는지 시기와 조회 방법이에요." },
  { slug: "연말정산-파트타임", title: "연말정산 파트타임", description: "파트타임 근로자도 연말정산 대상이에요." },
  { slug: "연말정산-경정청구", title: "연말정산 경정청구", description: "놓친 공제를 소급해서 환급받는 방법이에요." },
];

const CONSULT_STEPS = [
  { title: "본인 소득 구조 파악", desc: "근로소득만 있는지, 사업소득·금융소득·임대소득이 섞여 있는지 먼저 정리해요.", tip: "소득 종류가 2개 이상이면 전문가 도움이 유리해요" },
  { title: "세무사 찾기", desc: "한국세무사회(kacpta.or.kr)에서 지역·분야별 검색하거나, 삼쩜삼 같은 온라인 플랫폼을 이용해요." },
  { title: "상담 및 견적 확인", desc: "소득 자료(원천징수영수증 등)를 가지고 상담받아요. 비용, 서비스 범위, 일정을 확인하세요." },
  { title: "서류 전달 및 대행", desc: "간소화 자료, 추가 영수증 등을 전달하면 세무사가 공제 최적화와 신고를 대행해요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 연말정산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 세무사에게 맡길까?<br />
        조세전문가 비용과 의뢰 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        연말정산이 너무 복잡해서 제대로 하고 있는 건지 모르겠죠?
        소득 종류가 여러 개이거나 공제 항목이 많으면 세무사에게 맡기는 게 절세에 유리해요.
        비용은 10~30만원 정도이고, 환급액이 늘어나면 충분히 남는 장사예요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>세무사 도움이 필요한 경우는?</H2>
      <p style={body}>
        근로소득만 있고 공제 항목이 단순하면 직접 해도 충분해요.
        하지만 아래 경우에 해당하면 전문가 도움을 받는 게 유리해요.
      </p>

      <GreenBox title="전문가 필요 여부 판단">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ padding: "8px 6px", textAlign: "left" }}>상황</th>
              <th style={{ padding: "8px 6px", textAlign: "left" }}>직접</th>
              <th style={{ padding: "8px 6px", textAlign: "left" }}>전문가</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["근로소득만 있고 공제 단순", "O", "-"],
              ["근로+사업소득 복합", "-", "O"],
              ["부동산·금융 자산 보유", "-", "O"],
              ["이직·퇴사 등 소득 변동", "-", "O"],
              ["경정청구 필요 (놓친 공제)", "-", "O"],
            ].map(([label, a, b], i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                <td style={{ padding: "8px 6px" }}>{label}</td>
                <td style={{ padding: "8px 6px", textAlign: "center" }}>{a}</td>
                <td style={{ padding: "8px 6px", textAlign: "center" }}>{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GreenBox>

      <Divider />

      <H2>세무사가 해주는 서비스와 비용</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/세무사법" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75" }}>세무사법</a>에 따라
        정식 등록된 세무사·공인회계사만 세무 대행을 할 수 있어요.
        비용은 법으로 정해져 있지 않아서 세무사마다 달라요.
      </p>

      <BorderBox title="서비스 종류별 비용">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ padding: "8px 6px", textAlign: "left" }}>서비스</th>
              <th style={{ padding: "8px 6px", textAlign: "left" }}>내용</th>
              <th style={{ padding: "8px 6px", textAlign: "left" }}>비용</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["연말정산 대행", "공제 계산~회사 제출까지", "10~20만원"],
              ["절세 자문", "최적 공제 전략 제안", "10~30만원"],
              ["오류 검토", "본인 작성 내용 리뷰", "5~15만원"],
              ["경정청구 대행", "놓친 공제 소급 신청", "10~20만원"],
            ].map(([a, b, c], i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                <td style={{ padding: "8px 6px", fontWeight: 500 }}>{a}</td>
                <td style={{ padding: "8px 6px" }}>{b}</td>
                <td style={{ padding: "8px 6px" }}>{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </BorderBox>

      <Divider />

      <H2>세무사에게 의뢰하는 절차</H2>
      <p style={body}>
        한국세무사회 홈페이지에서 가까운 세무사를 검색하거나, 온라인 세무 플랫폼을 이용하면 돼요.
      </p>

      <Steps steps={CONSULT_STEPS} />

      <Divider />
      <ArticleAd position="mid" />

      <RelatedArticles items={RELATED} />

      <Divider />

      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 정보예요. 세무사 비용은 개인·사무소마다 다르니 상담 시 확인하세요." />
    </ArticleLayout>
  );
}
