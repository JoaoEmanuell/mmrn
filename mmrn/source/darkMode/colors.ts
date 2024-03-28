import { StyleSheet } from 'react-native'

export const getColors = () => {
    return StyleSheet.create({
        containerDark: {
            backgroundColor: '#1f2937',
        },
        textDark: {
            color: '#fff',
        },
        containerLight: {
            backgroundColor: '#fff',
        },
        textLight: {
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
