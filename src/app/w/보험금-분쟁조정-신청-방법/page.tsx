"use client";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 보험금 청구했는데 보험회사에서 거부하거나 적게 줘서 분쟁조정을 신청하고 싶은 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 금융감독원에 분쟁조정을 신청하고 절차를 진행해서 보험금을 받는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 신청 방법(온라인·전화·방문), 필요 서류, 절차(30일 합의 → 60일 조정안), 조정안 수락 시 법적 효력, 비용 무료.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → Steps(신청 절차) + GreenBox(핵심 정리) + BorderBox(소송과 비교) + Checklist(준비 서류) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Checklist, Divider, body,
  Steps, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "분쟁조정 비용이 드나요?",
    a: "무료예요. 금융감독원에 신청하면 별도 비용 없이 진행할 수 있어요.",
  },
  {
    q: "신청은 어디서 하나요?",
    a: "금융감독원 홈페이지(fss.or.kr), 전화(1332), 우편, 방문 모두 가능해요.",
  },
  {
    q: "결과는 언제 나오나요?",
    a: "신청 후 30일 내 합의 시도 → 불성립 시 위원회 회부 → 60일 내 조정안 작성이에요. 보통 2~3개월 걸려요.",
  },
  {
    q: "조정안을 거부할 수 있나요?",
    a: "네. 조정안이 마음에 안 들면 20일 이내에 거부할 수 있어요. 거부하면 소송으로 가야 해요.",
  },
  {
    q: "조정안 수락하면 나중에 뒤집을 수 있나요?",
    a: "안 돼요. 양쪽이 수락하면 재판상 화해와 동일한 법적 효력이 생겨요. 신중하게 결정하세요.",
  },
  {
    q: "보험금이 적어도 신청 가능한가요?",
    a: "금액 제한 없어요. 100만 원이든 1억 원이든 신청 가능해요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "금융감독원 금융분쟁조정", url: "https://www.fss.or.kr" },
      { label: "찾기쉬운 생활법령정보 — 금융분쟁조정", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=526&ccfNo=6&cciNo=1&cnpClsNo=1" },
      { label: "금융분쟁조정위원회 안내", url: "https://www.easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=1771&ccfNo=4&cciNo=1&cnpClsNo=1" },
    ],
  },
];

const RELATED = [
  { slug: "보험-가입-전-확인사항", title: "보험 가입 전 체크리스트", description: "처음부터 제대로 가입하면 분쟁을 줄일 수 있어요." },
  { slug: "민사소송-vs-노동위원회-선택-기준", title: "민사소송 선택 기준", description: "분쟁조정 불성립 시 소송 절차를 확인하세요." },
  { slug: "5세대-실손보험-가입-조건", title: "5세대 실손보험 조건", description: "실손보험 관련 분쟁이 많으니 조건을 미리 확인하세요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 보험 · 분쟁조정</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        보험금 거부당했다면? 분쟁조정 신청 방법<br />
        금융감독원 절차와 준비 서류
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        보험금 청구했는데 보험회사에서 &quot;보장 대상이 아니에요&quot;라고 거절당했나요?
        소송은 시간과 돈이 너무 많이 들고요. 이럴 때 <a href="https://www.fss.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>금융감독원</a> 분쟁조정을 신청하세요.
        무료이고, 소송보다 훨씬 빠르게 해결할 수 있어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>분쟁조정이 뭐고, 소송과 뭐가 다른가요?</H2>
      <p style={body}>
        보험회사와 의견이 안 맞을 때, 금융감독원이 중간에서 합리적 해결책을 제시하는 제도예요.
        양쪽이 수락하면 재판과 동일한 법적 효력이 생겨요.
      </p>

      <SectionBadge>소송 vs 분쟁조정</SectionBadge>
      <BorderBox title="분쟁조정 vs 소송 비교">
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ background: "#f0faf6" }}>
                <th style={{ padding: "8px 10px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>구분</th>
                <th style={{ padding: "8px 10px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>분쟁조정</th>
                <th style={{ padding: "8px 10px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>민사소송</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["비용", "무료", "인지대 + 변호사비"],
                ["기간", "2~3개월", "1년 이상"],
                ["변호사", "불필요", "복잡하면 필요"],
                ["결과 효력", "수락 시 재판상 화해 효력", "판결 효력"],
                ["거부 가능", "양쪽 모두 거부 가능", "항소로 불복"],
              ].map(([label, a, b], i) => (
                <tr key={i} style={{ borderBottom: "1px solid #e5e5e5" }}>
                  <td style={{ padding: "8px 10px", fontWeight: 600, fontSize: 13 }}>{label}</td>
                  <td style={{ padding: "8px 10px", fontSize: 13 }}>{a}</td>
                  <td style={{ padding: "8px 10px", fontSize: 13 }}>{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </BorderBox>

      <Divider />

      <H2>분쟁조정 신청 절차는 어떻게 되나요?</H2>
      <p style={body}>
        보험회사에 먼저 이의를 제기하고, 그래도 안 되면 금융감독원에 신청하세요.
      </p>

      <Steps steps={[
        { title: "보험회사에 재검토 요청", desc: "고객센터나 민원팀에 보험금 재검토를 요청하세요. 거절 사유를 서면으로 받아두세요." },
        { title: "금융감독원에 분쟁조정 신청", desc: "fss.or.kr 온라인 또는 전화(1332)로 신청하세요.", tip: "방문·우편으로도 가능해요." },
        { title: "금감원 합의 권고 (30일 이내)", desc: "양쪽 의견을 듣고 합의를 시도해요. 합의되면 종료." },
        { title: "금융분쟁조정위원회 회부", desc: "30일 내 합의 안 되면 자동으로 위원회로 넘어가요. 변호사·의사·보험전문가로 구성된 위원회가 심의해요." },
        { title: "조정안 작성 (60일 이내)", desc: "위원회가 조정안을 만들어요. 20일 내에 수락·거부를 결정하세요.", tip: "수락하면 재판상 화해 효력이 생겨요. 거부하면 소송으로 가야 해요." },
      ]} />

      <Divider />

      <H2>어떤 서류를 준비해야 하나요?</H2>
      <p style={body}>
        서류가 많을수록 유리해요. 아래 항목을 최대한 챙기세요.
      </p>

      <Checklist items={[
        "보험증권 사본",
        "보험금 청구 내역서",
        "보험회사 거절 통보서 (거절 사유가 적힌 문서)",
        "진단서·입퇴원확인서·영수증 등 의료 증빙",
        "사고 경위서 (해당 시)",
        "보험회사와 주고받은 통화 녹음·메일·문자",
      ]} />

      <Divider />

      <H2>신청 전에 알아두세요</H2>

      <GreenBox title="주의사항 3가지">
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2 }}>
          <li>조정안 수락하면 나중에 뒤집을 수 없어요 — 신중하게 결정하세요</li>
          <li>조정 중에도 추가 증거 자료를 계속 제출할 수 있어요</li>
          <li>분쟁조정 신청 자체가 소멸시효를 중단시키지는 않으니, 시효가 임박하면 소송도 같이 검토하세요</li>
        </ul>
      </GreenBox>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 3월 기준으로 작성됐어요. 구체적인 사안은 금융감독원(1332) 상담을 권장해요." />
    </ArticleLayout>
  );
}
