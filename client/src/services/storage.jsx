export const getState = () => {
    return getStorage('state')
}

export const saveState = (data) => {
    saveStorage('state', data)
}

export const getStorage = (name) => {
    try {
        const serializedState = sessionStorage.getItem(name)
        if (serializedState === null) {
            return undefined
        }
        return JSON.parse(serializedState)
    } catch (err) {
        return undefined
    }
}

export const saveStorage = (name, data) => {
    try {
        const serializedState = JSON.stringify(data)
        sessionStorage.setItem(name, serializedState)
    } catch (err) {
        // Ignore write errors.
    }
}