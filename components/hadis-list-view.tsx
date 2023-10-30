import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import FacetList from './facet-list'
import QuickSearch from '@/components/quick-search'
import { Button } from './ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
interface HitsProps {
  id: string
  title: string
  url: string
  textArab: string
  textMalay: string
  status: string
  commentTitle: string
  commentBody: string
  reff: string
}

interface Props {
  searchResults: HitsProps[]
  facetDistribution: {}
  facets: []
  pagingItm?: (number | string)[]
  searchInfo: {}
}

export default function HadisListView({
  searchResults,
  facetDistribution,
  facets,
  pagingItm,
  searchInfo,
}: Props) {
  // console.log(searchInfo)
  return (
    <div>
      <div className='flex justify-between gap-4 py-4'>
        <QuickSearch />
        <div className='flex'>
          <Button variant='ghost'>
            <ChevronLeft className='h-4 w-4' />
          </Button>
          {pagingItm?.map((itm, idx) => (
            <Button variant='ghost' key={idx}>
              {itm}
            </Button>
          ))}
          <Button variant='ghost'>
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>
        {/* <Link */}
        {/*   target='_blank' */}
        {/*   rel='noreferrer' */}
        {/*   href={siteConfig.links.github} */}
        {/*   className={buttonVariants({ variant: 'outline' })} */}
        {/* > */}
        {/*   GitHub */}
        {/* </Link> */}
      </div>

      <div className='flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10'>
        <aside className='fixed top-14 z-30  hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block'>
          <FacetList facetDistribution={facetDistribution} facets={facets} />
        </aside>

        <main className='relative xl:grid xl:grid-cols-[1fr_300px]'>
          <div className='mx-auto w-full min-w-0 space-y-5'>
            {searchResults.map((itm: any) => (
              <Card key={itm.id}>
                <CardHeader>
                  <CardTitle>{itm.title}</CardTitle>
                  <CardDescription>{itm.textArab}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{itm.commentBody}</p>
                </CardContent>
                <CardFooter>
                  <p>{itm.status}</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
