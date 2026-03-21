"use client";

// Q1. 실업급여 수급 중인데 다음 실업인정일이 다가오는데 구직활동을 얼마나, 어떻게 해야 하는지 모르는 상황
// Q2. 차수에 맞는 구직활동을 하고 증빙 자료를 제출해서 실업인정을 받는 행동
// Q3. 차수별 필요 횟수(1차/2~4차/5차 이후), 인정되는 활동 종류, 증빙 방법(자동연동/캡처/확인서), 1일 1회 한도
// Q4. GreenBox(차수별 기준표) + DocTable(증빙 방법) + Steps(신청 절차) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "차수마다 구직활동 횟수가 다른가요?",
    a: "네, 달라요. 1차는 수급자격자 온라인 교육 1회로 끝나고, 2~4차는 재취업 활동 1회 이상, 5차 이후는 2회 이상이 필요해요. 5차 이후 2회 중 구직활동(입사지원·면접) 1회는 반드시 포함해야 해요.",
  },
  {
    q: "사람인이나 잡코리아 입사지원도 구직활동으로 인정되나요?",
    a: "고용24와 연동된 민간 채용사이트는 자동으로 인정돼요. 연동이 안 된다면 지원 완료 화면을 캡처해서 첨부하면 돼요. 연동 사이트 목록은 고용24에서 확인할 수 있어요.",
  },
  {
    q: "같은 날 입사지원 2번 하면 2회로 인정되나요?",
    a: "아니에요. 하루에 몇 번을 해도 1일 1회만 인정돼요. 5차 이후처럼 2회가 필요한 차수는 반드시 이틀에 나눠서 활동해야 해요.",
  },
  {
    q: "취업특강은 몇 번이나 실적으로 쓸 수 있나요?",
    a: "온·오프라인 합산 최대 3회까지만 실업인정 실적으로 인정돼요. 그 이상 수강해도 추가 실적으로는 인정되지 않아요.",
  },
  {
    q: "구직활동 실적을 제출 안 하면 어떻게 되나요?",
    a: "그 회차 실업급여가 지급되지 않아요. 다음 실업인정일까지 기다려야 하고, 미제출 회차 급여는 소멸될 수 있어요. 실업인정일을 놓치지 않도록 미리 활동을 완료해 두는 게 좋아요.",
  },
  {
    q: "허위로 구직활동 신고하면 어떻게 되나요?",
    a: "부정수급으로 분류돼요. 받은 급여 전액 반환 + 최대 5배 추가 징수 + 형사처벌까지 받을 수 있어요. 자진신고 시 추가 징수를 면제받을 수 있으니 의심스럽다면 고용센터에 먼저 상담하는 게 좋아요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "고용보험법 제44조 - 실업의 인정", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용24 - 실업인정 안내", url: "https://www.work24.go.kr" },
      { label: "워크넷 채용공고", url: "https://www.work.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "실업급여-신청방법", title: "실업급여 신청 방법", description: "수급자격 신청부터 첫 실업인정까지 절차예요." },
  { slug: "실업급여-지급일", title: "실업급여 지급일 기준", description: "실업인정 후 입금까지 걸리는 기간이에요." },
  { slug: "실업급여-부정수급", title: "실업급여 부정수급 처벌", description: "허위 신고 시 추가 징수와 형사처벌 기준이에요." },
];


