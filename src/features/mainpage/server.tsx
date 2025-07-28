import React from 'react'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const Client = dynamic(() => import('./client'))

export default function Server() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Client />
        </Suspense>
    )
}