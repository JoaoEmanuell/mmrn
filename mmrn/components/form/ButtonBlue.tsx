import { View, Pressable, Text } from 'react-native'

interface ButtonBlueProps {
    buttonText?: string
    onPress?: () => void
}

export function ButtonBlue(props: ButtonBlueProps) {
    return (
        <View className="mt-4">
            <Pressable
                className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded"
                onPress={props.onPress}
            >
                <Text className="text-white font-bold text-center">
                    {props.buttonText}
                </Text>
            </Pressable>
        </View>
    )
}
