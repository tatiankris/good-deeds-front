import * as Yup from 'yup'
import { EmailSchema } from '@/app/schemas/EmailSchema'
import { PasswordSchema } from '@/app/schemas/PasswordSchema'

export const RegisterSchema = Yup.object().shape({
  email: EmailSchema,
  password: PasswordSchema,
  firstName: Yup.string().required('First name is required'),
  username: Yup.string().required('Usernane is required'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), ''],
    'Passwords must match'
  )
})