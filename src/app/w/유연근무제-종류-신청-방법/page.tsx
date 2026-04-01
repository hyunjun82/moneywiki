"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 출퇴근 시간 조정이나 재택근무가 가능한지, 어떤 유형이 있고 어떻게 신청하는지 알고 싶은 직장인이에요.
// Q2. 본인에게 맞는 유연근무 유형을 파악하고, 회사에 신청서를 제출하는 행동.
// Q3. 5가지 유형(탄력적/선택적/재량/재택/원격) 차이, 신청 방법, 회사 거부 시 대응, 정부 장려금 존재.
// Q4. BorderBox(유형 비교표) + Steps(신청 절차) + GreenBox(장려금) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";
import { Steps } from "@/components/article-ui/Steps";

const STEPS = [
  { title: "제도 확인", desc: "취업규칙이나 인사규정에 유연근무제가 있는지 인사팀에 확인해요.", tip: "단체협약도 함께 확인하세요" },
  { title: "유형 선택", desc: "시차출퇴근, 선택근무, 재택근무 등 본인 상황에 맞는 유형을 골라요." },
  { title: "신청서 제출", desc: "인사팀에 유연근무 신청서를 내요. 원하는 유형, 기간, 사유를 구체적으로 적어요." },
  { title: "승인 및 합의", desc: "회사가 업무 특성을 고려해 승인 여부를 결정해요. 승인되면 근로계약서에 반영해요." },
];

const FAQS = [
  { q: "유연근무제를 쓰면 급여가 줄어드나요?", a: "아니요. 총 근로시간이 같으면 급여는 동일해요. 주 40시간을 어떻게 배분하느냐만 달라지는 거예요." },
  { q: "회사에서 거부하면 어떻게 하나요?", a: "유연근무제는 법적 청구권이 아니라 노사 합의 사항이에요. 다만 육아기 근로시간 단축 대상자라면 유연근무 대신 법적 권리를 행사할 수 있어요." },
  { q: "모든 업종에서 가능한가요?", a: "업종 제한은 없어요. 다만 제조업 생산직처럼 현장 근무가 필수인 경우 적용이 어려울 수 있어요." },
  { q: "유연근무제 도입하면 회사에 지원금이 나오나요?", a: "네, 중소기업은 고용노동부 유연근무제 장려금을 신청할 수 있어요. 근로자 1인당 월 최대 30만원이에요." },
  { q: "유연근무 해지는 어떻게 하나요?", a: "다시 신청서를 내면 돼요. 보통 1개월 전 통보하도록 규정하는 회사가 많아요." },
  { q: "선택근무제에서 필수 근무시간이 뭔가요?", a: "코어타임이라고도 하는데, 예를 들어 10시~3시는 반드시 근무하고 나머지 시간은 자유롭게 배분하는 방식이에요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "고용노동부 유연근무제 안내", url: "https://www.moel.go.kr" },
    { label: "근로기준법 (탄력적·선택적 근로시간제)", url: "https://www.law.go.kr/법령/근로기준법" },
    { label: "찾기쉬운 생활법령정보 - 유연근무제", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1326&ccfNo=1&cciNo=1&cnpClsNo=1" },
    { label: "정부24 유연근무제 장려금", url: "https://www.gov.kr/portal/service/serviceInfo/149200000083" },
  ]},
];

