export interface AuthResponse {
    user: {
        id: number
        email: string
    }
    accessToken: string
}