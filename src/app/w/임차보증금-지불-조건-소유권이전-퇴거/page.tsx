"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 집이 팔려서 소유권이 넘어갔는데 보증금을 돌려받을 수 있는지 걱정하는 상황
// Q2. 새 집주인에게 보증금 반환을 요구하고, 안 주면 법적 대응 절차를 밟는다
// Q3. 대항력 요건(전입신고+확정일자), 소유권이전 시 보증금 승계 여부, 임차인 보호 규정, 퇴거 거부 권리
// Q4. GreenBox(핵심 권리) + Steps(대응 절차) + BorderBox(대항력 요건) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS_DATA = [
  { title: "대항력 확인", desc: "전입신고 + 점유(실제 거주)가 유지되고 있는지 확인해요. 대항력이 있으면 새 집주인에게도 보증금 반환을 요구할 수 있어요." },
  { title: "새 집주인에게 보증금 반환 요구", desc: "소유권이 넘어가면 보증금 반환 의무도 새 집주인에게 승계돼요. 내용증명으로 반환을 요구하세요." },
  { title: "임차권등기명령 신청", desc: "보증금을 못 받은 상태에서 이사해야 하면, 법원에 임차권등기명령을 신청해요. 이사 후에도 대항력과 우선변제권을 유지할 수 있어요." },
  { title: "보증금 반환 소송", desc: "내용증명에도 반환하지 않으면 소액사건심판(5천만원 이하)이나 민사소송으로 보증금을 돌려받을 수 있어요." },
];

const FAQS = [
  { q: "집이 팔렸는데 보증금은 누가 돌려주나요?", a: "새 집주인이에요. 주택임대차보호법 제3조에 따라 소유권이 이전되면 임대인 지위도 새 소유자에게 승계돼요. 보증금 반환 의무가 자동으로 넘어가요." },
  { q: "대항력이 없으면 어떻게 되나요?", a: "전입신고 전이거나 점유를 하지 않으면 대항력이 없어요. 이 경우 새 집주인에게 보증금 반환을 주장하기 어렵고, 기존 집주인에게 청구해야 해요." },
  { q: "새 집주인이 퇴거를 요구하면 나가야 하나요?", a: "대항력이 있으면 보증금을 돌려받기 전까지 퇴거를 거부할 수 있어요. 보증금 반환과 퇴거는 동시이행 관계예요." },
  { q: "경매로 넘어간 경우에도 보호되나요?", a: "대항력과 확정일자가 근저당보다 먼저라면 보호돼요. 후순위면 배당 절차를 통해 보증금을 일부 또는 전부 받을 수 있어요." },
  { q: "전세보증보험에 가입했다면요?", a: "보증보험이 있으면 HUG나 SGI에 보증금 반환을 청구할 수 있어요. 보험사가 먼저 돌려주고, 보험사가 집주인에게 구상권을 행사해요." },
  { q: "확정일자는 꼭 받아야 하나요?", a: "대항력(전입신고+점유)만으로도 새 집주인에게 보증금을 요구할 수 있어요. 확정일자는 경매·공매 시 우선변제권을 위한 거예요. 둘 다 받아두는 게 안전해요." },
];

const SOURCES = [
  { name: "주택임대차보호법 제3조", href: "https://www.law.go.kr/법령/주택임대차보호법" },
  { name: "대법원 판례 2003다29895", href: "https://glaw.scourt.go.kr" },
];

const RELATED = [
  { slug: "우선변제권-요건", title: "우선변제권 요건", description: "대항력에 더해 우선변제권을 갖추는 조건." },
  { slug: "전세금-반환보증-신청", title: "전세금 반환보증 신청", description: "전세보증보험 가입과 청구 방법." },
  { slug: "임대차-계약기간-중-집주인-변경-퇴거", title: "계약 중 집주인 변경 시 퇴거", description: "소유권 이전 시 임차인 권리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차 · 보증금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        집이 팔렸는데 보증금은 돌려받을 수 있을까?<br />
        소유권이전 시 임차인 보호와 퇴거 거부 권리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        살고 있는 집이 갑자기 팔렸다는 통보를 받으면 보증금이 제일 걱정되죠.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/주택임대차보호법" style={{ color: "#1D9E75", textDecoration: "underline" }}>주택임대차보호법 제3조</a>에 따라 전입신고를 하고 실제 거주하고 있으면(대항력), 집이 팔려도 새 집주인에게 보증금 반환을 요구할 수 있어요. 보증금을 돌려받기 전까지 퇴거도 거부할 수 있고요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>대항력이 있으면 보증금이 보호돼요</H2>
      <p style={body}>
        대항력은 새 집주인에게도 내 보증금을 주장할 수 있는 힘이에요. 두 가지 조건만 충족하면 돼요.
      </p>

      <BorderBox>
        <strong>대항력 요건 (2가지)</strong><br />
        1. 전입신고 완료 (주민센터 또는 정부24){"\n"}<br />
        2. 실제 거주 중 (점유 상태 유지){"\n"}<br />
        대항력 발생 시점: 전입신고 다음 날 0시
      </BorderBox>

      <p style={body}>
        대항력이 있으면 소유권이 넘어가도 보증금 반환 의무가 새 집주인에게 자동 승계돼요. 내가 따로 계약을 새로 맺을 필요도 없어요.
      </p>

      <CategoryButton label="부동산 정보" count={12} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>보증금을 못 받을 때 대응 절차</H2>
      <p style={body}>
        새 집주인이 보증금을 안 돌려주면 아래 순서로 대응하세요.
      </p>

      <SectionBadge>보증금 반환 대응 절차</SectionBadge>
      <Steps steps={STEPS_DATA} />

      <p style={body}>
        소액사건심판(5천만원 이하)은 변호사 없이도 직접 할 수 있어요. <a href="/w/소액사건-인지대-송달료-계산" style={{ color: "#1D9E75", textDecoration: "underline" }}>소액사건 비용</a>도 크지 않아요.
      </p>

      <Divider />

      <H2>퇴거를 요구받았을 때 알아야 할 것</H2>
      <p style={body}>
        새 집주인이 퇴거를 요구해도, 보증금을 받기 전이라면 거부할 수 있어요.
      </p>

      <GreenBox title="퇴거 거부 핵심">
        보증금 반환과 퇴거는 동시이행 관계{"\n"}
        보증금을 돌려받기 전까지 나갈 의무 없음{"\n"}
        이사해야 하면 임차권등기명령부터 신청
      </GreenBox>

      <p style={body}>
        임차권등기명령을 받아두면 이사 후에도 대항력과 우선변제권이 유지돼요. 법원에서 보통 1~2주 안에 결정이 나와요.
      </p>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>소유권 이전과 보증금에서 많이 궁금해하는 것들이에요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 주택임대차보호법을 바탕으로 작성했어요. 개별 사안에 따라 법적 판단이 달라질 수 있으니, 구체적인 상황은 법률구조공단(132) 또는 변호사에게 상담하세요." />
    </ArticleLayout>
  );
}
