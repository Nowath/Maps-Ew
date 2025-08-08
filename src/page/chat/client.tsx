"use client"
import React from 'react'
import { Input, Button, Avatar, Image } from "@heroui/react"
import { FaMagnifyingGlass } from "react-icons/fa6";
import {Calendar} from "@heroui/react";
import { StarReview } from '@/components/StarReview/StarReview';
import { FaPhoneAlt } from "react-icons/fa";
import { copyToClipboard } from '@/utils/copyClipBoard';
import { Doctor } from '@/containers/Doctor';

export default function Page() {
    return (
        <React.Fragment>
            <div className=' h-screen w-screen overflow-auto flex justify-center '>
                <div className='min-h-screen w-[90%] pt-4 flex flex-col gap-4'>
                    <div>
                        <Input
                            startContent={<FaMagnifyingGlass size={20} />}
                            radius='full'
                            variant='faded'
                            placeholder='เลือกผู้ให้คำปรึกษา'
                            className=' text-base'
                        />
                    </div>
                    <div className='flex justify-end'>
                        <div className='flex gap-1'>
                            <Button variant='shadow' color='warning'>แบบทดสอบ</Button>
                            <Button variant='shadow' color='success'>ข้อควรรู้</Button>
                        </div>
                    </div>
                    <div className='w-full bg-[#668982] py-5 justify-center flex rounded-2xl'>
                        <Calendar showMonthAndYearPickers calendarWidth={300} aria-label="Date (Show Month and Year Picker)" />
                    </div>
                    <div className='flex  items-center'>
                        <span className='text-xl'>เลือกผู้ให้คำปรึกษา</span>
                    </div>
                    <div className=' pb-20 flex flex-col gap-2'>
                        <Doctor />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}