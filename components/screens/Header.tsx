'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { fireAuth } from "@/infrastructure/auth/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

type AuthContextType = {
    currentUser: User | null
}

// コンテキストを作成
export const AuthContext = React.createContext<AuthContextType>({ currentUser: null })

function useUserSession() {
    const [currentUser, setCurrentUser] = useState<null | User>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // onAuthStateChangedでログインの状態を監視する
        const unsubscribe = onAuthStateChanged(fireAuth, async user => {
            // ユーザー情報をcurrentUserに格納する
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])
    return { currentUser, loading };
}

export default function Header() {
    const { currentUser, loading } = useUserSession();
    console.log(currentUser)
    if (loading) {
        return <>Loading...</>
    }

    return (
        <header>
            {currentUser ? (
                <AuthContext.Provider
                    value={{
                        currentUser
                    }}
                >
                    <div className="profile">
                        {currentUser.email}
                    </div>
                    <button onClick={() => fireAuth.signOut()}>signOut</button>
                </AuthContext.Provider>
            ) : (
                <>
                    <Link href="/signin">Signin</Link>
                    <Link href="/signup">Signup</Link>
                </>
            )}
        </header>
    );
}