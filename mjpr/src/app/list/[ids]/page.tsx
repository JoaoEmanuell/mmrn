'use client'

import { Praise } from '@/components/body/Praise'
import { GrayButton } from '@/components/ui/GrayButton'
import { getRandomElementKey } from '@/lib/randomElementKey'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type buttonVisibility = 'invisible' | 'visible'

export default function ListPage() {
    const params = useParams()
    const [ids, setIds] = useState<string[] | null>(null)
    const [actualIndex, setActualIndex] = useState<number>(0)
    const [previousButtonVisibility, setPreviousButtonVisibility] =
        useState<buttonVisibility>('invisible')
    const [nextButtonVisibility, setNextButtonVisibility] =
        useState<buttonVisibility>('visible')
    const [praiseElementKey, setPraiseElementKey] = useState(
        getRandomElementKey()
    )

    useEffect(() => {
        const ids = params['ids'] as string
        const idsArray = ids.split('-')
        setIds(idsArray)
    }, [])

    const previousPraise = () => {
        if (actualIndex !== 0) {
            setNextButtonVisibility('visible')
            setActualIndex(actualIndex - 1)
            setPraiseElementKey(getRandomElementKey())
            setPreviousButtonVisibility('visible')
            if (actualIndex - 1 === 0) {
                setPreviousButtonVisibility('invisible')
            }
        }
    }

    const nextPraise = () => {
        const nextIndex = actualIndex + 1
        if (nextIndex !== ids?.length) {
            setActualIndex(nextIndex)
            setPraiseElementKey(getRandomElementKey())
            setPreviousButtonVisibility('visible')
            if (nextIndex + 1 === ids?.length) {
                setNextButtonVisibility('invisible')
            }
        }
    }

    return (
        <main>
            {ids ? (
                <Praise id={ids![actualIndex]} key={praiseElementKey} />
            ) : (
                'Carregando louvor!'
            )}
            {ids ? (
                <div className="mt-4">
                    <div className="flex justify-between items-center space-x-2">
                        <GrayButton
                            text="Anterior"
                            onClick={previousPraise}
                            customClassName={previousButtonVisibility}
                        ></GrayButton>
                        <span className="font-mono">
                            {actualIndex + 1} / {ids?.length}
                        </span>
                        <GrayButton
                            text="Próximo"
                            onClick={nextPraise}
                            customClassName={nextButtonVisibility}
                        ></GrayButton>
                    </div>
                </div>
            ) : (
                ''
            )}
        </main>
    )
}
