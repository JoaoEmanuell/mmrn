'use client'

import { CircleArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ReturnButton() {
    const [visible, setVisible] = useState('hidden')

    useEffect(() => {
        const path = new URL(window.location.href).pathname
        if (path !== '/') {
            // user not in initial page
            setVisible('cursor-pointer')
        }
    }, [])

    return (
        <div
            className={visible}
            onClick={() => {
                history.back()
            }}
        >
            <CircleArrowLeft width={28} height={28} />
        </div>
    )
}
