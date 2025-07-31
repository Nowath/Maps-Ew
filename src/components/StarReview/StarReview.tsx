'use client'
import React from 'react'
import { IoIosStarOutline, IoIosStar } from "react-icons/io"

interface StarReviewProps {
    star: number
    max?: number
}

export function StarReview({ star, max = 5 }: StarReviewProps) {
    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: max }).map((_, idx) =>
                idx < star ? (
                    <IoIosStar key={idx} color="#FFD700" size={24} />
                ) : (
                    <IoIosStarOutline key={idx} color="#FFD700" size={24} />
                )
            )}
        </div>
    )
}