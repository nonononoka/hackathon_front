'use client'

import AuthRouteGuard from "@/components/screens/AuthRouteGuardComponent";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <AuthRouteGuard>{children}</AuthRouteGuard>;
}