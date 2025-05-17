export const ApiPath = {
    Transactions: "/transactions",
    Categories: "/categories"
} as const

export type ApiPath = typeof ApiPath[keyof typeof ApiPath];