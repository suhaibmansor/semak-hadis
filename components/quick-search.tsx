'use client'
import React from 'react'

import { Input } from '@/components/ui/input'
import { Button, buttonVariants } from './ui/button'
export default function QuickSearchComp() {
  return (
    <div className='flex max-w-sm items-center space-x-2'>
      <Input type='text' placeholder='Cari hadis...'></Input>
      <Button type='submit' className={buttonVariants()}>
        Cari
      </Button>
    </div>
  )
}
