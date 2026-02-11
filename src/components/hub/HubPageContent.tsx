import Link from 'next/link'
import type { HubData } from '@/data/hub/types'
import HubFloatingTOC from './HubTOC'
import { ArticleSchema, FAQSchema, BreadcrumbSchema } from '@/components/JsonLd'
import { HubBridgeCTA } from '@/components/hub/HubBlocks'

export default function HubPageContent({ hub, slug }: { hub: HubData; slug: string }) {
  const url = `https://www.jjyu.co.kr/w/${slug}`

  const breadcrumbItems = [
    { name: '홈', url: 'https://www.jjyu.co.kr' },
    { name: hub.category, url: `https://www.jjyu.co.kr/#category-${encodeURIComponent(hub.category)}` },
    { name: hub.meta.title, url },
  ]

  return (
    <>
      {/* JSON-LD 스키마 */}
      <ArticleSchema
        title={hub.meta.title}
        description={hub.meta.description}
        url={url}
        datePublished={new Date().toISOString().split('T')[0]}
        dateModified={new Date().toISOString().split('T')[0]}
        keywords={hub.meta.keywords}
        category={hub.category}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      {hub.faq.length > 0 && <FAQSchema items={hub.faq} />}

      <div data-hub="true" className="relative">
        {/* 플로팅 TOC — 데스크톱만 */}
        <HubFloatingTOC items={hub.toc} />

        <div className="max-w-[720px] mx-auto px-6">
          {/* ===== Hero ===== */}
          <div className="py-12 pb-10 border-b border-neutral-200">
            {/* 브레드크럼 */}
            <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-6" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-black transition-colors">홈</Link>
              <span aria-hidden="true">/</span>
              <Link href={`/#category-${encodeURIComponent(hub.category)}`} className="hover:text-black transition-colors">
                {hub.category}
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-black" aria-current="page">{hub.meta.title}</span>
            </nav>

            {/* 배지 */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1E3A5F]/[0.07] border border-[#1E3A5F]/[0.12] rounded-full text-[11px] font-semibold text-[#1E3A5F] mb-4">
              <span className="w-1.5 h-1.5 bg-[#1E3A5F] rounded-full animate-pulse" />
              {hub.hero.badge}
            </div>

            {/* H1 */}
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-[1.15] mb-3">
              {hub.hero.h1}
            </h1>

            {/* 부제목 */}
            <p className="text-base text-neutral-500 leading-relaxed mb-4">
              {hub.hero.subtitle}
            </p>

            {hub.hero.intro && (
              <div className="mb-7 [&>p]:text-base [&>p]:text-neutral-500 [&>p]:leading-relaxed [&>p]:mb-3 [&_a]:text-blue-600 [&_a:hover]:underline [&_strong]:text-neutral-800">
                {hub.hero.intro}
              </div>
            )}

            {/* 주요 수치 3칸 */}
            {hub.hero.stats && hub.hero.stats.length > 0 && (
              <div className="grid grid-cols-3 gap-px bg-neutral-200 rounded-xl overflow-hidden">
                {hub.hero.stats.map((stat, i) => (
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
          </div>

          {/* ===== 섹션 목록 ===== */}
          {hub.sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="py-12 border-b border-neutral-100 last:border-b-0"
            >
              <div className="text-[11px] font-bold uppercase tracking-wide text-[#1E3A5F] mb-1.5">
                {section.tag}
              </div>
              <h2 className="text-[22px] font-bold tracking-tight mb-1.5 scroll-mt-[70px]">
                {section.heading}
              </h2>
              <div className="text-sm text-neutral-500 mb-6">
                {section.subtitle}
              </div>
              {/* 본문: p, h3, strong, a 등 기본 스타일 */}
              <div className="text-[15px] text-neutral-700 leading-relaxed [&>p]:mb-3.5 [&>h3]:text-base [&>h3]:font-bold [&>h3]:mt-8 [&>h3]:mb-2.5 [&>h3]:pl-3 [&>h3]:border-l-[3px] [&>h3]:border-[#1E3A5F] [&_strong]:text-neutral-900 [&_strong]:font-semibold [&_a:not(.hub-cta)]:text-blue-600 [&_a:not(.hub-cta):hover]:underline">
                {section.content}
              </div>

              {section.bridgeCTA && (
                <HubBridgeCTA
                  href={section.bridgeCTA.href}
                  badge={section.bridgeCTA.badge}
                  title={section.bridgeCTA.title}
                  desc={section.bridgeCTA.desc}
                />
              )}
            </section>
          ))}

          {/* ===== 스포크 링크 ===== */}
          {hub.spokeGroups.length > 0 && (
            <section className="py-12 border-b border-neutral-100">
              <div className="text-[11px] font-bold uppercase tracking-wide text-[#1E3A5F] mb-1.5">
                관련 글
              </div>
              <h2 className="text-[22px] font-bold tracking-tight mb-6 scroll-mt-[70px]">
                더 자세히 알아보기
              </h2>

              {hub.spokeGroups.map((group, gi) => (
                <div key={gi} className={gi > 0 ? 'mt-8' : ''}>
                  {hub.spokeGroups.length > 1 && (
                    <h3 className="text-base font-bold pl-3 border-l-[3px] border-[#1E3A5F] mb-3">
                      {group.title}
                    </h3>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {group.spokes.map((spoke) => (
                      <Link
                        key={spoke.slug}
                        href={`/w/${spoke.slug}`}
                        className="group border border-neutral-200 rounded-xl p-5 hover:border-[#1E3A5F] hover:shadow-md hover:-translate-y-0.5 transition-all no-underline"
                      >
                        <span className="inline-block text-[10px] font-bold py-0.5 px-2 bg-[#1E3A5F]/10 text-[#1E3A5F] rounded mb-2">
                          {spoke.badge}
                        </span>
                        <div className="text-sm font-semibold text-neutral-800 group-hover:text-[#1E3A5F] transition-colors">
                          {spoke.title}
                        </div>
                        <div className="text-xs text-neutral-500 mt-1">{spoke.desc}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* ===== FAQ ===== */}
          {hub.faq.length > 0 && (
            <section className="py-12 border-b border-neutral-100">
              <div className="text-[11px] font-bold uppercase tracking-wide text-[#1E3A5F] mb-1.5">
                FAQ
              </div>
              <h2 className="text-[22px] font-bold tracking-tight mb-6 scroll-mt-[70px]">
                자주 묻는 질문
              </h2>
              <div className="space-y-2">
                {hub.faq.map((item, i) => (
                  <details key={i} className="group border border-neutral-200 rounded-xl overflow-hidden">
                    <summary className="flex items-center justify-between p-[14px_18px] cursor-pointer text-[13px] font-semibold select-none hover:bg-neutral-50 transition-colors">
                      <span className="pr-4">{item.question}</span>
                      <span className="text-neutral-400 group-open:rotate-45 transition-transform text-lg shrink-0">+</span>
                    </summary>
                    <div
                      className="px-[18px] pb-[14px] text-[13px] text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3"
                      dangerouslySetInnerHTML={{ __html: item.answer }}
                    />
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* ===== 출처 ===== */}
          {hub.sources.length > 0 && (
            <section className="py-8">
              <div className="text-xs font-semibold text-neutral-400 mb-3">출처</div>
              <ul className="space-y-1 text-xs list-none m-0 p-0">
                {hub.sources.map((src, i) => (
                  <li key={i}>
                    <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
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
