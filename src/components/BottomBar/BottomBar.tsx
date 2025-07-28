'use client'
import React from 'react'
import {Tabs, Tab} from "@heroui/react";
import { SiGooglemaps } from "react-icons/si";
import { FaPeopleGroup } from "react-icons/fa6";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { IoIosSettings } from "react-icons/io";
import style from './bottombar.module.css';

export function BottomBar() {
    return (
        <>
            <div className={`${style.BottomMenu}`}>
                <div className='w-[90%]'>
                    <Tabs className='' fullWidth radius='full' color='primary' classNames={{
                        tabList:'bg-gray-200 shadow-inner',cursor:'bg-white'}}>
                        <Tab key="/" href='/'  className='' title={
                            <div className=''>
                                <img src="/icon/map.png" alt="" width={25} />
                            </div>
                        } />
                        <Tab key="/photos" href='/'  className=' ' title={
                            <div className=''>
                                <img src="/icon/group.png" alt="" width={25} />
                            </div>
                        } />
                        <Tab key="/music" href='/' className=' ' title={
                            <div className=''>
                                <img src="/icon/chat.png" alt="" width={25} />
                            </div>
                        } />
                        <Tab key="/videos" href='/'  className=' ' title={
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