const RELATED = [
  { slug: "육아기-근로시간-단축", title: "육아기 근로시간 단축", description: "아이 돌보면서 일하고 싶다면 단축근무 제도를 활용할 수 있어요." },
  { slug: "재택근무", title: "재택근무 규정", description: "재택근무 도입 시 필요한 규정과 수당 기준이에요." },
  { slug: "근로시간", title: "근로시간 제도 가이드", description: "주 40시간, 연장근무, 야간근무 기준을 정리했어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 유연근무 · 워라밸</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        유연근무제, 어떤 종류가 있을까?<br />
        유형별 차이와 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        아이 등원 시간 때문에 출근이 빠듯하거나, 집에서 일하고 싶은데 방법을 모르겠죠?
        유연근무제를 쓰면 출퇴근 시간을 조정하거나 재택근무를 할 수 있어요.
        어떤 유형이 있고 어떻게 신청하는지 정리했어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>유연근무제 5가지 유형 비교</H2>
      <p style={body}>
        <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a>에서
        권장하는 유연근무제는 크게 5가지예요. 핵심은 총 근로시간은 유지하면서 '언제, 어디서' 일할지를 바꾸는 거예요.
      </p>

      <SectionBadge>유형별 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>유형</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>핵심</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>예시</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["시차출퇴근형", "출퇴근 시간만 조정", "7시~4시 또는 11시~8시"],
              ["선택근무형", "코어타임 외 자유 배분", "10시~3시 필수, 나머지 자율"],
              ["재량근무형", "업무 방법·시간 자율", "연구개발·기획 직군에 적합"],
              ["재택근무형", "집에서 근무", "주 1~5일 재택"],
              ["원격근무형", "카페·공유오피스 등", "장소 제한 없이 근무"],
            ].map(([type, core, ex], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600, color: "#1D9E75" }}>{type}</td>
                <td style={{ padding: "9px 12px" }}>{core}</td>
                <td style={{ padding: "9px 12px" }}>{ex}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        시차출퇴근형이 가장 도입하기 쉽고, 재량근무형은 성과 측정이 명확한 직군에 적합해요.
        재택·원격근무는 코로나 이후 도입이 크게 늘었어요.
      </p>

      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>유연근무제 신청은 어떻게 하나요?</H2>
      <p style={body}>
        먼저 회사에 제도가 있는지 확인하는 게 첫 번째예요.
        제도가 있으면 인사팀에 신청서를 내면 되고, 없으면 도입을 건의해야 해요.
      </p>

      <SectionBadge>신청 절차</SectionBadge>
      <Steps steps={STEPS} />

      <BorderBox>
        <strong>신청서에 들어갈 내용</strong><br /><br />
        · 원하는 유연근무 유형 (시차출퇴근, 재택 등)<br />
        · 적용 기간 (3개월, 6개월 등)<br />
        · 근무 시간 배분 계획 (예: 9시~6시 → 7시~4시)<br />
        · 신청 사유 (육아, 통근 거리, 건강 등)
      </BorderBox>

      <Divider />

      <H2>중소기업이라면 장려금도 받을 수 있어요</H2>
      <p style={body}>
        <a href="https://www.gov.kr/portal/service/serviceInfo/149200000083" style={{ color: "#1D9E75", textDecoration: "underline" }}>정부24</a>에서
        유연근무제 장려금을 신청할 수 있어요. 중소기업 사업주가 대상이에요.
      </p>

      <GreenBox>
        유연근무제 장려금 핵심이에요.<br />
        · 대상: 유연근무제를 도입한 <strong>중소기업</strong><br />
        · 금액: 근로자 1인당 월 최대 <strong>30만원</strong><br />
        · 신청: <a href="https://www.work24.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a> 또는 관할 고용센터<br />
        · 요건: 사업계획서 제출 → 고용센터 심사 → 승인 후 지급
      </GreenBox>

      <p style={body}>
        직원이 유연근무를 원할 때 회사 입장에서도 장려금을 받을 수 있으니 도입 부담이 줄어요.
        <a href="/w/육아기-근로시간-단축" style={{ color: "#1D9E75", textDecoration: "underline" }}>육아기 근로시간 단축</a> 대상자라면
        단축 대신 유연근무를 선택할 법적 권리가 있어요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 고용노동부 자료와 근로기준법을 바탕으로 작성됐어요. 회사별 취업규칙에 따라 세부 내용이 다를 수 있으니 인사팀에 확인하세요." />
    </ArticleLayout>
  );
}
