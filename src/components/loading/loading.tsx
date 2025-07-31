import React from 'react'
import {Spinner} from "@heroui/spinner";

export function Loading() {
    return (
        <div className='w-full h-[90vh] flex justify-center items-center'>
            <Spinner variant="gradient" color="secondary" />
        </div>
    )
}
