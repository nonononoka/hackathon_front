'use client'

import AuthRouteGuard from "@/presentation/routing/AuthRouteGuardComponent"

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthRouteGuard>{children}</AuthRouteGuard>
}
