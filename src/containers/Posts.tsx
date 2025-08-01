"use client"

import React from 'react'
import { PostsData } from "@/page/community/client"
import {  Chip, Avatar, Image } from '@heroui/react'
import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
import { FaLocationDot } from "react-icons/fa6";
import dayjs from 'dayjs'
import { Loading } from '@/components/loading/loading';
import { StarReview } from '@/components/StarReview/StarReview';

export function Posts( {data} : {data: PostsData[]} ) {
    return (
            <div>
                {data && data.length > 0 ? (
                    data.map((item) => (
                        <Card key={item.id}
                        className={`border-2  ${item.Tags[0] === "โหมดสร้างสรรค์" ? `border-green-400`: item.Tags[0] === "โหมดกิจกรรม" ? `border-blue-300`:`border-red-400`}`}>
                            <CardHeader>
                                <div className=' flex justify-between w-full items-center '>
                                    <div className='flex gap-2 items-center'>
                                        <Avatar showFallback />
                                        <div className='flex flex-col'>
                                            <span>{item.name}</span>
                                            <span className='text-gray-400 text-xs'>{dayjs(item.created_at).format("DD/MM/YYYY")}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <StarReview star={item.star} />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <div className='flex flex-col gap-1'>
                                    <div>
                                        {item.title}
                                    </div>
                                    {item.image !== "" && (
                                        <div className='w-full flex justify-center items-center'>
                                            <Image src={item.image} alt='postImg' width={450} height={200} className=" object-contain" />
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
                ) : data && data.length === 0 ? (
                    <div className='w-full flex h-50 justify-center items-center'>ไม่มี post</div>
                ):(
                    <Loading />
                )}
            </div>
    )
}