"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '@heroui/react' 
import { useRouter } from 'next/navigation' 
import { IoIosArrowBack } from "react-icons/io";
import { AnswersState } from "@/types/form"
import { Loading } from '@/components/loading/loading';
import { FaHeart } from "react-icons/fa";

export default function Page() {
    const [data, setData] = useState<AnswersState | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    
    const onReturn = (): void => {
        router.push('/chat')
    }

    useEffect(() => {
        async function getLocalStorage() {
            try {
                const res = localStorage.getItem("formSubmissions")
                if (res) {
                    const parsedData = JSON.parse(res)
                    setData(parsedData)
                } else {
                    setData(null)
                }
            } catch (error) {
                console.error('Error parsing localStorage data:', error)
                setData(null)
            } finally {
                setLoading(false)
            }
        }
        getLocalStorage()

        return () => {
            setData(null)
        }
    }, [])
    

    if (loading) {
        return (
            <div className='flex justify-center items-center h-screen w-screen'>
                <Loading/>
            </div>
        )
    }
    
    const hasData = data && Object.values(data).some(value => value !== null)
    
    const calculatePercentage = (data: AnswersState | null): number => {
        if (!data) return 0;
        
        const totalQuestions = Object.keys(data).length;
        const trueAnswers = Object.values(data).filter(value => value === true).length;
        
        return Math.round((trueAnswers / totalQuestions) * 100);
    }
    
    const percentage = calculatePercentage(data);
    
    const getScoreColorClass = (percentage: number): string => {
        if (percentage >= 80) return 'text-green-600';
        if (percentage >= 40) return 'text-yellow-500';
        return 'text-red-400';
    }

    const getScoreColorClassBg = (percentage: number): string => {
        if (percentage >= 80) return 'bg-green-100';
        if (percentage >= 40) return 'bg-yellow-100';
        return 'bg-red-100';
    }

    const TextResult = (percentage: number): string => {
        if (percentage >= 80) return 'มีความเสี่ยงต่ำ';
        if (percentage >= 40) return 'มีความเสี่ยงปานกลาง';
        return 'มีความเสี่ยงสูง';
    }
    
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
                    {hasData ? (
                        <div className='flex flex-col gap-6'>
                            <div className='text-center'>
                                <h2 className='text-2xl font-bold mb-4'>ผลลัพท์</h2>
                                <div className={`${getScoreColorClassBg(percentage)} rounded-lg p-6 flex`}>
                                    <div className='flex-1 flex justify-center items-center'>
                                        <FaHeart className={`${getScoreColorClass(percentage)}`} size={50} />
                                    </div>
                                    <div className='flex flex-col flex-2 justify-center items-center'>
                                        <div className={`text-3xl font-bold ${getScoreColorClass(percentage)} mb-2`}>
                                            {Math.round(percentage/10)} / 10 score
                                        </div>
                                        <div className='text-lg text-gray-700'>
                                            {TextResult(percentage)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>ไม่มีข้อมูล</div>
                    )}
                </div>
            </div>
        </React.Fragment>
    )
}