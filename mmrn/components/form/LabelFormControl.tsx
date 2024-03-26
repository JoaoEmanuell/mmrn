import { Text } from "react-native";

interface LabelFormControlProps {
    text: string
}

export function LabelFormControl(props: LabelFormControlProps) {
    return (
        <Text className='block text-gray-700 text-sm md:text-right mb-2 mb:mb-0 pr-4'>{props.text}</Text>
    )
}