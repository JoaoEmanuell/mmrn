- [MMRN](#mmrn)
  - [About](#about)
  - [Develop](#develop)
    - [Starting](#starting)
      - [Mobile](#mobile)

[Português Brasil](./docs/pt-br/README.md)

# MMRN

## About

<p align="center">
  <img src="./docs/images/icon.png" alt="icon" width="100px"/>
</p>

Welcome to **Músicas Mandacaru React Native** (MMRN), is a project created to facilitate the distribution of the lyrics of the praises played by the João Pessoa church.

Facilitating the distribution of praise during meetings and improving mutual edification.

Both the website and the application aim to be free, so they do not have advertisements for their operation and have a user-friendly interface.

[Click here to access the website](https://praises-jp.vercel.app/)

[Click here to download the Android application](https://praises-jp.vercel.app/download)

****

## Develop

This repository contains the [web] version (https://github.com/JoaoEmanuell/mmrn/tree/master/mjpr) and the [mobile] version (https://github.com/JoaoEmanuell/mmrn/tree/master/ mmrn) of the application.

The web version is built with React and tailwind, while the mobile version is built with React Native and tailwind.

The praise system uses a [concept](https://www.freecodecamp.org/news/json-server-for-frontend-development/) (Known as *json server*) that eliminates the creation of an api, thus mode, zeroing the project's operational costs, as GitHub acts as an API distributing new praises and maintaining application updates for free.

### Starting

1. Clone the repository:

`git clone https://github.com/JoaoEmanuell/mmrn.git`

#### Web

**Requirements**

If you have **docker** on your machine, just run:

```
docker-compose build

docker-compose up -d

docker container exec -it mmrn_web_1 bash

cd mjpr

npm run dev
```

This way you will already be running the web development version.

If you don't have Docker and want to run with **node**:

```
node >= 19.9.0
npm >= 9.6.3
```

Run:

```
cd mjpr

npm install

npm run dev
```

This way you will run the web version.

#### Mobile

**Requirements**

```
node >= 19.9.0
npm >= 9.6.3
openjdk >= 17.0.10
```

**Development**

1. Navigate to mmrn (`cd mmrn`)
2. Run `npm install`
3. Follow the steps in this [tutorial](https://instamobile.io/android-development/generate-react-native-release-build-android/) to generate a *keystore*, you must generate a debug one with the following information:

```
storePassword 'android'
keyAlias 'androiddebugkey'
keyPassword 'android'
```

*keystore* generation command:

```
keytool -genkey -v -keystore debug.keystore -alias androiddebugkey -keyalg RSA -keysize 2048 -validity 10000
```

4. Copy the `build_example.gradle` located in `android/app/` to `android/app/build.gradle`
5. Move the *keystore* to `android/app/`
6. Connect your cell phone to your device.
7. Now run start `npm run start` and android `npm run android`

With this you should now be able to run the development version of the application

**Build**

1. Generate a deploy *keystore* and replace the information within *build.gradle*
2. Navigate to the android folder `cd android`
3. Run `./gradlew assembleRelease`, wait until the end of *apks* generation
4. The *apks* will be located in `android/app/build/outputs/apk/release/`

**Note:** `build.gradle` was configured to separate *apks* into different architectures, thus reducing the size of the *apk*, normally you should install `armeabi-v7a` which will be compatible with the vast majority of devices.
