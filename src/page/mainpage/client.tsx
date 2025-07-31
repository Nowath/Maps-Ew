'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import { Button, Input } from '@heroui/react'
import { SiOrganicmaps } from "react-icons/si";
import { BiSolidSend } from "react-icons/bi";
import { useModal } from "@/components/modal/action/modal"
import { ConfirmSOS } from '@/components/modal/ui/ConfirmSOS';
import Image from 'next/image';

const MapWithNoSSR = dynamic(() => import('@/components/map/mainmap').then(mod => ({ default: mod.MainMap })), {
    ssr: false
})

export default function Page() {
    const ConfirmSOSModal = useModal()

    return (
        <div className='w-full h-screen relative'>
            <ConfirmSOS isOpen={ConfirmSOSModal.isOpen} onClose={ConfirmSOSModal.closeModal} />
            <MapWithNoSSR />
            <div className=' absolute z-10 top-0 right-0 p-2'>
                <Button isIconOnly onPress={ConfirmSOSModal.openModal} variant='shadow' color='warning' radius='full' className='w-14 h-14'>
                    <Image width={36} height={36} className=' object-contain' src="/icon/siren.png" alt="siren" />
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
