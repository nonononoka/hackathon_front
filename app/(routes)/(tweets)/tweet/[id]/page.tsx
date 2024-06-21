'use client'
// 特定のuserのツイートを表示
import { NextPage } from 'next'
import { usePathname } from 'next/navigation'
import { EachTweetPage } from '@/presentation/pages/EachTweetPage'

const Page: NextPage = () => {
  const pathname = usePathname()
  const parts = pathname.split('/')
  const tweetID = parts[parts.length - 1]
  return <EachTweetPage tweetID={tweetID} />
}

export default Page
