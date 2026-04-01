"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 공동인증서를 잃어버렸거나 비밀번호를 잊어버렸거나 컴퓨터를 포맷한 사람이 빠르게 재발급받으려는 상황
// Q2. 발급받은 은행/증권사 확인 → 온라인(5분) 또는 영업점 방문 → 새 비밀번호 설정 → 저장
// Q3. 처음 발급 방법(비대면→온라인, 서류→방문) / 잔여 유효기간만 이어짐 / 기존 인증서 자동 폐지 / 발급 기관에서만 재발급 가능
// Q4. Steps(온라인 재발급 절차) + BorderBox(온라인 vs 방문 비교) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const ONLINE_STEPS = [
  {
    title: "발급받은 은행·증권사 홈페이지 접속",
    description: "공동인증서는 처음 발급받은 기관에서만 재발급 가능해요. KB국민은행에서 발급받았으면 KB국민은행 홈페이지로 접속하세요.",
  },
  {
    title: "인증센터 또는 보안센터 메뉴 진입",
    description: "홈페이지에서 '인증센터' 또는 '공동인증서 재발급' 메뉴를 찾아요. 공동인증서·구인증서 재발급 항목을 선택하세요.",
  },
  {
    title: "본인 확인",
    description: "계좌번호 + 주민등록번호 + 휴대전화 SMS 인증으로 본인을 확인해요. 비대면 인증으로 처음 발급받았다면 이 단계에서 끝나요.",
  },
  {
    title: "새 비밀번호 설정 후 저장 위치 선택",
    description: "영문 대소문자·숫자·특수문자 조합 10자리 이상으로 새 비밀번호를 만들어요. 저장 위치는 PC 하드디스크 또는 USB에서 선택하면 재발급 완료예요.",
  },
];

