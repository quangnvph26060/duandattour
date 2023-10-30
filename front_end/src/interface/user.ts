interface IUser {
    id: number;
    name: string;
    image: string;
    dia_chi: string;
    email: string;
    sdt: string;
    cccd: string;
    email_verified_at: string | null;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
    roles: Role[];
    permissions:Permission[];
}

interface Role {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
    permissions: Permission[];
}

interface Permission {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
}