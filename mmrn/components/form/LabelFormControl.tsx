import { Text } from 'react-native'

interface LabelFormControlProps {
    text: string
    style?
}

export function LabelFormControl(props: LabelFormControlProps) {
    return (
        <Text
            className="block text-gray-700 text-sm md:text-right mb-2 mb:mb-0 pr-4"
            style={props.style}
        >
            {props.text}
        </Text>
    )
}
