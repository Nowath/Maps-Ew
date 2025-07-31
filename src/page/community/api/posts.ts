"use server"
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function usePosts(){
    const cookieStore = await cookies()
    //@ts-ignore
    const supabase = createClient(cookieStore)

    const { data: posts, error } = await supabase
    .from('posts')
    .select()

    return {posts,error}
}