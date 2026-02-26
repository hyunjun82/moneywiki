"use client";
import React, { useState } from "react";
import {
  BlogLayout, TOC, Summary3, Sec, P, B, A, H3,
  Info, InlineLink, SpokeLink, BridgeCard, ExtBtn,
  FAQAccordion, RelatedArticles, PrevNext,
  RelatedMid, SidebarCTA, SidebarDocs, SidebarCalc,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultGrid, ResultCTA,
  Divider, TableTitle, TableNote, TH, THL, Tag, Btn,
  Steps, FeatureList,
} from "@/components/wiki/BlogShared";

/* ───── meta ───── */
export const meta = {
  title: "실업급여 관할 고용센터 찾기 | 고용24 센터 조회 온라인 신청",
  description:
    "실업급여는 주소지 관할 고용센터에 신청해야 해요. 고용24에서 내 관할센터 찾는 법과 온라인 신청 연결 방법을 정리했어요.",
  category: "실업급여",
  keywords: ["고용센터 찾기", "관할센터 조회", "고용24 센터", "온라인 신청"],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-25",
  datePublished: "2026-02-25",
  summary: [
    "실업급여 신청은 주소지 기준 관할 고용센터에서 해야 해요",
    "고용24(work24.go.kr)에서 주소 입력만으로 관할센터를 찾을 수 있어요",
    "수급자격 인정 신청은 온라인·방문 모두 가능하며 온라인이 더 빠를 수 있어요",
  ],
  sources: [
    { name: "고용24 공식 포털", url: "https://www.work24.go.kr/cm/c/CM111M.do", date: "2026-02" },
    { name: "고용보험법 제42조", url: "https://www.law.go.kr/lsLinkCommonInfo.do?lsJoLnkSeq=1000011088", date: "2024-01" },
    { name: "고용노동부 실업급여 안내", url: "https://www.moel.go.kr/policy/policyinfo/support/list4.do", date: "2025-12" },
  ],
  faq: [
    {
      q: "고용센터 방문 없이 실업급여 신청이 완전히 가능한가요?",
      a: "수급자격 인정 신청은 고용24에서 온라인으로 할 수 있어요. 다만 첫 실업인정일에는 고용센터를 방문해야 할 수 있고, 이후 실업인정은 온라인으로 진행 가능해요.",
    },
    {
      q: "이사를 했는데 기존 고용센터에서 계속 신청할 수 있나요?",
      a: "이사 후에는 새 주소지 관할 고용센터로 변경하는 게 원칙이에요. 변경 신청은 고용24 또는 새 관할 고용센터 방문으로 가능해요.",
    },
  ],
  ctaCard: {
    label: "30초 확인",
    mainText: "내 관할 고용센터",
    subText: "주소 입력으로 바로 찾기",
    url: "#checker",
    external: false,
  },
  relatedDocs: [
    { title: "실업급여 수급 조건 정리", url: "/w/실업급여-수급-조건" },
  ],
};

