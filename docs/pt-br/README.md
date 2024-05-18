- [MMRN](#mmrn)
  - [Sobre](#sobre)
  - [Desenvolvimento](#desenvolvimento)
    - [Começando](#começando)
      - [Web](#web)
      - [Mobile](#mobile)


# MMRN

## Sobre

<p align="center">
  <img src="../images/icon.png" alt="icon" width="100px"/>
</p>

Seja bem vindo ao **Músicas Mandacaru React Native** (MMRN), é um projeto criado para facilitar a distribuição das letras dos louvores tocados pela igreja de João Pessoa.

Facilitando a distribuição dos louvores durante as reuniões e melhorando a edificação mutua.

Tanto o site quanto o aplicativo tem por objetivos serem gratuitos, desse modo não possuem anúncios para o seu funcionamento e contam com uma interface amigável.

[Clique aqui para acessar o site](https://praises-jp.vercel.app/)

[Clique aqui para baixar o aplicativo android](https://praises-jp.vercel.app/download)

****

## Desenvolvimento

Esse repositório contem a versão [web](https://github.com/JoaoEmanuell/mmrn/tree/master/mjpr) e a versão [mobile](https://github.com/JoaoEmanuell/mmrn/tree/master/mmrn) do aplicativo.

A versão web é construída com React e tailwind, já a versão mobile é construída com React Native e tailwind.

O sistema de louvores utiliza um [conceito](https://www.freecodecamp.org/news/json-server-for-frontend-development/) (Conhecido como *json server*) que elimina a criação de um api, desse modo zerando os custos operacionais do projeto, pois o GitHub atua como uma api distribuindo os novos louvores e mantendo atualizações do aplicativo de forma gratuita.

### Começando

1. Realize a clonagem do repositório:

`git clone https://github.com/JoaoEmanuell/mmrn.git`

#### Web

**Requerimentos**

Caso você possua o **docker** na sua máquina, basta apenas executar:

```
docker-compose build

docker-compose up -d

docker container exec -it mmrn_web_1 bash

cd mjpr

npm run dev
```

Assim você já estará rodando a versão de desenvolvimento web.

Caso você não possua o docker e queira rodar com o **node**:

```
node >= 19.9.0
npm >= 9.6.3
```

Execute:

```
cd mjpr

npm install

npm run dev
```

Desse modo você irá executar a versão web.

#### Mobile

**Requerimentos**

```
node >= 19.9.0
npm >= 9.6.3
openjdk >= 17.0.10
```

**Desenvolvimento**

1. Navegue até o mmrn (`cd mmrn`)
2. Execute o `npm install`
3. Siga os passos desse [tutorial](https://instamobile.io/android-development/generate-react-native-release-build-android/) para gerar uma *keystore*, você deve gerar uma de debug com as seguinte informações:

```
storePassword 'android'
keyAlias 'androiddebugkey'
keyPassword 'android'
```

Comando de geração de *keystore*:

```
keytool -genkey -v -keystore debug.keystore -alias androiddebugkey -keyalg RSA -keysize 2048 -validity 10000
```

4. Copie o `build_example.gradle` localizado em `android/app/` para `android/app/build.gradle`
5. Mova a *keystore* para `android/app/`
6. Conecte o seu celular ao seu dispositivo.
7. Agora execute o start `npm run start` e o android `npm run android`

Com isso você já deve conseguir executar a versão de desenvolvimento do aplicativo

**Build**

1. Gere uma *keystore* de deploy e substitua as informações dentro do *build.gradle*
2. Navegue até a pasta do android `cd android`
3. Execute `./gradlew assembleRelease`, aguarde até o fim da geração dos *apks*
4. Os *apks* estarão localizados em `android/app/build/outputs/apk/release/`

**Nota:** O `build.gradle` foi configurado para realizar a separação dos *apks* em diferentes arquiteturas, desse modo diminuindo o tamanho do *apk*, normalmente você deve instalar a `armeabi-v7a` que irá ser compatível com a grande maioria dos dispositivos.