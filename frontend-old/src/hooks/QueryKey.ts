export const QueryKey = {
    Transactions: ["transactions"],
    Categories: ["categories"],
    ShowPeriod: ["show_period"]
} as const

export type QueryKey = typeof QueryKey[keyof typeof QueryKey];