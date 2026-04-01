"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 자발적 이직 또는 귀책 사유로 구직급여 지급 제한이 걸렸는데, 해제 방법을 알고 싶은 상황이에요.
// Q2. 1개월 후 재취업 활동 증빙을 준비해서 고용센터에 해제 신청을 할 수 있어요.
// Q3. 제한 사유(자발적 이직·귀책), 해제 조건(1개월 경과+재취업 활동 증명), 신청 방법(고용센터 방문), 소급 지급, 이의신청 90일.
// Q4. GreenBox(해제 핵심 조건) + Steps(해제 신청 절차) + Checklist(증빙 서류) + FAQ

import {
  H2, GreenBox, BorderBox, Steps, Checklist, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "구직급여 제한 걸리면 영원히 못 받나요?",
    a: "아니에요. 제한 사유 발생 후 1개월 지나서 재취업 활동을 증명하면 해제 신청할 수 있어요.",
  },
  {
    q: "해제되면 못 받았던 급여도 받을 수 있나요?",
    a: "네. 제한 기간 중 미지급된 구직급여를 소급해서 한꺼번에 받아요. 해제 결정 후 3~5영업일 내에 입금돼요.",
  },
  {
    q: "어떤 증빙 서류가 필요한가요?",
    a: "워크넷 구직 등록 증명서, 입사 지원 내역, 면접 확인서, 직업훈련 수료증 등 재취업 노력을 증명할 수 있는 모든 자료를 준비하세요.",
  },
  {
    q: "온라인으로 해제 신청할 수 있나요?",
    a: "안 돼요. 고용센터에 직접 방문해야 해요. 고용24에서 상담 예약 후 가는 게 좋아요.",
  },
  {
    q: "해제 신청이 거부되면요?",
    a: "결정 통보일로부터 90일 이내에 이의 신청할 수 있어요. 추가 증빙을 보완해서 재심사를 받을 수 있어요.",
  },
  {
    q: "2026년 구직급여 일일 하한액은 얼마예요?",
    a: "2026년 최저시급 10,320원 기준으로 일 66,048원이에요. 상한액은 일 66,000원이라 사실상 동일해요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "고용보험법 (법제처)", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용24 실업급여 안내", url: "https://www.work24.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "실업급여-수급중-취업-신고방법", title: "실업급여 취업 신고방법", description: "수급 중 취업하면 다음 날까지 신고해야 해요." },
  { slug: "청년-중소기업-소득세-감면-신청", title: "청년 소득세 감면 신청", description: "재취업 후 소득세 감면 혜택도 챙기세요." },
];

const STEPS = [
  { title: "제한 기간 경과 확인", desc: "자발적 이직은 1개월, 중대한 귀책 사유는 최대 3개월 제한 기간이 지났는지 확인해요." },
  { title: "재취업 활동 증빙 모으기", desc: "워크넷 구직 등록, 입사 지원 내역, 면접 확인서, 직업훈련 수료증 등을 준비해요.", tip: "주 1회 이상 구직 활동 기록이 있어야 유리해요" },
  { title: "고용센터 상담 예약", desc: "고용24에서 방문 상담 예약 후 가세요. 예약 없이 가면 대기 시간이 길어요." },
  { title: "해제 신청·면담", desc: "증빙 서류를 제출하고 상담원과 면담해요. 구체적인 구직 계획을 설명하세요." },
  { title: "결과 대기 (약 2주)", desc: "승인되면 문자·우편 통보 후 미지급 급여가 3~5영업일 내 계좌로 입금돼요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로·노동 · 실업급여 · 제한 해제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        구직급여 지급 제한 걸렸다면?<br />
        해제 조건과 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        구직급여 신청했는데 "지급 제한"이라고 나왔나요?
        자발적 퇴사나 귀책 사유가 있으면 바로 못 받아요.
        하지만 포기하지 마세요. 1개월 후 재취업 활동을 증명하면 제한을 풀 수 있고, 못 받았던 급여도 소급으로 받아요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      <H2>지급 제한, 왜 걸리나요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제58조</a>에서
        구직급여 지급 제한 사유를 정하고 있어요. 크게 두 가지예요.
      </p>

      <BorderBox title="지급 제한 사유">
        <strong>자발적 이직</strong>: 개인 사유로 스스로 퇴사한 경우 (단, 임금 체불 3개월 이상·괴롭힘 등 정당한 사유는 제외)<br /><br />
        <strong>중대한 귀책 사유</strong>: 횡령, 기밀 유출, 직장 내 폭력 등으로 징계·형사처벌 받은 경우
      </BorderBox>

      <Divider />

      <H2>제한 해제, 이 조건을 갖추면 돼요</H2>

      <GreenBox>
        구직급여 제한 해제 핵심 조건<br />
        · 제한 기간 경과: 자발적 이직 <strong>1개월</strong>, 귀책 사유 최대 <strong>3개월</strong><br />
        · <strong>적극적 재취업 활동</strong> 증명 (주 1회 이상)<br />
        · 고용센터 면담에서 <strong>재취업 의지</strong> 확인<br />
        · 해제 시 미지급 급여 <strong>소급 지급</strong>
      </GreenBox>

      <p style={body}>
        "아무 회사나 가겠어요"가 아니라
        "이런 분야에서 구직 중이고, 현재 이만큼 지원했어요"라는 구체적인 답변이 필요해요.
        증빙이 많을수록 승인 확률이 높아져요.
      </p>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>해제 신청, 이 순서로 진행하세요</H2>

      <Steps steps={STEPS} />

      <Divider />

      <H2>이 서류를 미리 준비하세요</H2>

      <Checklist items={[
        "워크넷 구직 등록 증명서",
        "입사 지원 내역 (이메일·채용사이트 캡처)",
        "면접 확인서 (회사 인사팀 발급)",
        "직업훈련 수료증 (참여한 경우)",
        "구직 활동 일지 (날짜별 기록)",
        "신분증",
      ]} />

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 법률 자문이 아니며, 개별 상황에 따라 다를 수 있어요. 정확한 확인은 고용센터(1350)에 문의하세요." />
    </ArticleLayout>
  );
}
