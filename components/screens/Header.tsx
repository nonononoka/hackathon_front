'use client'

import Link from 'next/link'
import { fireAuth } from '@/infrastructure/auth/firebase'

export const Header = () => {
  return (
    <>
      <Link href="signin">signin</Link>
      <Link href="signup">signup</Link>
      <button onClick={() => fireAuth.signOut()}>signOut</button>
    </>
  )
}
