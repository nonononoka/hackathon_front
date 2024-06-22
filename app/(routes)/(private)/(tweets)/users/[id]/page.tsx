'use client'
// 特定のuserのツイートを表示
import { NextPage } from 'next'
import { usePathname } from 'next/navigation'
import { UsersTweetsSection } from '@/presentation/pages/UsersTweets'

const Page: NextPage = () => {
  const pathname = usePathname()
  const parts = pathname.split('/')
  const userID = parts[parts.length - 1]
  return <UsersTweetsSection userID={userID} />
}

export default Page
