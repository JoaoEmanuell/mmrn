// https://tailwindcomponents.com/component/navbar-hamburger-menu
// modified

'use client'

import { useEffect, useState } from 'react'

export function BurgerMenu() {
    const year = new Date().getFullYear()
    const [actualTheme, setActualTheme] = useState<'dark' | 'white' | ''>('')
    const [darkModeEnabled, setDarkModeEnabled] = useState(false)

    const setDark = () => {
        setActualTheme('dark')
        document.documentElement.classList.add('dark')
        document.body.classList.add('text-white')
    }

    const setLight = () => {
        setActualTheme('white')
        document.documentElement.classList.remove('dark')
        document.body.classList.remove('text-white')
    }

    const changeTheme = () => {
        if (actualTheme === 'dark') {
            setLight()
            localStorage.theme = 'white'
            setDarkModeEnabled(false)
        } else {
            setDark()
            localStorage.theme = 'dark'
            setDarkModeEnabled(true)
        }
    }

    useEffect(() => {
        // Automatic set the dark and withe mode
        if (localStorage.theme === 'dark') {
            setDark()
            setDarkModeEnabled(true)
        } else {
            setLight()
        }
    }, [])

    return (
        <div>
            <nav className="relative flex justify-between items-center">
                <a className="text-3xl font-bold leading-none" href="#"></a>
                <div className="">
                    <button className="navbar-burger flex items-center">
                        <svg
                            className="block fill-current"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                        >
                            <title>Menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                        </svg>
                    </button>
                </div>
            </nav>
            <div className="navbar-menu relative z-50 hidden">
                <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
                <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
                    <div className="flex items-center mb-8">
                        <a
                            className="mr-auto text-3xl font-bold leading-none"
                            href="#"
                        ></a>
                        <button className="navbar-close">
                            <svg
                                className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <div>
                        <ul>
                            <li className="mb-1">
                                <a
                                    className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 rounded"
                                    href="/"
                                >
                                    Página inicial
                                </a>
                            </li>
                            <li className="mb-1">
                                <a
                                    className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 rounded"
                                    href="/about"
                                >
                                    Sobre
                                </a>
                            </li>
                            <li className="mb-1" onClick={changeTheme}>
                                <div className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 rounded">
                                    <div className="inline-flex items-center cursor-pointer">
                                        <span className="text-sm font-medium text-gray-400 mr-4">
                                            Modo escuro
                                        </span>
                                        <input
                                            type="checkbox"
                                            value=""
                                            className="sr-only peer"
                                            checked={darkModeEnabled}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                        <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 outline-none"></div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-auto">
                        <p className="my-4 text-xs text-center text-gray-400">
                            <span>Louvores João Pessoa © {year}</span>
                        </p>
                    </div>
                </nav>
            </div>
            <script src="/js/burgerMenu.js" defer></script>
        </div>
    )
}
