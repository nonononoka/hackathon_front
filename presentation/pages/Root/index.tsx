import { useRouter } from 'next/navigation'
import { FC, useEffect } from 'react'

const RootPage: FC = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('home')
  }, [router])

  return <p>Loading...</p>
}

export default RootPage
