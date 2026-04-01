"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 장애인 근로자(또는 사업주)가 업무에 필요한 보조공학기기를 무료로 지원받을 수 있는지 알고 싶은 상황
// Q2. 한국장애인고용공단에서 보조공학기기 무상지원을 신청한다
// Q3. 지원 대상, 지원 품목(점자단말기·화상전화기 등), 한도 1,500만원/중증 2,000만원, 신청 방법
// Q4. GreenBox(핵심 요약) + Steps(신청 절차) + 비교표(품목 예시) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles,
} from "@/components/article-ui";

const STEPS_DATA = [
  {
    title: "한국장애인고용공단 홈페이지에서 신청하세요",
    desc: "한국장애인고용공단 e신고서비스(esingo.or.kr) 또는 정부24에서 온라인 신청할 수 있어요. 사업주가 신청해도 되고, 장애인 근로자 본인이 직접 신청해도 돼요. 관할 지역 본부나 지사를 방문해서 신청하는 것도 가능해요.",
    tip: "온라인: esingo.or.kr / 오프라인: 공단 지사 방문",
    link: { label: "e신고서비스", href: "https://www.esingo.or.kr" },
  },
  {
    title: "신청 서류를 준비하세요",
    desc: "지원 신청서, 장애인임을 입증하는 서류(장애인증명서 또는 장애인등록증), 근로자임을 입증하는 서류(재직증명서 또는 근로계약서)가 필요해요. 사업주가 신청하면 사업자등록증도 필요해요.",
    tip: "장애인증명서 + 재직증명서 + 신청서",
  },
  {
    title: "공단에서 현장 방문 평가를 해요",
    desc: "신청서 접수 후 공단 보조공학 전문가가 사업장을 방문해서 장애 유형에 맞는 기기를 선정해요. 근로자의 업무 환경과 장애 특성에 맞춰 최적의 기기를 추천해 줘요.",
    tip: "맞춤형 기기 선정 → 기성품이 아닌 개인 맞춤도 가능",
  },
  {
    title: "기기 설치와 사후 관리까지 받으세요",
    desc: "선정된 기기가 사업장에 설치되면 사용법 교육도 받을 수 있어요. 이후 고장이나 교체가 필요하면 공단에 요청하면 돼요. 지원금은 장애인 1인당 최대 1,500만원(중증 2,000만원)이에요.",
    tip: "설치 후 사용법 교육 + 사후 유지보수 지원",
  },
];

const FAQS = [
  {
    q: "어떤 기기를 지원받을 수 있나요?",
    a: "시각장애인은 점자정보단말기, 화면읽기 프로그램, 화면확대 소프트웨어를 받을 수 있어요. 청각장애인은 화상전화기, 신호기기를 지원받아요. 지체장애인은 높낮이조절 책상, 특수키보드, 팔지지대 등이 있어요.",
  },
  {
    q: "사업주가 신청해야 하나요, 근로자가 해야 하나요?",
    a: "둘 다 가능해요. 사업주가 신청하면 회사 소유로 지원되고, 근로자가 퇴사하면 다른 장애인 근로자가 사용할 수 있어요. 차량용 보조공학기기(출퇴근용)는 장애인 근로자 본인이 직접 신청해야 해요.",
  },
  {
    q: "지원 한도가 어떻게 되나요?",
    a: "장애인 1인당 최대 1,500만원이에요. 중증장애인은 2,000만원까지 지원돼요. 맞춤형 보조공학기기가 필요한 경우 별도 심사를 거쳐 추가 지원받을 수 있어요.",
  },
  {
    q: "지원받은 기기는 퇴사하면 반납해야 하나요?",
    a: "사업주가 신청해서 받은 기기는 회사 소유라서 퇴사 시 회사에 남겨요. 새 직장에서 같은 기기가 필요하면 새 사업주가 다시 신청하면 돼요. 차량용 기기는 근로자 본인 소유예요.",
  },
  {
    q: "공무원도 지원받을 수 있나요?",
    a: "네. 장애인 공무원도 지원 대상이에요. 소속 기관장이 신청하거나, 장애인 공무원 본인이 직접 한국장애인고용공단에 신청할 수 있어요.",
  },
  {
    q: "4인 이하 소규모 사업장도 신청 가능한가요?",
    a: "4인 이하 사업장은 사업주 본인이 장애인인 경우에 지원 대상이에요. 4인 이하 사업장에 고용된 장애인 근로자는 사업주를 통해 신청하면 돼요.",
  },
];

