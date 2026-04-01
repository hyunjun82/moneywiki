"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 임금체불이나 부당해고를 당했는데 노동위원회에 갈지 법원에 소송할지 뭘 선택해야 할지 모르는 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 본인 상황에 맞는 구제 경로(노동위 or 민사소송)를 선택하고 신청하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 각 절차의 비용·기간·전문성·효과, 부당해고는 3개월 내 신청, 동시 진행 가능, 노동위 무료 vs 소송 비용 발생.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → BorderBox(비교표) + GreenBox(선택 기준) + Steps(각 절차) + Checklist(판단 체크) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Checklist, Divider, body,
  Steps, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "둘 다 동시에 진행할 수 있나요?",
    a: "네. 노동위원회 구제 신청하면서 민사소송을 동시에 걸 수 있어요. 다만 법원이 노동위 결과를 기다리라고 권고할 수도 있어요.",
  },
  {
    q: "노동위원회에서 졌는데 민사소송 가능한가요?",
    a: "가능해요. 노동위 결정에 불복하면 중앙노동위 재심을 거쳐 법원 행정소송으로 갈 수 있어요. 별도 민사소송도 가능하고요.",
  },
  {
    q: "변호사 없이도 노동위원회에 갈 수 있나요?",
    a: "네. 노동위원회는 변호사 없이 본인이 직접 진행할 수 있어요. 절차도 비교적 간단하고 비용도 안 들어요.",
  },
  {
    q: "부당해고 구제 신청 기한은 얼마예요?",
    a: "부당해고일로부터 3개월 이내에 노동위원회에 신청해야 해요. 기한 넘기면 구제 못 받아요.",
  },
  {
    q: "손해배상도 받고 싶으면 어디로 가야 하나요?",
    a: "민사소송이에요. 노동위원회는 복직·임금지급 같은 구제만 가능해요. 정신적 피해·치료비 같은 배상은 법원에서만 청구할 수 있어요.",
  },
  {
    q: "임금체불도 노동위원회에서 해결 가능한가요?",
    a: "노동위원회보다는 고용노동부 진정이 먼저예요. 노동청에 임금체불 신고하면 근로감독관이 조사하고 지급명령을 내려요.",
  },
];

