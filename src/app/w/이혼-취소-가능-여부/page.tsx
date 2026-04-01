"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 이혼했는데 속임수나 협박 때문이었고 되돌리고 싶은 상황
// Q2. 이혼 취소 가능 여부를 판단하고, 가능하면 3개월 안에 가정법원에 소송 제기
// Q3. 사기·강박만 취소 사유, 3개월 제척기간, 재판상이혼은 불가, 조정 전치주의, 증거 준비
// Q4. GreenBox(취소 가능/불가 판단표) + Steps(취소소송 절차) + Checklist(증거 준비) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  Steps, Checklist,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "단순 후회로 이혼 취소할 수 있나요?", a: "안 돼요. 감정적으로 결정했거나 성격 차이로 이혼한 건 취소 사유가 아니에요. 사기나 강박이 있었을 때만 가능해요." },
  { q: "숙려기간 중에 철회하는 것과 이혼 취소는 다른가요?", a: "완전히 달라요. 숙려기간 중에는 이혼 신고 전이라 언제든 철회 가능해요. 이혼 취소는 신고 수리 후에 사기·강박 사유로 법원에 소송하는 거예요." },
  { q: "재판상이혼 판결도 취소할 수 있나요?", a: "원칙적으로 안 돼요. 판결 확정 전에 항소·상고로 불복할 수는 있지만, 확정된 판결은 취소 대상이 아니에요." },
  { q: "이혼 취소소송은 어디에 제기하나요?", a: "가정법원에 제기해요. 소송 전에 가정법원 조정절차를 먼저 거쳐야 해요(조정 전치주의)." },
  { q: "이혼 취소되면 재산분할은 어떻게 되나요?", a: "이혼 자체가 소급해서 무효가 되므로 재산분할도 원상복구돼요. 이미 분할된 재산은 반환 절차가 필요해요." },
  { q: "변호사 없이 직접 소송할 수 있나요?", a: "가능하지만 증거 준비와 법률 논리가 중요해서 전문가 도움을 받는 게 유리해요. 법률구조공단에서 무료 상담 받을 수 있어요." },
];

