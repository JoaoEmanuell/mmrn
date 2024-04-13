'use client'

import { getRandomElementKey } from '@/lib/randomElementKey'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface jsonInterface {
    organization: string[]
    data: {
        [key: string]: string[][]
    }
}

export default function PraisePage() {
    const params = useParams()
    const [json, setJson] = useState<jsonInterface | null>()
    const [praiseTitle, setPraiseTitle] = useState('')

    useEffect(() => {
        const id = params['id'] as string
        const origin = new URL(window.location.href).origin
        const data = `${origin}/json/data.min.json`
        fetch(data, {
            method: 'GET',
            mode: 'cors',
            cache: 'force-cache',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                const praises = data['praises'] // get the praises
                // get the praise title
                Object.entries(praises).forEach((praiseData) => {
                    const praiseId = praiseData[1] as number
                    if (praiseId.toString() === id) {
                        setPraiseTitle(praiseData[0].split(' - ')[1]) // remove the identifier
                    }
                })
            })
        // get praise
        const praises = `${origin}/json/praises.min.json`
        fetch(praises, {
            method: 'GET',
            mode: 'cors',
            cache: 'force-cache',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (!data.hasOwnProperty(id)) {
                    alert('Louvor inválido')
                    window.location.replace(`/`)
                } else {
                    console.log(data[id])
                    setJson(data[id])
                }
            })
    }, [])

    return (
        <main className={`mb-4`}>
            <div className="container mt-4">
                <h1 className="text-center font-bold text-2xl">
                    {praiseTitle}
                </h1>
            </div>
            <div className="container mt-4 text-center text-xl">
                {json &&
                    json['organization'].map((organizationValue) => {
                        const data = json['data'][organizationValue]
                        return (
                            <div
                                className="mt-4 px-2 space-y-1"
                                key={getRandomElementKey()}
                            >
                                {data.map((paragraph) => {
                                    if (paragraph.toString() === '') {
                                        return (
                                            <br key={getRandomElementKey()} />
                                        )
                                    } else {
                                        return (
                                            <p key={getRandomElementKey()}>
                                                {paragraph}
                                            </p>
                                        )
                                    }
                                })}
                            </div>
                        )
                    })}
            </div>
        </main>
    )
}
