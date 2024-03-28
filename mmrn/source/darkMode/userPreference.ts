import AsyncStorage from '@react-native-async-storage/async-storage'

export const saveUserPreference = async (name, preference) => {
    await AsyncStorage.setItem(name, preference)
    return true
}

export const getUserModePreference = async (name) => {
    const value = await AsyncStorage.getItem(name)
    if (value === 'true') {
        return true
    } else {
        return false
    }
}
