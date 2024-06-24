'use client'

import { fetchHeaders } from '@/lib/fetchHeaders'
import { getRandomElementKey } from '@/lib/randomElementKey'
import { useState, useEffect } from 'react'

interface PraiseProps {
    id: string
}

export function Praise(props: PraiseProps) {
    const [praiseInArray, setPraiseInArray] = useState<string[][] | null>()
    const [praiseTitle, setPraiseTitle] = useState('')
    const [numberOfColumns, setNumberOfColumns] = useState<number>(1)
    const [praiseView, setPraiseView] = useState<JSX.Element | undefined>()
    const id = props.id

    useEffect(() => {
        const origin = new URL(window.location.href).origin
        const praiseUrl = `${origin}/json/praises/${id}.json`
        // set praise
        fetch(praiseUrl, fetchHeaders).then((res) => {
            if (res.status === 404) {
                alert('Louvor inválido')
                window.location.replace(`/`)
            } else {
                res.json().then((data) => {
                    const fullPraise: string[][] = []
                    data['organization'].forEach((organizationValue) => {
                        const paragraph = data['data'][organizationValue]
                        fullPraise.push(paragraph)
                    })
                    setPraiseInArray(fullPraise)
                })
            }
        })
        // set title
        fetch(`${origin}/json/data.min.json`, fetchHeaders).then((res) =>
            res.json().then((data) => {
                const praises = data['praises'] // get the praises
                // get the praise title
                Object.entries(praises).forEach((praiseData) => {
                    const praiseId = praiseData[1] as number
                    if (praiseId.toString() === id) {
                        setPraiseTitle(praiseData[0].split(' - ')[1]) // remove the identifier
                    }
                })
            })
        )
    }, [])

    useEffect(() => {
        if (praiseInArray !== undefined) {
            constructorPraiseToView(1)
        }
    }, [praiseInArray])

    const changeColumnsNumber = () => {
        let newNumberOfColumns: number
        if (numberOfColumns === 4) {
            newNumberOfColumns = 1
        } else {
            newNumberOfColumns = numberOfColumns + 1
        }
        constructorPraiseToView(newNumberOfColumns)
        setNumberOfColumns(newNumberOfColumns)
    }

    const constructorPraiseToView = (numberOfColumns: number) => {
        const slicePraiseInArray: string[][][] = []
        if (praiseInArray!.length === 1) {
            slicePraiseInArray.push(praiseInArray!)
        } else {
            const slice = Math.round(praiseInArray!.length / numberOfColumns)
            let start_slice = 0

            for (let i = 1; i <= numberOfColumns; i++) {
                const end_slice = start_slice + slice
                if (end_slice >= praiseInArray!.length) {
                    // end
                    slicePraiseInArray.push(
                        praiseInArray!.slice(start_slice, praiseInArray!.length)
                    )
                    break
                } else {
                    slicePraiseInArray.push(
                        praiseInArray!.slice(start_slice, end_slice)
                    )
                    start_slice += slice
                }
            }
        }

        setPraiseView(
            <div className="flex flex-row">
                {slicePraiseInArray.map((slicePraise) => {
                    return (
                        <div className="container mt-4 text-center text-xl">
                            {slicePraise!.map((paragraph) => {
                                return (
                                    <div
                                        className="mt-4 px-2 space-y-1"
                                        key={getRandomElementKey()}
                                    >
                                        {paragraph.map((line) => {
                                            if (line.toString() === '') {
                                                return (
                                                    <br
                                                        key={getRandomElementKey()}
                                                    />
                                                )
                                            } else {
                                                return (
                                                    <p
                                                        key={getRandomElementKey()}
                                                    >
                                                        {line}
                                                    </p>
                                                )
                                            }
                                        })}
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <main className="mb-4 overflow-auto">
            <div className="container mt-4">
                <h1 className="text-center font-bold text-2xl">
                    {praiseTitle}
                </h1>
            </div>
            <div className="container mt-4">
                <div className="flex flex-row items-center space-x-2">
                    <span>Número de colunas:</span>
                    <span>
                        <button
                            className="text-black rounded-full bg-gray-300 flex items-center justify-center w-8 h-8 font-bold"
                            onClick={changeColumnsNumber}
                        >
                            {numberOfColumns}
                        </button>
                    </span>
                </div>
            </div>
            <div>{praiseView}</div>
        </main>
    )
}
