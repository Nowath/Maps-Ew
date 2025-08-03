import React from 'react'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
// eslint-disable-next-line
import { getPosts } from './api/posts'
import { Loading } from '@/components/loading/loading'
import { toast } from 'sonner'

const Client = dynamic(() => import('./client'))

export default async function Server() {
    const { posts } = await getPosts()
    return (
        <Suspense fallback={<Loading />}>
            <Client />
        </Suspense>
    )
}