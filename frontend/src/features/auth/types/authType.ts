export type UserRole = "ADMIN" | "EMPLOYEE";

export interface AuthUser {
    id: number;
    username: string;
    role: UserRole;
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: AuthUser;
}