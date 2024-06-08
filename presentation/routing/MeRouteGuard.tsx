'use client';

import { FC, ReactNode, useEffect, useState } from 'react';
import { redirect } from 'next/navigation'
import { useCreateMe } from '@/useCase/command/createMe';
import { useMe } from '@/useCase/query/useMe';

import AuthRouteGuard from './AuthRouteGuard';

const MeRouteGuardComponent: FC<{
    children: ReactNode;
}> = (props) => {
    const { children } = props;
    const { getMe, getMeData, getMeError, getMeLoading, getMeReset } = useMe();
    const { createMeData, createMeLoading, createMe, createMeError, createMeReset } = useCreateMe();
    const [me, setMe] = useState(getMeData);

    useEffect(() => {
        getMe()
    }, [])

    useEffect(() => {
        if (getMeData && !getMeError) {
            setMe(getMeData)
        }
    }, [getMeData, getMeError])

    useEffect(() => {
        if (!getMeData && getMeError) {
            if (getMeError.message == "User not found") {
                createMe()
                    .then((data) => setMe(data))
                    .catch(() => {
                        alert("errorが発生しました")
                        createMeReset()
                        redirect('signin')
                    })
            }
            else {
                alert("errorが発生しました")
                getMeReset()
                redirect('signin')
            }
        }
    }, [getMeData, getMeError])

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