import { View } from 'react-native'
import { SelectList } from '../react-native-dropdown-select-list'
import { LabelFormControl } from './LabelFormControl'
import { useState } from 'react'

interface DropdownMenuListProps {
    labelText: string
    labelStyle?
    dropdownStyle?
    textDropdownStyle?
    data: Array<{
        key: string | number
        value: string
        disabled?: boolean
    }>
    searchPlaceholderTextColor?: string
    setSelected: (value: string) => void
    searchPlaceholder: string
    notFoundText?: string
    onSelect?: () => void
}

export function DropdownMenuList(props: DropdownMenuListProps) {
    const defaultOption = {
        key: '-1',
        value: 'Selecione o louvor',
        disabled: true,
    }

    const [previousValue, setPreviousValue] = useState('') // Save the before value

    const handleSelect = (value: string) => {
        if (value === previousValue) {
            // Dispatch manual onSelect
            props.setSelected(value)
            props.onSelect && props.onSelect()
        }
        props.setSelected(value)
        setPreviousValue(value) // Update the before value
    }

    return (
        <View className="mt-5">
            <LabelFormControl text={props.labelText} style={props.labelStyle} />
            <SelectList
                setSelected={handleSelect}
                data={props.data}
                save="value"
                defaultOption={defaultOption}
                searchPlaceholder={props.searchPlaceholder}
                onSelect={props.onSelect}
                notFoundText={props.notFoundText}
                placeholder={props.notFoundText}
                boxStyles={props.dropdownStyle}
                dropdownStyles={props.dropdownStyle}
                dropdownTextStyles={props.textDropdownStyle}
                inputStyles={props.textDropdownStyle}
                searchPlaceholderTextColor={props.searchPlaceholderTextColor}
            />
        </View>
    )
}