const RELATED = [
  { slug: "장애인고용장려금", title: "장애인고용장려금 신청 방법", description: "장애인 고용 시 사업주가 받는 장려금." },
  { slug: "장애인-작업장비-지원", title: "장애인 작업장비 지원", description: "보조공학기기 외 작업장비 지원 제도." },
  { slug: "산재-장해급여", title: "산재 장해급여 기준", description: "업무상 장해가 남았을 때 받는 급여." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로·노동 · 장애인 고용 · 보조기기</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        장애인 근로자 보조공학기기, 무료로 받는 법<br />
        지원 품목과 신청 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        시각장애인 직원이 컴퓨터를 써야 하는데 화면읽기 프로그램이 없다고요? 청각장애인이 전화 대신 쓸 화상전화기가 필요하다고요?
      </p>
      <p style={body}>
        <a href="https://www.kead.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>한국장애인고용공단</a>에서 업무용 보조공학기기를 <strong>무상으로 지원</strong>해 줘요.
        <a href="https://www.law.go.kr/법령/장애인고용촉진및직업재활법" style={{ color: "#1D9E75", textDecoration: "underline" }}>장애인고용촉진법</a>에 근거한 제도이고,
        장애인 1인당 <strong>최대 1,500만원</strong>(중증 2,000만원)까지 지원돼요.
        사업주도, 근로자 본인도 신청할 수 있어요.
      </p>

      <Divider />

      <H2>어떤 기기를 지원받을 수 있나요?</H2>
      <p style={body}>
        장애 유형에 따라 지원 품목이 달라요. 기성 제품뿐 아니라 개인 맞춤형 기기도 지원 가능하고, 공단 보조공학 전문가가 현장 방문해서 가장 적합한 기기를 선정해 줘요.
      </p>

      <SectionBadge>장애 유형별 주요 지원 품목</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>장애 유형</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>지원 품목 예시</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>용도</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["시각장애", "점자정보단말기, 화면읽기 프로그램, 화면확대기", "문서 작업, 컴퓨터 사용"],
              ["청각장애", "화상전화기, 신호기기, 진동알림장치", "업무 소통, 알림 수신"],
              ["지체장애", "높낮이조절 책상, 특수키보드, 팔지지대", "작업 환경 개선"],
              ["모든 유형", "맞춤보조공학기기, 차량용 보조기기", "개인 맞춤, 출퇴근 지원"],
            ].map(([type, items, use], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600, color: "#1D9E75" }}>{type}</td>
                <td style={{ padding: "9px 12px" }}>{items}</td>
                <td style={{ padding: "9px 12px", color: "#6b7280", fontSize: 13 }}>{use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        지원 한도: 장애인 1인당 최대 1,500만원, 중증장애인은 2,000만원이에요. 기기 설치 후 사용법 교육과 사후 유지보수까지 지원해요.
      </GreenBox>

      <CategoryButton label="근로·노동 정보" count={12} href="/category/근로-노동" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>신청은 어떻게 하나요?</H2>
      <p style={body}>
        한국장애인고용공단 <a href="https://www.esingo.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>e신고서비스</a>에서 온라인 신청하거나, 가까운 공단 지사를 방문하면 돼요.
        신청 후 공단 전문가가 사업장을 방문해서 장애 특성에 맞는 기기를 선정하고 설치까지 해줘요.
      </p>

      <Steps steps={STEPS_DATA} />

      <BorderBox>
        <strong>지원 대상 정리</strong>{"\n"}
        · 장애인을 고용한 사업주 (또는 고용 예정){"\n"}
        · 국가·지방자치단체의 장 (공무원이 아닌 장애인 근로자 대상){"\n"}
        · 장애인 근로자 본인 (차량용 보조공학기기){"\n"}
        · 장애인 공무원{"\n"}
        · 4인 이하 사업장의 장애인 사업주
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />

      <Divider />

      <Disclaimer text="이 글은 2026년 3월 기준 한국장애인고용공단 안내를 바탕으로 작성됐어요. 지원 품목과 한도는 변경될 수 있으니, 공단 홈페이지나 관할 지사에서 최신 정보를 조회해 보세요." />
    </ArticleLayout>
  );
}
