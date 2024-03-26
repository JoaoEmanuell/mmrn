import { ScrollView, Text, View } from 'react-native'

import { readPraisesJson } from '../source/readPraisesJson'
import { getRandomElementKey } from '../source/getRandomElementKey'

const praiseJson = readPraisesJson()

export function PraiseScreen({ navigation, route }) {
    const praiseNumber = String(route.params.praiseNumber)
    const praise = praiseJson[praiseNumber]
    if (praise === undefined) {
        return (
            <Text className="font-title text-2xl font-bold mb-4 text-center">
                Louvor ainda não cadastrado!
            </Text>
        )
    }
    return (
        <ScrollView className="px-5 py-1 w-full max-w-lg bg-white">
            <Text className="font-title text-2xl font-bold mb-4 text-center">
                {route.params.praiseTitle}
            </Text>
            <View>
                {praise.organization.map((organizationPosition) => {
                    console.log(organizationPosition)
                    return (
                        <View key={getRandomElementKey()} className="mb-4">
                            {praise.data[organizationPosition].map((line) => {
                                return (
                                    <Text
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
        </ScrollView>
    )
}
