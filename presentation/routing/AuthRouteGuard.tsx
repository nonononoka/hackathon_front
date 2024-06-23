import { redirect } from 'next/navigation'
import { FC, ReactNode } from 'react'
import { Loading } from '../components/Loading'

import { useAuth } from '@/useCase/query/useAuth'

const AuthRouteGuardComponent: FC<{
  children: ReactNode
}> = (props) => {
  const { children } = props

  const { loading, error } = useAuth()

  if (loading) {
    return <Loading />
  }

  if (error) {
    console.log(error)
    redirect('signin')
  }

  return <>{children}</>
}

const AuthRouteGuard: FC<{
  children: ReactNode
}> = (props) => {
  const { children } = props
  return <AuthRouteGuardComponent>{children}</AuthRouteGuardComponent>
}

export default AuthRouteGuard