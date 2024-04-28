import type { Metadata } from 'next'
import { Header } from '@/components/Header/Header'
import './globals.css'

import { Roboto } from 'next/font/google'

const roboto = Roboto({
    weight: '300',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'Louvores João Pessoa',
    description:
        'Versão web do aplicativo de louvores da igreja em João Pessoa',
    keywords:
        'louvores, João Pessoa, músicas, gospel, cristão, igreja, discípulos',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="pt-br">
            <body className="transition-all duration-500">
                <noscript>Enable Javascript to use this site!</noscript>
                <Header />
                <div
                    className={`flex justify-center mt-4 px-4 mb-4 ${roboto.className}`}
                >
                    {children}
                </div>
            </body>
        </html>
    )
}
