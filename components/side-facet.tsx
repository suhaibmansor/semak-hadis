'use client'

import { useCallback } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'

interface Props {
  facetDist: { [key: string]: any }
  facet: { value: string; count: number }[]
}
interface FacetProps {
  name: string
  count: number
}

function convertToObj(facet: Record<string, number>): FacetProps[] {
  const convObj = Object.entries(facet).map(([key, val]) => ({
    name: key,
    count: val,
  }))
  return convObj
}
export default function SideFacet({ facet, facetDist }: Props) {
  // console.log(facet)
  const reffFacet = convertToObj(facetDist?.reff)
  const statFacet = convertToObj(facetDist?.status)
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
      params.delete('page')
      return params.toString()
    },
    [searchParams],
  )
  return (
    <div className='w-full'>
      <div className={cn('pb-4')}>
        <h4 className='mb-1 rounded-md py-1 text-md font-semibold'>Pengkaji</h4>

        {reffFacet.map((itm, idx) => (
          <div key={idx} className='flex items-center space-x-2 my-2 text-sm'>
            <Checkbox
              checked={itm.name === searchParams.get('reff')}
              onCheckedChange={(checked) =>
                router.push(
                  pathname +
                    '?' +
                    createQueryString('reff', itm.name, checked as boolean),
                )
              }
            />
            <p className='line-clamp-2'>{itm.name}</p>
            {/* <p className='flex-none font-bold leading-none'>{itm.count}</p> */}
          </div>
        ))}
        <h4 className='mb-1 rounded-md py-1 text-md font-semibold'>Status</h4>
        {statFacet.map((itm, idx) => (
          <div key={idx} className='flex items-center space-x-2 my-2 text-sm'>
            <Checkbox
              checked={itm.name === searchParams.get('status')}
              onCheckedChange={(checked) =>
                router.push(
                  pathname +
                    '?' +
                    createQueryString('status', itm.name, checked as boolean),
                )
              }
            />
            <p className='line-clamp-1 '>{itm.name}</p>
            {/* <p className='flex-none font-bold leading-none'>{itm.count}</p> */}
          </div>
        ))}
      </div>
    </div>
  )
}
