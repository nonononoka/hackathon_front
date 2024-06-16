'use client'

import { NextPage } from 'next'
import { usePathname } from 'next/navigation'
import { Reply } from '@/presentation/pages/Home/parts/TweetsSection/Reply'

const Page: NextPage = () => {
  const pathname = usePathname()
  const parts = pathname.split('/')
  const id = parts[parts.length - 1]
  return <Reply id={id} />
}

export default Page
