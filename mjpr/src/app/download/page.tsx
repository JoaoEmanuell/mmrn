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
                            <div className="text-gray-800 mb-4">
                                {data.body}
                            </div>
                            <p className="text-center mb-2 text-gray-800">
                                Escolha a versão que você deseja:
                            </p>
                            <div className="space-y-4 mt-4">
                                {data.assets.map(
                                    (version: {
                                        browser_download_url: string
                                        name: string
                                    }) => {
                                        if (
                                            version.name.includes('armeabi_v7a')
                                        ) {
                                            //armeabi_v7a apk
                                            return BaseDownloadButton(
                                                version.browser_download_url,
                                                'Opção 1',
                                                'bg-green-600'
                                            )
                                        } else if (
                                            version.name.includes('universal')
                                        ) {
                                            // universal apk
                                            return BaseDownloadButton(
                                                version.browser_download_url,
                                                'Opção 2',
                                                'bg-blue-600'
                                            )
                                        }
                                    }
                                )}
                            </div>
                        </div>
                    )
                }
            })
        })
    }, [])

    const BaseDownloadButton = (
        url: string,
        text: string,
        bgColor?: string
    ) => {
        return (
            <div>
                <a
                    href={url}
                    className={`text-white p-2 rounded-lg ${bgColor} `}
                >
                    {text}
                </a>
            </div>
        )
    }

    return (
        <main className="container mt-4 text-center">
            <h1 className="text-xl">Download</h1>
            <h2 className="my-4">Última versão</h2>
            <div id="div-last-download" className="container mt-4 ">
                {releaseDiv}
            </div>
            <p className="mt-4">
                Caso você <strong>não</strong> aconteça algum erro na instalação
                da "Opção 1", você pode tentar a "Opção 2", caso nenhum dos dois
                consiga ser instalado, entre em contato com o desenvolvedor.
            </p>
            <p className="mt-4">
                <a
                    href="https://github.com/JoaoEmanuell/mmrn/releases"
                    target="_blank"
                    className="underline"
                >
                    Clique aqui para acessar as versões anteriores
                </a>
            </p>
            <script
                src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"
                defer
            ></script>
        </main>
    )
}
