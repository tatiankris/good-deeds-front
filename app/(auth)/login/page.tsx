'use client'

import { useAppDispatch, useAppSelector } from '@/app/lib/hooks'
import { useFormik } from 'formik'
import { LoginRequest } from '@/app/types/AuthTypes'
import { LoginSchema } from '@/app/schemas/LoginSchema'
import { loginAsync } from '@/app/lib/features/auth/thunks'
import { removeAuthError } from '@/app/lib/features/auth/authSlice'
import { useEffect } from 'react'
import { useCookies } from 'next-client-cookies'
import { navigate } from '@/app/actions/client-redirect'

export const dynamic = 'force-dynamic'

export default function Login() {

  const dispatch = useAppDispatch<any>()
  const {isAuth, loading, error, token} = useAppSelector(state => state.auth)

  if (isAuth) {
    navigate('/')
  }

  useEffect(() => {
    return () => {
      dispatch(removeAuthError())
    }
  }, []);

  const cookies = useCookies();
  useEffect(() => {
    if (token) {
      cookies.set('session', token)
    }
  }, [token])

  const form = useFormik({
    initialValues: {
      email: '',
      password: '',
    } as LoginRequest,
    validationSchema: LoginSchema,
    onSubmit: (values: LoginRequest) => {
      dispatch(loginAsync(values))
    },
  })
  const { touched, errors } = form
  const handleChange = () => {
    error && dispatch(removeAuthError())
  }
  return <form onChange={handleChange} className='flex flex-col justify-start space-y-6' onSubmit={form.handleSubmit}>
    <div>
      <h2 className='font-bold'>Email</h2>
      <input
        type='text'
        className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6'
        name='email'
        onChange={form.handleChange}
        value={form.values.email}
        placeholder={'Email'}
      />
      {errors.email && touched.email ? <div className='text-sm text-red-600'>{errors.email}</div> : ''}
    </div>
    <div>
      <h2 className='font-bold'>Password</h2>
      <input
        className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6'
        name='password'
        type={'password'}
        onChange={form.handleChange}
        value={form.values.password}
        placeholder={'Password'}
      />
      {errors.password && touched.password ? <div className='text-sm text-red-600'>{errors.password}</div> : ''}
      {error && <div className='text-sm text-red-600'>{error}</div>}
    </div>
    <button type={'submit'} disabled={loading} className='bg-blue-500 border-0 hover:bg-blue-600 text-white disabled:bg-blue-100 py-2 px-4 rounded'>Login</button>
  </form>
  }