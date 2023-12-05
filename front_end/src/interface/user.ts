export  interface IUser {
    hinh: any;
    id: number;
    name: string;
    image: string;
    dia_chi: string;
    email: string;
    sdt: string;
    cccd: string;
    password:string;
    email_verified_at: string | null;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
    roles: Role[];
    permissions:Permission[];
}

export interface Role {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
    permissions: Permission[];
}

export interface Permission {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
}