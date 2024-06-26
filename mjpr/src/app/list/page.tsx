'use client'

import { useEffect, useState } from 'react'
import { Dropdown } from '@/components/Dropdown'
import { fetchHeaders } from '@/lib/fetchHeaders'
import { getRandomElementKey } from '@/lib/randomElementKey'
import { CircleX } from 'lucide-react'

export default function EditListPage() {
    const [ids, setIds] = useState<string[]>([])
    const [listPraisesName, setListPraisesName] = useState<string[]>([])
    const [visibleAddedPraises, setVisibleAddedPraises] =
        useState<boolean>(false)
    const [dropdownItems, setDropdownItens] = useState({ '': 0 }) //default
    const [reversePraises, setReversePraises] = useState({ 0: '' })
    const [visibleAddedPraisesKey, setVisibleAddedPraisesKey] =
        useState<string>(getRandomElementKey()) // used to update the list

    useEffect(() => {
        const origin = new URL(window.location.href).origin
        const data = `${origin}/json/data.min.json`
        fetch(data, fetchHeaders)
            .then((res) => res.json())
            .then((data) => {
                const praises = data['praises'] // get the praises
                setDropdownItens(praises)
                const reverse = {}
                Object.entries(praises).map((key, value) => {
                    reverse[value] = key[0]
                })
                setReversePraises(reverse as { 0: '' })
            })
    }, [])

    const dropdownOnSelect = (selectedValue: string) => {
        if (!ids.includes(selectedValue)) {
            const idsCopy = ids
            idsCopy.push(selectedValue)
            setIds(idsCopy)
            const listPraisesNameCopy = listPraisesName
            const name = reversePraises[selectedValue]
            listPraisesNameCopy.push(name)
            setListPraisesName(listPraisesNameCopy)
            console.log(`Selected: ${reversePraises[selectedValue]}`)
            setVisibleAddedPraises(true)
            setVisibleAddedPraisesKey(getRandomElementKey())
        }
    }

    const removePraise = (praiseName: string) => {
        const listPraisesNameIndex = listPraisesName.indexOf(praiseName)
        const listPraisesNameCopy = listPraisesName
        delete listPraisesNameCopy[listPraisesNameIndex]
        setListPraisesName(listPraisesNameCopy)

        const praiseId = Number(praiseName.split(' - ')[0]) - 1 // get the praise id
        const idsCopy = ids
        const idIndex = idsCopy.indexOf(praiseId.toString())
        delete idsCopy[idIndex]
        setIds(idsCopy)
        console.log(idsCopy)
        setVisibleAddedPraisesKey(getRandomElementKey())
    }

    const exportPraises = () => {
        const origin = new URL(window.location.href).origin
        const filteredIds = ids.filter(function (el) {
            return el != null
        }) // remove the empty elements
        const urlToList = `${origin}/list/${filteredIds.join('-')}`
        window.navigator.clipboard.writeText(urlToList)
        window.alert(
            `Louvores exportados disponíveis na área de transferência\n${urlToList}`
        )
    }

    return (
        <main>
            <h1 className="text-center text-xl">Página de edição de lista</h1>
            <div
                className={`container mt-4 text-center ${
                    visibleAddedPraises ? '' : 'hidden'
                }`}
                key={visibleAddedPraisesKey}
            >
                <p>Louvores adicionados: </p>
                <ul className="list-disc">
                    {listPraisesName.map((praise) => {
                        return (
                            <li className="mt-2">
                                <span>{praise}</span>
                                <CircleX
                                    onClick={() => {
                                        removePraise(praise)
                                    }}
                                    color="red"
                                    className="inline mx-2 cursor-pointer"
                                />
                            </li>
                        )
                    })}
                </ul>
            </div>
            <Dropdown
                placeholder="Selecione o louvor"
                dropdownItems={dropdownItems}
                onSelect={dropdownOnSelect}
            />
            <div className="container mt-4 text-center">
                <button
                    className="bg-gray-300 text-bold p-2 rounded text-black"
                    onClick={exportPraises}
                >
                    Exportar louvores
                </button>
            </div>
        </main>
    )
}
