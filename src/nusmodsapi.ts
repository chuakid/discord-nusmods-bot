const fetchFromAPI = (endpoint: string) => fetch("https://api.nusmods.com/v2" + endpoint)
const getCurrentAcadYear = () => {
    const curr = new Date()
    return curr.getMonth() > 5 ? `${curr.getFullYear()}-${curr.getFullYear() + 1}` : `${curr.getFullYear() - 1}-${curr.getFullYear()}`
}

export const getModuleWithCode = async (code: string) => {
    try {
        return await fetchFromAPI(`/${getCurrentAcadYear()}/modules/${code}.json`)
    }
    catch (e) {
        throw "Failed to fetch from API"
    }
}