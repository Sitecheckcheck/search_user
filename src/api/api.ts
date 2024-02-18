export const geAboutUser = async (login: string) => {
    let data
    const res = await fetch(`https://api.github.com/users/${login}`)
    if (!res.ok) {
        throw new Error('ошибка сервера')
    }
    data = await res.json()

    return data
}

export const getUsers = async (query: string, page = 1, order = 'desc') => {
    const res = await fetch(
        `https://api.github.com/search/users?q=${encodeURIComponent(`${query} in:login`)}&page=${page}&sort=repositories&order=${order}`,
    )

    if (!res.ok && res.status === 403) {
        throw new Error('превышено количество запросов, попробуйте позже')
    }
    const data = await res.json()

    return data
}
