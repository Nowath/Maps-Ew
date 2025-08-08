"use client"
import React from 'react'
import { Button} from '@heroui/react' 
import { redirect } from 'next/navigation' 
import { IoIosArrowBack } from "react-icons/io";
import { FormTable } from '@/containers/Chat_Form/FormTable';


export default function Page() {
    
    const onReturn = (): void => {
        redirect(`/chat`);
    }

    
    return (
        <React.Fragment>
            <div className=' h-screen w-screen overflow-auto flex justify-center '>
                <div className='min-h-screen w-[90%] pt-4 flex flex-col gap-4'>
                    <div className='flex'>
                        <Button isIconOnly radius='full' variant='flat' color='success' onPress={onReturn}>
                            <IoIosArrowBack size={20} />
                        </Button>
                    </div>
                    <div className='flex justify-center'>
                        <div className=' text-center text-lg font-bold p-4 border-1 border-gray-500 rounded-full'>
                            แบบประเมินความเสี่ยงต่อการใช้สารเสพติดและของมึนเมา
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 pb-22'>
                        <span>ตอนที่ 1 คำถามพื้นฐานตอบ ใช่ หรือ ไม่ใช่</span>
                        <FormTable/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}