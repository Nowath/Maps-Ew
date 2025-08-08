import React from 'react'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Loading } from '@/components/loading/loading'

const Client = dynamic(() => import('./client'))

export default async function Server() {
    return (
        <Suspense fallback={<Loading />}>
            <Client />
        </Suspense>
    )
}