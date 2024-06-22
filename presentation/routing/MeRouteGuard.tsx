'use client';

import { FC, ReactNode, useEffect, createContext, useContext } from 'react';
import { redirect } from 'next/navigation'
import { useCreateMe } from '@/useCase/command/createMe';
import { useMe } from '@/useCase/query/useMe';
import AuthRouteGuard from './AuthRouteGuard';
import { useAuthToken } from '@/useCase/query/useAuthToken';
import { KeyedMutator } from 'swr';
import { UserResponse } from '@/types/apiUser';

export type MeContextType = {
    email: string | null,
    name: string | null,
    id: string | null,
    bio: string | null,
    image : string | null,
    token: string | null | undefined,
    mutate: KeyedMutator<UserResponse> | null
};

export const MeContext = createContext<MeContextType>({
    id: null,
    email: null,
    name: null,
    token: null,
    bio: null, 
    image: null,
    mutate: null
});

// Contextを使用するためのカスタムフック
export const useMeContext = () => {
    const context = useContext(MeContext);
    if (!context) {
        throw new Error('useTweetContext must be used within a TweetProvider');
    }
    return context;
};

const MeRouteGuardComponent: FC<{
    children: ReactNode;
}> = (props) => {
    const { children } = props;
    const { data: token } = useAuthToken()
    const { data, isLoading, error, mutate } = useMe(token);
    const { createMe, createMeReset, createMeLoading } = useCreateMe();

    useEffect(() => {
        if (!isLoading && !data && error && !createMeLoading) {
            if (error.message == "User not found") {
                createMe()
                    .then(() => mutate())
                    .catch((e) => {
                        alert(e)
                        createMeReset()
                        redirect('signin')
                    })
            }
            else {
                alert(error)
                redirect('signin')
            }
        }
    }, [data, error, isLoading, createMeLoading])

    if (!data) {
        return <p>Loading...</p>;
    }

    return <MeContext.Provider value = {{id: data?.id, name:data?.name, email:data?.email, token: token, bio: data?.bio.String, image: data?.image.String, mutate: mutate}}>{children}</MeContext.Provider>;
};

const MeRouteGuard: FC<{
    children: ReactNode;
}> = (props) => {
    const { children } = props;
    return (
        <AuthRouteGuard>
            <MeRouteGuardComponent>{children}</MeRouteGuardComponent>
        </AuthRouteGuard>
    );
};

export default MeRouteGuard;