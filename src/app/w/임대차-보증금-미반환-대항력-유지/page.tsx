"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 전세 계약 끝났는데 집주인이 보증금 안 돌려줘서, 이사 가면 대항력 잃는지 걱정하는 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 임차권등기명령을 관할 법원에 신청해서 이사 가도 대항력을 유지하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 이사 가면 대항력 소멸하는 이유, 임차권등기명령 신청 요건·절차·비용(43,400원), 등기 후 효과(월세 면제, 지연손해금), 보증금 회수 방법.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → GreenBox(결론) + Steps(신청 절차) + DocTable(서류) + BorderBox(등기 후 효과) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, FAQ, References, Disclaimer,
  ArticleLayout,
} from "@/components/article-ui";

const STEPS = [
  { title: "임차권등기명령 신청서 작성", desc: "관할 지방법원에 제출할 신청서를 작성해요. 대법원 전자소송 사이트에서 양식을 다운받을 수 있어요." },
  { title: "서류 준비 및 접수", desc: "신청서, 임대차계약서 사본, 전입세대확인서, 주민등록등본을 법원에 제출해요. 인지대·송달료도 함께 납부해요." },
  { title: "법원 결정", desc: "법원이 요건을 심사한 뒤 결정문을 내려요. 별도 심문 없이 서면 심리로 진행돼서 보통 1~2주면 결정나요." },
  { title: "등기소에서 등기 완료", desc: "법원이 등기소에 촉탁하면 등기부에 임차권이 기재돼요. 여기까지 약 1개월 정도 걸려요." },
  { title: "이사 후에도 권리 유지", desc: "등기 완료 후에는 이사를 가도 대항력과 우선변제권이 그대로 유지돼요. 이제 안심하고 이사할 수 있어요." },
];

const DOCS = [
  { name: "임차권등기명령 신청서", required: true, where: "대법원 전자소송 양식" },
  { name: "임대차계약서 사본", required: true, where: "본인 보관분" },
  { name: "전입세대확인서", required: true, where: "주민센터 발급" },
  { name: "주민등록등본", required: true, where: "정부24 또는 주민센터" },
  { name: "건물등기부등본", required: false, where: "인터넷등기소(참고용)" },
];

const FAQS = [
  { q: "보증금 못 받고 이사 가면 대항력이 없어지나요?", a: "네, 그냥 이사 가면 전입신고가 빠지면서 대항력과 우선변제권 둘 다 소멸해요. 반드시 임차권등기를 먼저 해야 해요." },
  { q: "임차권등기명령 비용은 얼마예요?", a: "인지대 + 송달료(5,200원 x 6회) + 등록면허세(7,200원) = 약 43,400원이에요. 이 비용은 나중에 임대인에게 청구할 수 있어요." },
  { q: "임차권등기 후에도 월세를 내야 하나요?", a: "아니에요. 등기 후 이사 가면 점유를 하지 않으니 차임 의무가 없어요. 오히려 임대인이 지연손해금을 물어줘야 해요." },
  { q: "계약 기간 중에도 신청할 수 있나요?", a: "임차권등기명령은 임대차 기간이 끝났는데 보증금을 못 받은 경우에만 가능해요. 계약 기간 중에는 신청할 수 없어요." },
  { q: "상가도 임차권등기명령 가능한가요?", a: "네, 상가건물 임대차보호법에도 같은 제도가 있어요. 상가 임차인도 보증금 못 받으면 임차권등기명령을 신청할 수 있어요." },
  { q: "지연손해금은 얼마나 받을 수 있나요?", a: "소송촉진법에 따라 연 12%예요. 보증금 5천만원이면 1년에 600만원을 추가로 받을 수 있어요." },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "주택임대차보호법 — 법제처", url: "https://www.law.go.kr/법령/주택임대차보호법" },
      { label: "임차권등기명령 신청 안내 — 찾기쉬운 생활법령정보", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=629&ccfNo=5&cciNo=2&cnpClsNo=1" },
      { label: "대법원 전자소송", url: "https://ecfs.scourt.go.kr" },
    ],
  },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        보증금 못 받았는데 이사 가야 한다면?<br />
        임차권등기명령으로 대항력 유지하는 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        전세 계약 끝났는데 집주인이 보증금을 안 줘요. 새 집 계약일은 다가오는데 이사 가면 보증금 받을 권리가 사라질까 봐 걱정되시죠?
        임차권등기명령 하나로 이사 가면서도 대항력을 유지할 수 있어요. 비용은 약 43,400원이에요.
      </p>

      <Divider />

      <H2>이사 가면 대항력이 사라져요</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/주택임대차보호법" style={{ color: "#1D9E75" }}>주택임대차보호법</a>에 따르면,
        대항력은 주택에 계속 살면서 전입신고가 유지돼야 해요. 이사 가면 전입신고를 빼게 되고, 그 순간 대항력은 소멸해요.
      </p>

      <GreenBox title="핵심 포인트">
        이사 가면 대항력 + 우선변제권 둘 다 없어져요. 경매 배당에서 후순위로 밀려서 보증금을 일부만 받거나 못 받을 수 있어요.
        반드시 임차권등기명령을 먼저 신청하세요.
      </GreenBox>

      <p style={body}>
        우선변제권도 마찬가지예요. 확정일자는 그대로 남아있지만 대항력이 없어지면 우선변제권도 효력을 잃어요.
        그래서 보증금을 못 받은 상태에서 이사 가는 건 매우 위험해요.
      </p>

      <Divider />

      <H2>임차권등기명령, 이렇게 신청해요</H2>
      <p style={body}>
        임차권등기명령은 법원에 신청하면 임차권을 등기부에 올려주는 제도예요.
        등기가 완료되면 이사를 가도 대항력과 우선변제권이 유지돼요.
        전입신고 대신 등기가 그 역할을 대신해주는 거죠.
      </p>

      <Steps steps={STEPS} />

      <SectionBadge>필요 서류</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>등기 완료 후에는 어떻게 되나요?</H2>
      <p style={body}>
        임차권등기가 완료되면 이제 안심하고 이사해도 돼요. 대항력과 우선변제권이 그대로 유지될 뿐만 아니라,
        월세 지급 의무도 없어지고 오히려 임대인에게 지연손해금을 청구할 수 있어요.
      </p>

      <BorderBox>
        등기 후 3가지 효과가 있어요.<br />
        · <strong>대항력 유지</strong>: 이사 가도 경매 배당에서 우선순위를 지킬 수 있어요<br />
        · <strong>월세 면제</strong>: 점유를 하지 않으니 차임 의무가 없어요<br />
        · <strong>지연손해금 청구</strong>: 보증금 미반환에 대해 연 12% 이자를 받을 수 있어요
      </BorderBox>

      <p style={body}>
        보증금을 실제로 회수하려면 <a href="/w/보증금-반환청구" style={{ color: "#1D9E75" }}>보증금반환청구소송</a>이나
        지급명령을 신청해야 해요. 임차권등기가 되어 있으면 권리는 확보된 상태니까 차근차근 진행하면 돼요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 주택임대차보호법 및 찾기쉬운 생활법령정보를 바탕으로 작성됐어요. 임차권등기명령 비용은 법원 고시에 따라 변경될 수 있어요." />
    </ArticleLayout>
  );
}
