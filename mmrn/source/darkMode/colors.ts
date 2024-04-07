import { StyleSheet } from 'react-native'
import { getUserPreference } from './userPreference'

export const getDefaultColors = () => {
    return StyleSheet.create({
        containerDark: {
            backgroundColor: '#1f2937',
        },
        textDark: {
            color: '#fff',
        },
        titleDark: {
            color: '#fff',
        },
        containerLight: {
            backgroundColor: '#fff',
        },
        textLight: {
            color: '#000',
        },
        titleLight: {
            color: '#000',
        },
        dropdownMenuDark: {
            backgroundColor: '#36465d',
        },
        dropdownMenuLight: {
            backgroundColor: '#fff',
        },
    })
}

export const getColors = async () => {
    const quantity = await getUserPreference('fontSize')

    return StyleSheet.create({
        containerDark: {
            backgroundColor: '#1f2937',
        },
        textDark: {
            color: '#fff',
            fontSize: 16 + Number(quantity),
            lineHeight: 24 + Number(quantity),
            marginTop: (0 + Number(quantity)) / 2,
        },
        titleDark: {
            fontSize: 24 + Number(quantity),
            lineHeight: 32 + Number(quantity),
            color: '#fff',
        },
        containerLight: {
            backgroundColor: '#fff',
        },
        textLight: {
            color: '#000',
            fontSize: 16 + Number(quantity),
            lineHeight: 24 + Number(quantity),
            marginTop: (0 + Number(quantity)) / 2,
        },
        titleLight: {
            fontSize: 24 + Number(quantity),
            lineHeight: 32 + Number(quantity),
            color: '#000',
        },
        dropdownMenuDark: {
            backgroundColor: '#36465d',
        },
        dropdownMenuLight: {
            backgroundColor: '#fff',
        },
    })
}
