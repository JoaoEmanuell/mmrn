'use client'

import { useEffect, useState } from 'react'

export default function DownloadPage() {
    const [releaseDiv, setReleaseDiv] = useState<JSX.Element | null>()

    useEffect(() => {
        const releaseApiEndpoint =
            'https://api.github.com/repos/JoaoEmanuell/mmrn/releases/latest'
        fetch(releaseApiEndpoint, {
            method: 'GET',
            mode: 'cors',
            cache: 'default',
            credentials: 'same-origin',
            headers: {
                'Content-type': 'application/json',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        }).then((response) => {
            response.json().then((data) => {
                if (data.message == 'Not Found') {
                    setReleaseDiv(
                        <div className="text-red-600">
                            <h2>Não existe lançamentos disponíveis!</h2>
                        </div>
                    )
                } else {
                    setReleaseDiv(
                        <div className="shadow-lg p-4 rounded-md bg-gray-100">
                            <div className="text-gray-800">{data.body}</div>
                            <a
                                href={data.assets[0].browser_download_url}
                                className="underline text-gray-800"
                            >
                                Clique aqui para baixar a nova versão!
                            </a>
                        </div>
                    )
                }
            })
        })
    }, [])

    return (
        <main className="container mt-4 text-center">
            <h1 className="text-xl">Download</h1>
            <h2 className="my-4">Última versão</h2>
            <div id="div-last-download" className="container mt-4 ">
                {releaseDiv}
            </div>
            <p className="mt-4">
                <a
                    href="https://github.com/JoaoEmanuell/mmrn/releases"
                    target="_blank"
                    className="underline"
                >
                    Clique aqui para acessar as versões anteriores
                </a>
            </p>
        </main>
    )
}
