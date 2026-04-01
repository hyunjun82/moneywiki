"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 외국인근로자(또는 고용주)인데 산재보험이 적용되는지, 불법체류자도 받을 수 있는지 궁금한 상황.
// Q2. 산재 발생 시 근로복지공단에 신청해서 치료비·휴업급여를 받는 행동. 사업주는 가입 의무 이행.
// Q3. 당연가입(체류자격 무관), 불법체류자 보상 가능, 사업주 전액 부담, 미가입 시 처벌, 보상 범위(요양·휴업·장해·유족), 신청 절차.
// Q4. GreenBox(핵심) + 표(보상 종류) + Steps(신청 절차) + BorderBox(미가입 시 불이익) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Steps, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "불법체류 외국인도 산재보험 받을 수 있나요?",
    a: "네, 체류자격과 관계없이 실제로 근로를 제공했다면 산재보상을 전액 받을 수 있어요. 대법원 판례로 확정된 내용이에요.",
  },
  {
    q: "사업주가 산재보험에 안 들어놨으면 어떻게 하나요?",
    a: "근로복지공단에 직접 신청하면 돼요. 공단이 먼저 보상해주고, 사업주에게 비용 + 최대 50% 징수금을 청구해요.",
  },
  {
    q: "산재보험료는 외국인근로자도 내나요?",
    a: "아니요, 사업주가 전액 부담해요. 임금에서 공제하면 불법이에요.",
  },
  {
    q: "귀국할 때 장해급여를 일시금으로 받을 수 있나요?",
    a: "네, 본국 귀국 시 연금 대신 일시금을 선택할 수 있어요.",
  },
  {
    q: "한국어가 안 되는데 신청할 수 있나요?",
    a: "근로복지공단에서 영어, 중국어, 베트남어 등 주요 언어 통역 서비스를 제공해요. 미리 요청하면 돼요.",
  },
  {
    q: "사업주가 확인서를 안 써주면 어떻게 하나요?",
    a: "신청서에 '사업주 확인 거부'로 체크하고 제출하면 돼요. 근로복지공단이 직권으로 조사해줘요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "산업재해보상보험법", url: "https://www.law.go.kr/법령/산업재해보상보험법" },
      { label: "근로복지공단 산재보험 신청", url: "https://www.comwel.or.kr" },
      { label: "고용노동부", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "산재보험-적용-대상", title: "산재보험 적용 대상 사업장", description: "어떤 사업장이 산재보험 의무 가입인지 정리했어요." },
  { slug: "산재보험-요양급여-신청", title: "산재보험 요양급여 신청", description: "산재 치료비 전액 보상받는 절차예요." },
  { slug: "외국인근로자-고용허가제", title: "외국인근로자 고용허가제", description: "E-9 비자 외국인 고용 조건과 절차예요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>노동 · 산재보험 · 외국인</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        외국인근로자 산재보험, 적용되나요?<br />
        가입 의무·보상 범위·신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        외국인근로자가 일하다 다쳤는데 산재보험이 되는지 걱정되시죠?
        국적과 체류자격에 관계없이 모든 외국인근로자는 산재보험 보호 대상이에요.
        불법체류자도 받을 수 있고, 사업주가 보험에 안 들어도 보상받을 수 있어요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      <H2>외국인근로자, 체류자격 무관 당연가입</H2>

      <GreenBox>
        <a href="https://www.law.go.kr/법령/산업재해보상보험법" style={{ color: "#fff", textDecoration: "underline" }}>산업재해보상보험법</a> 핵심이에요.<br />
        · 근로자 1명 이상 사업장 → <strong>자동 당연가입</strong><br />
        · E-9(비전문취업), E-7(특정활동), H-2(방문취업) 등 모든 비자 해당<br />
        · 파트타임·일용직도 동일 적용, 하루만 일해도 보호<br />
        · <strong>불법체류자도 보상 가능</strong> (대법원 판례 확정)
      </GreenBox>

      <p style={body}>
        적용 제외는 공무원, 선원, 대통령령으로 정한 일부 사업뿐이에요.
        일반 제조업·서비스업·건설업은 전부 적용돼요.
      </p>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>보상 범위, 내국인과 동일해요</H2>

      <SectionBadge>산재보험 급여 종류</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>급여 종류</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>내용</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>금액</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["요양급여", "치료비(병원비·약값·수술비) 전액", "전액 지급"],
              ["휴업급여", "일 못 하는 기간 임금 보전", "평균임금의 70%"],
              ["장해급여", "치료 후 장해가 남았을 때", "장해등급(1~14급)별"],
              ["유족급여", "업무상 재해로 사망 시", "평균임금 1,300일분 또는 연금"],
            ].map(([type, desc, amount], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{type}</td>
                <td style={{ padding: "9px 12px" }}>{desc}</td>
                <td style={{ padding: "9px 12px", color: "#1D9E75" }}>{amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        귀국 시 장해급여는 연금 대신 일시금으로 선택할 수 있어요.
        유족이 본국에 있어도 급여를 받을 수 있어요.
      </p>

      <Divider />

      <H2>사업주 미가입 시 처벌과 불이익</H2>

      <BorderBox>
        <strong>사업주가 산재보험에 안 들면</strong><br /><br />
        · <strong>형사처벌</strong>: 2년 이하 징역 또는 2천만원 이하 벌금<br />
        · <strong>징수금</strong>: 보상금액 + 최대 50% 추가 (치료비 1,000만원이면 1,500만원까지)<br />
        · 근로복지공단이 직권 가입 조치 후 소급 보험료 청구<br /><br />
        외국인근로자 입장에서는 사업주 미가입이라도 보상을 받을 수 있어요.
        <a href="https://www.comwel.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로복지공단</a>에
        직접 신청하면 공단이 먼저 보상하고 사업주에게 구상해요.
      </BorderBox>

      <Divider />

      <H2>산재보험 신청 절차</H2>

      <Steps steps={[
        { title: "산재 발생 → 산재 지정병원에서 치료 시작 (병원이 직접 청구하므로 본인 부담 없음)" },
        { title: "요양급여 신청서 + 의사 진단서 + 외국인등록증 사본 준비" },
        { title: "근로복지공단 지사 방문 또는 홈페이지(comwel.or.kr) 온라인 신청" },
        { title: "사업주 확인서 제출 (거부하면 '사업주 확인 거부' 체크 후 제출)" },
        { title: "평균 2~4주 내 승인 결과 통지 (급한 경우 가승인으로 선치료 가능)" },
      ]} />

      <p style={body}>
        한국어가 어려우면 근로복지공단 콜센터(1588-0075)에 통역 서비스를 요청할 수 있어요.
        영어, 중국어, 베트남어 등 주요 언어를 지원해요.
        불승인 시 90일 이내 심사청구로 재심사를 요청할 수 있어요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 산업재해보상보험법과 근로복지공단 자료를 바탕으로 작성했어요. 개별 사안의 보상 여부는 업무 관련성·재해 경위에 따라 달라지니, 근로복지공단에 직접 상담해봐요." />
    </ArticleLayout>
  );
}
