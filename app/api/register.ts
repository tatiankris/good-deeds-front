import { RegisterRequest } from '@/app/types/AuthTypes'
import { backConfig } from '@/app/backConfig'

export const register = (dto: RegisterRequest) => {
  return fetch(`${backConfig.backURL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(dto)
  })
    .then(res => {
      return res.json()
    })
    .catch(e => {
    throw new Error(e)
})
}