export interface User {
  id: number
  firstName: any
  username: string
  email: string
}
export interface LoginRequest {
  email: string
  password: string
}
export interface RegisterRequest {
  firstName: string
  username: string
  email: string
  password: string
}
export interface LoginResponse {
  user: User
  token: string
}

export interface RegisterResponse extends User {
  createdAt: string
  updatedAt: string
}