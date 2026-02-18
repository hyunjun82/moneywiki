import Link from 'next/link'
import type { SpokeData } from '@/data/spoke/types'
import {
  BridgeCTA,
  PASBridge,
  QuickAnswer,
  Summary3,
  SourceBar,
  SpokeLinks,
  PrevNext,
  StickyBar,
} from '@/components/spoke/SpokeBlocks'
import SpokeFAQ from '@/components/spoke/SpokeFAQ'
import SpokeTOCInline from '@/components/spoke/SpokeTOCInline'

export default function SpokePageContent({ spoke, slug }: { spoke: SpokeData; slug: string }) {
  const {
    hub,
    hero,
    toc,
    sections,
    faq,
    relatedSpokes,
    sources,
    breadcrumb,
    summary3,
    sourceBar,
    prevNext,
    stickyBar,
  } = spoke

  return (
    <>
      {/* JSON-LD: BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: '홈', item: 'https://jjyu.co.kr' },
              { '@type': 'ListItem', position: 2, name: hub.name, item: `https://jjyu.co.kr${hub.url}` },
              { '@type': 'ListItem', position: 3, name: breadcrumb[breadcrumb.length - 1], item: `https://jjyu.co.kr/w/${slug}` },
            ],
          }),
        }}
      />

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
                acceptedAnswer: { '@type': 'Answer', text: f.answer.replace(/<[^>]+>/g, '') },
              })),
            }),
          }}
        />
      )}

      <div className="max-w-[720px] mx-auto px-6">
        {/* Breadcrumb */}
        <div className="pt-4 text-xs text-neutral-400">
          <Link href={hub.url} className="text-neutral-500 hover:underline">{hub.name}</Link>
          {breadcrumb.map((seg, i) => (
            <span key={i}>
              {' › '}
              {i === breadcrumb.length - 1
                ? <strong className="text-neutral-800">{seg}</strong>
                : seg
              }
            </span>
          ))}
        </div>

        <div className="pb-20" data-spoke="true">

          {/* ═══ HERO ═══ */}
          <div className="pt-12 pb-10 border-b border-neutral-200 mb-8">
            <span className="inline-block text-[11px] font-semibold text-[#1E3A5F] bg-[#1E3A5F]/[0.08] px-3 py-1 rounded-full mb-4">
              {hero.badge}
            </span>
            <h1 className="text-[32px] sm:text-[32px] font-extrabold leading-tight tracking-tight mb-3">
              {hero.h1}
            </h1>
            {hero.intro}

            {(hero as any).quickAnswer && (
              <QuickAnswer
                title={(hero as any).quickAnswer.title}
                body={(hero as any).quickAnswer.body}
                hook={(hero as any).quickAnswer.hook}
              />
            )}

            {/* 인라인 접이식 TOC */}
            <SpokeTOCInline items={toc} />

            {/* 3줄 요약 */}
            {summary3 && summary3.length > 0 && (
              <Summary3 items={summary3} />
            )}

            {/* 공식 출처 바 */}
            {sourceBar && (
              <SourceBar
                badge={sourceBar.badge}
                name={sourceBar.name}
                date={sourceBar.date}
              />
            )}

            {/* Hub CTA */}
            <BridgeCTA
              href={hub.url}
              badge={hero.hubCTA.badge}
              title={hub.name}
              desc={hero.hubCTA.desc}
              icon="check"
            />
          </div>

          {/* ═══ SECTIONS ═══ */}
          {sections.map((section) => (
            <section key={section.id} className="py-12 border-b border-neutral-100" id={section.id}>
              <div className="text-[11px] font-bold text-[#1E3A5F] uppercase tracking-widest mb-2">
                {section.number}
              </div>
              <h2 className="text-[22px] font-bold tracking-tight mb-2">
                {section.heading}
              </h2>
              <div className="text-[13px] text-neutral-500 mb-6">
                {section.subtitle}
              </div>

              {section.content}

              {/* checkerConfig는 이제 content에 직접 포함 (클라이언트 컴포넌트로 분리) */}

              {section.content === null && faq.length > 0 && <SpokeFAQ items={faq} />}

              {section.pasBridge && (
                <PASBridge
                  href={section.pasBridge.href}
                  question={section.pasBridge.question}
                  answer={section.pasBridge.answer}
                  buttonText={section.pasBridge.buttonText}
                />
              )}

              {section.bridgeCTA && (
                <BridgeCTA
                  href={section.bridgeCTA.href}
                  badge={section.bridgeCTA.badge}
                  title={section.bridgeCTA.title}
                  desc={section.bridgeCTA.desc}
                  icon={section.bridgeCTA.icon}
                  primary={section.bridgeCTA.primary}
                />
              )}
            </section>
          ))}

          {/* ═══ 이전/다음 ═══ */}
          {prevNext && (
            <PrevNext
              prev={prevNext.prev || (hub ? { title: hub.name, href: hub.url } : undefined)}
              next={prevNext.next || (hub ? { title: hub.name, href: hub.url } : undefined)}
            />
          )}

          {/* ═══ 관련 글 (세로 리스트) ═══ */}
          {relatedSpokes.length > 0 && (
            <div className="pt-8">
              <SpokeLinks
                title="관련 글"
                items={relatedSpokes.map((card, i) => ({
                  num: String(i + 1).padStart(2, '0'),
                  heading: card.title,
                  desc: card.desc,
                  href: card.href,
                }))}
              />
            </div>
          )}

          {/* ═══ 허브 복귀 ═══ */}
          <Link
            href={hub.url}
            className="group block my-8 p-6 bg-neutral-50 border border-neutral-200 rounded-xl no-underline transition-colors hover:border-[#1E3A5F]"
          >
            <div className="text-[10px] font-bold text-[#1E3A5F] uppercase tracking-widest">전체 가이드로 돌아가기</div>
            <div className="text-base font-bold text-neutral-800 mt-1">{hub.name}</div>
            <div className="text-xs text-neutral-500">{hub.name} 보기 &rarr;</div>
          </Link>

          {/* ═══ 출처 ═══ */}
          {sources.length > 0 && (
            <section className="pt-8 border-t border-neutral-100 mt-4">
              <h2 className="text-sm font-semibold text-neutral-500 mb-3">출처</h2>
              <ul className="list-none p-0 m-0">
                {sources.map((src, i) => (
                  <li key={i} className="text-xs text-neutral-400 py-1 leading-relaxed">
                    <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-[#1E3A5F]">{src.name}</a>
                    {' — '}{src.org}
                  </li>
                ))}
              </ul>
            </section>
          )}

        </div>
      </div>

      {/* ═══ 스티키 바 ═══ */}
      {stickyBar && (
        <StickyBar
          topLabel={stickyBar.topLabel}
          value={stickyBar.value}
          buttonText={stickyBar.buttonText}
          href={stickyBar.href}
          scrollTo={stickyBar.scrollTo}
        />
      )}
    </>
  )
}
