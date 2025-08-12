"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '@heroui/button'
import {Accordion, AccordionItem} from "@heroui/react";
import {IoIosArrowBack} from "react-icons/io"
import { useRouter } from 'next/navigation'


export default function Page() {
    const router = useRouter()
        
    const onReturn = (): void => {
        router.push('/chat')
    }

    const defaultContent = "Ipsum tincidunt nonumy sit. Wisi sed clita et velit et eos nostrud lorem rebum suscipit dolore dolor. Tincidunt gubergren et sed minim ut ea ipsum justo dolores ipsum duo consetetur consectetuer rebum ut labore. Dolore illum ut sed eirmod duis takimata. Kasd ipsum clita clita ut dolor elit volutpat."
    const AccordionData = [
        {
            title:"วิธีรับมือเมื่อโดนชักชวนให้ลองสารเสพติด",
            desc: "การปฎิเสธเป็นหัวใจสำคัญในการปกป้องตัวเอง",
            text: defaultContent
        },
        {
            title:"โทษของบุหรี่และบุหรี่ไฟฟ้า",
            desc: "บุหรี่และบุหรี่ไฟฟ้ามีโทษต่อสุขภาพหลายด้าน",
            text: defaultContent
        },
        {
            title:"โทษของสุราและของมึนเมา",
            desc: "โทษของสุราและของมึนเมามีทั้งทางร่างกาย จิตใจ และสังคม",
            text: defaultContent
        },
        {
            title:"วิธีเลิกบุหรี่และบุหรี่ไฟฟ้า",
            desc: "เคล็ด(ไม่)ลับ...เลิกบุหรี่ยังไงให้สำเร็จ",
            text: defaultContent
        },
    ]
    return (
        <React.Fragment>
            <div className='h-screen w-screen overflow-auto flex justify-center'>
                <div className='min-h-screen w-[90%] pt-4 flex flex-col gap-4'>
                    <div className='flex'>
                        <Button 
                            isIconOnly 
                            radius='full' 
                            variant='flat' 
                            color='success' 
                            onPress={onReturn}
                        >
                            <IoIosArrowBack size={20} />
                        </Button>
                    </div>
                    <div className=' flex items-center flex-col gap-4 mb-20'>
                        <span className='text-3xl'>
                            ข้อควรรู้
                        </span>
                        <div className='w-full'>
                            <Accordion variant="splitted">
                                { AccordionData.map((item, index) => (
                                    <AccordionItem
                                        key={index+1}
                                        aria-label={item.title}
                                        subtitle={item.desc}
                                        title={item.title}
                                    >
                                        {item.text}
                                    </AccordionItem>
                                )) }
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}