import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View, ScrollView } from 'react-native'
import { Switch } from 'react-native-switch'
import { ButtonBlue } from '../components/form/ButtonBlue'
import {
    getUserModePreference,
    getUserPreference,
    saveUserPreference,
} from '../source/darkMode/userPreference'
import { useIsFocused } from '@react-navigation/native'

export function ConfigurationScreen({ navigation }) {
    // switch

    const [switchIsEnabled, switchSetIsEnabled] = useState(false)
    const toggleSwitch = async () => {
        console.log(`toggle ${!switchIsEnabled}`)
        switchSetIsEnabled(!switchIsEnabled)
        await saveDarkPreference(!switchIsEnabled)
    }

    // text size

    const [quantity, setQuantity] = useState('0')

    const moreButtonPress = () => {
        const newQuantity = Number(quantity) + 1
        setQuantity(newQuantity.toString())
        saveFontSizePreference(newQuantity.toString())
    }

    const lessButtonPress = () => {
        if (Number(quantity) !== 0) {
            const newQuantity = Number(quantity) - 1
            setQuantity(newQuantity.toString())
            saveFontSizePreference(newQuantity.toString())
        }
    }

    const textSize = StyleSheet.create({
        textExampleSize: {
            fontSize: 16 + Number(quantity),
            lineHeight: 24 + Number(quantity),
            marginTop: (0 + Number(quantity)) / 2,
        },
    })

    // save
    const saveDarkPreference = async (switchIsEnabled: boolean) => {
        await saveUserPreference('dark', switchIsEnabled.toString())
    }

    const saveFontSizePreference = async (fontSize: String) => {
        console.log(`new font ${fontSize}`)
        await saveUserPreference('fontSize', fontSize)
    }

    const isFocused = useIsFocused()

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Text
                    onPress={() => {
                        navigation.navigate('Home')
                    }}
                    className="text-sm pr-12 text-black"
                >
                    Salvar
                </Text>
            ),
        })
        if (isFocused) {
            getUserModePreference('dark').then((mode) => {
                console.log(mode)
                switchSetIsEnabled(mode as boolean)
            })
            getUserPreference('fontSize').then((font) => {
                console.log(font)
                setQuantity(font)
            })
        }
    }, [navigation, isFocused])

    return (
        <ScrollView>
            <View className="mt-4 px-2">
                <Text className="text-base mt-4 mb-6 text-black">
                    Modo escuro
                </Text>
                <View className="px-2">
                    <Switch
                        value={switchIsEnabled}
                        onValueChange={toggleSwitch}
                        barHeight={2.5}
                        circleBorderWidth={3}
                        backgroundActive={'#81b0ff'}
                        backgroundInactive={'#767577'}
                        circleActiveColor={'#81b0ff'}
                        circleInActiveColor={'#767577'}
                    />
                </View>
            </View>
            <View className="mt-4 px-2">
                <Text className="text-base mt-4 text-black">
                    Tamanho do texto:{' '}
                </Text>
                <View className="mt-4 flex flex-row justify-between px-[90]">
                    <ButtonBlue buttonText="-" onPress={lessButtonPress} />
                    <View className="mt-4 py-2 px-4">
                        <Text className="font-bold text-black">{quantity}</Text>
                    </View>
                    <ButtonBlue buttonText="+" onPress={moreButtonPress} />
                </View>
            </View>
            <View className="mt-4 px-2">
                <Text
                    className="text-center text-black"
                    style={textSize.textExampleSize}
                >
                    Jesus, em Tua presença reunimo-nos aqui
                </Text>
                <Text
                    className="text-center text-black"
                    style={textSize.textExampleSize}
                >
                    Contemplamos Tua face e rendemo-nos a Ti
                </Text>
                <Text
                    className="text-center text-black"
                    style={textSize.textExampleSize}
                >
                    Pois um dia Tua morte trouxe vida a todos nós
                </Text>
                <Text
                    className="text-center text-black"
                    style={textSize.textExampleSize}
                >
                    E nos deu completo acesso ao coração do Pai
                </Text>
            </View>
        </ScrollView>
    )
}
