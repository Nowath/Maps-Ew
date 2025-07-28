'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import { Button, Input } from '@heroui/react'
import { SiOrganicmaps } from "react-icons/si";
import { BiSolidSend } from "react-icons/bi";

const MapWithNoSSR = dynamic(() => import('@/components/map/mainmap').then(mod => ({ default: mod.MainMap })), {
    ssr: false
})

export default function Page() {
    return (
        <div className='w-full h-screen relative'>
            <MapWithNoSSR />
            <div className=' absolute z-10 top-0 right-0 p-2'>
                <Button isIconOnly variant='shadow' color='warning' radius='full' className='w-14 h-14'>
                    <img width={36} src="/icon/siren.png" alt="" />
                </Button>
            </div>
            <div className=' absolute z-10 bottom-22 right-0 w-full flex justify-center items-center'>
                <div className='w-[90%]'>
                    <Input size='lg'
                    placeholder='กรอกสถานที่ที่คุณต้องการไป'
                    startContent={<SiOrganicmaps size={30} />} endContent={
                        <Button isIconOnly variant='solid' size='sm' color='primary' radius='full'>
                            <BiSolidSend size={15} />
                        </Button>
                    } className='w-full' radius='full' variant='faded' />
                </div>
            </div>
        </div>
    )
}
