import { View } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import { LabelFormControl } from './LabelFormControl'

interface DropdownMenuListProps {
    labelText: string
    data: Array<{
        key: string | number
        value: string
        disabled?: boolean
    }>
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
    return (
        <View className="mt-5">
            <LabelFormControl text={props.labelText} />
            <SelectList
                setSelected={(val: string) => props.setSelected(val)}
                data={props.data}
                save="value"
                defaultOption={defaultOption}
                searchPlaceholder={props.searchPlaceholder}
                onSelect={props.onSelect}
                notFoundText={props.notFoundText}
                placeholder={props.notFoundText}
            />
        </View>
    )
}
