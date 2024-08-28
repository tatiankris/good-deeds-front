import * as Yup from 'yup'
import { EmailSchema } from '@/app/schemas/EmailSchema'

export const ProfileSchema = Yup.object().shape({
  email: EmailSchema,
  firstName: Yup.string().required('First name is required'),
  username: Yup.string().required('Usernane is required'),
})