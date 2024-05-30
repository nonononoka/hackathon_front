'use client'

import { signInWithEmailAndPassword } from 'firebase/auth'
import { AuthForm } from './AuthForm'
import Link from 'next/link'

export const SignInForm = () => {
  return (
    <>
      <AuthForm
        buttonMessage="Sign in"
        operationWithEmailAndPassword={signInWithEmailAndPassword}
      />
      <p>sign in</p>
      <Link href="signup">signup</Link>
    </>
  )
}
