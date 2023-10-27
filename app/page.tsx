import Link from 'next/link'

import { siteConfig } from '@/config/site'
import { getHadis, getHadisFacets } from '@/lib/searchClient'
import { buttonVariants } from '@/components/ui/button'

import QuickSearch from '@/components/quick-search'
import HadisListView from '@/components/hadis-list-view'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: {}
  searchParams: {}
}

export default async function IndexPage({ searchParams }: PageProps) {
  const filter =
    Object.keys(searchParams).length !== 0
      ? Object.entries(searchParams)
          .map(([key, val]) => `${key}='${val}'`)
          .join(' AND ')
      : ''
  const { hits, facetDistribution } = await getHadis('', filter)
  const { facetHits } = await getHadisFacets('', 'reff')
  // console.log(facets)
  // if (Object.keys(searchParams).length !== 0) {
  //   const filter = Object.entries(searchParams)
  //     .map(([key, val]) => `${key}='${val}'`)
  //     .join(' AND ')
  //   console.log(filter)
  // }
  return (
    <section className='container grid items-center gap-6 pb-8 pt-6 md:py-10'>
      <div className='flex max-w-[980px] flex-col items-start gap-2'>
        <h1 className='text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl'>
          Beautifully designed components <br className='hidden sm:inline' />
          built with Radix UI and Tailwind CSS.
        </h1>
        <p className='max-w-[700px] text-lg text-muted-foreground'>
          Accessible and customizable components that you can copy and paste
          into your apps. Free. Open Source. And Next.js 13 Ready.
        </p>
      </div>
      <div className='flex gap-4'>
        <QuickSearch />
        <Link
          target='_blank'
          rel='noreferrer'
          href={siteConfig.links.github}
          className={buttonVariants({ variant: 'outline' })}
        >
          GitHub
        </Link>
      </div>
      <HadisListView
        searchResults={hits}
        facetDistribution={facetDistribution}
        facets={facetHits}
      />
    </section>
  )
}
