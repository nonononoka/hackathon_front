'use client'

import { NextPage } from 'next'

import { fireAuth } from '@/lib/auth/firebase'
import { Home } from '@/presentation/pages/Home'

const Page: NextPage = () => {
  return (
    <>
      <button onClick={() => fireAuth.signOut()}>signOut</button>
      <Home />
    </>
  )
}

export default Page