const REFERENCES = [
  {
    category: "법령·공식 자료",
    items: [
      { label: "근로기준법(법제처)", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "노동위원회규칙(법제처)", url: "https://www.law.go.kr/행정규칙/노동위원회규칙" },
      { label: "고용노동부 노동포털", url: "https://labor.moel.go.kr" },
      { label: "찾기쉬운 생활법령정보 — 부당해고 구제", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=514&ccfNo=5&cciNo=1&cnpClsNo=1" },
    ],
  },
];

const RELATED = [
  { slug: "부당해고-구제-절차-복직-조건", title: "부당해고 구제 절차", description: "노동위원회 구제 신청 방법과 복직 조건을 확인하세요." },
  { slug: "임금-체불-신고-지연이자-청구", title: "임금체불 신고 방법", description: "임금 못 받았을 때 노동청 신고 절차를 안내해요." },
  { slug: "미사용-연차수당-청구-계산", title: "미사용 연차수당 청구", description: "연차수당도 임금체불에 해당돼요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로·노동 · 분쟁해결 · 소송</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        민사소송 vs 노동위원회, 뭘 선택해야 하나요?<br />
        비용·기간·효과 비교
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        임금체불이나 부당해고를 당했을 때, 노동위원회에 갈지 법원에 소송할지 고민되시죠?
        두 경로 모두 근로자 권리를 지킬 수 있지만, 비용·기간·효과가 완전히 달라요.
        본인 상황에 맞는 걸 골라야 시간과 돈을 아낄 수 있어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>노동위원회와 민사소송, 뭐가 다른가요?</H2>
      <p style={body}>
        노동위원회는 <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법</a>에 따른 준사법기구예요.
        민사소송은 일반 법원에 가는 거예요. 핵심 차이를 비교해볼게요.
      </p>

      <SectionBadge>한눈에 비교</SectionBadge>
      <BorderBox title="노동위원회 vs 민사소송">
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ background: "#f0faf6" }}>
                <th style={{ padding: "8px 10px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>구분</th>
                <th style={{ padding: "8px 10px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>노동위원회</th>
                <th style={{ padding: "8px 10px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>민사소송</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["비용", "무료 (변호사 선택사항)", "인지대 + 송달료 + 변호사비"],
                ["기간", "1~2개월", "1~2년 (항소 시 더 길어짐)"],
                ["전문성", "노동 전문 (근로자·사용자·공익 대표)", "일반 민사 전체"],
                ["효과", "복직·임금 지급 명령", "복직 + 손해배상까지 가능"],
                ["변호사", "없어도 충분", "복잡하면 필요"],
                ["동시 진행", "가능", "가능"],
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

      <H2>어떤 상황에서 노동위원회가 맞나요?</H2>
      <p style={body}>
        빠르고 비용 없이 해결하고 싶다면 노동위원회예요. 부당해고 구제신청, 임금체불, 부당노동행위 같은 기본 권리 문제에 적합해요.
      </p>

      <GreenBox title="노동위원회를 선택하세요">
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2 }}>
          <li>빨리 정리하고 싶을 때 (1~2개월)</li>
          <li>비용 부담 없이 해결하고 싶을 때</li>
          <li>부당해고 구제·임금 지급만 필요할 때</li>
          <li>변호사 없이 직접 하고 싶을 때</li>
        </ul>
      </GreenBox>

      <Divider />

      <H2>민사소송이 필요한 경우는?</H2>
      <p style={body}>
        법적 쟁점이 복잡하거나 손해배상을 청구하고 싶을 때는 민사소송이 맞아요.
      </p>

      <BorderBox title="민사소송이 유리한 경우">
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2, fontSize: 14 }}>
          <li>근로계약 해석이 복잡한 경우 (프리랜서인지 근로자인지 등)</li>
          <li>정신적 피해·치료비 같은 추가 손해배상을 원할 때</li>
          <li>노동위원회 결정에 불만족할 때</li>
          <li>확실한 증거가 있고 크게 받고 싶을 때</li>
        </ul>
      </BorderBox>

      <Divider />

      <H2>실전 전략: 이렇게 진행하세요</H2>
      <p style={body}>
        대부분의 근로자에게 가장 효율적인 전략이에요.
      </p>

      <Steps steps={[
        { title: "노동위원회 먼저", desc: "비용 없고 1~2개월이면 결과 나와요. 부당해고는 해고일로부터 3개월 내 신청하세요.", tip: "임금체불은 고용노동부 진정이 우선이에요." },
        { title: "결과 확인", desc: "노동위 판정으로 문제가 해결되면 끝이에요." },
        { title: "불복 시 재심 또는 소송", desc: "결과 불만족 시 중앙노동위 재심 → 행정소송, 또는 별도 민사소송을 진행하세요.", tip: "이 단계부터는 변호사 상담을 권장해요." },
      ]} />

      <Divider />

      <H2>내 상황에 맞는 길 찾기</H2>

      <Checklist items={[
        "부당해고 당한 지 3개월 이내다 → 노동위원회 구제 신청",
        "임금·퇴직금 안 받았다 → 고용노동부 임금체불 진정 우선",
        "손해배상까지 받고 싶다 → 민사소송 검토",
        "빨리 끝내고 싶다 → 노동위원회 우선",
        "법적으로 복잡한 쟁점이다 → 변호사 상담 후 민사소송",
      ]} />

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법·노동위원회규칙을 바탕으로 작성됐어요. 구체적인 사안은 노무사 또는 변호사 상담을 권장해요." />
    </ArticleLayout>
  );
}
