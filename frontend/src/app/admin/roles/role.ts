import { Permission } from '../permissions/permission'

export interface Role {
    _id: number
    name: string,
    permissions: Permission[]
}


