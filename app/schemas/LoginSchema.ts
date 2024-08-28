import * as Yup from 'yup'
import { EmailSchema } from '@/app/schemas/EmailSchema'
import { PasswordSchema } from '@/app/schemas/PasswordSchema'

export const LoginSchema = Yup.object().shape({
  email: EmailSchema,
  password: PasswordSchema,
})

