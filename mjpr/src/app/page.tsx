'use client'

import { Dropdown } from '@/components/Dropdown'
import { roboto } from '@/config/roboto'

const exampleDropdownItems = {
    praises: {
        '1 - Em teu nome': 0,
        '2 - Minha alma engrandece': 1,
        '3 - Alto Preço / Alfa e Ômega': 2,
        '4 - Jesus Em Tua Presença': 3,
        '5 - A Ele a Glória': 4,
        '6 - Santo Espírito': 5,
        '7 - Ele é Exaltado': 6,
        '8 - Há Um Rio': 7,
        '9 - Isaías 9': 8,
        '10 - Isaías 53': 9,
        '11 - Leão de Judá': 10,
        '12 - Nosso Deus é Soberano': 11,
        '13 - Grande é o Senhor': 12,
        '14 - Digno é o Cordeiro': 13,
        '15 - Jesus, o Plano Perfeito': 14,
        "16 - Aquieta Minh'alma": 15,
        '17 - O Plano': 16,
        '18 - Vim Para Adorar-te': 17,
        '19 - Nome sobre todo nome': 18,
    },
}

export default function Home() {
    const onSelectDropdown = (selectedValue: string) => {
        const origin = new URL(window.location.href).origin
        window.location.href = `${origin}/praise/${selectedValue}`
    }

    return (
        <main className={roboto.className}>
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
                    dropdownItems={exampleDropdownItems['praises']}
                    onSelect={onSelectDropdown}
                    labelText="Louvores: "
                />
            </div>
        </main>
    )
}
