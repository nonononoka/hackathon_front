'use client'

import MeRouteGuard from '@/presentation/routing/MeRouteGuard'
import TemporaryDrawer from '@/presentation/components/SideBar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <MeRouteGuard>
      <TemporaryDrawer />
      {children}
    </MeRouteGuard>
  )
}
