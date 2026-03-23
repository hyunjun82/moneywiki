"use client";

// Q1. 이혼 소송을 하려는데 어떤 증거가 필요한지, 내가 가진 게 효력이 있는지 궁금한 상황이에요.
// Q2. 사유별 필요 증거를 파악하고, 서류를 준비해서 법원에 제출하는 행동.
// Q3. 민법 840조 6가지 사유별 증거, 증거 효력 판단 기준(객관성/진정성/관련성), 전자소송 제출 절차.
// Q4. 표(사유별 증거) + Steps(제출 절차) + BorderBox(효력 기준) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";
import { Steps } from "@/components/article-ui/Steps";

const STEPS = [
  { title: "증거 수집", desc: "사유에 맞는 증거를 모아요. 문자·사진·진단서·신고기록 등 객관적 자료가 핵심이에요.", tip: "원본 보관이 중요해요. 스크린샷은 날짜가 보이게 찍으세요" },
  { title: "소장 작성", desc: "청구 취지와 원인을 구체적으로 적어요. 증거는 소장 제출 시 함께 내거나 나중에 추가할 수 있어요." },
  { title: "전자소송 제출", desc: "대한민국 법원 전자소송포털에서 증거서류를 PDF로 스캔해 첨부해요. 문서는 10MB 이하로 준비하세요." },
  { title: "변론기일 대비", desc: "법원이 추가 증거를 요구하거나 증인 신문을 진행할 수 있어요. 변론기일 전까지 추가 제출 가능해요." },
];

const FAQS = [
  { q: "카톡이나 문자도 증거로 인정되나요?", a: "네, 인정돼요. 다만 상대방이 조작을 주장하면 원본 대조나 통신사 발신 내역이 필요할 수 있어요." },
  { q: "증거가 하나도 없으면 이혼 못 하나요?", a: "직접 증거가 없어도 증인 진술이나 정황 증거로 입증할 수 있어요. 법률구조공단이나 변호사 도움을 받아보세요." },
  { q: "불법으로 수집한 증거도 인정되나요?", a: "원칙적으로 불법 촬영·도청 증거는 인정 안 될 수 있어요. 다만 대화 당사자가 직접 녹음한 건 인정되는 경우가 많아요." },
  { q: "탐정 보고서도 증거가 되나요?", a: "참고 자료로는 쓸 수 있지만 법적 효력은 제한적이에요. 독립적으로 증명력을 가지기 어렵고 보조 증거로 활용돼요." },
  { q: "증거 제출은 언제까지 할 수 있나요?", a: "소장 제출 시 함께 내거나, 변론기일 전까지 추가로 낼 수 있어요. 빨리 낼수록 재판이 원활하게 진행돼요." },
  { q: "증거 제출 비용이 드나요?", a: "전자소송 자체는 무료예요. 다만 진단서 발급비, 등기부등본 발급비 같은 서류 준비 비용은 들어요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "민법 제840조 (재판상 이혼원인)", url: "https://www.law.go.kr/법령/민법" },
    { label: "찾기쉬운 생활법령정보 - 이혼", url: "https://www.easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=233&ccfNo=3&cciNo=1&cnpClsNo=2" },
    { label: "대한민국 법원 전자소송포털", url: "https://ecfs.scourt.go.kr" },
    { label: "대한법률구조공단 무료 상담", url: "https://www.klac.or.kr" },
  ]},
];

const RELATED = [
  { slug: "이혼-무료-법률상담-소송구조", title: "이혼 무료 법률상담", description: "법률구조공단에서 무료로 이혼 상담받는 방법이에요." },
  { slug: "이혼-소송-진행중-양육비-청구", title: "이혼 소송 중 양육비 청구", description: "소송 중에도 양육비를 먼저 받을 수 있어요." },
  { slug: "이혼-재산분할-협의-불가-대응", title: "이혼 재산분할 대응", description: "협의가 안 될 때 재산분할 소송 절차예요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>가정법률 · 이혼 · 증거</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        이혼 소송, 어떤 증거가 필요할까?<br />
        사유별 증거 종류와 효력 기준
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        배우자가 바람피운 건 아는데 증거가 부족해서 고민이시죠?
        이혼 소송은 증거가 핵심이에요.
        <a href="https://www.law.go.kr/법령/민법" style={{ color: "#1D9E75", textDecoration: "underline" }}>민법 제840조</a>가
        정한 6가지 사유별로 어떤 증거가 필요하고 효력이 얼마나 되는지 정리했어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>사유별로 필요한 증거가 달라요</H2>
      <p style={body}>
        이혼 사유에 따라 준비해야 할 증거가 완전히 다르에요.
        단순히 "의심스럽다" 정도로는 법원이 인정하지 않아요. 객관적인 자료가 있어야 해요.
      </p>

      <SectionBadge>사유별 대표 증거</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>이혼 사유</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>대표 증거</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["부정행위", "문자·카톡, 사진, 호텔 영수증, CCTV"],
              ["폭행·학대", "진단서, 112 신고기록, 녹음파일"],
              ["악의적 유기", "별거 증명, 연락 두절 기록, 송금 중단 내역"],
              ["생사 불명", "실종 신고증명서, 행방불명 기간 증명"],
              ["혼인 파탄", "별거 증명, 증인 진술, 가정폭력 기록"],
            ].map(([reason, evidence], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{reason}</td>
                <td style={{ padding: "9px 12px" }}>{evidence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>증거 효력은 어떻게 판단하나요?</H2>
      <p style={body}>
        법원은 모든 증거를 동일하게 보지 않아요. 4가지 기준으로 증거의 무게를 재요.
      </p>

      <BorderBox>
        <strong>증거 효력 판단 4가지 기준</strong><br /><br />
        · <strong>객관성</strong>: 제3자도 확인 가능한 증거인가?<br />
        · <strong>진정성</strong>: 위조나 조작 가능성은 없는가?<br />
        · <strong>관련성</strong>: 이혼 사유와 직접 연결되는가?<br />
        · <strong>적법성</strong>: 불법 수집(도청·절취) 증거가 아닌가?
      </BorderBox>

      <GreenBox>
        효력이 강한 증거 순서예요.<br />
        · 1순위: 공문서 (진단서, 신고기록, 등기부등본)<br />
        · 2순위: 원본 자료 (문자 원본, 통신사 발신 내역)<br />
        · 3순위: 이해관계 없는 제3자 증언<br />
        · 4순위: 물적 증거 (호텔 영수증, CCTV 영상)
      </GreenBox>

      <Divider />

      <H2>증거는 어떻게 제출하나요?</H2>
      <p style={body}>
        <a href="https://ecfs.scourt.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>전자소송포털</a>을 통해
        온라인으로 제출할 수 있어요. 소장과 함께 내거나 나중에 추가로 낼 수도 있어요.
      </p>

      <SectionBadge>제출 절차</SectionBadge>
      <Steps steps={STEPS} />

      <p style={body}>
        증거가 부족하다고 느껴지면 <a href="https://www.klac.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>대한법률구조공단</a>에서
        무료 법률 상담을 받아보세요.
        <a href="/w/이혼-무료-법률상담-소송구조" style={{ color: "#1D9E75", textDecoration: "underline" }}> 이혼 무료 법률상담</a> 글에서
        신청 방법을 확인할 수 있어요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 민법 제840조와 법원 판례를 바탕으로 작성됐어요. 구체적인 사건은 변호사나 법률구조공단 상담을 받아보세요." />
    </ArticleLayout>
  );
}
