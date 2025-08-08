'use server'
import { createClient } from '@/utils/supabase/server';

export async function getDoctor(){
    const supabase = await createClient();

    let { data: doctor, error } = await supabase
    .from('doctor')
    .select('*')

    return {doctor, error}
}