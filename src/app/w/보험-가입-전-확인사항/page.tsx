"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 보험에 가입하려는데 뭘 확인해야 하는지, 나중에 후회 안 하려면 어떤 점을 체크해야 하는지 궁금한 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 보장내용·보험료·해지환급금·면책기간·고지의무를 점검하고 2~3개 회사 비교 후 가입하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 보장내용(암 종류별 차이), 보험료·납입기간, 면책기간 90일, 해지환급금 거의 없음, 고지의무 위반 시 해지, 갱신형 vs 비갱신형.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → Checklist(체크리스트) + GreenBox(핵심 체크 항목) + BorderBox(갱신형 vs 비갱신형) + Steps(가입 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Checklist, Divider, body,
  Steps, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "보험 가입할 때 가장 먼저 볼 건 뭔가요?",
    a: "보장내용이에요. 내가 필요한 보장이 들어있는지, 면책사항은 뭔지를 먼저 확인하세요. 보험료는 그 다음이에요.",
  },
  {
    q: "설계사 자격은 어떻게 확인하나요?",
    a: "생명보험협회(klia.or.kr)나 손해보험협회 홈페이지에서 등록 여부를 조회할 수 있어요. 미등록 설계사한테 가입하면 안 돼요.",
  },
  {
    q: "가입 후 마음이 바뀌면 취소 가능한가요?",
    a: "청약 후 15일 이내(65세 이상은 45일)에 청약 철회가 가능해요. 납입한 보험료 전액 돌려받을 수 있어요.",
  },
  {
    q: "기존 병력 숨기고 가입하면 어떻게 되나요?",
    a: "고지의무 위반으로 보험금 지급이 거부되거나 계약이 해지될 수 있어요. 작은 병력이라도 정직하게 알려야 해요.",
  },
  {
    q: "갱신형이 나은가요 비갱신형이 나은가요?",
    a: "장기 유지할 거라면 비갱신형이 유리한 경우가 많아요. 갱신형은 처음엔 싸지만 갱신할 때마다 올라요.",
  },
  {
    q: "보험료가 수입의 몇 % 정도가 적당한가요?",
    a: "저축성 보험 제외하고 보장성 보험은 수입의 8~10%가 적절하다는 게 일반적인 기준이에요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "찾기쉬운 생활법령정보 — 보험가입 확인사항", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=2588&ccfNo=2&cciNo=1&cnpClsNo=1" },
      { label: "생명보험협회", url: "https://www.klia.or.kr" },
      { label: "금융감독원 보험다모아", url: "https://www.insure.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "보험금-분쟁조정-신청-방법", title: "보험금 분쟁조정 신청", description: "보험금 거부당했을 때 분쟁조정으로 해결하세요." },
  { slug: "5세대-실손보험-가입-조건", title: "5세대 실손보험 가입 조건", description: "실손보험 가입을 고려하고 있다면 확인하세요." },
  { slug: "보험-가입-전-확인사항", title: "보험 비교 사이트 활용법", description: "여러 회사 상품을 비교해보세요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 보험 · 가입</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        보험 가입 전에 뭘 확인해야 하나요?<br />
        후회 안 하는 체크리스트
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        보험에 가입하려는데 매달 나가는 돈도 만만치 않고, 10~30년씩 유지해야 하잖아요.
        한번 가입하면 바꾸기 어려우니 처음부터 제대로 알고 들어야 해요.
        아래 체크리스트만 확인하면 나중에 후회할 일이 줄어들어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>가입 전 필수 체크리스트</H2>
      <p style={body}>
        보험 상품 자체와 판매자(설계사) 두 가지를 모두 확인해야 해요.
        <a href="https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=2588&ccfNo=2&cciNo=1&cnpClsNo=1" style={{ color: "#1D9E75", textDecoration: "underline" }}>찾기쉬운 생활법령정보</a>에서도 확인할 수 있어요.
      </p>

      <Checklist items={[
        "보장내용: 내가 필요한 보장이 들어있는지 (암, 실손, 사망 등)",
        "면책사항: 보험금 안 나오는 경우가 뭔지 (면책기간, 면책사유)",
        "보험료: 매월 얼마인지, 수입 대비 부담 없는지",
        "납입기간: 몇 년간 내야 하는지 (10년/20년/납입완료 시점)",
        "보장기간: 80세까지인지 100세까지인지",
        "해지환급금: 중도해지 시 돌려받는 금액 확인",
        "갱신형/비갱신형: 보험료가 오르는지 고정인지",
        "고지의무: 기존 병력을 정직하게 알릴 준비",
        "설계사 등록 여부: 보험협회에 정식 등록됐는지",
        "상품설명서: 말로만 듣지 말고 서면으로 받아 읽기",
      ]} />

      <Divider />

      <H2>보장내용, 이것만은 꼭 확인하세요</H2>
      <p style={body}>
        암보험이라고 모든 암을 다 보장하는 게 아니에요. 일반암·소액암·고액암으로 나뉘고 보험금이 달라요.
        수술비는 나오는데 입원비는 빠져있는 경우도 있고요.
      </p>

      <GreenBox title="보장내용 체크 포인트">
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2 }}>
          <li>암 종류별 보험금 차이 (소액암은 10~20%만 지급되는 경우 많음)</li>
          <li>면책기간: 암보험은 가입 후 90일간 보험금 안 나옴</li>
          <li>감액지급 조건: 가입 후 1~2년 내 발생 시 50%만 지급하는 경우</li>
          <li>필요 없는 특약은 과감히 빼기 (특약 많으면 보험료만 올라감)</li>
        </ul>
      </GreenBox>

      <Divider />

      <H2>갱신형 vs 비갱신형, 뭘 골라야 하나요?</H2>
      <p style={body}>
        장기 유지할 보장성 보험이라면 비갱신형이 유리한 경우가 많아요.
      </p>

      <BorderBox title="갱신형 vs 비갱신형 비교">
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ background: "#f0faf6" }}>
                <th style={{ padding: "8px 10px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>구분</th>
                <th style={{ padding: "8px 10px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>갱신형</th>
                <th style={{ padding: "8px 10px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>비갱신형</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["초기 보험료", "저렴", "다소 비쌈"],
                ["보험료 변동", "갱신 시 인상", "고정 (안 오름)"],
                ["장기 비용", "계속 올라서 비싸질 수 있음", "처음부터 끝까지 동일"],
                ["추천 대상", "단기 보장만 필요할 때", "장기 유지할 때"],
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

      <H2>가입까지 이런 순서로 진행하세요</H2>

      <Steps steps={[
        { title: "필요한 보장 목록 작성", desc: "암, 실손, 사망, 후유장해 중 내게 필요한 보장을 정리하세요." },
        { title: "2~3개 회사 상품 비교", desc: "보험다모아(insure.or.kr) 또는 보험비교 사이트를 활용하세요.", tip: "같은 보장인데 보험료 차이가 꽤 나는 경우 많아요." },
        { title: "상품설명서·약관 읽기", desc: "설계사 말만 듣지 마세요. 서면 자료를 꼭 확인하세요." },
        { title: "고지의무 정직하게 이행", desc: "기존 병력·진료 기록을 빠짐없이 알려야 해요.", tip: "건강보험공단 앱에서 최근 5년 진료 내역을 확인할 수 있어요." },
        { title: "청약서 서명·가입", desc: "충분히 이해한 후 자필서명하세요. 15일 내 청약 철회 가능해요." },
      ]} />

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 3월 기준으로 작성됐어요. 보험 상품은 회사·약관마다 다르니 반드시 상품설명서를 확인하세요." />
    </ArticleLayout>
  );
}
