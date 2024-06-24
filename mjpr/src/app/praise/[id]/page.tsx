'use client'

import { Praise } from '@/components/body/Praise'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PraisePage() {
    const params = useParams()
    const [id, setId] = useState<string | null>(null)

    useEffect(() => {
        const id = params['id'] as string
        setId(id)
    }, [])

    return id ? <Praise id={id} /> : 'Carregando louvor!'
}
