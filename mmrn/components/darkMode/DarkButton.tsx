import { useEffect, useState } from 'react'
import { Image, TouchableOpacity } from 'react-native'

import { useIsFocused } from '@react-navigation/native'

import Sun from '../../assets/icons/sun.png'
import Moon from '../../assets/icons/moon.png'

import {
    getUserPreference,
    saveUserPreference,
} from '../../source/darkMode/userPreference'

interface DarkButtonProps {
    onPress?: () => void
}

export function DarkButton(props: DarkButtonProps) {
    const [icon, setIcon] = useState(Sun)

    const isFocused = useIsFocused()

    useEffect(() => {
        if (getUserPreference('dark')) {
            setIcon(Moon)
        } else {
            setIcon(Sun)
        }
    }, [isFocused])

    const changeIcon = () => {
        if (icon === Sun) {
            setIcon(Moon)
            saveUserPreference('dark', true)
        } else {
            setIcon(Sun)
            saveUserPreference('dark', false)
        }
        props.onPress()
    }

    return (
        <TouchableOpacity onPress={changeIcon} className="pr-2">
            <Image source={icon} className="w-6 h-6" />
        </TouchableOpacity>
    )
}
