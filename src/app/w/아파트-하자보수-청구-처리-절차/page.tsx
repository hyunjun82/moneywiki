"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, Checklist, FAQ, References, Disclaimer } from "@/components/article-ui";

const CHECKLIST = [
  "아파트 하자보수 청구권자: 하자보수를 청구할 수 있는 사람이 정해져 있어요.",
  "하자보수 청구 후 건설사 대응: 공동주택관리법에 따르면, 사업주체(건설사)는 하자보수를 청구받은 날부터 15일 이내에 조치해야 해요.",
  "하자보수 완료 후 절차: 하자보수가 끝나면 건설사는 즉시 보수 결과를 청구한 사람에게 통보해야 해요.",
];

const FAQS = [
  { q: "하자보수 청구는 누가 할 수 있나요?", a: "내 집 안(전유부분)은 입주자 본인이 청구하고, 복도·엘리베이터 같은 공용부분은 입주자대표회의나 관리주체가 청구해요." },
  { q: "건설사가 하자가 아니라고 하면 어떻게 하나요?", a: "건설사가 하자가 아니라고 판단하면 그 이유를 서면으로 통보해야 해요. 납득이 안 되면 하자심사분쟁조정위원회에 조정을 신청할 수 있어요." },
  { q: "하자보수는 언제까지 청구할 수 있나요?", a: "하자담보책임기간 내에 청구해야 해요. 부위별로 기간이 다른데, 내력구조부는 10년, 시설공사별로 1~5년이에요." },
  { q: "아파트 하자보수 청구권자에 대해 알려주세요", a: "하자보수를 청구할 수 있는 사람이 정해져 있어요." },
  { q: "하자보수 청구 후 건설사 대응에 대해 알려주세요", a: "공동주택관리법에 따르면, 사업주체(건설사)는 하자보수를 청구받은 날부터 15일 이내에 조치해야 해요." },
  { q: "하자보수 완료 후 절차에 대해 알려주세요", a: "하자보수가 끝나면 건설사는 즉시 보수 결과를 청구한 사람에게 통보해야 해요." },
];

const REFERENCES = [{ category: "공식 자료", items: [
      { label: "공동주택관리법", url: "https://www.law.go.kr" },
      { label: "찾기쉬운 생활법령정보", url: "https://easylaw.go.kr" },
      { label: "하자심사분쟁조정위원회", url: "https://www.adc.go.kr" },
] }];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>아파트 하자보수 청구 처리 절차</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>새 아파트 입주 후 벽에 균열이 생겼어요. 하자보수를 청구하면 어떻게 처리되는지 궁금해요.</p>
      <Divider />

      <H2>아파트 하자보수 청구권자</H2>
      <p style={body}>하자보수를 청구할 수 있는 사람이 정해져 있어요.</p>
      <p style={body}>전유부분(내 집 안)에 대한 하자는 입주자 또는 공공임대주택의 임차인이 청구해요. 내 집 안 문제는 내가 직접 청구하는 거예요.</p>
      <p style={body}>공용부분(복도, 엘리베이터, 외벽 등)에 대한 하자는 입주자대표회의, 공공임대주택의 임차인대표회의, 관리주체(관리사무소장), 관리단이 청구해요.</p>
      <GreenBox title="핵심 요약">하자보수를 청구할 수 있는 사람이 정해져 있어요.<br />전유부분(내 집 안)에 대한 하자는 입주자 또는 공공임대주택의 임차인이 청구해요. 내 집 안 문제는 내가 직접 청구하는 거예요.</GreenBox>
      <Divider />

      <H2>하자보수 청구 후 건설사 대응</H2>
      <p style={body}>공동주택관리법에 따르면, 사업주체(건설사)는 하자보수를 청구받은 날부터 15일 이내에 조치해야 해요.</p>
      <p style={body}>두 가지 방법이 있어요. 하나는 직접 보수하는 거예요. 15일 안에 공사를 끝내는 거죠.</p>
      <p style={body}>다른 하나는 하자보수계획을 서면으로 통보하는 거예요. 공사가 15일 안에 끝나기 어려우면 언제, 어떻게 보수할지 계획을 알려주고 그 계획대로 보수하면 돼요.</p>
      <BorderBox><p style={body}>공동주택관리법에 따르면, 사업주체(건설사)는 하자보수를 청구받은 날부터 15일 이내에 조치해야 해요.</p></BorderBox>
      <Divider />

      <H2>하자보수 완료 후 절차</H2>
      <p style={body}>하자보수가 끝나면 건설사는 즉시 보수 결과를 청구한 사람에게 통보해야 해요.</p>
      <p style={body}>입주자대표회의가 청구했으면 입주자대표회의에, 개별 입주자가 청구했으면 그 입주자에게 &quot;보수 완료했습니다&quot;라고 알려주는 거예요.</p>
      <p style={body}>통보받은 후에는 직접 확인해 봐야 해요. 제대로 수리됐는지, 문제가 해결됐는지 점검하는 거죠.</p>
      <Divider />
      <H2>핵심 체크리스트</H2>
      <p style={body}>핵심 사항을 정리했어요.</p>
      <SectionBadge>체크 항목</SectionBadge>
      <Checklist items={CHECKLIST} />
      <Divider />
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>관련 질문을 모았어요.</p>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준으로 작성됐어요. 최신 기준은 관련 기관에서 확인하세요." />
    </div>
  );
}
