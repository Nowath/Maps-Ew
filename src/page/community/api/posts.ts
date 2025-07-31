"use server"
import { createClient } from '@/utils/supabase/server';

export async function getPosts(){
    const supabase = await createClient();

    const { data: posts } = await supabase
    .from('posts')
    .select()

    return {posts}
}