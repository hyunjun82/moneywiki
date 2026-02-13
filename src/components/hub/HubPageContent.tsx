import Link from 'next/link'
import type { HubData } from '@/data/hub/types'
import { SectionSpoke, StickyBar } from '@/components/spoke/SpokeBlocks'
import SpokeFAQ from '@/components/spoke/SpokeFAQ'
import SpokeTOCInline from '@/components/spoke/SpokeTOCInline'

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
  } = hub

  /* ── optional fields (as any 캐스팅으로 타입 없어도 에러 안 남) ── */
  const summary   = (hub as any).summary   as React.ReactNode[] | undefined
  const source    = (hub as any).source    as { name: string; date: string } | undefined
  const chips     = (hub as any).chips     as { icon: string; label: string; value: string; href?: string }[] | undefined
  const heroCTA   = (hub as any).heroCTA   as { href: string; question: string; answer: React.ReactNode; buttonText: string } | undefined
  const sticky    = (hub as any).sticky    as { label: string; value: string; ctaText: string; ctaTarget: string } | undefined
  const prevNext  = (hub as any).prevNext  as { prev?: { title: string; href: string } | null; next?: { title: string; href: string } | null } | undefined

  const url = `https://www.jjyu.co.kr/w/${slug}`

  /* TOC: H2 + H3 전부 (sub 포함) */
  const tocItems = toc.map(item => ({ id: item.id, text: item.text, sub: item.sub }))

  return (
    <>
      {/* ═══ JSON-LD ═══ */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: meta.title, description: meta.description, url,
        author: { '@type': 'Person', name: '머니위키 에디터' },
        publisher: { '@type': 'Organization', name: '머니위키', url: 'https://www.jjyu.co.kr' },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: 'https://www.jjyu.co.kr' },
          { '@type': 'ListItem', position: 2, name: category, item: `https://www.jjyu.co.kr/#category-${encodeURIComponent(category)}` },
          { '@type': 'ListItem', position: 3, name: meta.title, item: url },
        ],
      })}} />
      {faq.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org', '@type': 'FAQPage',
          mainEntity: faq.map(f => ({
            '@type': 'Question', name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
          })),
        })}} />
      )}

      <div className="max-w-[720px] mx-auto px-5">
        {/* ═══ Breadcrumb ═══ */}
        <div className="sticky top-0 z-[90] bg-white border-b border-neutral-200 py-[10px] -mx-5 px-5">
          <div className="flex items-center gap-[5px] text-[12.5px] text-neutral-400">
            <Link href="/" className="text-neutral-400 no-underline hover:underline">홈</Link>
            <span>›</span>
            <Link href={`/#category-${encodeURIComponent(category)}`} className="text-neutral-400 no-underline hover:underline">{category}</Link>
            <span>›</span>
            <span className="text-neutral-700 font-semibold">{meta.title}</span>
          </div>
        </div>

        <div className="pb-[100px]" data-hub="true">

          {/* ═══ A. HERO ═══ */}
          <div className="pt-8 pb-7 border-b border-neutral-200">

            {/* A1: 배지 (badge 단일 + tags 배열) */}
            {hero.badge && (
              <div className="flex gap-[5px] mb-[14px] flex-wrap">
                <span className="text-[11px] font-bold py-[3px] px-[9px] rounded bg-[#1E3A5F] text-white">
                  {hero.badge}
                </span>
                {(hero as any).tags && (hero as any).tags.map((tag: string, i: number) => (
                  <span key={i} className="text-[11px] font-bold py-[3px] px-[9px] rounded bg-[#EDF2F8] text-[#1E3A5F]">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* A2: H1 — em 태그에 navy 밑줄 */}
            <h1 className="text-[25px] font-extrabold leading-[1.3] text-neutral-900 tracking-[-0.5px] mb-2 [&_em]:not-italic [&_em]:border-b-[2.5px] [&_em]:border-[#1E3A5F] [&_em]:pb-px">
              {hero.h1}
            </h1>

            {/* A3: 서론 */}
            {hero.subtitle && (
              <p className="text-[15px] text-neutral-500 leading-relaxed [&_strong]:text-neutral-900 [&_strong]:font-bold [&_a]:text-[#1E3A5F] [&_a:hover]:underline">
                {hero.subtitle}
              </p>
            )}

            {/* A4: Stats — 하위호환 (골든에선 제거, chips로 대체) */}
            {hero.stats && hero.stats.length > 0 && (
              <div className="grid grid-cols-3 gap-px bg-neutral-200 rounded-xl overflow-hidden mt-4">
                {hero.stats.map((stat: any, i: number) => (
                  <div key={i} className="bg-white p-4 text-center">
                    <div className={`text-xl font-bold tracking-tight ${
                      stat.color === 'orange' ? 'text-orange-500' : 'text-[#1E3A5F]'
                    }`}>{stat.value}</div>
                    <div className="text-[11px] text-neutral-400 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* A5: TOC 접이식 */}
          <SpokeTOCInline items={tocItems} />

          {/* A6: 3줄 요약 */}
          {summary && summary.length > 0 && (
            <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden my-[10px]">
              <div className="px-[18px] py-3 bg-[#F5F8FB] border-b border-neutral-200 text-[13px] font-bold text-[#1E3A5F] flex items-center gap-[6px]">
                📋 3줄 요약
              </div>
              <div className="px-[18px] py-[14px]">
                <ul className="list-none m-0 p-0">
                  {summary.map((item, i) => (
                    <li key={i} className="text-[14px] text-neutral-700 py-[5px] pl-[18px] relative leading-relaxed [&_strong]:text-neutral-900 [&_strong]:font-bold">
                      <span className="absolute left-px top-3 w-1.5 h-1.5 rounded-full bg-[#1E3A5F]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* A7: 출처바 */}
          {source && (
            <div className="flex items-center justify-between bg-white border border-neutral-200 rounded-lg py-[11px] px-[14px] my-2">
              <div className="flex items-center gap-2">
                <span className="bg-[#1E3A5F] text-white text-[10.5px] font-bold py-[2px] px-[7px] rounded-[3px]">출처</span>
                <span className="text-[13.5px] font-bold text-neutral-900">{source.name}</span>
              </div>
              <span className="text-[12px] text-neutral-400">{source.date}</span>
            </div>
          )}

          {/* A8: 4칩 카드 (앵커 링크) */}
          {chips && chips.length > 0 && (
            <div className="grid grid-cols-4 gap-2 my-3">
              {chips.map((chip, i) => {
                const inner = (
                  <>
                    <div className="text-xl mb-[3px]">{chip.icon}</div>
                    <div className="text-[10.5px] text-neutral-400 mb-[2px]">{chip.label}</div>
                    <div className="text-[12px] font-extrabold text-[#1E3A5F] leading-tight">{chip.value}</div>
                  </>
                )
                return chip.href ? (
                  <a key={i} href={chip.href} className="bg-white border border-neutral-200 rounded-lg px-[6px] py-3 text-center no-underline transition-all hover:border-[#4A7AB5] hover:shadow-md hover:-translate-y-0.5 block">
                    {inner}
                  </a>
                ) : (
                  <div key={i} className="bg-white border border-neutral-200 rounded-lg px-[6px] py-3 text-center">
                    {inner}
                  </div>
                )
              })}
            </div>
          )}

          {/* A9: 히어로 PAS CTA (체커로 이동) */}
          {heroCTA && (
            <a
              href={heroCTA.href}
              className="group block rounded-xl p-[18px_20px] my-4 bg-white border-[1.5px] border-neutral-200 no-underline transition-all relative overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-[#1E3A5F] hover:border-[#4A7AB5] hover:shadow-[0_4px_16px_rgba(30,58,95,0.08)] hover:-translate-y-px"
            >
              <div className="text-[15px] font-extrabold text-neutral-900 leading-[1.4] mb-2">{heroCTA.question}</div>
              <div className="text-[13.5px] text-neutral-500 leading-relaxed mb-3 [&_strong]:text-[#1E3A5F] [&_strong]:font-bold">{heroCTA.answer}</div>
              <span className="inline-flex items-center gap-1 bg-[#1E3A5F] text-white text-[12.5px] font-bold py-2 px-4 rounded-md transition-colors group-hover:bg-[#2B5280]">
                {heroCTA.buttonText}
              </span>
            </a>
          )}

          {/* ═══ B. SECTIONS ═══ */}
          {sections.map(section => (
            <section key={section.id} className="py-7 border-b border-neutral-100" id={section.id}>
              <div className="text-[11px] font-extrabold text-[#1E3A5F] uppercase tracking-[1.5px] mb-[3px]">
                {section.tag}
              </div>
              <h2 className="text-[20px] font-extrabold text-neutral-900 leading-[1.35] tracking-[-0.3px] mb-[3px] scroll-mt-[70px]">
                {section.heading}
              </h2>
              {section.subtitle && (
                <div className="text-[13.5px] text-[#1E3A5F] font-bold mb-[14px]">
                  {section.subtitle}
                </div>
              )}
              <div className="text-[15px] text-neutral-700 leading-[1.76] [&_p]:mb-[14px] [&_strong]:text-neutral-900 [&_strong]:font-bold [&_a]:text-[#1E3A5F] [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-2 [&_h3]:text-[16.5px] [&_h3]:font-extrabold [&_h3]:text-neutral-900 [&_h3]:leading-[1.35] [&_h3]:mt-[22px] [&_h3]:mb-2 [&_h3]:pl-3 [&_h3]:border-l-[3px] [&_h3]:border-[#1E3A5F]">
                {section.content}
              </div>
              {/* checkerConfig는 이제 content에 직접 포함 (클라이언트 컴포넌트로 분리) */}
              {section.sectionSpoke && section.sectionSpoke.length > 0 && (
                <SectionSpoke items={section.sectionSpoke} />
              )}
              {section.bridgeCTA && (
                <Link
                  href={section.bridgeCTA.href}
                  className="group block rounded-xl p-[18px_20px] mt-4 bg-white border-[1.5px] border-neutral-200 no-underline transition-all relative overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-[#1E3A5F] hover:border-[#4A7AB5] hover:shadow-[0_4px_16px_rgba(30,58,95,0.08)] hover:-translate-y-px"
                >
                  <div className="text-[15px] font-extrabold text-neutral-900 leading-[1.4] mb-2">
                    {section.bridgeCTA.title}
                  </div>
                  <div className="text-[13.5px] text-neutral-500 leading-relaxed mb-3 [&_strong]:text-[#1E3A5F] [&_strong]:font-bold">
                    {section.bridgeCTA.desc}
                  </div>
                  <span className="inline-flex items-center gap-1 bg-[#1E3A5F] text-white text-[12.5px] font-bold py-2 px-4 rounded-md transition-colors group-hover:bg-[#2B5280]">
                    {section.bridgeCTA.badge} →
                  </span>
                </Link>
              )}
            </section>
          ))}

          {/* ═══ C. FAQ ═══ */}
          {faq.length > 0 && (
            <section className="py-7 border-b border-neutral-100" id="faq">
              <div className="text-[11px] font-extrabold text-[#1E3A5F] uppercase tracking-[1.5px] mb-[3px]">FAQ</div>
              <h2 className="text-[20px] font-extrabold text-neutral-900 leading-[1.35] tracking-tight mb-6">자주 묻는 질문</h2>
              <SpokeFAQ items={faq} />
            </section>
          )}

          {/* ═══ SPOKE GROUPS (📂 + 그룹별 아이콘 + 01~번호) ═══ */}
          {spokeGroups.length > 0 && (
            <section className="py-7" id="spoke-all">
              <div className="text-[14px] font-extrabold text-neutral-900 mb-[10px] flex items-center gap-[6px]">
                📂 이 주제의 상세 가이드
              </div>
              {(() => {
                let globalIdx = 0
                return spokeGroups.map((group, gi) => (
                  <div key={gi} className="mt-5 first:mt-0">
                    <div className="text-[12.5px] font-bold text-[#1E3A5F] py-2">
                      {group.title}
                    </div>
                    <div className="flex flex-col gap-1">
                      {group.spokes.map((spoke) => {
                        globalIdx++
                        const num = String(globalIdx).padStart(2, '0')
                        return (
                          <Link
                            key={spoke.slug}
                            href={`/w/${spoke.slug}`}
                            className="flex items-center gap-3 p-[13px_15px] bg-white border border-neutral-200 rounded-lg no-underline transition-all hover:border-[#4A7AB5] hover:shadow-[0_2px_8px_rgba(30,58,95,0.06)] hover:-translate-y-px"
                          >
                            <span className="text-[11px] font-extrabold text-[#1E3A5F] bg-[#EDF2F8] w-[26px] h-[26px] rounded-md flex items-center justify-center shrink-0">
                              {num}
                            </span>
                            <div className="flex-1 min-w-0">
                              <div className="text-[13.5px] font-bold text-neutral-900 leading-snug">{spoke.title}</div>
                              <div className="text-[11px] text-neutral-400 mt-px">{spoke.desc}</div>
                            </div>
                            <span className="text-[13px] text-neutral-400 shrink-0">→</span>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                ))
              })()}
            </section>
          )}

          {/* ═══ PrevNext ═══ */}
          {prevNext && (prevNext.prev || prevNext.next) && (
            <div className="grid grid-cols-2 gap-[10px] my-5">
              {prevNext.prev ? (
                <Link href={prevNext.prev.href} className="flex flex-col p-[14px_16px] bg-white border border-neutral-200 rounded-lg no-underline transition-all hover:border-[#4A7AB5] hover:shadow-[0_2px_8px_rgba(30,58,95,0.06)]">
                  <div className="text-[11px] text-neutral-400 mb-1">← 이전 글</div>
                  <div className="text-[13px] font-bold text-[#1E3A5F] leading-snug">{prevNext.prev.title}</div>
                </Link>
              ) : <div />}
              {prevNext.next ? (
                <Link href={prevNext.next.href} className="flex flex-col p-[14px_16px] bg-white border border-neutral-200 rounded-lg no-underline text-right transition-all hover:border-[#4A7AB5] hover:shadow-[0_2px_8px_rgba(30,58,95,0.06)]">
                  <div className="text-[11px] text-neutral-400 mb-1">다음 글 →</div>
                  <div className="text-[13px] font-bold text-[#1E3A5F] leading-snug">{prevNext.next.title}</div>
                </Link>
              ) : <div />}
            </div>
          )}

          {/* ═══ 출처 (하단) ═══ */}
          {sources.length > 0 && (
            <section className="pt-8 border-t border-neutral-100 mt-4">
              <h2 className="text-sm font-semibold text-neutral-500 mb-3">출처</h2>
              <ul className="space-y-1 text-xs list-none m-0 p-0">
                {sources.map((src, i) => (
                  <li key={i}>
                    <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-[#1E3A5F] hover:underline">{src.name}</a>
                    <span className="text-neutral-400 ml-1">— {src.org}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>

      {/* ═══ 허브 전용 Sticky Bar ═══ */}
      {sticky && (
        <StickyBar
          topLabel={sticky.label}
          value={sticky.value}
          buttonText={sticky.ctaText}
          scrollTo={sticky.ctaTarget}
        />
      )}
    </>
  )
}
