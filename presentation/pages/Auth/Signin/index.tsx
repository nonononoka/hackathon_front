'use client'
import Stack from '@mui/material/Stack'
import { Auth, UserCredential, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { AuthButton } from '../../../../components/gui/AuthButton'
import { Input } from '../../../../components/gui/Input'
import { fireAuth } from '@/infrastructure/auth/firebase'

export const SignInPage = () => {
  const router = useRouter()

  const handleSignin = (): void => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(fireAuth, provider)
      .then(res => {
        const user = res.user;
        console.log("ログインユーザー: " + user.displayName);
        router.push('/home')
      })
      .catch(err => {
        const errorMessage = err.message;
        alert(errorMessage);
      });
  }

  return (
    <button onClick={handleSignin}>Googleアカウントでログイン</button>
  )
}
