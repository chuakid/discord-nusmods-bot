const fetchFromAPI = (endpoint: string) => fetch("https://api.nusmods.com/v2" + endpoint)
const getCurrentAcadYear = () => "2023-2024" //TODO: make automatic

export const getModuleWithCode = async (code: string) => {
    try {
        return await fetchFromAPI(`/${getCurrentAcadYear()}/modules/${code}.json`)
    }
    catch (e) {
        throw "Failed to fetch from API"
    }
}