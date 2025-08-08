"use client"
import React from 'react'
import { Input, Button, Avatar, Image } from "@heroui/react"
import { FaMagnifyingGlass } from "react-icons/fa6";
import {Calendar} from "@heroui/react";
import { Doctor } from '@/containers/Doctor';
import Link from 'next/link';
import { redirect } from 'next/navigation' 

export default function Page() {

    function RedirectToForm() {
        redirect(`/chat/form`)
    }
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
                    <div className='w-full bg-[#668982] py-5 justify-center flex rounded-2xl'>
                        <Calendar showMonthAndYearPickers calendarWidth={300} aria-label="Date (Show Month and Year Picker)" />
                    </div>
                    <div className='flex  items-center justify-between'>
                        <span className='text-xl'>เลือกผู้ให้คำปรึกษา</span>
                        <div className='flex gap-1'>
                            <Button onPress={RedirectToForm} variant='shadow' color='warning'>แบบทดสอบ</Button>
                            <Button variant='shadow' color='success'>ข้อควรรู้</Button>
                        </div>
                    </div>
                    <div className=' pb-20 flex flex-col gap-2'>
                        <Doctor />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}