/* ───── checker ───── */
type Ans = Record<string, string>;
function getResult(a: Ans) {
  if (!a.location || !a.document || !a.signup || !a.worknet) return null;

  const locationOk = a.location === "yes";
  const documentOk = a.document === "yes";
  const signupOk = a.signup === "done";
  const worknetOk = a.worknet === "done";

  if (locationOk && documentOk && signupOk && worknetOk) {
    return (
      <ResultPass title="신청 준비가 완료됐어요" desc="주소지 관할 고용센터에서 또는 고용24 온라인으로 수급자격 인정 신청을 바로 진행할 수 있어요.">
        <ResultGrid items={[
          { icon: "📍", name: "관할센터 확인", pass: true, desc: "완료" },
          { icon: "📋", name: "이직확인서", pass: true, desc: "처리됨" },
          { icon: "🔑", name: "고용24 가입", pass: true, desc: "완료" },
          { icon: "🔍", name: "워크넷 구직등록", pass: true, desc: "완료" },
        ]} />
        <ResultCTA icon="📝" title="실업급여 신청 방법 절차" desc="수급자격 인정 신청 단계별 안내" href="/w/실업급여-신청방법" />
        <ResultCTA icon="🔢" title="예상 수령액 계산" desc="연봉별 실업급여 금액 확인" href="/w/실업급여-연봉별-계산" />
        <ResultCTA icon="📊" title="수급 조건 전체 확인" desc="피보험기간·퇴직사유 기준" href="/w/실업급여-수급-조건" />
      </ResultPass>
    );
  }

  const items = [
    { icon: "📍", name: "관할센터 확인", pass: locationOk, desc: locationOk ? "완료" : "확인 필요" },
    { icon: "📋", name: "이직확인서", pass: documentOk, desc: documentOk ? "처리됨" : "대기 중" },
    { icon: "🔑", name: "고용24 가입", pass: signupOk, desc: signupOk ? "완료" : "미가입" },
    { icon: "🔍", name: "워크넷 구직등록", pass: worknetOk, desc: worknetOk ? "완료" : "미완료" },
  ];

  return (
    <ResultFail title="아직 준비가 더 필요해요" desc="아래 항목을 순서대로 완료하면 신청할 수 있어요.">
      <ResultGrid items={items} />
      <div style={{ marginTop: 16 }}>
        <ResultCTA icon="📍" title="관할 고용센터 찾기" desc="고용24에서 주소 입력으로 바로 확인" href="https://www.work24.go.kr/cm/c/CM111M.do" />
        <ResultCTA icon="📋" title="이직확인서 처리 확인" desc="고용24에서 처리 여부 조회 방법" href="/w/실업급여-이직확인서" />
        <ResultCTA icon="📊" title="실업급여 수급 조건 확인" desc="피보험기간·퇴직사유 기준" href="/w/실업급여-수급-조건" />
        <ResultCTA icon="📝" title="실업급여 신청 방법 절차" desc="처음부터 단계별 안내" href="/w/실업급여-신청방법" />
      </div>
    </ResultFail>
  );
}

