import Link from "next/link";
import "./v3.css";

export const dynamic = "force-static";

export default function HomePage() {
  return (
    <div className="v3-root">
      <SeasonBar />
      <SiteHeader />
      <Hero />
      <LiveBand />
      <CalculatorsSection />
      <AdInArticle />
      <GuidesSection />
      <CategoriesSection />
      <TrustStrip />
      <SiteFooter />
      <KakaoFab />
    </div>
  );
}

/* ───────── Season Banner ───────── */
function SeasonBar() {
  return (
    <div className="season-bar">
      <div className="container row">
        <span className="pill">시즌</span>
        <span className="msg">
          신고 마감 <b>D-15</b> · 환급 미리 확인하세요
        </span>
        <Link href="/w/연말정산-환급" className="cta">
          바로가기 →
        </Link>
      </div>
    </div>
  );
}

/* ───────── Header ───────── */
function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container row">
        <Link href="/" className="brand">
          <span className="mark">M</span>
          <span>
            머니위키 <small>· Money Wiki</small>
          </span>
        </Link>
        <nav className="nav-main">
          <Link href="/category/부동산">부동산</Link>
          <Link href="/category/세금">세금</Link>
          <Link href="/category/금융">금융</Link>
          <Link href="/category/근로">근로·급여</Link>
          <Link href="/category/법률">법률</Link>
          <Link href="/#calculators">계산기</Link>
        </nav>
        <div className="nav-row">
          <button className="search-trigger" type="button" aria-label="검색">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <span>문서·계산기 검색</span>
            <span className="gap" />
            <span className="kbd">⌘</span>
            <span className="kbd">K</span>
          </button>
        </div>
      </div>
    </header>
  );
}

/* ───────── Hero ───────── */
function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <span className="eyebrow">
          <span className="badge">NEW</span>
          <span> 2026 양도세율 변경 · 6월 1일부터 적용</span>
        </span>
        <h1>
          어려운 금융 정보를,
          <br />
          <span className="accent">친구</span>가 알려주듯 정확하게.
        </h1>
        <p className="sub">
          퇴직금·세금·부동산·실업급여까지. 1,961개 검수 가이드와 30초 계산기로.
        </p>

        <div className="giant-search">
          <div className="box">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              type="text"
              placeholder="예: 퇴직금 1년 미만, 양도세 1주택 12억…"
              aria-label="검색"
            />
            <div className="kbd-pair">
              <span className="kbd">⌘</span>
              <span className="kbd">K</span>
            </div>
            <button className="go" type="button">
              검색
            </button>
          </div>
        </div>

        <div className="quick-suggest">
          <span className="lbl">자주 찾아요</span>
          <Link href="/w/연말정산-환급" className="chip">연말정산 환급</Link>
          <Link href="/w/퇴직금-계산기" className="chip">퇴직금 계산</Link>
          <Link href="/w/실업급여-수급자격" className="chip">실업급여 조건</Link>
          <Link href="/w/1세대-1주택-양도소득세-비과세-요건" className="chip">양도세 비과세</Link>
          <Link href="/w/전세대출" className="chip">전세대출</Link>
        </div>

        <div className="hero-trust">
          <div className="item">
            <span className="ico">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </span>
            <div>
              <div className="val t-num">1,961</div>
              <div className="lbl">검수 가이드</div>
            </div>
          </div>
          <div className="item">
            <span className="ico">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <path d="M9 12h6M12 9v6" />
              </svg>
            </span>
            <div>
              <div className="val">8개</div>
              <div className="lbl">실시간 계산기</div>
            </div>
          </div>
          <div className="item">
            <span className="ico">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M3 12h4l3-9 4 18 3-9h4" />
              </svg>
            </span>
            <div>
              <div className="val">매주</div>
              <div className="lbl">자료 업데이트</div>
            </div>
          </div>
          <div className="item">
            <span className="ico">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <rect x="8" y="2" width="8" height="4" rx="1" />
                <path d="m9 14 2 2 4-4" />
              </svg>
            </span>
            <div>
              <div className="val">전문가</div>
              <div className="lbl">노무사·세무사 검수</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── Live Data Band ───────── */
