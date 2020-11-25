import { Role } from '../roles/role';

export interface User {
    _id: number,
    name: string,
    email: string,
    role: Role
}