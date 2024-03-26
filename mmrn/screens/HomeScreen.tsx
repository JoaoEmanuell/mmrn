import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View, Text } from 'react-native'
import { DropdownMenuList } from '../components/form/DropdownMenuList'

import { readDataJson } from '../source/readDataJson'
import { orderPraises } from '../source/orderPraises'

const dataJson = readDataJson()
const devicesData = orderPraises(dataJson['praises'])

export function HomeScreen({ navigation }) {
    let [dropdownMenuListValue, setDropdownMenuListValue] = React.useState('')
    const [dropdownMenuListFirstExecution, setDropdownMenuListFirstExecution] =
        React.useState(0)
    const nameForNotFound = 'Louvor não encontrado'

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

            navigation.navigate('PraiseScreen', {
                praiseNumber: praiseNumber,
                praiseTitle: dropdownMenuListValue,
            })
        }
    }

    return (
        <View className="p-5 mt-5 w-full max-w-lg">
            <Text className="font-title text-2xl font-bold mb-2 text-center">
                Louvores mandacaru
            </Text>
            <Text className="text-base mb-2 text-center">
                Clique no campo abaixo, pesquise o nome do louvor, após isso
                clique em cima do nome do louvor, assim você será direcionado
                para o louvor desejado!
            </Text>

            <DropdownMenuList
                labelText="Louvores:"
                data={devicesData}
                searchPlaceholder="Selecione o louvor"
                setSelected={setDropdownMenuListValue}
                onSelect={selectItem}
                notFoundText={nameForNotFound}
            ></DropdownMenuList>

            <StatusBar style="auto" />
        </View>
    )
}
