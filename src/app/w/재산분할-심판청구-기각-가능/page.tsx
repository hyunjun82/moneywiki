"use client";
// Q1. 이혼 후 재산분할 심판청구를 했는데 기각될까 걱정되거나, 이미 기각당한 상황
// Q2. 기각 사유 3가지를 파악하고, 기각 방지 또는 불복(즉시항고) 행동
// Q3. 2년 제척기간, 협력재산 부재, 초과보유 시 기각, 즉시항고 2주, 직권탐지주의
// Q4. GreenBox(기각 사유 3가지 표) + Steps(기각 방지·불복 절차) + BorderBox(제척기간 계산) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  Steps,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "기각되면 다시 청구할 수 있나요?", a: "제척기간 2년 안이면 재청구 가능해요. 다만 같은 사유로 기각됐다면 새로운 증거나 주장을 보완해야 결과가 달라져요." },
  { q: "기각 판결에 불복하려면?", a: "심판일로부터 2주 이내에 즉시항고를 할 수 있어요. 상급법원에서 다시 판단해요." },
  { q: "이혼 소송 중에 재산분할도 함께 청구할 수 있나요?", a: "네, 재판상이혼 소송에서 재산분할도 함께 청구하면 별도 심판 없이 한꺼번에 처리돼요. 이 경우 제척기간 문제가 없어요." },
  { q: "제척기간 2년은 중단이나 정지가 되나요?", a: "안 돼요. 소멸시효와 달리 제척기간은 중단·정지가 없어요. 이혼일부터 정확히 2년 지나면 소멸해요." },
  { q: "상대방이 재산을 숨기면 어떻게 하나요?", a: "법원에 재산명시신청이나 재산조회신청을 할 수 있어요. 법원이 직권으로 사실조사를 하기도 해요." },
  { q: "결혼 전 재산도 분할 대상인가요?", a: "원칙적으로 아니에요. 결혼생활 중 부부가 협력으로 이룬 재산만 분할 대상이에요. 결혼 전 재산, 상속·증여 재산은 제외돼요." },
];

const REFERENCES = [
  { category: "법령·공식 자료", items: [
    { label: "민법 제839조의2 (재산분할청구권)", url: "https://www.law.go.kr/법령/민법" },
    { label: "가사소송법", url: "https://www.law.go.kr/법령/가사소송법" },
    { label: "찾기쉬운 생활법령 - 재산분할 청구권", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=233&ccfNo=4&cciNo=2&cnpClsNo=4" },
  ]},
];

const RELATED = [
  { slug: "이혼-취소-가능-여부", title: "이혼 취소 가능 여부", description: "사기·강박으로 이혼한 경우 취소 가능 조건이에요." },
  { slug: "이혼-빚-공동-부담-여부", title: "이혼 빚 공동 부담 여부", description: "배우자 빚도 재산분할에 포함되는지 알아보세요." },
  { slug: "이혼-고려중-재산-은닉-방지", title: "재산 은닉 방지 방법", description: "이혼 전 상대방 재산 은닉을 막는 법이에요." },
];

const PREVENT_STEPS = [
  { title: "제척기간 확인", desc: "협의이혼은 이혼신고일, 재판이혼은 판결 확정일부터 2년을 계산해요. 기한이 임박하면 즉시 청구하세요.", tip: "1일이라도 늦으면 청구권 소멸" },
  { title: "협력재산 입증 준비", desc: "부부가 함께 형성한 재산을 입증할 자료를 준비해요. 가사노동, 양육, 직장생활 등 기여도 증거가 필요해요." },
  { title: "재산 목록 작성", desc: "부동산, 예금, 주식, 보험, 퇴직금 등 분할 대상 재산을 빠짐없이 목록화해요. 상대방 재산도 파악하세요." },
  { title: "변호사 상담", desc: "기각 위험이 있는 사안이면 가사전문 변호사에게 상담받아요. 기각 시 즉시항고(2주 이내)도 가능해요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>가정법률 · 이혼 · 재산분할</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        재산분할 심판청구 기각될 수 있을까?<br />
        기각 사유 3가지와 대응 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        이혼하고 재산분할 심판청구를 냈는데 기각될 수도 있어요.
        2년 안에 청구 안 하거나, 함께 이룬 재산이 없거나, 이미 많이 가져간 경우에 기각돼요.
        어떤 경우에 기각되는지 미리 파악하고 대비하세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>기각되는 3가지 사유</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/민법" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75" }}>민법 제839조의2</a>에 따르면
        재산분할청구권에는 2년의 제척기간이 있어요.
        법원은 부부의 기여도, 재산 형성 과정, 혼인 기간을 종합적으로 판단해요.
      </p>

      <GreenBox title="기각 사유 3가지">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ padding: "8px 6px", textAlign: "left" }}>사유</th>
              <th style={{ padding: "8px 6px", textAlign: "left" }}>내용</th>
              <th style={{ padding: "8px 6px", textAlign: "left" }}>비고</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              <td style={{ padding: "8px 6px", fontWeight: 600 }}>제척기간 경과</td>
              <td style={{ padding: "8px 6px" }}>이혼 후 2년 초과</td>
              <td style={{ padding: "8px 6px" }}>중단·정지 불가</td>
            </tr>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              <td style={{ padding: "8px 6px", fontWeight: 600 }}>협력재산 부재</td>
              <td style={{ padding: "8px 6px" }}>함께 이룬 재산 없음</td>
              <td style={{ padding: "8px 6px" }}>기여도 0%</td>
            </tr>
            <tr>
              <td style={{ padding: "8px 6px", fontWeight: 600 }}>초과 보유</td>
              <td style={{ padding: "8px 6px" }}>분할 몫보다 이미 많이 보유</td>
              <td style={{ padding: "8px 6px" }}>상대방 반심판 필요</td>
            </tr>
          </tbody>
        </table>
      </GreenBox>

      <Divider />

      <H2>제척기간 2년, 어떻게 계산하나요?</H2>
      <p style={body}>
        제척기간은 소멸시효와 달라요. 중단이나 정지가 없이 이혼일부터 정확히 2년이 지나면 청구권이 소멸해요.
        법관이 직권으로 확인하기 때문에 상대방이 주장하지 않아도 자동으로 기각돼요.
      </p>

      <BorderBox title="이혼 유형별 기산일">
        <p style={{ fontSize: 13, lineHeight: 1.9, margin: 0 }}>
          &bull; 협의이혼: 이혼신고서가 수리된 날 (시·구청에서 수리한 날)<br />
          &bull; 재판상이혼: 판결이 확정된 날 (항소·상고 기간 경과 후)<br /><br />
          <strong>예시:</strong> 2024년 3월 15일 협의이혼 신고 수리 → 2026년 3월 15일까지 청구해야 해요.
          3월 16일에 청구하면 1일 차이로 기각돼요.
        </p>
      </BorderBox>

      <Divider />

      <H2>기각 방지하고 불복하는 방법</H2>
      <p style={body}>
        기각 위험을 줄이려면 미리 준비해야 해요. 이미 기각됐다면 2주 이내에 즉시항고로 불복할 수 있어요.
      </p>

      <Steps steps={PREVENT_STEPS} />

      <Divider />
      <ArticleAd position="mid" />

      <RelatedArticles items={RELATED} />

      <Divider />

      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 민법·가사소송법을 바탕으로 작성했어요. 개별 사안은 가사전문 변호사에게 상담받으세요." />
    </ArticleLayout>
  );
}
