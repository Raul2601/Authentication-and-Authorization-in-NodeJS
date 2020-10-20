export interface Role {
    _id: number
    name: string,
    permissions: Permission[]
}

export interface Permission {
    name: string,
    description: string,
    value: number
}