const REFERENCES = [
  { category: "법령·공식 자료", items: [
    { label: "민법 (이혼취소 규정)", url: "https://www.law.go.kr/법령/민법" },
    { label: "찾기쉬운 생활법령정보 - 이혼의 취소", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=233&ccfNo=1&cciNo=4&cnpClsNo=2" },
    { label: "대한법률구조공단", url: "https://www.klac.or.kr" },
  ]},
];

const RELATED = [
  { slug: "협의이혼-절차-방법", title: "협의이혼 절차 방법", description: "협의이혼 숙려기간부터 확정까지 전 과정이에요." },
  { slug: "이혼-무료-법률상담-소송구조", title: "이혼 무료 법률상담", description: "법률구조공단에서 무료로 이혼 상담 받는 방법이에요." },
  { slug: "재산분할-심판청구-기각-가능", title: "재산분할 심판청구 기각 사유", description: "재산분할 청구가 기각되는 3가지 경우예요." },
];

const LAWSUIT_STEPS = [
  { title: "사기·강박 증거 수집", desc: "문자메시지, 녹음 파일, 카카오톡 대화, 증인 진술 등 사기나 강박을 입증할 증거를 모아요.", tip: "디지털 증거는 원본 보존이 중요해요" },
  { title: "가정법원 조정 신청", desc: "이혼취소소송 전에 가정법원에 조정을 먼저 신청해야 해요. 조정이 성립하면 소송 없이 해결돼요." },
  { title: "조정 불성립 시 소송 제기", desc: "조정이 안 되면 가정법원에 이혼취소소송을 정식으로 제기해요. 소장에 사기·강박 사실과 증거를 기재해요." },
  { title: "재판 진행 및 판결", desc: "법원이 증거를 검토하고 사기·강박 여부를 판단해요. 인용되면 이혼이 소급해서 취소돼요." },
];

const EVIDENCE_CHECKLIST = [
  "사기 내용이 담긴 문자·카톡 메시지를 캡처했나요?",
  "강박 상황의 녹음 파일이 있나요?",
  "제3자(가족·친구) 증인 확보가 가능한가요?",
  "이혼 당시 상황을 기록한 일지나 메모가 있나요?",
  "사기를 안 날 또는 강박에서 벗어난 날을 특정할 수 있나요?",
  "3개월 이내인지 확인했나요? (기한 넘으면 청구 불가)",
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>가정법률 · 이혼</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        이혼 취소 가능 여부<br />
        사기·강박 시 3개월 안에 청구하는 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        이혼했는데 상대방에게 속았거나 협박당해서 어쩔 수 없이 동의한 거라면, 되돌릴 수 있어요.
        단, 아무 이유로나 취소되는 건 아니고 사기나 강박이 있었을 때만 가능해요.
        기한도 3개월밖에 없어서 빨리 움직여야 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>이혼 취소, 언제 가능하고 언제 안 될까?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/민법" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75" }}>민법 제824조</a>에 따르면
        사기 또는 강박으로 이혼 의사표시를 한 경우에만 취소를 청구할 수 있어요.
        단순한 후회, 감정적 결정, 성격 차이 같은 건 취소 사유가 아니에요.
      </p>

      <GreenBox title="이혼 유형별 취소 가능 여부">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ padding: "8px 6px", textAlign: "left" }}>이혼 유형</th>
              <th style={{ padding: "8px 6px", textAlign: "left" }}>취소 가능?</th>
              <th style={{ padding: "8px 6px", textAlign: "left" }}>조건</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              <td style={{ padding: "8px 6px" }}>협의이혼</td>
              <td style={{ padding: "8px 6px", color: "#1D9E75", fontWeight: 600 }}>가능</td>
              <td style={{ padding: "8px 6px" }}>사기·강박 + 3개월 이내</td>
            </tr>
            <tr>
              <td style={{ padding: "8px 6px" }}>재판상이혼</td>
              <td style={{ padding: "8px 6px", color: "#dc2626", fontWeight: 600 }}>불가</td>
              <td style={{ padding: "8px 6px" }}>판결 확정 후 취소 불가</td>
            </tr>
          </tbody>
        </table>
      </GreenBox>

      <p style={body}>
        재판상이혼은 법원이 직접 판단해서 내린 판결이기 때문에 취소 대상이 아니에요.
        판결에 불복하려면 확정 전에 항소·상고를 해야 해요.
      </p>

      <Divider />

      <H2>3개월 기한, 언제부터 세나요?</H2>
      <p style={body}>
        <a href="https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=233&ccfNo=1&cciNo=4&cnpClsNo=2" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75" }}>찾기쉬운 생활법령정보</a>에 따르면
        이혼취소 청구는 사기를 안 날 또는 강박을 면한 날로부터 3개월 이내에 해야 해요.
      </p>

      <BorderBox title="기한 계산 예시">
        <p style={{ fontSize: 13, lineHeight: 1.9, margin: 0 }}>
          &bull; 사기: &quot;재산 다 주겠다&quot;고 속여서 이혼 → 속임수를 알게 된 날부터 3개월<br />
          &bull; 강박: &quot;이혼 안 하면 가만 안 둔다&quot;고 협박 → 협박에서 벗어난 날부터 3개월<br /><br />
          이 기한은 제척기간이라 중단이나 연장이 안 돼요. 하루라도 넘기면 청구 자체가 불가능해요.
        </p>
      </BorderBox>

      <Divider />

      <H2>이혼 취소소송 절차는?</H2>
      <p style={body}>
        이혼취소소송은 가정법원에 제기해요. 다만 소송 전에 조정절차를 먼저 거쳐야 하는 조정 전치주의가 적용돼요.
      </p>

      <Steps steps={LAWSUIT_STEPS} />

      <Divider />

      <H2>증거 준비 체크리스트</H2>
      <p style={body}>
        이혼취소소송에서 가장 중요한 건 사기나 강박을 입증하는 증거예요.
        증거가 부족하면 소송에서 패소할 수 있으니 미리 꼼꼼하게 준비하세요.
      </p>

      <Checklist items={EVIDENCE_CHECKLIST} />

      <Divider />
      <ArticleAd position="mid" />

      <RelatedArticles items={RELATED} />

      <Divider />

      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 민법 규정을 바탕으로 작성했어요. 개별 사안은 변호사나 법률구조공단에 상담받으세요." />
    </ArticleLayout>
  );
}