/* ───── component ───── */
export default function Article88() {
  const [ans, setAns] = useState<Ans>({});
  const pick = (g: string, v: string) => setAns((p) => ({ ...p, [g]: v }));
  const result = getResult(ans);

  return (
    <BlogLayout
      breadcrumb={["홈", "실업급여", "신청", "고용센터 찾기"]}
      tags={["2026년 기준", "실업급여", "고용24"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={
        <>
          실업급여 신청을 앞두고 어느 고용센터로 가야 할지 막막하죠. 원칙은 <B>주소지 관할 고용센터</B>예요. <A href="https://www.work24.go.kr/cm/c/CM111M.do">고용24</A>에서 주소만 입력하면 내 관할센터를 바로 찾을 수 있고, 수급자격 인정 신청도 온라인으로 할 수 있어요.
        </>
      }
      sourceBar={{
        badge: "공식 포털",
        name: "고용24 · 고용보험법 제42조",
        date: "2026.02 기준",
      }}
      stickyLabel="관할센터"
      stickyValue="고용24 조회"
      stickyBtn="바로 찾기 ↑"
      disclaimer="이 글은 고용보험법과 고용24 공식 포털을 바탕으로 작성된 정보 제공 목적의 콘텐츠예요. 정확한 관할 여부는 고용24 또는 고용센터에서 확인하세요."
      sidebar={
        <>
          <SidebarCTA
            items={[
              { icon: "💰", title: "내 숨은 환급금 찾기", sub: "평균 13만원 환급", href: "/w/환급금-찾기", hot: true },
              { icon: "🏛️", title: "2026 정부지원금", sub: "30개+ 지원금", href: "/w/정부지원금" },
              { icon: "📋", title: "2026년 달라지는 제도", sub: "변경사항 정리", href: "/w/2026-변경사항" },
            ]}
          />
          <SidebarDocs
            items={[
              { title: "실업급여 수급 조건 정리", cat: "실업급여·수급자격", href: "/w/실업급여-수급-조건" },
              { title: "실업급여 신청 방법 절차", cat: "실업급여·신청", href: "/w/실업급여-신청방법" },
              { title: "임금체불 퇴직 정당사유", cat: "실업급여·퇴직사유", href: "/w/실업급여-임금체불-퇴직-정당사유" },
            ]}
          />
          <SidebarCalc
            items={[
              { title: "실업급여 계산기", href: "/calculators/실업급여-계산기" },
              { title: "퇴직금 계산기", href: "/calculators/퇴직금-계산기" },
              { title: "연말정산 계산기", href: "/calculators/연말정산-계산기" },
              { title: "양도소득세 계산기", href: "/calculators/양도소득세-계산기" },
              { title: "대출이자 계산기", href: "/calculators/대출이자-계산기" },
            ]}
          />
        </>
      }
    >
      {/* ── TOC ── */}
      <TOC
        items={[
          { t: "신청 준비 상태 간편 체크", sub: null },
          { t: "관할 고용센터는 어떻게 찾나요?", sub: "주소지 기준 원칙 · 고용24 조회 방법" },
          { t: "고용24에서 센터 조회 방법이 뭐예요?", sub: "PC 조회 3단계 · 모바일 앱 조회" },
          { t: "다른 지역 고용센터에서도 신청 가능한가요?", sub: "원칙적 불가 · 예외 인정 케이스" },
          { t: "온라인 신청은 어디서 하나요?", sub: "고용24 온라인 신청 · 모바일 신청" },
          { t: "자주 묻는 질문", sub: null },
        ]}
      />

      {/* ── Summary3 ── */}
      <Summary3
        items={[
          "실업급여 신청은 주소지 기준 관할 고용센터에서 해야 해요",
          "고용24(work24.go.kr)에서 주소 입력만으로 관할센터를 찾을 수 있어요",
          "수급자격 인정 신청은 온라인·방문 모두 가능하며 온라인이 더 빠를 수 있어요",
        ]}
      />

      {/* ══════ STEP 01 — 체커 ══════ */}
      <Sec n="1" id="checker" title="신청 준비 상태 간편 체크" sub="4가지 확인하면 다음 단계를 안내해 드려요">
        <P>
          실업급여 신청 전에 4가지 준비가 갖춰져 있어야 해요. 관할 고용센터 위치 확인, 이직확인서 처리 여부, 고용24 회원가입, 워크넷 구직등록이에요. 아직 안 된 게 있어도 괜찮아요 — 아래 체커로 현재 상태를 확인하면 다음 단계를 안내해 드려요.
        </P>
        <P>
          이직확인서는 퇴사 후 회사가 10일 이내에 고용보험에 신고해요. 고용24에서 처리 여부를 조회할 수 있어요.
        </P>

        <CheckerShell title="실업급여 신청 준비 체크" sub="30초 확인">
          <CheckerQ n="1" label="내 주소지 관할 고용센터 위치를 알고 있나요?" group="location"
            opts={[["yes", "알고 있어요"], ["no", "모르겠어요"]]}
            sel={ans} pick={pick}
          />
          <CheckerQ n="2" label="이직확인서가 고용24에서 처리 완료됐나요?" group="document"
            opts={[["yes", "처리 완료"], ["waiting", "처리 중"], ["no", "아직 신고 안 됨"]]}
            sel={ans} pick={pick}
          />
          <CheckerQ n="3" label="고용24 회원가입이 돼 있나요?" group="signup"
            opts={[["done", "가입 완료"], ["not-yet", "아직 미가입"]]}
            sel={ans} pick={pick}
          />
          <CheckerQ n="4" label="워크넷 구직등록을 완료했나요?" group="worknet"
            opts={[["done", "등록 완료"], ["not-yet", "아직 미등록"]]}
            sel={ans} pick={pick}
          />
          {result}
        </CheckerShell>
      </Sec>

      <Divider />

      {/* ══════ SECTION 02 — 관할센터 찾기 ══════ */}
      <Sec n="2" id="find-center" title="관할 고용센터는 어떻게 찾나요?" sub="주소지 기준 원칙이고, 고용24에서 바로 조회할 수 있어요">
        <P>
          실업급여는 <A href="https://www.law.go.kr/lsLinkCommonInfo.do?lsJoLnkSeq=1000011088">고용보험법 제42조</A>에 따라 <B>주소지 관할 고용센터</B>에서 신청해야 해요. 전국 어느 고용센터든 방문해도 된다고 생각하기 쉽지만, 원칙적으로는 주민등록상 주소지를 기준으로 담당 고용센터가 정해져 있어요.
        </P>

        <H3>주소지 기준 원칙</H3>
        <P>
          관할 고용센터는 주민등록증이나 운전면허증에 적힌 주소를 기준으로 정해져요. 실제 거주지와 주민등록 주소가 다르다면, 실제 거주지 관할 고용센터를 이용할 수 있어요. 이 경우 거주 사실을 입증하는 서류(공과금 영수증 등)를 준비하면 돼요.
        </P>
        <P>
          고용센터 관할은 지역마다 달라요. 서울만 해도 강남, 강서, 강북, 동부, 서부, 남부, 북부, 종로, 중부 등 9개 센터가 있어요. 자치구 단위로 관할이 나뉘기 때문에, 같은 서울이라도 어느 구에 사는지에 따라 가야 할 센터가 달라요.
        </P>

        <H3>고용24 조회 방법</H3>
        <P>
          가장 빠른 방법은 <A href="https://www.work24.go.kr/cm/c/CM111M.do">고용24 고용센터 찾기</A> 페이지를 이용하는 거예요. 주소나 지역명을 입력하면 관할 센터 이름, 주소, 전화번호, 지도가 한 번에 나와요. 고용24 메인에서 "고용센터 찾기" 메뉴를 클릭해도 바로 이동할 수 있어요.
        </P>

        <Info type="tip">{"<strong>팁:</strong> 고용24 앱(스마트폰)에서도 '고용센터 찾기'를 지원해요. 앱을 설치하면 현재 위치 기반으로 가장 가까운 센터를 찾아줘요."}</Info>

        <InlineLink icon="📍" title="고용24 고용센터 찾기" desc="주소 입력으로 관할센터 주소·전화번호 바로 확인" href="https://www.work24.go.kr/cm/c/CM111M.do" />
      </Sec>

      <Divider />

      {/* ══════ SECTION 03 — 고용24 조회 ══════ */}
      <Sec n="3" id="work24-search" title="고용24에서 센터 조회 방법이 뭐예요?" sub="PC 3단계와 모바일 앱 조회 모두 알려드려요">
        <P>
          고용24는 고용노동부가 운영하는 실업급여·취업 지원 통합 포털이에요. 고용센터 찾기뿐만 아니라 수급자격 신청, 실업인정, 취업 정보 조회까지 한 곳에서 할 수 있어요. 회원가입은 공동인증서(구 공인인증서) 또는 간편 인증(카카오·네이버·PASS)으로 가능해요.
        </P>

        <H3>PC 조회 3단계</H3>
        <Steps items={[
          {
            title: "고용24 접속",
            desc: "work24.go.kr 접속 → 상단 메뉴에서 '고용센터 찾기' 클릭 (또는 직접 /cm/c/CM111M.do 접속)",
          },
          {
            title: "주소 또는 지역명 입력",
            desc: "검색창에 '서울 강남구' 또는 '부산 해운대구'처럼 시·군·구 단위로 입력해요.",
          },
          {
            title: "관할 센터 확인",
            desc: "센터명, 주소, 전화번호, 운영 시간이 목록으로 표시돼요. 지도에서 위치도 확인 가능해요.",
          },
        ]} />

        <H3>모바일 앱 조회</H3>
        <P>
          고용24 앱을 설치하면 더 편하게 확인할 수 있어요. 앱 하단 메뉴에서 '내 주변 고용센터'를 선택하면 현재 위치 기반으로 가장 가까운 고용센터를 지도에 표시해줘요. 안드로이드와 iOS 모두 지원해요.
        </P>
        <P>
          앱에서는 센터별 혼잡도 정보도 확인할 수 있어요. 방문 전에 번잡한 시간대를 피하고 싶다면 앱을 통해 상대적으로 여유로운 시간을 확인하고 방문하는 게 좋아요.
        </P>

        <BridgeCard
          q="관할 센터는 찾았는데, 실업급여 신청 절차가 아직 막막하다면?"
          a="이직확인서 확인 → 워크넷 구직등록 → 수급자격 교육 이수 → 신청 순서로 진행해요."
          label="실업급여 신청 절차 보기"
          href="/w/실업급여-신청방법"
        />
      </Sec>

      {/* ── RelatedMid (SECTION 03-04 사이) ── */}
      <RelatedMid
        title="실업급여 신청 전 꼭 알아야 할 글"
        items={[
          { icon: "📊", title: "실업급여 수급 조건 정리", desc: "피보험기간·퇴직사유 기준 한눈에", href: "/w/실업급여-수급-조건" },
          { icon: "📝", title: "실업급여 신청 방법 절차", desc: "고용24 온라인 5단계 안내", href: "/w/실업급여-신청방법" },
          { icon: "🔢", title: "피보험기간 180일 계산", desc: "이전 직장 합산 방법 확인", href: "/w/실업급여-피보험기간-180일-계산" },
        ]}
        hubHref="/category/실업급여"
        hubLabel="실업급여 전체 보기"
      />

      <Divider />

      {/* ══════ SECTION 04 — 다른 지역 가능 여부 ══════ */}
      <Sec n="4" id="other-region" title="다른 지역 고용센터에서도 신청 가능한가요?" sub="원칙은 주소지 관할이지만, 예외 케이스도 있어요">
        <P>
          실업급여 수급자격 인정 신청은 <B>주소지 관할 고용센터</B>에서 하는 게 원칙이에요. 출퇴근이 편한 회사 근처 고용센터나 집 가까운 센터가 아니어도, 주민등록 주소지 기준 센터로 가야 해요.
        </P>

        <H3>원칙적으로 관할 외 불가</H3>
        <P>
          다른 지역 고용센터를 방문해도 1차 상담은 받을 수 있어요. 하지만 수급자격 인정 신청서 접수는 관할 센터에서만 처리돼요. 수속을 시작했다면 중간에 센터를 바꾸기 어렵기 때문에, 처음부터 관할 센터로 방문하는 게 좋아요.
        </P>

        <H3>예외 인정 케이스</H3>
        <P>
          다음 경우에는 관할 외 고용센터를 이용할 수 있어요. 첫째, <B>실제 거주지와 주민등록 주소지가 달라서</B> 실거주지 관할 센터를 이용하는 경우예요. 공과금 영수증이나 임대차계약서로 거주 사실을 입증하면 실거주지 센터에서 처리 가능해요. 둘째, <B>이사 후 주민등록 이전 전</B>에 이사한 주소지 관할 센터를 이용하는 경우도 인정돼요.
        </P>
        <P>
          온라인 신청(고용24)을 이용하면 관할 센터를 직접 방문하지 않아도 돼요. 수급자격 인정 신청, 실업인정 신청, 취업 활동 등록 모두 온라인으로 할 수 있어서, 방문 횟수를 크게 줄일 수 있어요.
        </P>

        <Info type="warn">{"<strong>주의:</strong> 실업인정일(구직활동 인정 날짜)은 관할 고용센터와 협의해서 정해요. 첫 방문 시 담당자에게 선호하는 요일을 말하면 가능한 범위에서 조율해 줘요."}</Info>

        <InlineLink icon="🔢" title="실업급여 지급일·입금 요일 계산" desc="실업인정일 이후 입금까지 주기 확인" href="/w/실업급여-지급일-첫-입금일-대기기간" />
      </Sec>

      <Divider />

      {/* ══════ SECTION 05 — 온라인 신청 ══════ */}
      <Sec n="5" id="online-apply" title="온라인 신청은 어디서 하나요?" sub="고용24에서 수급자격 신청과 실업인정을 모두 처리해요">
        <P>
          실업급여 수급자격 인정 신청은 <A href="https://www.work24.go.kr">고용24(www.work24.go.kr)</A>에서 온라인으로 할 수 있어요. 방문 없이 처리되기 때문에 시간이 절약되고, 대기 없이 처리돼요. 단, 고용24 회원가입과 본인 인증(공동인증서 또는 간편 인증)이 필요해요.
        </P>

        <H3>고용24 온라인 신청</H3>
        <P>
          고용24에 로그인한 뒤 '실업급여' 메뉴에서 '수급자격 인정 신청'을 선택하면 돼요. 이직확인서 처리가 완료된 상태여야 신청 가능해요. 워크넷 구직등록(work.go.kr)도 미리 해두어야 해요. 신청 후 고용센터 담당자가 검토하고 결과를 통보해줘요.
        </P>
        <P>
          온라인 신청 후 첫 실업인정은 고용센터를 방문해야 하는 경우가 많아요. 첫 실업인정일에 수급자격증을 발급받고 이후 일정을 안내받아요. 두 번째 실업인정부터는 고용24에서 온라인으로 처리할 수 있어요.
        </P>

        <H3>모바일 신청</H3>
        <P>
          고용24 모바일 앱에서도 수급자격 신청과 실업인정이 가능해요. 앱 스토어에서 '고용24'를 검색해 설치하면 돼요. 모바일 간편 인증(카카오·PASS 등)으로 로그인하면 공동인증서 없이도 이용할 수 있어요.
        </P>

        <BridgeCard
          q="신청은 했는데, 실업급여가 언제 입금되는지 모르겠다면?"
          a="실업인정일 다음 영업일에 입금돼요. 정확한 날짜는 지급주기와 실업인정일로 계산해요."
          label="지급일 계산 방법 보기"
          href="/w/실업급여-지급일-첫-입금일-대기기간"
        />

        <ExtBtn
          badge="고용24 공식"
          text="실업급여 수급자격 온라인 신청"
          cta="신청하기 →"
          href="https://www.work24.go.kr/re/b/REREABA01.do"
        />
      </Sec>

      <Divider />

      {/* ══════ FAQ ══════ */}
      <Sec n="6" id="faq" title="자주 묻는 질문" sub="">
        <FAQAccordion items={meta.faq} />
      </Sec>

      {/* ── 하단 네비 ── */}
      <RelatedArticles
        items={[
          { title: "실업급여 수급 조건 정리", desc: "실업급여·수급자격", href: "/w/실업급여-수급-조건" },
          { title: "실업급여 신청 방법 절차 준비서류", desc: "실업급여·신청", href: "/w/실업급여-신청방법" },
          { title: "피보험기간 180일 계산 합산 방법", desc: "실업급여·피보험기간", href: "/w/실업급여-피보험기간-180일-계산" },
          { title: "임금체불 퇴직 정당사유 인정 기준", desc: "실업급여·퇴직사유", href: "/w/실업급여-임금체불-퇴직-정당사유" },
          { title: "직장내 괴롭힘 퇴직 정당사유", desc: "실업급여·퇴직사유", href: "/w/실업급여-직장내-괴롭힘-퇴직-정당사유" },
        ]}
      />
      <PrevNext
        prev={{ title: "공무원 교사 실업급여 차이", href: "/w/공무원-교사-실업급여-퇴직급여-차이-비교" }}
        next={{ title: "실업급여 지급일 입금 요일", href: "/w/실업급여-지급일-첫-입금일-대기기간" }}
      />
    </BlogLayout>
  );
}
