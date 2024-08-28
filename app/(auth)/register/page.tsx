'use client'

import { useFormik } from 'formik'
import { RegisterRequest } from '@/app/types/AuthTypes'
import { RegisterSchema } from '@/app/schemas/RegisterSchema'
import { useRef, useState } from 'react'
import { register } from '@/app/api/register'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function Register () {

    const buttonRef = useRef(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const form = useFormik({
        initialValues: {
            firstName: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        } as RegisterRequest & { confirmPassword: string },
        validationSchema: RegisterSchema,
        onSubmit: async (values: RegisterRequest & { confirmPassword: string }) => {
            buttonRef.current.disabled = true
            const { firstName, email, username, password} = values
            const res = await register({firstName, email, username, password})
            if (!res.statusCode) {
               setSuccess(`User ${res.username} successfully registered!`)
            } else {
                setError(res.message)
            }
            buttonRef.current.disabled = false
            },
    })
    const { touched, errors } = form
    const handleChange = () => {
        error && setError(null)
    }

    return <>{!success
      ? <form onChange={handleChange} className='flex flex-col justify-start space-y-6' onSubmit={form.handleSubmit}>
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
            <h2 className='font-bold'>First Name</h2>
            <input
              type='text'
              className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6'
              name='firstName'
              onChange={form.handleChange}
              value={form.values.firstName}
              placeholder={'Your First Name'}
            />
            {errors.firstName && touched.firstName ? <div className='text-sm text-red-600'>{errors.firstName}</div> : ''}
        </div>
        <div>
            <h2 className='font-bold'>Username <span className={"ml-1 font-medium text-xs text-red-500"}>*unique for each user</span></h2>
            <input
              type='text'
              className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6'
              name='username'
              onChange={form.handleChange}
              value={form.values.username}
              placeholder={'Your Username'}
            />
            {errors.username && touched.username ? <div className='text-sm text-red-600'>{errors.username}</div> : ''}
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
        </div>
        <div>
            <h2 className='font-bold'>Confirm password</h2>
            <input
              className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6'
              name='confirmPassword'
              type={'password'}
              onChange={form.handleChange}
              value={form.values.confirmPassword}
              placeholder={'Confirm password'}
            />
            {errors.confirmPassword && touched.confirmPassword ? <div className='text-sm text-red-600'>{errors.confirmPassword}</div> : ''}
        </div>
        {error && <div className='text-sm text-red-600'>{error}</div>}
        <button type="submit" ref={buttonRef} className='bg-blue-500 border-0 hover:bg-blue-600 text-white disabled:bg-blue-100 py-2 px-4 rounded'>Sign Up</button>
    </form>
    : <div>
        {success}
        Go to login now - <Link className={'underline text-blue-500 hover:text-blue-600'} href={'/login'}>Login</Link>
    </div>}
    </>
}