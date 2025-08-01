'use server'
import { createClient } from '@/utils/supabase/server';
import { PostInterface } from '@/components/modal/ui/AddPosts';


export async function getPosts(){
    const supabase = await createClient();

    const { data: posts, error } = await supabase
    .from('posts')
    .select()

    return {posts, error}
}

export async function createPost({ title, image, address, Tags, star}:PostInterface){
    const supabase = await createClient();

    const { data, error } = await supabase
    .from('posts')
    .insert([
        {   
            name: 'test', 
            title: title,
            image: image,
            address: address,
            subAddress: [200, 300],
            Tags: Tags,
            star: star
        },
    ])
    .select()

    return data
}