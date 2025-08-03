"use client"
import React from 'react'
import { Input } from "@heroui/react"
import { FaMagnifyingGlass } from "react-icons/fa6";
import {Calendar} from "@heroui/react";

export default function Page() {
    return (
        <React.Fragment>
            <div className=' h-screen w-screen flex justify-center '>
                <div className='h-screen w-[90%] pt-4 flex flex-col gap-4'>
                    <div>
                        <Input
                            startContent={<FaMagnifyingGlass size={20} />}
                            radius='full'
                            variant='faded'
                            placeholder='เลือกผู้ให้คำปรึกษา'
                            className=' text-base'
                        />
                    </div>
                    <div className='w-full bg-[#668982] py-4 justify-center flex rounded-2xl'>
                        <Calendar showMonthAndYearPickers calendarWidth={300} aria-label="Date (Show Month and Year Picker)" />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}