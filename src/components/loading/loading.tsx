import React from 'react'
import {Spinner} from "@heroui/spinner";

export function Loading({size = `90`}:{size?:string}) {
    return (
        <div className={`w-full h-[${size}vh] flex justify-center items-center`}>
            <Spinner variant="gradient" color="secondary" />
        </div>
    )
}
