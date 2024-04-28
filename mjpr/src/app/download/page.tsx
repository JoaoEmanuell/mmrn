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
                            <ol className="space-y-2">
                                {data.assets.map(
                                    (version: {
                                        browser_download_url: string
                                        name: string
                                    }) => {
                                        return (
                                            <li>
                                                <a
                                                    href={
                                                        version.browser_download_url
                                                    }
                                                    className="underline text-gray-800"
                                                >
                                                    {version.name.split('-')[1]}
                                                </a>
                                            </li>
                                        )
                                    }
                                )}
                            </ol>
                        </div>
                    )
                }
            })
        })
    }, [])

    return (
        <main className="container mt-4 text-center">
            <h1 className="text-xl">Download</h1>
            <div
                id="accordion-collapse"
                data-accordion="collapse"
                className="rounded-xl mt-4"
                style={{
                    backgroundColor: 'white',
                    color: 'black',
                }}
            >
                <h2 id="accordion-collapse-heading-1">
                    <button
                        type="button"
                        className="flex items-center justify-between w-full p-5 font-medium rtl:text-right border border-gray-200 rounded-xl gap-3"
                        data-accordion-target="#accordion-collapse-body-1"
                        aria-expanded="false"
                        aria-controls="accordion-collapse-body-1"
                    >
                        <span className="flex items-center">
                            <svg
                                className="w-5 h-5 me-2 shrink-0"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>{' '}
                            Qual versão eu devo escolher?
                        </span>
                        <svg
                            data-accordion-icon
                            className="w-3 h-3 rotate-180 shrink-0"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 5 5 1 1 5"
                            />
                        </svg>
                    </button>
                </h2>
                <div
                    id="accordion-collapse-body-1"
                    className="hidden"
                    aria-labelledby="accordion-collapse-heading-1"
                >
                    <div className="p-5 border border-gray-200 space-y-2">
                        <p className="text-center">
                            O aplicativo é disponibilizado em diferentes versões
                            (arquiteturas), isso é feito para diminuir o tamanho
                            final do aplicativo.
                        </p>
                        <p className="text-center">
                            Em termos gerais, a grande maioria dos celulares
                            android suportam as arquiteturas <em>arm64-v8a</em>{' '}
                            e <em>armeabi-v7a</em>. <br />
                            Sendo assim, a melhor versão para ser baixada é a{' '}
                            <em>armeabi-v7a</em> (primeira opção), caso não
                            funcione, você pode testar o <em>universal</em> que
                            reúne todas as arquiteturas disponíveis em um só
                            (porém é bem maior que os outros)
                        </p>
                        <p className="text-center">
                            Para saber a arquitetura do seu celular você pode
                            baixar o aplicativo{' '}
                            <a
                                href="https://play.google.com/store/apps/details?id=com.liuzh.deviceinfo"
                                target="_blank"
                                className="underline"
                            >
                                Informações do dispositivo
                            </a>{' '}
                            navegar até <em>CPU</em>, as arquiteturas suportadas
                            estarão em <em>ABIs com suporte</em>
                        </p>
                    </div>
                </div>
            </div>
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
            <script
                src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"
                defer
            ></script>
        </main>
    )
}
