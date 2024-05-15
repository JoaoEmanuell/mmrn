'use client'

import { Dropdown } from '@/components/Dropdown'
import { fetchHeaders } from '@/lib/fetchHeaders'
import { SetStateAction, useEffect, useState } from 'react'

export default function Home() {
    const [dropdownItems, setDropdownItens] = useState({ '': 0 }) //default
    const [praisesGlobal, setPraisesGlobal] = useState({ '': 0 }) //default

    const onSelectDropdown = (selectedValue: string) => {
        const origin = new URL(window.location.href).origin
        window.location.href = `${origin}/praise/${selectedValue}`
    }

    useEffect(() => {
        const origin = new URL(window.location.href).origin
        const data = `${origin}/json/data.min.json`
        fetch(data, fetchHeaders)
            .then((res) => res.json())
            .then((data) => {
                const praises = data['praises'] // get the praises
                setDropdownItens(praises)
                const basePraiseUrl = `${origin}/json/praises`
                const globalPraises = {} as SetStateAction<{ '': number }>
                Object.keys(praises).forEach((praise) => {
                    const praiseId = praises[praise].toString() as string
                    fetch(`${basePraiseUrl}/${praiseId}.json`, fetchHeaders)
                        .then((res) => res.json())
                        .then((data) => {
                            globalPraises[praiseId] = data
                        })
                })
                setPraisesGlobal(globalPraises)
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
                    detailsItems={praisesGlobal}
                    onSelect={onSelectDropdown}
                    labelText="Louvores: "
                    placeholder="Digite o nome ou letra do louvor"
                />
            </div>
        </main>
    )
}
