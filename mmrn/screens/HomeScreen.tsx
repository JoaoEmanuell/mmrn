import { useEffect, useState } from 'react'
import { Text, ScrollView } from 'react-native'
import { DropdownMenuList } from '../components/form/DropdownMenuList'

import { readDataJson } from '../source/readDataJson'
import { orderPraises } from '../source/orderPraises'

import { getColors } from '../source/darkMode/colors'
import { getUserPreference } from '../source/darkMode/userPreference'
import { DarkButton } from '../components/darkMode/DarkButton'
import { useIsFocused } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'

const dataJson = readDataJson()
const praisesData = orderPraises(dataJson['praises'])

export function HomeScreen({ navigation }) {
    // Dropdown

    let [dropdownMenuListValue, setDropdownMenuListValue] = useState('')
    const [dropdownMenuListFirstExecution, setDropdownMenuListFirstExecution] =
        useState(0)
    const nameForNotFound = 'Louvor não encontrado'

    // Colors

    const colors = getColors()

    const [scrollViewColors, setScrollViewColors] = useState(
        colors['containerLight']
    )
    const [textColors, setTextColors] = useState(colors['textLight'])
    const [dropDownStyle, setDropdownStyle] = useState(
        colors['dropdownMenuDark']
    )
    const [statusBarStyle, setStatusBarStyle] = useState<'light' | 'dark'>(
        'dark'
    )

    const isFocused = useIsFocused()

    const setColorMode = () => {
        if (getUserPreference('dark')) {
            // dark mode
            setScrollViewColors(colors['containerDark'])
            setTextColors(colors['textDark'])
            setDropdownStyle(colors['dropdownMenuDark'])
            setStatusBarStyle('light')
            navigation.setOptions({
                headerStyle: colors['containerDark'],
            })
        } else {
            // light mode
            setScrollViewColors(colors['containerLight'])
            setTextColors(colors['textLight'])
            setDropdownStyle(colors['dropdownMenuLight'])
            setStatusBarStyle('dark')
            navigation.setOptions({
                headerStyle: colors['containerLight'],
            })
        }
    }

    useEffect(() => {
        if (isFocused) {
            setColorMode()
        }
        navigation.setOptions({
            headerRight: () => <DarkButton onPress={setColorMode} />,
        })
    }, [navigation, isFocused])

    const selectItem = () => {
        // Select item
        if (dropdownMenuListFirstExecution === 0) {
            setDropdownMenuListFirstExecution(1)
        } else {
            const praiseNumber = dataJson['praises'][dropdownMenuListValue]

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
                className="font-title text-2xl font-bold mb-2 text-center"
                style={textColors}
            >
                Louvores mandacaru
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
            ></DropdownMenuList>
            <StatusBar style={statusBarStyle} />
        </ScrollView>
    )
}
