'use client'

import { NextPage } from 'next'

import { Home } from '@/presentation/pages/Home'
import { fireAuth } from '@/infrastructure/auth/firebase'

const Page: NextPage = () => {
  return (
    <>
      <button onClick={() => fireAuth.signOut()}>signOut</button>
      <Home />
    </>
  )
}

export default Page
