'use client'

import { Dropdown } from '@/components/Dropdown'
import { useEffect, useState } from 'react'

export default function Home() {
    const [dropdownItems, setDropdownItens] = useState({ '': 0 }) //default

    const onSelectDropdown = (selectedValue: string) => {
        const origin = new URL(window.location.href).origin
        window.location.href = `${origin}/praise/${selectedValue}`
    }

    useEffect(() => {
        const origin = new URL(window.location.href).origin
        const data = `${origin}/json/data.min.json`
        fetch(data, {
            method: 'GET',
            mode: 'cors',
            cache: 'default',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                const praises = data['praises'] // get the praises
                setDropdownItens(praises)
            })
    }, [])

    return (
        <main>
            <div className="container mt-4">
                <h1 className="text-center text-2xl font-title">
                    Louvores igreja de João Pessoa
                </h1>
                <p className="text-center text-base mt-4">
                    Clique no campo abaixo, pesquise o nome do louvor, após isso
                    clique em cima do nome do louvor, assim você será
                    direcionado para o louvor desejado!
                </p>
            </div>
            <div className="container mt-4 flex justify-center">
                <Dropdown
                    dropdownItems={dropdownItems}
                    onSelect={onSelectDropdown}
                    labelText="Louvores: "
                />
            </div>
        </main>
    )
}
