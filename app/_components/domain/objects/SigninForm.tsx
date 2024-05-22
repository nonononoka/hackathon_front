'use client'

import { signInWithEmailAndPassword } from 'firebase/auth'
import { AuthForm } from '../elements/AuthForm'

export const SignInForm = () => {
  return (
    <AuthForm
      buttonMessage="Sign in"
      operationWithEmailAndPassword={signInWithEmailAndPassword}
    />
  )
}
