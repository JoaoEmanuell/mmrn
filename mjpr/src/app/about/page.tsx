export default function AboutPage() {
    return (
        <main>
            <h1 className="text-center text-xl">Louvores João Pessoa</h1>
            <div className="space-y-2 text-center mt-4">
                <p className="text-base">
                    Louvores João Pessoa é um projeto criado para facilitar a
                    distribuição das letras dos louvores tocados pela igreja de
                    João Pessoa.
                </p>
                <p>
                    Facilitando a distribuição dos louvores durante as reuniões
                    e melhorando a edificação mutua.
                </p>
                <p>
                    Tanto o site quanto o aplicativo tem por objetivos serem
                    gratuitos, desse modo não possuem anúncios para o seu
                    funcionamento e contam com uma interface amigável.
                </p>
                <p>
                    Usando o menu de navegação você pode navegar entre as
                    páginas, assim como acionar o modo escuro.
                </p>
                <p>
                    Caso deseje fazer o download do aplicativo Android,{' '}
                    <a href="/download" target="_parent" className="underline">
                        clique aqui
                    </a>
                </p>
            </div>
        </main>
    )
}
