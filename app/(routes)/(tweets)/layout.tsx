'use client'

import MeRouteGuard from '@/presentation/routing/MeRouteGuard'
// import AuthRouteGuard from '@/presentation/routing/AuthRouteGuard'
export default function Layout({ children }: { children: React.ReactNode }) {
  return <MeRouteGuard>{children}</MeRouteGuard>
}
