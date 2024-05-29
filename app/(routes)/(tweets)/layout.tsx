'use client'

import { AuthContext } from "@/components/screens/Header";
import { useContext, useState } from "react";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    console.log("aaa")
    const { currentUser } = useContext(AuthContext);
    const [authChecked, setAuthChecked] = useState(false);
    console.log(currentUser)
    if (currentUser) {
        return <>{children}</>;
    }
    else {
        return <>Loginしてね</>;
    }
}