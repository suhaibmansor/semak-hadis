'use client'
import { useEffect, useState, useCallback } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useDebounce } from 'use-debounce'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
export default function QuickSearchComp() {
  const [textVal, setTextVal] = useState('')
  const [query] = useDebounce(textVal, 500)
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
      params.delete('page')
      return params.toString()
    },
    [searchParams],
  )
  useEffect(() => {
    router.push(pathname + '?' + createQueryString('q', query))
  }, [query, router])
  return (
    <div className='flex max-w-sm items-center space-x-2'>
      <Input
        type='text'
        value={textVal}
        placeholder='Cari hadis...'
        onChange={(e) => setTextVal(e.target.value)}
      ></Input>
      <Button type='submit'>
        <Search className='mr-2 h-4 w-4' />
        Cari
      </Button>
    </div>
  )
}
