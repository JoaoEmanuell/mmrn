import SyncStorage from 'sync-storage'

export const saveUserPreference = (name, preference) => {
    // const data = await SyncStorage.init()
    SyncStorage.set(name, preference)
    return true
}

export const getUserPreference = (name) => {
    // const data = await SyncStorage.init();
    return SyncStorage.get(name)
}
