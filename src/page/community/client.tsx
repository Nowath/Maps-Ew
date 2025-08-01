'use client'

import React, {useEffect} from 'react'
import { Input, Chip, Button } from '@heroui/react'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Posts } from '@/containers/Posts';
import { FaPlus } from 'react-icons/fa6';
import { useModal } from '@/components/modal/action/modal';
import { AddPosts } from '@/components/modal/ui/AddPosts';

export interface PostsData {
    id: number
    created_at: string
    name: string
    title: string
    image: string
    address: string
    subAddress: number[]
    Tags: string[]
    star: number;
}

export default function Page({ data }: { data: PostsData[] }) {
    // const [datas, setDatas] = useState<PostsData[]>()
    // useEffect(() => {
    //     setDatas(data)
    // },[])
    const AddPost = useModal()
    return (
        <div className='w-full h-screen relative'>
            <AddPosts isOpen={AddPost.isOpen} onClose={AddPost.closeModal} />
            <div className=' fixed bottom-24 right-5 z-50'>
                <Button onPress={AddPost.openModal} isIconOnly color="success" variant='shadow' radius='full' className=' w-14 h-14'><FaPlus color='white' size={20} /></Button>
            </div>
            <div className=' p-4 h-screen pb-40 overflow-auto'>
                <div>
                    <Input
                        startContent={<FaMagnifyingGlass size={20} />}
                        radius='full'
                        variant='faded'
                        placeholder='ค้นหาคอนเทนที่คุณต้องการ'
                        className=' text-base'
                    />
                </div>
                <div className='py-4 flex gap-2 justify-center'>
                    <Chip onClick={() => console.log("Nano")} variant='flat' color='success'>โหมดกิจกรรม</Chip>
                    <Chip variant='flat' color='primary'>โหมดสร้างสรรค์</Chip>
                    <Chip variant='flat' color='danger'>โหมดระวังภัย</Chip>
                </div>
                <div className='w-full flex flex-col gap-4'>
                    <Posts data={data || []} />
                </div>
            </div>
        </div>
    )
}