const FAQS = [
  {
    q: "비밀번호를 잊어버렸는데 찾을 수 있나요?",
    a: "공동인증서 비밀번호는 찾을 수 없어요. 재발급받는 방법밖에 없죠. 발급받은 은행·증권사에서 재발급 받으면 돼요.",
  },
  {
    q: "처음 발급할 때 서류를 제출했는데 온라인으로 재발급 안 되나요?",
    a: "처음 발급 시 서류 제출(영업점 방문) 방식을 선택했다면 재발급도 영업점 방문이 필요해요. 신분증 지참 후 방문하면 바로 발급받을 수 있어요.",
  },
  {
    q: "재발급 받으면 유효기간이 1년 더 늘어나나요?",
    a: "아니에요. 기존 인증서의 잔여 유효기간이 그대로 이어져요. 6개월 쓰다가 재발급받으면 남은 6개월만 쓸 수 있어요. 유효기간을 늘리려면 갱신이 따로 필요해요.",
  },
  {
    q: "KB국민은행에서 발급받은 인증서를 신한은행에서 재발급받을 수 있나요?",
    a: "안 돼요. 처음 발급받은 기관에서만 재발급이 가능해요. KB국민은행에서 발급받았으면 KB국민은행에서만 재발급받을 수 있어요.",
  },
  {
    q: "재발급 후 기존 인증서는 어떻게 되나요?",
    a: "자동으로 폐지돼요. 다른 곳에 백업해둔 인증서 파일도 더 이상 사용할 수 없어요. 재발급 후에는 이용하던 사이트에 인증서를 재등록해야 해요.",
  },
  {
    q: "공동인증서 대신 금융인증서를 쓰면 더 편한가요?",
    a: "네, 클라우드에 저장돼서 분실 걱정이 없고 유효기간도 3년이에요. 공동인증서 재발급이 번거롭다면 금융인증서로 전환하는 것도 방법이에요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "금융결제원: 공동인증서 발급·재발급", url: "https://www.yessign.or.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "금융-인증서-발급",
    title: "금융인증서 발급 방법",
    description: "클라우드 저장, 유효기간 3년인 금융인증서로 바꾸는 방법이에요.",
  },
  {
    slug: "보안카드-재발급",
    title: "보안카드 재발급 방법",
    description: "보안카드 분실 시 재발급 절차를 정리했어요.",
  },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 인증서 · 재발급</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        공동인증서 재발급 5분 만에 끝내기<br />
        분실·비밀번호 분실·포맷 모두 가능
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        USB를 잃어버렸거나 컴퓨터를 포맷하면서 인증서가 날아갔나요?
        비대면 인증으로 발급받은 분이라면 <strong>5분 안에 온라인으로 재발급</strong>받을 수 있어요.
        처음 발급받은 은행·증권사 홈페이지에서 바로 가능해요.
        단, 처음에 서류를 제출하고 방문 발급했다면 영업점에 다시 가야 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>온라인 재발급 vs 영업점 방문, 뭐가 필요한가요?</H2>
      <SectionBadge>재발급 방법 선택</SectionBadge>

      <p style={body}>
        재발급 방법은 처음에 어떻게 발급받았는지에 따라 달라져요.
        비대면 인증(휴대전화 SMS)으로 발급받은 분은 집에서 온라인으로 5분 만에 끝나요.
        서류를 직접 제출해서 영업점 방문으로 발급받은 분은 다시 영업점에 신분증 들고 가야 해요.
        어느 방법을 썼는지 기억이 안 나면 발급받은 기관 고객센터에 문의해보세요.
      </p>

      <BorderBox>
        <p style={{ margin: "0 0 6px", fontWeight: 700 }}>재발급 방법 비교</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}>
          <strong>온라인 재발급</strong>: 처음 발급 시 비대면(SMS 인증) 선택한 경우 / 은행·증권사 홈페이지에서 5분
        </p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}>
          <strong>영업점 방문</strong>: 처음 발급 시 서류 제출한 경우 / 신분증 지참 후 해당 기관 방문
        </p>
        <p style={{ margin: 0, fontSize: 13, color: "#555", lineHeight: 1.9 }}>
          ★ 처음 발급받은 기관에서만 가능 / KB에서 발급→KB에서만 재발급
        </p>
      </BorderBox>

      <Divider />

      <H2>온라인 재발급 단계별 방법</H2>

      <p style={body}>
        온라인 재발급은 공동인증서 파일이 없어도 돼요.
        비밀번호를 잊어버린 경우도, 컴퓨터를 포맷한 경우도 동일해요.
        본인 확인만 통과하면 새로 받을 수 있어요.
      </p>

      <Steps steps={ONLINE_STEPS} />

      <p style={{ ...body, marginTop: 14 }}>
        재발급이 완료되면 기존 인증서는 자동으로 폐지돼요.
        다른 곳에 백업해둔 파일도 더 이상 사용할 수 없어요.
        이후 이용하던 사이트에 새 인증서를 재등록해야 해요.
      </p>

      <GreenBox>
        <p style={{ margin: "0 0 4px" }}>재발급 후 잔여 유효기간만 이어짐 (새로 1년 아님)</p>
        <p style={{ margin: "0 0 4px" }}>기존 인증서 자동 폐지 → 이용 사이트 재등록 필요</p>
        <p style={{ margin: 0 }}>비밀번호는 찾을 수 없음 → 재발급이 유일한 방법</p>
      </GreenBox>

      <H2>금융인증서로 바꾸면 더 편해요</H2>
      <p style={body}>
        공동인증서 재발급이 번거롭다면 금융인증서로 전환하는 게 좋아요.
        금융인증서는 클라우드에 저장되니까 분실 걱정이 없고, 유효기간도 3년이에요.
        PC를 바꿔도, USB를 잃어버려도 다시 로그인하면 그냥 쓸 수 있어요.
        발급받은 은행 앱에서 바로 신청할 수 있어요.
      </p>

      <GreenBox>
        <p style={{ margin: "0 0 6px", fontWeight: 700 }}>공동인증서 vs 금융인증서 비교</p>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>항목</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>공동인증서</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>금융인증서</th>
            </tr>
          </thead>
          <tbody>
            {[
              { 항목: "저장 위치", 공동: "PC/USB (분실 위험)", 금융: "클라우드 (안전)" },
              { 항목: "유효기간", 공동: "1년", 금융: "3년" },
              { 항목: "분실 시", 공동: "재발급 필요", 금융: "재로그인만" },
              { 항목: "비밀번호", 공동: "10자리 이상", 금융: "6자리 숫자 PIN" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 700 }}>{row.항목}</td>
                <td style={{ padding: "5px 8px" }}>{row.공동}</td>
                <td style={{ padding: "5px 8px" }}>{row.금융}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GreenBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준으로 작성됐어요. 각 금융기관별 재발급 절차는 조금씩 다를 수 있으니 발급 기관 고객센터에 살펴봐요." />
    </ArticleLayout>
  );
}
