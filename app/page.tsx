import Link from 'next/link'

import { siteConfig } from '@/config/site'
import { getHadis, getHadisFacets, getDocDetails } from '@/lib/searchClient'
import { usePagination } from '@/lib/computePaging'
import { buttonVariants } from '@/components/ui/button'

import QuickSearch from '@/components/quick-search'
import HadisListView from '@/components/hadis-list-view'

// export const dynamic = 'force-dynamic'

interface PageProps {
  params: {}
  searchParams: { q?: string; reff?: string; status?: string; page?: number }
}

export default async function IndexPage({ searchParams }: PageProps) {
  const query: any = searchParams.q || '*'
  const currentPage: number = searchParams.page || 1
  const filter =
    Object.keys(searchParams).length !== 0
      ? Object.entries(searchParams)
          .filter(([key]) => key !== 'q')
          .map(([key, val]) => `${key}='${val}'`)
          .join(' AND ')
      : ''
  const {
    hits,
    facetDistribution,
    processingTimeMs,
    hitsPerPage,
    totalHits,
    page,
  } = await getHadis(query, currentPage, filter)

  const { facetHits } = await getHadisFacets('', 'reff')
  const { total } = await getDocDetails()

  const pagingItm =
    Object.keys(searchParams).length !== 0
      ? usePagination({
          totalCount: totalHits,
          pageSize: hitsPerPage,
          currentPage: page,
          siblingCount: 1,
        })
      : []
  // console.log(rest)
  const searchInfo =
    Object.keys(searchParams).length !== 0
      ? {
          currentPage: page,
          processingTimeMs,
          total: totalHits,
          query: searchParams.q,
        }
      : {}
  return (
    <section className='container grid items-center gap-6 pb-8 pt-6 md:py-10'>
      <div className='flex max-w-[980px] flex-col items-start gap-2'>
        <h1 className='text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl'>
          Adakah hadis yang kita tahu adalah sahih?
          <br className='hidden sm:inline' />
          Ayuh semak sebelum sebar.
        </h1>
        <div className='max-w-[700px] flex items-center'>
          <p className='text-lg text-muted-foreground'>
            {total} hadis telah dikumpulkan dari pelbagai karya pengkaji hadis
            untuk anda membuat semakan.
          </p>
        </div>
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
        pagingItm={pagingItm}
        searchInfo={searchInfo}
      />
    </section>
  )
}
