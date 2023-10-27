'use client'
import { useCallback } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Checkbox } from '@/components/ui/checkbox'
// import { Badge } from '@/components/ui/badge'
interface FacetProps {
  name: string
  count: number
}

interface Props {
  facetDistribution: { [key: string]: any }
  facets: { value: string; count: number }[]
}

function convertToObj(facet: Record<string, number>): FacetProps[] {
  const convObj = Object.entries(facet).map(([key, val]) => ({
    name: key,
    count: val,
  }))
  return convObj
}

export default function FacetList({ facets, facetDistribution }: Props) {
  // console.log(facets)
  // console.log(facetDistribution)
  const reffFacet = convertToObj(facetDistribution.reff)
  // const facetReff = facets.slice().sort((a, b) => b.count - a.count)
  const statFacet = convertToObj(facetDistribution.status)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()!

  const createQueryString = useCallback(
    (name: string, value: string, isChecked: boolean) => {
      const params = new URLSearchParams(searchParams)
      if (isChecked) {
        params.set(name, value)
      } else {
        params.delete(name, value)
      }
      // console.log(params)
      return params.toString()
    },
    [searchParams]
  )
  console.log(searchParams.get('reff'))
  return (
    <Card>
      <CardHeader>
        <CardTitle>Glosari</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent className='space-y-7'>
        <div>
          <div className='flex justify-between'>
            <p>Pengkaji</p>
            <p>{reffFacet.length}</p>
          </div>

          {reffFacet.map((itm, idx) => (
            <div className='flex items-start space-x-2 my-2 text-sm' key={idx}>
              <Checkbox
                checked={itm.name === searchParams.get('reff')}
                onCheckedChange={(checked) =>
                  //console.log(typeof checked)
                  router.push(
                    pathname +
                      '?' +
                      createQueryString('reff', itm.name, checked as boolean)
                  )
                }
              />

              <p className='grow truncate leading-none'>{itm.name}</p>
              <p className='flex-none font-bold leading-none'>{itm.count}</p>
            </div>
          ))}
        </div>
        <div>
          <p>Status</p>
          {statFacet.map((itm, idx) => (
            <div className='flex items-start space-x-2 my-2 text-sm' key={idx}>
              <Checkbox
                checked={itm.name === searchParams.get('status')}
                onCheckedChange={(checked) =>
                  //console.log(typeof checked)
                  router.push(
                    pathname +
                      '?' +
                      createQueryString('status', itm.name, checked as boolean)
                  )
                }
              />

              <p className='grow truncate leading-none'>{itm.name}</p>
              <p className='flex-none font-bold leading-none'>{itm.count}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
