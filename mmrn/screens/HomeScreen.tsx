/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react'
import {
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    StatusBar,
} from 'react-native'
import { DropdownMenuList } from '../components/form/DropdownMenuList'

import { readDataJson } from '../source/readDataJson.ts'
import { orderPraises } from '../source/orderPraises'

import { getDefaultColors } from '../source/darkMode/colors'
import { getUserModePreference } from '../source/darkMode/userPreference'
import { useIsFocused } from '@react-navigation/native'

import Settings from '../assets/icons/settings.png'

import { colorsSingleton } from '../source/singletonManager.ts'

export function HomeScreen({ navigation }) {
    // json

    const [dataJson, setDataJson] = useState<any>()
    const [praisesData, setPraisesData] = useState<any>()

    // Dropdown

    let [dropdownMenuListValue, setDropdownMenuListValue] = useState('')
    const [dropdownMenuListFirstExecution, setDropdownMenuListFirstExecution] =
        useState(0)
    const nameForNotFound = 'Louvor não encontrado'

    // Colors

    const colors = getDefaultColors()

    const [scrollViewColors, setScrollViewColors] = useState(
        colors.containerLight
    )
    const [titleColors, setTitleColors] = useState(colors.titleLight)
    const [textColors, setTextColors] = useState(colors.textLight)
    const [dropDownStyle, setDropdownStyle] = useState(colors.dropdownMenuDark)

    const [statusBarStyle, setStatusBarStyle] = useState<'light' | 'dark'>(
        'dark'
    )

    const isFocused = useIsFocused()

    const setColorMode = async () => {
        const userPreference = await getUserModePreference('dark')
        const colors = await colorsSingleton.getInstance()

        if (userPreference) {
            // dark mode
            setScrollViewColors(colors.containerDark)
            setTextColors(colors.textDark)
            setTitleColors(colors.titleDark)
            setDropdownStyle(colors.dropdownMenuDark)
            setStatusBarStyle('light')
            navigation.setOptions({
                headerStyle: colors.containerDark,
            })
        } else {
            // light mode
            setScrollViewColors(colors.containerLight)
            setTextColors(colors.textLight)
            setTitleColors(colors.titleLight)
            setDropdownStyle(colors.dropdownMenuLight)
            setStatusBarStyle('dark')
            navigation.setOptions({
                headerStyle: colors.containerLight,
            })
        }
    }

    const setConfigurationInNavigation = () => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('ConfigurationScreen')
                    }}
                    className="pr-2"
                >
                    <Image source={Settings} className="w-6 h-6" />
                </TouchableOpacity>
            ),
        })
    }

    useEffect(() => {
        if (isFocused) {
            setColorMode().then(() => {
                setConfigurationInNavigation()
            })
        }

        readDataJson().then((data) => {
            if (typeof data === 'object') {
                setDataJson(data)
                setPraisesData(orderPraises(data.praises))
            } else {
                setDataJson(JSON.parse(data as unknown as string))
                setPraisesData(
                    orderPraises(JSON.parse(data as unknown as string).praises)
                )
            }
        })
    }, [navigation, isFocused])

    const selectItem = () => {
        // Select item
        if (dropdownMenuListFirstExecution === 0) {
            setDropdownMenuListFirstExecution(1)
        } else {
            const praiseNumber = dataJson.praises[dropdownMenuListValue]

            if (
                praiseNumber === undefined ||
                dropdownMenuListValue === undefined
            ) {
            }

            const praiseTitle = dropdownMenuListValue

            navigation.navigate('PraiseScreen', {
                praiseNumber: praiseNumber,
                praiseTitle: praiseTitle,
            })
        }
    }

    return (
        <ScrollView
            className="p-5 w-full max-w-lg bg-white"
            style={scrollViewColors}
        >
            <Text
                className="font-title font-bold mb-2 text-center"
                style={titleColors}
            >
                Louvores JP
            </Text>
            <Text className="text-base mb-2 text-center" style={textColors}>
                Clique no campo abaixo, pesquise o nome do louvor, após isso
                clique em cima do nome do louvor, assim você será direcionado
                para o louvor desejado!
            </Text>

            <DropdownMenuList
                labelText="Louvores:"
                labelStyle={textColors}
                data={praisesData}
                searchPlaceholder="Selecione o louvor"
                setSelected={setDropdownMenuListValue}
                onSelect={selectItem}
                notFoundText={nameForNotFound}
                dropdownStyle={dropDownStyle}
                textDropdownStyle={textColors}
                searchPlaceholderTextColor={textColors.color}
            />
            <StatusBar style={statusBarStyle} />
        </ScrollView>
    )
}
