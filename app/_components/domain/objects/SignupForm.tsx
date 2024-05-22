'use client'

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { AuthForm } from '../elements/AuthForm'

export const SignUpForm = () => {
  return (
    <AuthForm
      buttonMessage="Sign up"
      operationWithEmailAndPassword={createUserWithEmailAndPassword}
    />
  )
}
