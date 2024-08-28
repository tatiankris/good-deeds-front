import * as Yup from 'yup'

export const PasswordSchema = Yup.string()
  .min(1, 'Password must have at least 1 letters')
  .required('Password is required')