const TRENDS = [
  { rank: 1, q: "연말정산 환급", delta: "▲ 127%", type: "up", slug: "연말정산-환급" },
  { rank: 2, q: "퇴직금 계산", delta: "변동없음", type: "flat", slug: "퇴직금-계산기" },
  { rank: 3, q: "실업급여 조건", delta: "▲ 43%", type: "up", slug: "실업급여-수급자격" },
  { rank: 4, q: "양도세 1주택 비과세", delta: "NEW", type: "new", slug: "1세대-1주택-양도소득세-비과세-요건" },
  { rank: 5, q: "DSR 계산법", delta: "▲ 12%", type: "up", slug: "DSR-계산기" },
  { rank: 6, q: "전세자금대출 한도", delta: "▲ 8%", type: "up", slug: "전세자금대출" },
];

const UPDATES = [
  { title: "2026 양도세율 변경", when: "2시간 전 · 정책 변경", minor: false },
  { title: "실업급여 상한액 인상", when: "1일 전 · 6월 1일 시행", minor: false },
  { title: "건강보험료 2026 요율", when: "3일 전 · 가이드 보강", minor: true },
];

function LiveBand() {
  return (
    <section className="live-band">
      <div className="container">
        <div className="head">
          <div>
            <h2>
              지금 머니위키{" "}
              <span className="live-now">
                <span className="dot" />
                LIVE
              </span>
            </h2>
          </div>
          <div className="right">
            2026.05.16 14:23 기준 · <Link href="/trends">전체 트렌드 →</Link>
          </div>
        </div>

        <div className="live-grid">
          <div className="trend-card">
            <div className="ttl">오늘 가장 많이 검색</div>
            <div className="trend-list">
              {TRENDS.map((t) => (
                <Link href={`/w/${t.slug}`} key={t.rank} className={`trend-item ${t.rank <= 3 ? "top-3" : ""}`}>
                  <span className="rank t-num">{t.rank}</span>
                  <span className="q">{t.q}</span>
                  <span className={`delta ${t.type}`}>{t.delta}</span>
                  <span className="arr">→</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="stat-card">
            <div className="head-mini">
              <span className="ttl">오늘 사용</span>
              <span className="live-dot" />
            </div>
            <div>
              <div className="big t-num">
                23,841<small>회</small>
              </div>
              <div className="desc">계산기 사용 · 누적 1.2M</div>
            </div>
            <div>
              <div className="progress">
                <div className="fill" style={{ width: "68%" }} />
              </div>
              <div className="delta-row">
                <span className="badge">+18%</span>
                <span style={{ color: "var(--ink-3)" }}>어제 동시간 대비</span>
              </div>
            </div>
          </div>

          <div className="stat-card update-card">
            <div className="head-mini">
              <span className="ttl">최근 업데이트</span>
            </div>
            <div className="updates">
              {UPDATES.map((u, i) => (
                <div key={i} className={`upd ${u.minor ? "minor" : ""}`}>
                  <span className="dot" />
                  <div className="body">
                    <div className="ttl-mini">{u.title}</div>
                    <div className="when">{u.when}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── Calculators 4×2 ───────── */
const CALCS = [
  { ico: "연봉", name: "연봉 실수령액", desc: "세후 월급, 4대보험·세금 자동", usage: "84.2K", slug: "연봉-실수령액-계산기" },
  { ico: "퇴직", name: "퇴직금", desc: "세전·세후 금액 한 번에", usage: "62.7K", slug: "퇴직금-계산기" },
  { ico: "실업", name: "실업급여", desc: "수급액·지급 기간 자동", usage: "48.1K", slug: "실업급여-계산기" },
  { ico: "연말", name: "연말정산", desc: "환급·추징 예상액 미리", usage: "39.4K", slug: "연말정산-계산기" },
  { ico: "양도", name: "양도소득세", desc: "1주택·다주택 자동 판정", usage: "31.8K", slug: "양도소득세-계산기" },
  { ico: "대출", name: "대출이자", desc: "원리금 균등·체감 비교", usage: "28.3K", slug: "대출이자-계산기" },
  { ico: "보험", name: "4대보험료", desc: "국민·건강·고용·산재", usage: "22.6K", slug: "4대보험료-계산기" },
  { ico: "연금", name: "국민연금", desc: "예상 수령액 자동 조회", usage: "19.4K", slug: "국민연금-계산기" },
];

const CASES = [
  { who: "연봉 5,000만 · 자녀 2명", result: "월 358만원 실수령", desc: "공제 28% · 익명 사례 1,247건" },
  { who: "근속 8년 · 평균임금 380만", result: "퇴직금 3,180만원", desc: "세후 약 3,021만 · 사례 892건" },
  { who: "5억 매수 → 9억 매도 · 1주택", result: "비과세 · 2년 거주", desc: "12억 이하 비과세 · 사례 634건" },
];

function CalculatorsSection() {
  return (
    <section className="section" id="calculators" style={{ paddingTop: 64 }}>
      <div className="container">
        <div className="section-head">
          <div className="left">
            <h2>30초 안에 끝, 계산기 8개</h2>
            <div className="lead">월급 얼마? 퇴직금 얼마? 직접 입력해서 확인하세요</div>
          </div>
          <div className="right">
            월 사용 <b style={{ color: "var(--ink)" }} className="t-num">1.2M</b>회 ·{" "}
            <Link href="/#calculators">전체 →</Link>
          </div>
        </div>

        <div className="calc-grid">
          {CALCS.map((c) => (
            <Link href={`/w/${c.slug}`} key={c.slug} className="calc-card">
              <div className="top">
                <div className="ico">{c.ico}</div>
              </div>
              <div>
                <div className="name">{c.name}</div>
                <div className="desc">{c.desc}</div>
              </div>
              <div className="foot">
                <span className="usage">
                  월 <b className="t-num" style={{ color: "var(--ink)", fontWeight: 800 }}>{c.usage}</b>
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <span className="label">
              <span className="dot" />
              비슷한 사례 보기
            </span>
            <span style={{ fontSize: 13, color: "var(--ink-3)" }}>
              다른 분들은 얼마 나왔을까?
            </span>
          </div>
          <div className="case-row">
            {CASES.map((c, i) => {
              const [pre, accent] = splitAccent(c.result);
              return (
                <div key={i} className="case-card">
                  <div className="who">{c.who}</div>
                  <div className="result">
                    {pre}
                    <span className="accent t-num">{accent}</span>
                  </div>
                  <div className="desc">{c.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function splitAccent(text: string): [string, string] {
  // "월 358만원 실수령" → ["월 ", "358만원"] (간단 분리)
  const m = text.match(/^(.*?)(\d[\d,]*\S*|비과세\S*)/);
  if (!m) return [text, ""];
  return [m[1], m[2]];
}

/* ───────── Ad In-Article ───────── */
function AdInArticle() {
  return (
    <div className="container ad-zone">
      <div className="ad-slot">
        <span className="label-sponsored">SPONSORED</span>
        <div style={{ flex: 1 }}>
          {/* 실제 AdSense 슬롯 자리. 빌드 시 AdSlot 컴포넌트로 교체 */}
        </div>
      </div>
    </div>
  );
}

/* ───────── Guides ───────── */
const GUIDES = [
  { num: "01", cat: "근로·급여", title: "퇴직금 완벽 가이드", excerpt: "계산법부터 IRP 이전, 절세 방법까지. 1년 이상 근무했다면 누구나 받는 법정 급여를 한 번에 정리했어요.", author: "M", authorLabel: "AI 작성 · 공식 출처 인용", meta: "3분 · 2026.05.10", slug: "퇴직금" },
  { num: "02", cat: "세금", title: "연말정산 절세 전략", excerpt: "놓치기 쉬운 공제 8가지. 신용카드, 의료비, 교육비 등 직장인이 가장 많이 놓치는 항목과 환급 늘리는 법.", author: "M", authorLabel: "AI 작성 · 공식 출처 인용", meta: "4분 · 2026.05.08", slug: "연말정산" },
  { num: "03", cat: "부동산", title: "전세자금대출 총정리", excerpt: "은행별 한도·금리 비교. 버팀목·일반·신혼부부 중 본인 상황에 맞는 전세대출을 한눈에 확인하세요.", author: "M", authorLabel: "AI 작성 · 공식 출처 인용", meta: "5분 · 2026.05.05", slug: "전세자금대출" },
  { num: "04", cat: "실업급여", title: "실업급여 받는 법", excerpt: "자격부터 신청까지 단계별. 자발적 퇴사·알바·계약직 가능 여부와 헷갈리는 자격 요건을 차근차근 안내해요.", author: "M", authorLabel: "AI 작성 · 공식 출처 인용", meta: "3분 · 2026.05.01", slug: "실업급여" },
  { num: "05", cat: "금융", title: "개인사업자 대출 갈아타기", excerpt: "금리 비교 한 번에. 스마트폰으로 5분, 1금융·2금융 신용대출 금리를 비교하고 갈아타는 가장 빠른 방법.", author: "M", authorLabel: "AI 작성 · 공식 출처 인용", meta: "3분 · 2026.04.28", slug: "개인사업자-신용대출-갈아타기" },
  { num: "06", cat: "법률", title: "이혼 퇴직금 재산분할", excerpt: "대상·청구 조건·절차. 퇴직금이 재산분할 대상인지, 어떤 경우 청구 가능한지 자세히 안내해요.", author: "M", authorLabel: "AI 작성 · 공식 출처 인용", meta: "6분 · 2026.04.22", slug: "이혼-퇴직금-재산분할-대상" },
];

function GuidesSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <h2>이번 주 에디터가 추천하는 가이드</h2>
            <div className="lead">매주 월요일 업데이트 · 공식 출처 인용 기반</div>
          </div>
          <div className="right">
            <Link href="/guides">인기 가이드 전체 →</Link>
          </div>
        </div>

        <div className="guides-grid">
          {GUIDES.map((g) => (
            <Link href={`/w/${g.slug}`} key={g.num} className="guide-card">
              <div className="cover">
                <span className="num">{g.num}</span>
                <span className="cat-pill">{g.cat}</span>
              </div>
              <div className="body">
                <h3>{g.title}</h3>
                <p className="excerpt">{g.excerpt}</p>
                <div className="meta">
                  <span className="author">
                    <span className="av">{g.author}</span>
                    {g.authorLabel}
                  </span>
                  <span>{g.meta}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── Categories 12 ───────── */
const CATS = [
  { name: "부동산", count: 312, slug: "부동산" },
  { name: "세금", count: 248, slug: "세금" },
  { name: "금융·투자", count: 192, slug: "금융" },
  { name: "근로·급여", count: 186, slug: "근로" },
  { name: "실업급여", count: 94, slug: "실업급여" },
  { name: "법률", count: 156, slug: "법률" },
  { name: "복지·지원금", count: 128, slug: "복지" },
  { name: "퇴직·연금", count: 142, slug: "퇴직" },
  { name: "생활경제", count: 98, slug: "생활" },
  { name: "보험", count: 112, slug: "보험" },
  { name: "교육·장학금", count: 76, slug: "교육" },
  { name: "창업·사업", count: 88, slug: "창업" },
];

function CategoriesSection() {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="section-head">
          <div className="left">
            <h2>주제별로 찾아보기</h2>
            <div className="lead">12개 카테고리에 1,961개 검수 문서</div>
          </div>
        </div>
        <div className="cat-row">
          {CATS.map((c) => (
            <Link href={`/category/${c.slug}`} key={c.slug} className="cat-tile">
              <div className="name">{c.name}</div>
              <div className="count t-num">{c.count} 문서</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── Trust Strip ───────── */
const TRUST_SITES = [
  { name: "국세청", url: "https://www.nts.go.kr" },
  { name: "고용노동부", url: "https://www.moel.go.kr" },
  { name: "금융감독원", url: "https://www.fss.or.kr" },
  { name: "국민건강보험", url: "https://www.nhis.or.kr" },
  { name: "홈택스", url: "https://www.hometax.go.kr" },
  { name: "고용보험", url: "https://www.ei.go.kr" },
  { name: "정부24", url: "https://www.gov.kr" },
];

function TrustStrip() {
  return (
    <section className="trust-strip">
      <div className="container row">
        <span className="label-trust">참고 · 공식 출처</span>
        <div className="sites">
          {TRUST_SITES.map((s) => (
            <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer">
              {s.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── Footer ───────── */
function SiteFooter() {
  return (
    <footer className="site-foot">
      <div className="container">
        <div className="cols">
          <div className="brand-col">
            <Link href="/" className="brand">
              <span className="mark">M</span>
              <span>머니위키</span>
            </Link>
            <div className="desc">
              친구가 알려주듯 쉽게, 위키처럼 정확하게. 1,961개 검수 가이드와 8개 30초 계산기.
            </div>
          </div>
          <div>
            <h4>카테고리</h4>
            <ul>
              <li><Link href="/category/부동산">부동산</Link></li>
              <li><Link href="/category/세금">세금</Link></li>
              <li><Link href="/category/금융">금융·투자</Link></li>
              <li><Link href="/category/근로">근로·급여</Link></li>
              <li><Link href="/category/법률">법률</Link></li>
            </ul>
          </div>
          <div>
            <h4>계산기</h4>
            <ul>
              <li><Link href="/w/연봉-실수령액-계산기">연봉 실수령액</Link></li>
              <li><Link href="/w/퇴직금-계산기">퇴직금</Link></li>
              <li><Link href="/w/양도소득세-계산기">양도소득세</Link></li>
              <li><Link href="/w/대출이자-계산기">대출이자</Link></li>
            </ul>
          </div>
          <div>
            <h4>인기 가이드</h4>
            <ul>
              <li><Link href="/w/퇴직금">퇴직금 완벽 가이드</Link></li>
              <li><Link href="/w/연말정산">연말정산 절세</Link></li>
              <li><Link href="/w/전세자금대출">전세자금대출</Link></li>
              <li><Link href="/w/실업급여">실업급여 신청</Link></li>
            </ul>
          </div>
          <div>
            <h4>안내</h4>
            <ul>
              <li><Link href="/about">소개</Link></li>
              <li><Link href="/search">문서 검색</Link></li>
              <li><Link href="/privacy">개인정보처리방침</Link></li>
              <li><Link href="/terms">이용약관</Link></li>
            </ul>
          </div>
        </div>
        <div className="bot">
          <span>© 2026 머니위키. All rights reserved.</span>
          <span>본 사이트의 정보는 참고용이며, 법적 효력이 없습니다.</span>
        </div>
      </div>
    </footer>
  );
}

/* ───────── Kakao FAB ───────── */
function KakaoFab() {
  return (
    <button className="kakao-fab" type="button" aria-label="카톡으로 공유">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3C6.48 3 2 6.48 2 10.8c0 2.78 1.84 5.22 4.6 6.6L5.5 21l4.2-2.4c.74.16 1.51.2 2.3.2 5.52 0 10-3.48 10-7.8S17.52 3 12 3z" />
      </svg>
      카톡으로 공유
    </button>
  );
}
