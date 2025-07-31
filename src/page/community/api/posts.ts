"use server"
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function usePosts(){
    const supabase = createClient(cookies())

    const { data: posts, error } = await supabase
    .from('posts')
    .select()

    return {posts, error}
}