export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 구직활동 · 실업인정</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 구직활동 인정 기준<br />
        차수별 횟수와 증빙 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        실업인정일에 구직활동 실적을 못 내면 그 회차 급여가 통째로 보류돼요.
        1차는 온라인 교육 1회로 끝나지만, 5차부터는 갑자기 2회로 늘어나요.
        차수별 기준과 증빙 방법을 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>차수별 구직활동 인정 기준</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/고용보험법" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75" }}>고용보험법 제44조</a>에서 실업급여를 받으려면 적극적 구직활동을 증명하도록 정하고 있어요.
        실업인정일 = 구직활동 실적 제출일이에요. 차수마다 필요한 횟수가 달라요.
      </p>
      <p style={body}>
        수급기간은 보통 4~9개월이고, 매 4주마다 실업인정일이 돌아와요.
        1차는 온라인 교육으로 끝나지만, 5차부터는 활동 기준이 2배로 높아지니 미리 알아두는 게 좋아요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>차수</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>필요 활동</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>구직활동 필수 여부</th>
            </tr>
          </thead>
          <tbody>
            {[
              { round: "1차", activity: "수급자격자 온라인 교육 수강 1회", required: "불필요 (교육으로 대체)" },
              { round: "2~4차", activity: "재취업 활동 1회 이상", required: "불필요 (구직 외 활동 가능)" },
              { round: "5차 이후", activity: "재취업 활동 2회 이상", required: "구직활동 1회 필수 포함" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 700, whiteSpace: "nowrap" }}>{row.round}</td>
                <td style={{ padding: "5px 8px" }}>{row.activity}</td>
                <td style={{ padding: "5px 8px", fontSize: 12, color: "#555" }}>{row.required}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ★ 1일 1회만 인정. 5차 이후 2회 필요 시 반드시 이틀에 나눠서 활동
        </p>
      </GreenBox>

      <p style={body}>
        재취업 활동은 크게 두 가지로 나뉘어요. <strong>구직활동</strong>(입사지원·면접·구인업체 방문 상담)과 <strong>구직 외 활동</strong>(직업훈련·취업특강·직업심리검사)이에요.
        취업특강은 온·오프라인 합산 최대 3회, 직업심리검사는 1회까지만 실적으로 인정돼요.
      </p>

      <H2>활동 유형별 증빙 방법</H2>
      <p style={body}>
        온라인 활동과 오프라인 활동의 증빙 방식이 달라요. 고용24와 연동되는 사이트라면 별도 서류 없이 자동 처리돼요.
        연동이 안 된다면 지원 완료 화면을 캡처해서 첨부하면 돼요.
      </p>
      <p style={body}>
        면접이나 직업훈련은 해당 업체나 훈련기관에서 확인서를 발급받아야 해요.
        오프라인 증빙은 미리 발급받아두는 게 좋고, 분실하면 재발급이 번거로울 수 있어요.
      </p>
      <p style={body}>
        증빙자료 첨부는 실업인정 신청 화면에서 파일을 업로드하는 방식이에요.
        파일 형식은 JPG·PNG·PDF가 모두 가능하고, 캡처 이미지도 인정돼요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>활동 유형</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>증빙 방법</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>비고</th>
            </tr>
          </thead>
          <tbody>
            {[
              { type: "워크넷 입사지원", how: "자동 연동 (증빙 불필요)", note: "가장 간편" },
              { type: "연동 민간사이트", how: "자동 연동", note: "사람인·잡코리아 등" },
              { type: "비연동 사이트", how: "지원 완료 화면 캡처", note: "회사명·날짜 포함" },
              { type: "면접 참여", how: "면접확인서 (업체 발급)", note: "오프라인 활동" },
              { type: "직업훈련", how: "출석확인서 (훈련기관 발급)", note: "오프라인 활동" },
              { type: "취업특강", how: "수강확인서", note: "최대 3회 한도" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 700, whiteSpace: "nowrap" }}>{row.type}</td>
                <td style={{ padding: "5px 8px" }}>{row.how}</td>
                <td style={{ padding: "5px 8px", fontSize: 12, color: "#555" }}>{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GreenBox>

      <H2>워크넷 입사지원으로 증빙하는 방법</H2>
      <p style={body}>
        워크넷에서 채용공고에 지원하면 고용24에 자동 연동돼요. 별도 서류 없이 실업인정 신청 화면에서 확인만 하면 끝나요.
        워크넷 아이디가 없다면 미리 회원가입을 해두는 게 좋아요.
      </p>
      <p style={body}>
        워크넷에는 전국 공공·민간 채용공고가 올라오고, 직종·지역·경력 조건으로 필터링할 수 있어요.
        지원 이력이 자동으로 쌓이기 때문에 실업인정 신청 때 별도 캡처 없이 바로 확인이 돼요.
      </p>

      <BorderBox>
        <strong>워크넷 입사지원 주의사항</strong><br />
        지원 시 직종·지역 범위를 너무 좁게 설정하지 않는 게 좋아요.<br />
        희망 직종이 아니어도 지원 가능하고, 여러 공고에 지원해도 구직활동으로 인정돼요.<br />
        취업 의사 없이 반복 지원하다 적발되면 부정수급 불이익이 생길 수 있어요.<br /><br />
        <strong>민간 사이트 연동 확인</strong><br />
        사람인·잡코리아 등 연동 가능한 사이트 목록은 고용24 앱에서 확인할 수 있어요.<br />
        연동이 안 되는 사이트라면 입사지원 완료 화면을 캡처해서 첨부하면 실적으로 인정받을 수 있어요.
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <H2>1차 실업인정 온라인 교육은 어디서 받나요?</H2>
      <p style={body}>
        수급자격 인정 신청을 마치면 고용24 앱에서 수급자격자 온라인 교육을 수강하라는 안내가 나와요.
        이 과정을 이수해야 1차 실업인정이 처리돼요. 이수를 안 하면 1차 급여가 지급되지 않아요.
      </p>
      <p style={body}>
        교육은 약 1시간 분량이고, PC나 스마트폰으로 모두 수강 가능해요.
        이수 완료 후에는 별도 신청 없이 자동으로 1차 실업인정 실적이 처리돼요.
      </p>

      <GreenBox>
        <strong>1차 실업인정 온라인 교육 안내</strong><br />
        수강 시간: 약 1시간<br />
        수강 방법: 고용24 앱 또는 웹사이트 (PC·스마트폰 모두 가능)<br />
        이수 완료 후: 자동으로 1차 실업인정 실적 처리 (별도 신청 불필요)<br /><br />
        <strong>차수별 요약</strong><br />
        1차: 수급자격자 온라인 교육만 들으면 끝이에요<br />
        2~4차: 워크넷 입사지원 1회가 가장 간편해요<br />
        5차 이후: 입사지원 + 추가 활동을 이틀에 나눠서 해야 해요
      </GreenBox>

      <H2>고용24에서 실업인정 신청하는 절차</H2>
      <p style={body}>
        구직활동을 마쳤다면 실업인정일에 고용24에서 신청해야 해요.
        워크넷 지원 내역은 자동으로 불러오고, 그 외 활동은 직접 입력 후 증빙자료를 첨부하면 돼요.
        실업인정일보다 미리 활동을 마쳐두는 게 좋아요.
      </p>

      <GreenBox>
        <ol style={{ paddingLeft: 18, margin: 0, fontSize: 13, lineHeight: 2 }}>
          <li>고용24 앱 또는 웹사이트 접속</li>
          <li>실업인정 신청 메뉴 선택</li>
          <li>워크넷 지원 내역 자동 불러오기 확인</li>
          <li>추가 활동 내역 직접 입력 (면접·훈련 등)</li>
          <li>증빙자료 첨부 (면접확인서·출석확인서 등)</li>
          <li>제출 완료 → 급여 지급 처리</li>
        </ol>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ★ 실업인정일을 놓치면 그 회차 급여 보류 → 미리 활동 완료 후 당일 신청
        </p>
      </GreenBox>

      <p style={body}>
        신청은 고용24 앱이나 웹에서 모두 가능해요. 가까운 고용센터를 방문해서 처리할 수도 있어요.
        실업인정일 당일 자정까지 제출하면 되고, 하루라도 늦으면 그 회차 급여가 보류돼요.
      </p>
      <p style={body}>
        구직활동이 부족하거나 증빙이 불충분하면 담당자가 보완을 요청할 수 있어요.
        고용센터에 문의하면 차수별 기준을 더 자세히 안내받을 수 있어요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={body}>
        구직활동 기준이 헷갈릴 때는 고용24 앱의 실업인정 안내를 먼저 확인해요.
        고용센터에 전화하거나 방문하면 차수별 기준을 직접 안내받을 수 있어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 2월 고용보험법 기준으로 작성됐어요. 구직활동 인정 기준은 고용센터 방침에 따라 변경될 수 있으니 고용24 또는 가까운 고용센터에 문의하세요." />
    </ArticleLayout>
  );
}
