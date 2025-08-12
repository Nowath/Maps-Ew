'use client'
import React,{useState, useEffect} from 'react'
import { Avatar, Button, Image, } from '@heroui/react'
import { StarReview } from '@/components/StarReview/StarReview'
import { FaPhoneAlt } from "react-icons/fa";
import { copyToClipboard } from '@/utils/copyClipBoard';
import { getDoctor } from '@/page/chat/api/doctor';
import { DoctorInterface } from '@/types/doctor';
import { Loading } from '@/components/loading/loading';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export function Doctor() {
    const [data,setData] = useState<DoctorInterface[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    useEffect(() => {
        setLoading(true)
        try{
            async function fetching() {
                const res = await getDoctor()
                setData(res.doctor || [])
            }
            fetching()
            setLoading(false)
        }catch(err){
            console.log(err)
        }
    },[])
    return (
        <>
            {loading ? (
                <Loading size='40' />
            ):
            data ? (
                data.map((item, index) => (
                    <div key={index} className='flex items-center border-1 border-gray-500 rounded-full justify-between h-18 px-2'>
                        <div className='flex items-center gap-2'>
                            <Avatar className='w-14 h-14' src={item.avatar}/>
                            <div className='h-14 flex flex-col justify-between'>
                                <div className='flex flex-col'>
                                    <span>{item.name}</span>
                                    <span className='text-gray-600 text-xs leading-0.6'>{item.clinic}</span>
                                </div>
                                <div>
                                    <StarReview star={item.star} size={18} />
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Button isIconOnly radius='full' className='bg-[#668881]'>
                                <Image src="/icon/chat.png" alt="chat" width={20} height={20} className=' object-contain' />
                            </Button>
                            <Button onPress={() => copyToClipboard(`${item.tel}`)} isIconOnly radius='full' className='bg-[#668881] text-white'>
                                <FaPhoneAlt />
                            </Button>
                        </div>
                    </div>
                ))
            ):
            (
                <div>ไม่พบแพทย์</div>
            )}
        </>
    )
}