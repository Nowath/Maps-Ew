'use client'
import React from 'react'
import {Tabs, Tab} from "@heroui/react";
import { useRouter, usePathname } from 'next/navigation';
import style from './bottombar.module.css';
import Image from 'next/image';

export function BottomBar() {
    const router = useRouter();
    const pathname = usePathname();

    const handleSelectionChange = (key: React.Key) => {
        router.push(key as string);
    };

    return (
        <>
            <div className={`${style.BottomMenu}`}>
                <div className='w-[90%]'>
                    <Tabs 
                        selectedKey={pathname}
                        onSelectionChange={handleSelectionChange}
                        className='' 
                        fullWidth 
                        radius='full' 
                        color='primary' 
                        classNames={{
                            tabList:'bg-gray-200 shadow-inner',
                            cursor:'bg-white'
                        }}
                    >
                        <Tab key="/" className='' title={
                            <div className=''>
                                <Image src="/icon/map.png" alt="map" width={25} height={25} className=' object-contain' />
                            </div>
                        } />
                        <Tab key="/community" className='' title={
                            <div className=''>
                                <Image src="/icon/group.png" alt="group" width={25} height={25} className=' object-contain' />
                            </div>
                        } />
                        <Tab key="/chat" className='' title={
                            <div className=''>
                                <Image src="/icon/chat.png" alt="chat" width={25} height={25} className=' object-contain' />
                            </div>
                        } />
                        <Tab key="/setting" className='' title={
                            <div className=''>
                                <Image src="/icon/setting.png" alt="setting" width={25} height={25} className=' object-contain' />
                            </div>
                        } />
                    </Tabs>
                </div>
            </div>
        </>
    )
}