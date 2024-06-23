import { useRouter } from 'next/navigation'
import { FC, useEffect } from 'react'
import { Loading } from '@/presentation/components/Loading'

const RootPage: FC = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('home')
  }, [router])

  return <Loading />
}

export default RootPage
