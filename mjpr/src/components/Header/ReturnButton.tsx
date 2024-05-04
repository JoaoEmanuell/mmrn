'use client'

import { CircleArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ReturnButton() {
    const [visible, setVisible] = useState('hidden')

    const clickReturnButton = () => {
        const origin = new URL(window.location.href).origin
        window.location.href = `${origin}`
    }

    useEffect(() => {
        const path = new URL(window.location.href).pathname
        if (path !== '/') {
            // user not in initial page
            setVisible('cursor-pointer')
        }
    }, [])

    return (
        <div className={visible} onClick={clickReturnButton}>
            <CircleArrowLeft width={28} height={28} />
        </div>
    )
}
