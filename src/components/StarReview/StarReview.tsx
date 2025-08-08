'use client'
import React from 'react'
import { IoIosStarOutline, IoIosStar } from "react-icons/io"

interface StarReviewProps {
    star: number
    max?: number
    size?: number
}

export function StarReview({ star, max = 5, size = 24 }: StarReviewProps) {
    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: max }).map((_, idx) =>
                idx < star ? (
                    <IoIosStar key={idx} color="#FFD700" size={size} />
                ) : (
                    <IoIosStarOutline key={idx} color="#FFD700" size={size} />
                )
            )}
        </div>
    )
}