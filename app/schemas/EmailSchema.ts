import * as Yup from 'yup'

export const EmailSchema = Yup.string().email('Invalid email').required('Email is required')
