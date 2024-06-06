'use client';

import { FC, ReactNode, useEffect, useState } from 'react';
import { redirect } from 'next/navigation'
import { useCreateMe } from '@/useCase/command/useCreateMe';
import { useMe } from '@/useCase/query/useMe';

import AuthRouteGuard from './AuthRouteGuard';

const MeRouteGuardComponent: FC<{
    children: ReactNode;
}> = (props) => {
    const { children } = props;

    const { getMe, data, error, isLoading } = useMe();
    if (!isLoading && !error && !data) {
        getMe()
    }
    const { postMeResult: createMeResult, postMeIsMutating: createMeLoading, postMeTrigger: createMe, postMeError: createMeError } = useCreateMe();
    const [me, setMe] = useState(data);

    useEffect(() => {
        if (!me && data) {
            setMe(data);
        }
    }, [data, me]);

    useEffect(() => {
        if (!me && createMeResult) {
            setMe(createMeResult)
        }
    })

    useEffect(() => {
        if (!isLoading && error && !data && !createMeResult && !createMeLoading && !createMeError) {
            if (error.message == 'User not found') { 
                createMe()
            } else {
                redirect('signin')
            }
        }
    }, [
        createMe,
        createMeLoading,
        data,
        error,
        isLoading,
    ]);

    if (!me) {
        return <p>Loading...</p>;
    }

    return <>{children}</>;
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