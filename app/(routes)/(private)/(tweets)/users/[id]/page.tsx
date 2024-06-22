'use client'
// 特定のuserのツイートを表示
import { NextPage } from 'next'
import { usePathname } from 'next/navigation'
import { UserTweetsPage } from '@/presentation/pages/UserTweetsPage'

const Page: NextPage = () => {
  const pathname = usePathname()
  const parts = pathname.split('/')
  const userID = parts[parts.length - 1]
  return <UserTweetsPage userID={userID} />
}

export default Page
