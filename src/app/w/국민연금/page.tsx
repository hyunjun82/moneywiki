"use client";
// Q1. 국민연금을 내고 있는데 나중에 얼마나 받을 수 있는지, 구조가 어떻게 되는지 궁금한 상황
// Q2. 내 국민연금 예상 수령액을 파악하고 수령 시기를 확인한다
// Q3. 보험료율 9%, 수령 개시 나이(65세), 최소 가입기간 10년, 급여 종류(노령·유족·장애), 조기수령 감액
// Q4. GreenBox로 핵심 구조 + BorderBox로 수령 나이 + Steps로 조회 방법

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECK_STEPS = [
  { title: "국민연금공단 홈페이지 접속", desc: "nps.or.kr에 접속해서 '내 연금 알아보기' 메뉴로 가세요." },
  { title: "공인인증서 또는 간편인증 로그인", desc: "본인 확인 후 로그인하면 가입 내역과 예상 수령액을 조회할 수 있어요." },
  { title: "예상 연금액 확인", desc: "현재 가입 기간과 소득을 기준으로 예상 월 수령액이 나와요.", tip: "납부 기간이 길수록 수령액이 올라감" },
  { title: "수령 개시 나이 확인", desc: "출생연도별로 수령 시작 나이가 다르니 확인해보세요." },
];

const FAQS = [
  { q: "국민연금 보험료 9%를 전부 내가 내나요?", a: "직장인은 회사와 반반이에요. 본인 4.5%, 회사 4.5%. 자영업자(지역가입자)는 9% 전액 본인 부담이에요." },
  { q: "10년 못 채우면 연금을 아예 못 받나요?", a: "노령연금은 못 받지만, 납부한 보험료에 이자를 더해서 반환일시금으로 돌려받을 수 있어요. 60세 도달 시 청구하면 돼요." },
  { q: "조기수령하면 얼마나 깎이나요?", a: "1년 일찍 받을 때마다 6%씩 감액돼요. 최대 5년 일찍(60세부터) 받으면 30% 깎이는 거예요. 한번 결정하면 평생 감액된 금액을 받으니 신중하게 판단하세요." },
  { q: "전업주부도 국민연금에 가입할 수 있나요?", a: "네, 임의가입으로 본인이 원하면 가입 가능해요. 월 최소 33,300원(기준소득월액 37만원 x 9%)부터 낼 수 있어요." },
  { q: "국민연금 수령 중에도 일하면 연금이 줄어드나요?", a: "소득이 있으면 '재직자 노령연금'이 적용돼요. A값(전체 가입자 평균 소득) 초과분에 따라 일부 감액돼요. 65세 이후에는 감액 없이 전액 받아요." },
  { q: "이혼하면 배우자 연금을 나눠 받을 수 있나요?", a: "네, 분할연금 제도가 있어요. 혼인 기간 5년 이상이면 상대방 연금의 일부를 분할 청구할 수 있어요. 이혼 후 3년 이내에 신청해야 해요." },
  { q: "해외에 거주해도 국민연금을 받을 수 있나요?", a: "네, 해외 거주자도 받을 수 있어요. 해외 계좌로 송금받을 수 있고, 재외공관에서 생존 확인 절차를 거치면 돼요." },
];

const SOURCES = [
  { name: "국민연금법", href: "https://www.law.go.kr/법령/국민연금법" },
  { name: "국민연금공단", href: "https://www.nps.or.kr" },
];

