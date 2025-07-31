'use client'

import React from 'react'
import { Input, Button, Chip, Avatar, Image } from '@heroui/react'
import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import dayjs from 'dayjs'

interface PostsData {
    id: number
    created_at: string
    name: string
    title: string
    image: string
    address: string
    subAddress: number[]
    Tags: string[]
}

export default function Page({ data }: { data: PostsData[] }) {
    return (
        <div className='w-full h-screen relative'>
            <div className=' p-4 h-screen pb-30 overflow-auto'>
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
                    <Chip variant='flat' color='warning'>โหมดระวังภัย</Chip>
                    <Chip variant='flat' color='primary'>โหมดสร้างสรรค์</Chip>
                </div>
                <div className='w-full flex flex-col gap-4'>
                    {data && data.length > 0 ? (
                        data.map((item) => (
                            <Card key={item.id}>
                                <CardHeader>
                                    <div className=' flex gap-2 items-center'>
                                        <Avatar showFallback />
                                        <div className='flex flex-col'>
                                            <span>{item.name}</span>
                                            <span className='text-gray-400 text-xs'>{dayjs(item.created_at).format("DD/MM/YYYY")}</span>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <div className='flex flex-col gap-1'>
                                        <div>
                                            {item.title}
                                        </div>
                                        {item.image !== "" && (
                                            <div className='w-full'>
                                                <Image src={item.image} width={450} height={200} className=" object-contain" />
                                            </div>
                                        )}
                                    </div>
                                </CardBody>
                                <CardFooter>
                                    <div className='w-full flex justify-between'>
                                        <div className='flex gap-1 items-center'>
                                            {item.Tags.map((tag,index) => (
                                                <Chip key={index} size='sm' variant='flat' color={tag === "โหมดสร้างสรรค์" ? `success`: tag === "โหมดกิจกรรม" ? 'primary' : "danger"}>{tag}</Chip>
                                            ))}
                                        </div>
                                        <div className='flex items-center gap-1'>
                                            <FaLocationDot color='red' size={20} />
                                            <span>{item.address}</span>
                                        </div>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))
                    ) : (
                        <div>ไม่พบข้อมูล</div>
                    )}
                </div>
            </div>
        </div>
    )
}