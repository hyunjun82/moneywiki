import Link from 'next/link'
import type { SpokeData } from '@/data/spoke/types'
import SpokeTOC from '@/components/spoke/SpokeTOC'
import SpokeFAQ from '@/components/spoke/SpokeFAQ'
import { BridgeCTA, QuickAnswer } from '@/components/spoke/SpokeBlocks'

export default function SpokePageContent({ spoke, slug }: { spoke: SpokeData; slug: string }) {
  const { hub, hero, toc, sections, faq, relatedSpokes, sources, breadcrumb } = spoke

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

      {/* JSON-LD: FAQPage */}
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

      {/* TOC (client) */}
      <SpokeTOC items={toc} />

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

        {/* ===== HERO ===== */}
        <div className="pt-12 pb-10 border-b border-neutral-200 mb-12">
          <span className="inline-block text-[11px] font-semibold text-emerald-600 bg-emerald-600/[0.08] px-3 py-1 rounded-full mb-4">{hero.badge}</span>
          <h1 className="text-[32px] sm:text-[32px] font-extrabold leading-tight tracking-tight mb-3">{hero.h1}</h1>
          {hero.intro}
          {(hero as any).quickAnswer && (
            <QuickAnswer
              title={(hero as any).quickAnswer.title}
              body={(hero as any).quickAnswer.body}
              hook={(hero as any).quickAnswer.hook}
            />
          )}
          <BridgeCTA
            href={hub.url}
            badge={hero.hubCTA.badge}
            title={hub.name}
            desc={hero.hubCTA.desc}
            icon="check"
          />
        </div>

        {/* ===== SECTIONS ===== */}
        {sections.map((section) => (
          <section key={section.id} className="py-12 border-b border-neutral-100" id={section.id}>
            <div className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest mb-2">{section.number}</div>
            <h2 className="text-[22px] font-bold tracking-tight mb-2">{section.heading}</h2>
            <div className="text-[13px] text-neutral-500 mb-6">{section.subtitle}</div>

            {section.content}

            {section.content === null && faq.length > 0 && <SpokeFAQ items={faq} />}

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

        {/* ===== 관련 글 ===== */}
        {relatedSpokes.length > 0 && (
          <div className="pt-12">
            <h3 className="text-lg font-bold mb-4">관련 글</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedSpokes.map((card, i) => (
                <Link
                  key={i}
                  href={card.href}
                  className="group p-5 border border-neutral-200 rounded-xl no-underline transition-all hover:border-emerald-600 hover:shadow-md hover:-translate-y-px"
                >
                  <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{card.badge}</div>
                  <div className="text-[15px] font-bold text-neutral-800 mt-1.5 mb-1 leading-snug group-hover:text-emerald-600 transition-colors">{card.title}</div>
                  <div className="text-xs text-neutral-500 leading-relaxed">{card.desc}</div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ===== 허브 복귀 ===== */}
        <Link
          href={hub.url}
          className="group block my-12 p-6 bg-neutral-50 border border-neutral-200 rounded-xl no-underline transition-colors hover:border-emerald-600"
        >
          <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">전체 가이드로 돌아가기</div>
          <div className="text-base font-bold text-neutral-800 mt-1">{hub.name}</div>
          <div className="text-xs text-neutral-500">{hub.name} 보기 &rarr;</div>
        </Link>

        {/* ===== 출처 ===== */}
        {sources.length > 0 && (
          <section className="pt-8 border-t border-neutral-100 mt-4">
            <h2 className="text-sm font-semibold text-neutral-500 mb-3">출처</h2>
            <ul className="list-none p-0 m-0">
              {sources.map((src, i) => (
                <li key={i} className="text-xs text-neutral-400 py-1 leading-relaxed">
                  <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-emerald-600">{src.name}</a> — {src.org}
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
