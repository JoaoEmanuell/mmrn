export function orderPraises(praises: { name: number }): Array<{
    key: string
    value: string
    disabled: boolean
}> {
    const praises_data = []

    Object.entries(praises).forEach((praise) => {
        // Add praises to list
        const treatedName = praise[0].replaceAll('_', ' ')
        praises_data.push({
            key: String(praise[1]),
            value: treatedName,
            disabled: false,
        })
    })
    return praises_data
}
