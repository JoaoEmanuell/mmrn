import { ScrollView, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'

import { readPraisesJson } from '../source/readPraisesJson'
import { getRandomElementKey } from '../source/getRandomElementKey'
import { useState, useEffect } from 'react'
import { DarkButton } from '../components/darkMode/DarkButton'
import { getColors } from '../source/darkMode/colors'
import { getUserModePreference } from '../source/darkMode/userPreference'

export function PraiseScreen({ navigation, route }) {
    // json

    const [praise, setPraise] = useState<any>()

    // colors

    const colors = getColors()

    const [scrollViewColors, setScrollViewColors] = useState(
        colors['containerLight']
    )
    const [textColors, setTextColors] = useState(colors['textLight'])

    const [statusBarStyle, setStatusBarStyle] = useState<'light' | 'dark'>(
        'dark'
    )

    const setColorMode = async () => {
        const userPreference = await getUserModePreference('dark')
        if (userPreference) {
            setScrollViewColors(colors['containerDark'])
            setTextColors(colors['textDark'])
            setStatusBarStyle('light')
            navigation.setOptions({
                headerStyle: colors['containerDark'],
                headerTintColor: '#fff',
            })
        } else {
            setScrollViewColors(colors['containerLight'])
            setTextColors(colors['textLight'])
            setStatusBarStyle('dark')
            navigation.setOptions({
                headerStyle: colors['containerLight'],
                headerTintColor: '#000',
            })
        }
    }

    useEffect(() => {
        setColorMode()
        navigation.setOptions({
            headerRight: () => <DarkButton onPress={setColorMode} />,
        })
        readPraisesJson().then((data) => {
            const praiseJsonParse = JSON.parse(data as unknown as string)
            const praiseNumber = String(route.params.praiseNumber)
            setPraise(praiseJsonParse[praiseNumber])
        })
    }, [navigation])

    if (praise === undefined) {
        return (
            <Text className="font-title text-2xl font-bold mb-4 text-center">
                Louvor ainda não cadastrado!
            </Text>
        )
    }

    return (
        <ScrollView
            className="px-5 py-1 w-full max-w-lg"
            style={scrollViewColors}
        >
            <Text
                className="font-title text-2xl font-bold mb-4 text-center"
                style={textColors}
            >
                {route.params.praiseTitle.split(' - ')[1]}
            </Text>
            <View>
                {praise.organization.map((organizationPosition) => {
                    return (
                        <View key={getRandomElementKey()} className="mb-4">
                            {praise.data[organizationPosition].map((line) => {
                                return (
                                    <Text
                                        style={textColors}
                                        key={getRandomElementKey()}
                                        className="text-center text-base"
                                    >
                                        {line[0]}
                                    </Text>
                                )
                            })}
                        </View>
                    )
                })}
            </View>
            <StatusBar style={statusBarStyle} />
        </ScrollView>
    )
}