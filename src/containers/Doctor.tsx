'use client'
import React from 'react'
import { Avatar, Button, Image, } from '@heroui/react'
import { StarReview } from '@/components/StarReview/StarReview'
import { FaPhoneAlt } from "react-icons/fa";
import { copyToClipboard } from '@/utils/copyClipBoard';

export function Doctor() {
    return (
        <>
            <div className='flex items-center border-1 border-gray-500 rounded-full justify-between h-18 px-2'>
                <div className='flex items-center gap-2'>
                    <Avatar className='w-14 h-14' src='https://i.pinimg.com/736x/92/5b/bf/925bbf63df1c3bdaad66ca83723b1e30.jpg'/>
                    <div className='h-14 flex flex-col justify-between'>
                        <div className='flex flex-col'>
                            <span>Nano</span>
                            <span className='text-gray-600 text-xs leading-0.5'>awdaegfwsegfawd</span>
                        </div>
                        <div>
                            <StarReview star={2} size={18} />
                        </div>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <Button isIconOnly radius='full' className='bg-[#668881]'>
                        <Image src="/icon/chat.png" alt="chat" width={20} height={20} className=' object-contain' />
                    </Button>
                    <Button onPress={() => copyToClipboard("Nano")} isIconOnly radius='full' className='bg-[#668881] text-white'>
                        <FaPhoneAlt />
                    </Button>
                </div>
            </div>
        </>
    )
}