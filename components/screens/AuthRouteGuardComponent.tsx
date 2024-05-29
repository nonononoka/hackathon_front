'use client';
import { redirect } from 'next/navigation'
import { FC, ReactNode } from 'react';

import { useAuth } from '@/useCase/useAuth';

const AuthRouteGuardComponent: FC<{
  children: ReactNode;
}> = (props) => {
  const { children } = props;

  const { loading, error } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.log(error)
    redirect ("signin");
    return
  }

  return <>{children}</>;
};

const AuthRouteGuard: FC<{
  children: ReactNode;
}> = (props) => {
  const { children } = props;
  return (
      <AuthRouteGuardComponent>{children}</AuthRouteGuardComponent>
  );
};

export default AuthRouteGuard;