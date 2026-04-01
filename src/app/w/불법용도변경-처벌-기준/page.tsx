"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 주택을 카페/사무실로 바꿔서 쓰고 있거나 바꾸려는데, 적발되면 어떤 처벌을 받는지 알고 싶은 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 처벌 수위를 파악하고, 불법 상태면 원상복구하거나 정식 용도변경 절차를 밟는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 형사처벌(도시 3년/5억, 비도시 2년/1억), 이행강제금(시가표준액 10%, 반복 부과), 가중 사유(영리 100%), 정식 절차.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → GreenBox(처벌 요약) + PenaltyTable 대용 테이블 + Steps(정식 절차) + BorderBox(적발 경로) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout,
} from "@/components/article-ui";

const LEGAL_STEPS = [
  { title: "시·군·구청 건축과 상담", desc: "용도변경이 가능한지 먼저 확인해요. 용도지역·건물 구조에 따라 변경 가능 여부가 다르거든요." },
  { title: "용도변경 허가 또는 신고", desc: "상위 용도군으로 변경하면 허가, 하위 용도군이면 신고로 처리돼요. 건축사에게 도면 작성을 맡기세요." },
  { title: "서류 제출 및 승인", desc: "건축물 도면, 용도변경 신청서 등을 제출해요. 보통 2~4주 안에 승인 여부가 나와요." },
  { title: "건축물대장 정리", desc: "승인 후 건축물대장에 변경된 용도가 기재돼요. 이게 끝나야 합법적인 영업이 가능해요." },
];

const FAQS = [
  { q: "주택을 카페로 바꿨는데 신고 안 하면 어떻게 되나요?", a: "불법용도변경으로 형사처벌과 이행강제금 모두 받을 수 있어요. 도시지역이면 3년 이하 징역이나 5억원 이하 벌금이고, 시정 안 하면 매년 이행강제금이 나와요." },
  { q: "이행강제금은 한 번만 내면 끝인가요?", a: "아니에요. 위반 사항 고칠 때까지 연 1~2회 반복 부과돼요. 방치하면 금액이 눈덩이처럼 불어나요." },
  { q: "영리 목적이면 처벌이 다른가요?", a: "네, 이행강제금이 최대 100%까지 가중돼요. 일반 위반으로 1천만원 나올 때 영리 목적이면 2천만원까지 올라갈 수 있어요." },
  { q: "이미 적발됐는데 어떻게 하나요?", a: "시정 기간 안에 원상복구하면 이행강제금은 피할 수 있어요. 복구가 어려우면 용도변경 허가를 소급 적용받을 수 있는지 건축사와 상담하세요." },
  { q: "적발은 어떻게 되나요?", a: "이웃 민원이 가장 많아요. 소음·주차 문제로 민원 들어오면 조사 나와서 적발돼요. 세무조사 중 사업자등록 용도와 건축물대장이 다르면 걸리기도 해요." },
  { q: "시정명령 받으면 바로 벌금을 내나요?", a: "시정명령이 먼저 나오고, 기한 내 시정하지 않으면 이행강제금이 부과돼요. 형사처벌은 별개로 진행될 수 있어요." },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "건축법 — 법제처", url: "https://www.law.go.kr/법령/건축법" },
      { label: "불법용도변경 처벌 안내 — 찾기쉬운 생활법령정보", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1150&ccfNo=3&cciNo=3&cnpClsNo=1" },
    ],
  },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 건축법</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        불법용도변경, 적발되면 처벌은?<br />
        벌금·이행강제금 기준과 대처 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        주택을 카페나 사무실로 쓰면서 "이 정도는 괜찮겠지" 하셨나요? 적발되면 형사처벌과 이행강제금을 동시에 받을 수 있어요.
        <a href="https://www.law.go.kr/법령/건축법" style={{ color: "#1D9E75" }}>건축법</a>에서 용도변경 위반을 엄격하게 다루고 있거든요.
      </p>

      <Divider />

      <H2>형사 처벌, 도시지역은 더 무거워요</H2>
      <p style={body}>
        불법용도변경은 형사범죄예요. 벌금만 나오는 게 아니라 징역형도 가능해요.
        도시지역이 처벌이 더 무거운 이유는 인구 밀집 지역이라 안전 문제가 더 중요하기 때문이에요.
      </p>

      <GreenBox title="처벌 기준 요약">
        <strong>도시지역</strong>: 3년 이하 징역 또는 5억원 이하 벌금 (병과 가능)<br />
        <strong>도시지역 밖</strong>: 2년 이하 징역 또는 1억원 이하 벌금<br />
        영리 목적이거나 상습적이면 실형 선고될 수도 있어요.
      </GreenBox>

      <Divider />

      <H2>이행강제금, 고칠 때까지 매년 나와요</H2>
      <p style={body}>
        형사처벌과 별개로 이행강제금도 부과돼요. 시정명령을 받았는데 정해진 기간 안에 안 고치면 나오는 거예요.
        원상복구할 때까지 계속 나오니까 방치하면 안 돼요.
      </p>

      <SectionBadge>이행강제금 부과 기준</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>항목</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>기준</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["계산 방법", "용도변경 부분의 시가표준액 x 10%"],
              ["반복 부과", "연 1~2회 (지자체 조례에 따라 다름)"],
              ["가중 사유", "영리 목적·상습 위반 시 최대 100% 가중"],
              ["감경", "자진 시정 시 최대 75% 감경 가능"],
              ["종료 시점", "원상복구 또는 합법화 완료 시"],
            ].map(([item, desc], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{item}</td>
                <td style={{ padding: "9px 12px" }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        건축물대장에도 위반 내역이 기재돼서 나중에 매매나 대출받을 때 불이익을 받아요.
        사용금지 처분을 받으면 영업 자체를 못 하게 돼요.
      </p>

      <Divider />

      <H2>정식 용도변경, 이렇게 하면 돼요</H2>
      <p style={body}>
        불법 상태를 피하려면 처음부터 정식 절차를 밟는 게 답이에요.
        이미 위반 상태라면 빨리 원상복구하거나 소급 합법화를 검토하세요.
      </p>

      <Steps steps={LEGAL_STEPS} />

      <BorderBox>
        적발이 가장 많은 경로예요.<br />
        · <strong>이웃 민원</strong>: 소음·주차 문제로 민원 → 조사 → 적발<br />
        · <strong>세무조사</strong>: 사업자등록 용도와 건축물대장이 다르면 적발<br />
        · <strong>화재·사고 조사</strong>: 사고 조사 과정에서 용도 위반 발견<br />
        · <strong>정기 단속</strong>: 지자체 정기 점검 시 적발
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 건축법 및 찾기쉬운 생활법령정보를 바탕으로 작성됐어요. 이행강제금은 지자체 조례에 따라 달라질 수 있으니 관할 구청 건축과에서 확인하세요." />
    </ArticleLayout>
  );
}
