'use client'

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { AuthForm } from './AuthForm'

export const SignUpForm = () => {
  return (
    <>
      <AuthForm
        buttonMessage="Sign up"
        operationWithEmailAndPassword={createUserWithEmailAndPassword}
      />
      <p>sign up</p>
    </>
  )
}
