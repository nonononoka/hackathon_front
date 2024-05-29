'use client'

import React, { useContext, useState, useEffect, FC, ReactNode } from 'react'
import { fireAuth } from '@/infrastructure/auth/firebase'
import { onAuthStateChanged, User } from 'firebase/auth'

type AuthContextType = {
    currentUser: User | null
}

// コンテキストを作成
const AuthContext = React.createContext<AuthContextType>({ currentUser: null })

export function useAuthContext() {
    // useContextで作成したコンテキストを呼び出す
    return useContext(AuthContext)
}

export const AuthContextProvider: FC<{
    children: ReactNode;
}> = (props) => {
    const { children } = props;
    const [currentUser, setCurrentUser] = useState<null | User>(null)
    const [loading, setLoading] = useState(true)

    // 第2引数に[]を指定して、初回レンダリングのみ関数を実行させる
    useEffect(() => {
        // onAuthStateChangedでログインの状態を監視する
        const unsubscribe = onAuthStateChanged(fireAuth, async user => {
            // ユーザー情報をcurrentUserに格納する
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
