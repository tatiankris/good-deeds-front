import { LoginRequest } from '@/app/types/AuthTypes'
import { backConfig } from '@/app/backConfig'

export default function login(dto: LoginRequest) {
  return fetch(`${backConfig.backURL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dto)
  }).then(res => {
    return res.json()
  })
}