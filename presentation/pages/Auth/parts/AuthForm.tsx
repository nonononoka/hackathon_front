'use client'
import Stack from '@mui/material/Stack'
import { Auth, UserCredential } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { AuthButton } from '../../../../components/gui/AuthButton'
import { Input } from '../../../../components/gui/Input'
import { fireAuth } from '@/infrastructure/auth/firebase'

type AuthFormProps = {
  buttonMessage: string
  operationWithEmailAndPassword: (
    auth: Auth,
    email: string,
    password: string,
  ) => Promise<UserCredential>
}

export const AuthForm = (props: AuthFormProps) => {
  const router = useRouter()
  const { operationWithEmailAndPassword, buttonMessage } = props
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await operationWithEmailAndPassword(fireAuth, email, password)
      setEmail('')
      setPassword('')
      router.push('/home')
    } catch (error) {
      alert(error)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div style={{ marginTop: '50px' }}>
          <Input property="email" value={email} setValue={setEmail} />
        </div>
        <div style={{ marginTop: '50px' }}>
          <Input property="password" value={password} setValue={setPassword} />
        </div>
        <Stack
          direction="row"
          spacing={2}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <AuthButton message={buttonMessage} />
        </Stack>
      </form>
    </>
  )
}
