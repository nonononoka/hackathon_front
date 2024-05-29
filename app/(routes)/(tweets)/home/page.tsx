'use client'

import Link from 'next/link'

import { NextPage } from 'next'

import { Home } from '@/components/screens/Home'

const Page: NextPage = () => {
    console.log("aaa")
    return (
        <>
            <Home />
        </>
    )
}

export default Page
