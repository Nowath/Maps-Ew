'use client'
import React from 'react'
import {Tabs, Tab} from "@heroui/react";
import { useRouter, usePathname } from 'next/navigation';
import style from './bottombar.module.css';

export function BottomBar() {
    const router = useRouter();
    const pathname = usePathname();

    const handleSelectionChange = (key:any) => {
        router.push(key);
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
                                <img src="/icon/map.png" alt="" width={25} />
                            </div>
                        } />
                        <Tab key="/community" className='' title={
                            <div className=''>
                                <img src="/icon/group.png" alt="" width={25} />
                            </div>
                        } />
                        <Tab key="/music" className=' ' title={
                            <div className=''>
                                <img src="/icon/chat.png" alt="" width={25} />
                            </div>
                        } />
                        <Tab key="/videos" className=' ' title={
                            <div className=''>
                                <img src="/icon/setting.png" alt="" width={25} />
                            </div>
                        } />
                    </Tabs>
                </div>
            </div>
        </>
    )
}