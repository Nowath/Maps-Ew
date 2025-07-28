import React from 'react'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const Server = dynamic(() => import('@/features/mainpage/server'))

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Server />
        </Suspense>
    )
}