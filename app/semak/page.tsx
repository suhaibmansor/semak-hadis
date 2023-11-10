import Balancer from 'react-wrap-balancer'
import Markdown from 'react-markdown'

import { getHadis, getHadisFacets, getDocDetails } from '@/lib/searchClient'
import { usePagination } from '@/lib/computePaging'

import { ScrollArea } from '@/components/ui/scroll-area'
import QuickSearch from '@/components/quick-search'
import SideFacet from '@/components/side-facet'
import PagingBar from '@/components/paging-bar'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface PageProps {
  params: {}
  searchParams: { q?: string; reff?: string; status?: string; page?: string }
}

// export const dynamic = 'force-dynamic'
export default async function SemakPage({ searchParams }: PageProps) {
  const query: any = searchParams.q || '*'
  const currentPage: number = searchParams.page
    ? parseInt(searchParams.page)
    : 1
  // const currentPage: number = 1
  const filter =
    Object.keys(searchParams).length !== 0
      ? Object.entries(searchParams)
          .filter(([key]) => key !== 'q' && key !== 'page')
          .map(([key, val]) => `${key}='${val}'`)
          .join(' AND ')
      : ''
  // console.log('this is filter:', filter)
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
  // console.log(searchParams, 'This is search params')
  const searchInfo =
    Object.keys(searchParams).length !== 0
      ? {
          currentPage: page,
          processingTimeMs,
          total: totalHits,
          query: searchParams.q,
        }
      : {}
  // console.log(searchParams)
  return (
    <>
      <aside className='fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block'>
        <ScrollArea className='h-full py-6 pl-8 pr-6 lg:py-8'>
          <SideFacet facet={facetHits} facetDist={facetDistribution} />
        </ScrollArea>
      </aside>
      <main className='relative lg:gap-10 xl:grid xl:grid-cols-[1fr_300px]'>
        <div className='mx-auto w-full min-w-0'>
          <section className='grid items-center gap-6 pb-8 md:py-6'>
            <div className='flex max-w-[980px] flex-col items-start gap-2'>
              <h1 className='text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl'>
                Adakah hadis yang kita tahu adalah sahih?
                <br className='hidden sm:inline' />
                Ayuh semak sebelum sebar.
              </h1>
              <div className='max-w-[700px] flex items-center'>
                <p className='text-lg text-muted-foreground'>
                  {total} hadis telah dikumpulkan dari pelbagai karya pengkaji
                  hadis untuk anda membuat semakan.
                </p>
              </div>
            </div>
          </section>
          <div className='sticky top-16 -mt-6 py-5 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
            {/* <div className='mb-4 flex items-center space-x-1 text-sm text-muted-foreground'> */}
            {/* <div className='overflow-hidden text-ellipsis whitespace-nowrap'> */}
            {/*   Docs */}
            {/* </div> */}
            {/* <ChevronRight className='h-4 w-4 ' /> */}
            {/* <div className='font-medium text-foreground'>Scroll-area</div> */}
            {/* </div> */}
            <div className='space-y-4'>
              {/* <h1 */}
              {/*   className={cn('scroll-m-20 text-4xl font-bold tracking-tight')} */}
              {/* > */}
              {/*   title */}
              {/* </h1> */}
              <QuickSearch />
              <p className='text-sm text-foreground'>
                <Balancer>
                  Menjumpai ~{searchInfo.total} hadis (
                  {searchInfo.processingTimeMs / 1000} s)
                </Balancer>
              </p>
            </div>
          </div>
          <div className='space-y-2'>
            <div className='pb-12 pt-8 space-y-3'>
              {hits.map((itm: any) => (
                <Card key={itm.id}>
                  <CardHeader>
                    <CardTitle className='leading-normal'>
                      <Balancer>
                        <Markdown
                          components={{
                            strong(props) {
                              const { node, ...rest } = props
                              return (
                                <strong
                                  className='px-0.5 rounded bg-muted-foreground text-muted'
                                  {...rest}
                                />
                              )
                            },
                          }}
                        >
                          {itm._formatted.title}
                        </Markdown>
                      </Balancer>
                    </CardTitle>
                    <CardDescription>{itm.textArab}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Markdown
                      components={{
                        strong(props) {
                          const { node, ...rest } = props
                          return (
                            <strong
                              className='px-1 rounded bg-muted-foreground text-muted'
                              {...rest}
                            />
                          )
                        },
                      }}
                    >
                      {itm._formatted.commentBody}
                    </Markdown>
                  </CardContent>
                  <CardFooter>
                    <p>{itm.status}</p>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <PagingBar pagingItm={pagingItm} searchInfo={searchInfo} />
          </div>
        </div>
      </main>
    </>
  )
}
