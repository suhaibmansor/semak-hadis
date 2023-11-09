'use client'
import { useEffect, useState, useCallback } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Props {
  pagingItm?: (number | string)[]
  searchInfo: {
    currentPage?: number
    processingTimeMs?: number
    total?: number
    query?: string
  }
}

export default function PagingBar({ pagingItm, searchInfo }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()!

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      if (!value) {
        params.delete(name)
      } else {
        params.set(name, value)
      }
      return params
    },
    [searchParams],
  )
  return (
    <div className='flex justify-end gap-4 py-4'>
      <div className='flex'>
        {pagingItm?.length !== 0 && (
          <>
            {searchInfo.currentPage !== 1 && (
              <Button variant='ghost'>
                <ChevronLeft className='h-4 w-4' />
              </Button>
            )}
            {pagingItm?.map((itm, idx) => (
              <Button
                disabled={itm === '...'}
                variant={searchInfo.currentPage === itm ? 'secondary' : 'ghost'}
                key={idx}
                onClick={() =>
                  router.push(
                    pathname + '?' + createQueryString('page', itm.toString()),
                  )
                }
              >
                {itm}
              </Button>
            ))}
            <Button variant='ghost'>
              <ChevronRight className='h-4 w-4' />
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
