'use client'

import TemporaryDrawer from '@/presentation/components/SideBar'
import MeRouteGuard from '@/presentation/routing/MeRouteGuard'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <MeRouteGuard>
      <TemporaryDrawer />
      {children}
    </MeRouteGuard>
  )
}
