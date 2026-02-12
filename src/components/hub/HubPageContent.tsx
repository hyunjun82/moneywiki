import Link from 'next/link'
import type { HubData } from '@/data/hub/types'
import { SpokeLinks, SectionSpoke, PrevNext } from '@/components/spoke/SpokeBlocks'
import SpokeFAQ from '@/components/spoke/SpokeFAQ'
import SpokeTOCInline from '@/components/spoke/SpokeTOCInline'

/* ═══════════════════════════════════════════
   HubBridge — 허브 전용 BridgeCTA
   허브 데이터는 desc가 string이지만 ReactNode도 수용
   ═══════════════════════════════════════════ */
function HubBridge({ href, badge, title, desc }: {
  href: string
  badge: string
  title: string
  desc: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 mt-8 p-[18px] bg-white border border-neutral-200 rounded-[14px] no-underline transition-all hover:border-[#1E3A5F] hover:shadow-md hover:-translate-y-px"
    >
      <div className="shrink-0 w-[42px] h-[42px] rounded-full bg-gradient-to-br from-[#1E3A5F] to-[#2B5280] flex items-center justify-center text-lg text-white">
        📖
      </div>
      <div className="flex-1 min-w-0">
        <div className="inline-block text-[10px] font-bold text-[#1E3A5F] bg-[#1E3A5F]/[0.08] px-2 py-0.5 rounded-full mb-1 tracking-wide">
          {badge}
        </div>
        <div className="text-[15px] font-bold text-neutral-800 leading-snug">{title}</div>
        <div className="text-xs text-neutral-500 mt-0.5">{desc}</div>
      </div>
      <span className="shrink-0 text-lg text-neutral-400 group-hover:text-[#1E3A5F] group-hover:translate-x-1 transition-all">
        &rarr;
      </span>
    </Link>
  )
}

export default function HubPageContent({ hub, slug }: { hub: HubData; slug: string }) {
  const {
    meta,
    hero,
    toc,
    sections,
    faq,
    spokeGroups,
    sources,
    category,
    prevNext,
  } = hub

  const url = `https://www.jjyu.co.kr/w/${slug}`

  /* ── TOC: 메인 항목만 (sub 제외) ── */
  const tocItems = toc
    .filter(item => !item.sub)
    .map(item => ({ id: item.id, text: item.text }))

  return (
    <>
      {/* ═══ JSON-LD: Article ═══ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: meta.title,
            description: meta.description,
            url,
            author: { '@type': 'Person', name: '머니위키 에디터' },
            publisher: {
              '@type': 'Organization',
              name: '머니위키',
              url: 'https://www.jjyu.co.kr',
            },
            mainEntityOfPage: { '@type': 'WebPage', '@id': url },
          }),
        }}
      />

      {/* ═══ JSON-LD: BreadcrumbList ═══ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: '홈', item: 'https://www.jjyu.co.kr' },
              { '@type': 'ListItem', position: 2, name: category, item: `https://www.jjyu.co.kr/#category-${encodeURIComponent(category)}` },
              { '@type': 'ListItem', position: 3, name: meta.title, item: url },
            ],
          }),
        }}
      />

      {/* ═══ JSON-LD: FAQPage ═══ */}
      {faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faq.map(f => ({
                '@type': 'Question',
                name: f.question,
                acceptedAnswer: { '@type': 'Answer', text: f.answer },
              })),
            }),
          }}
        />
      )}

      <div className="max-w-[720px] mx-auto px-6">
        {/* ═══ Breadcrumb ═══ */}
        <div className="pt-4 text-xs text-neutral-400">
          <Link href="/" className="text-neutral-500 hover:underline">홈</Link>
          <span> › </span>
          <Link href={`/#category-${encodeURIComponent(category)}`} className="text-neutral-500 hover:underline">
            {category}
          </Link>
          <span> › </span>
          <strong className="text-neutral-800">{meta.title}</strong>
        </div>

        <div className="pb-20" data-hub="true">
          {/* ═══════════════════════════════════════
               HERO
             ═══════════════════════════════════════ */}
          <div className="pt-12 pb-10 border-b border-neutral-200 mb-8">
            {/* 배지 */}
            {hero.badge && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1E3A5F]/[0.07] border border-[#1E3A5F]/[0.12] rounded-full text-[11px] font-semibold text-[#1E3A5F] mb-4">
                <span className="w-1.5 h-1.5 bg-[#1E3A5F] rounded-full animate-pulse" />
                {hero.badge}
              </div>
            )}

            {/* H1 */}
            <h1 className="text-[25px] sm:text-[28px] font-extrabold leading-[1.3] tracking-tight text-neutral-900 mb-2">
              {hero.h1}
            </h1>

            {/* 부제목 */}
            {hero.subtitle && (
              <p className="text-[15px] text-neutral-500 leading-relaxed mb-4">
                {hero.subtitle}
              </p>
            )}

            {/* 서론 (ReactNode) */}
            {hero.intro && (
              <div className="mb-4 [&>p]:text-[15px] [&>p]:text-neutral-500 [&>p]:leading-relaxed [&>p]:mb-3 [&_a]:text-[#1E3A5F] [&_a:hover]:underline [&_strong]:text-neutral-800">
                {hero.intro}
              </div>
            )}

            {/* 주요 수치 3칸 */}
            {hero.stats && hero.stats.length > 0 && (
              <div className="grid grid-cols-3 gap-px bg-neutral-200 rounded-xl overflow-hidden my-4">
                {hero.stats.map((stat, i) => (
                  <div key={i} className="bg-white p-4 text-center hover:scale-[1.03] transition-transform">
                    <div className={`text-xl font-bold tracking-tight ${
                      stat.color === 'green' ? 'text-[#1E3A5F]' :
                      stat.color === 'orange' ? 'text-orange-500' : ''
                    }`}>
                      {stat.value}
                    </div>
                    <div className="text-[11px] text-neutral-400 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* ── 인라인 접이식 TOC ── */}
            <SpokeTOCInline items={tocItems} />
          </div>

          {/* ═══════════════════════════════════════
               SECTIONS
             ═══════════════════════════════════════ */}
          {sections.map(section => (
            <section
              key={section.id}
              className="py-12 border-b border-neutral-100"
              id={section.id}
            >
              {/* 넘버링 태그 */}
              <div className="text-[11px] font-extrabold text-[#1E3A5F] uppercase tracking-[1.5px] mb-[3px]">
                {section.tag}
              </div>
              <h2 className="text-[20px] font-extrabold text-neutral-900 leading-[1.35] tracking-tight mb-[3px] scroll-mt-[70px]">
                {section.heading}
              </h2>
              {section.subtitle && (
                <div className="text-[13.5px] text-[#1E3A5F] font-semibold mb-[14px]">
                  {section.subtitle}
                </div>
              )}

              {/* 본문 콘텐츠 (JSX) */}
              <div className="text-[15px] text-neutral-600 leading-[1.76] [&_p]:mb-[14px] [&_strong]:text-neutral-900 [&_strong]:font-bold [&_a]:text-[#1E3A5F] [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-2 [&_h3]:text-[16.5px] [&_h3]:font-extrabold [&_h3]:text-neutral-900 [&_h3]:leading-[1.35] [&_h3]:mt-[22px] [&_h3]:mb-2 [&_h3]:pl-3 [&_h3]:border-l-[3px] [&_h3]:border-[#1E3A5F]">
                {section.content}
              </div>

              {/* BridgeCTA */}
              {section.bridgeCTA && (
                <HubBridge
                  href={section.bridgeCTA.href}
                  badge={section.bridgeCTA.badge}
                  title={section.bridgeCTA.title}
                  desc={section.bridgeCTA.desc}
                />
              )}
            </section>
          ))}

          {/* ═══════════════════════════════════════
               FAQ
             ═══════════════════════════════════════ */}
          {faq.length > 0 && (
            <section className="py-12 border-b border-neutral-100" id="faq">
              <div className="text-[11px] font-extrabold text-[#1E3A5F] uppercase tracking-[1.5px] mb-[3px]">
                FAQ
              </div>
              <h2 className="text-[20px] font-extrabold text-neutral-900 leading-[1.35] tracking-tight mb-6">
                자주 묻는 질문
              </h2>
              <SpokeFAQ items={faq} />
            </section>
          )}

          {/* ═══════════════════════════════════════
               SPOKE GROUPS — 하단 트래픽 분배
             ═══════════════════════════════════════ */}
          {spokeGroups.length > 0 && (
            <section className="py-12" id="spoke-all">
              <div className="text-[11px] font-extrabold text-[#1E3A5F] uppercase tracking-[1.5px] mb-[3px]">
                관련 글 모음
              </div>
              <h2 className="text-[20px] font-extrabold text-neutral-900 leading-[1.35] tracking-tight mb-6">
                더 자세히 알아보기
              </h2>
              {spokeGroups.map((group, gi) => (
                <SpokeLinks
                  key={gi}
                  title={group.title}
                  items={group.spokes.map((spoke, si) => ({
                    num: spoke.badge || String(si + 1).padStart(2, '0'),
                    heading: spoke.title,
                    desc: spoke.desc,
                    href: `/w/${spoke.slug}`,
                  }))}
                />
              ))}
            </section>
          )}

          {/* ═══ 이전/다음 허브 ═══ */}
          {prevNext && (prevNext.prev || prevNext.next) && (
            <PrevNext prev={prevNext.prev} next={prevNext.next} />
          )}

          {/* ═══════════════════════════════════════
               출처 (하단)
             ═══════════════════════════════════════ */}
          {sources.length > 0 && (
            <section className="pt-8 border-t border-neutral-100 mt-4">
              <h2 className="text-sm font-semibold text-neutral-500 mb-3">출처</h2>
              <ul className="space-y-1 text-xs list-none m-0 p-0">
                {sources.map((src, i) => (
                  <li key={i}>
                    <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-[#1E3A5F] hover:underline">
                      {src.name}
                    </a>
                    <span className="text-neutral-400 ml-1">— {src.org}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </>
  )
}