const RELATED = [
  { slug: "국민연금-조기수령-감액률-신청조건-손익분기점", title: "국민연금 조기수령 감액률", description: "조기수령 조건과 손익분기점 분석." },
  { slug: "국민연금-유족연금-조건", title: "국민연금 유족연금 조건", description: "유족연금 수급 요건과 금액." },
  { slug: "퇴직연금-수령-나이", title: "퇴직연금 수령 나이", description: "퇴직연금 수령 시기와 방법." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연금 · 국민연금 · 노후</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        국민연금, 얼마나 받을 수 있을까?<br />
        보험료·수령 나이·가입 조건 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        매달 월급에서 빠져나가는 국민연금, 나중에 정말 받을 수 있는 건지 불안하죠.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/국민연금법" style={{ color: "#1D9E75", textDecoration: "underline" }}>국민연금법</a>에 따라 만 18~60세 국민은 가입 의무가 있어요. 소득의 9%를 보험료로 내고, 최소 10년(120개월) 이상 가입해야 노령연금을 받을 수 있어요. 1969년생 이후는 만 65세부터 수령이에요. <a href="https://www.nps.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>국민연금공단</a>에서 내 예상 수령액을 조회할 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>보험료는 소득의 9%, 직장인은 절반만 내요</H2>
      <p style={body}>
        국민연금 보험료율은 소득의 9%예요. 월급 300만원이면 보험료가 27만원인데, 직장인은 회사와 반반 부담하니까 본인은 13만 5천원만 내면 돼요. 자영업자(지역가입자)는 9% 전액 본인이 부담해요.
      </p>

      <GreenBox>
        국민연금 핵심 구조{"\n"}
        - 보험료율: 소득의 9% (직장인은 회사와 반반){"\n"}
        - 기준소득월액: 최소 37만원 ~ 최대 617만원{"\n"}
        - 최소 가입기간: 10년(120개월){"\n"}
        - 수령 개시: 만 65세 (1969년생 이후){"\n"}
        - 급여 종류: 노령연금, 유족연금, 장애연금, 반환일시금
      </GreenBox>

      <p style={body}>
        기준소득월액에 상한이 있어서 아무리 많이 벌어도 617만원까지만 반영돼요. 월급이 1,000만원이어도 보험료는 617만원 x 9% = 약 55만원이 최대예요.
      </p>

      <CategoryButton label="연금" count={8} href="/category/연금" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>몇 살부터 받을 수 있나요?</H2>
      <p style={body}>
        수령 개시 나이는 출생연도에 따라 달라요. 1969년생 이후는 만 65세, 그 이전 출생자는 63~64세부터 받을 수 있어요.
      </p>

      <SectionBadge>출생연도별 수령 개시 나이</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 16 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
          <thead>
            <tr style={{ backgroundColor: "#E1F5EE" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>출생연도</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>수령 개시 나이</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>조기수령 가능 나이</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["1961~1964년생", "만 63세", "만 58세"],
              ["1965~1968년생", "만 64세", "만 59세"],
              ["1969년생 이후", "만 65세", "만 60세"],
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "10px 12px", color: "#374151" }}>{row[0]}</td>
                <td style={{ padding: "10px 12px", color: "#374151", fontWeight: 600 }}>{row[1]}</td>
                <td style={{ padding: "10px 12px", color: "#374151" }}>{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        조기수령은 정상 수령 나이보다 최대 5년 일찍 받는 건데, 1년당 6%씩 감액돼요. 5년 일찍 받으면 30% 줄어든 금액을 평생 받는 거예요. <a href="/w/국민연금-조기수령-감액률-신청조건-손익분기점" style={{ color: "#1D9E75", textDecoration: "underline" }}>조기수령 손익분기점</a>을 따져보고 결정하세요.
      </p>

      <Divider />

      <H2>내 예상 수령액은 이렇게 조회해요</H2>
      <p style={body}>
        국민연금공단 홈페이지에서 지금까지 낸 보험료와 예상 수령액을 바로 확인할 수 있어요. 로그인만 하면 돼요.
      </p>

      <SectionBadge>예상 수령액 조회 방법</SectionBadge>
      <Steps steps={CHECK_STEPS} />

      <p style={body}>
        예상 수령액은 현재 소득 수준이 유지된다는 가정하에 계산돼요. 소득이 오르면 실제 수령액도 올라가니 참고용으로 보세요.
      </p>

      <Divider />

      <H2>국민연금 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        보험료 부담, 가입기간 미달, 조기수령 등 궁금한 점을 모았어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 국민연금법과 국민연금공단 자료를 바탕으로 작성했어요. 개인 수령액은 가입 기간과 소득에 따라 달라지니 공단(1355)에서 정확한 금액을 확인하세요." />
    </ArticleLayout>
  );
}
