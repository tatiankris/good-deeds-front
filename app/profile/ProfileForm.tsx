"use client";

import { useAppDispatch, useAppSelector } from '@/app/lib/hooks'
import { useState } from 'react'
import { useFormik } from 'formik'
import { User } from '@/app/types/AuthTypes'
import { ProfileSchema } from '@/app/schemas/ProfileSchema'
import { removeAuth, updateAuthUser } from '@/app/lib/features/auth/authSlice'
import { backConfig } from '@/app/backConfig'
import { useCookies } from 'next-client-cookies'

export const dynamic = 'force-dynamic'

interface Props {
  authUser: User
}

export const Profile = ({authUser}: Props) => {
  const [error, setError] = useState<string | null>(null)
  const dispatch = useAppDispatch()
  const cookies = useCookies()

  const form = useFormik({
    initialValues: {
      id: authUser.id,
      firstName: authUser.firstName,
      username: authUser.username,
      email: authUser.email
    } as User,
    validationSchema: ProfileSchema,
    onSubmit: (values: User, formikHelpers) => {
      fetch(`${backConfig.backURL}/user`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.get('session')}`
        },
        body: JSON.stringify(values)
      }).then(res => {
        return res.json()
      }).then(res => {
        dispatch(updateAuthUser(res))
      }).catch(e => {
      }).finally(() => {
        formikHelpers.resetForm({ values })
      })
    },
  })

  const handleDelete = async () => {
    fetch(`${backConfig.backURL}/user`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.get('session')}`
      }}
    ).then(()=> {
      dispatch(removeAuth())
    })
  }

  const handleChange = () => {
    error && setError(null)
  }
  const { touched, dirty, errors } = form
  const disabled = !dirty

  return (
    <div className={'bg-gray-100 shadow-lg border rounded-md p-3'}>
      <form className={"flex flex-col space-y-2 w-[50%]"} onSubmit={form.handleSubmit} onChange={handleChange}>
        <div>
          <h1 className={"font-bold text-sm"}>First Name</h1>
          <input
            name={'firstName'}
            placeholder={'First name'}
            onChange={form.handleChange}
            value={form.values.firstName}
            className={'p-2 text-md w-[100%] rounded-md hover:bg-green-50 focus:bg-green-50 font-medium text-gray-900 truncate dark:text-white'} />
          {errors.firstName && touched.firstName ? <div className='text-sm text-red-600'>{errors.firstName}</div> : ''}
        </div>
        <div>
          <h1 className={"font-bold text-sm"}>Username</h1>
          <input
            name={'username'}
            placeholder={'Username'}
            onChange={form.handleChange}
            value={form.values.username}
            className={'p-2 text-md w-[100%] rounded-md hover:bg-green-50 focus:bg-green-50 font-medium text-gray-900 truncate dark:text-white'} />
          {errors.username && touched.username ? <div className='text-sm text-red-600'>{errors.username}</div> : ''}
        </div>
        <div>
          <h1 className={"font-bold text-sm"}>Email</h1>
          <input
            name={'email'}
            placeholder={'Email'}
            onChange={form.handleChange}
            value={form.values.email}
            className={'p-2 text-md w-[100%] rounded-md hover:bg-green-50 focus:bg-green-50 font-medium text-gray-900 truncate dark:text-white'} />
          {errors.email && touched.email ? <div className='text-sm text-red-600'>{errors.email}</div> : ''}
        </div>
        <button type={'submit'} disabled={disabled}
                className={'w-[100%] disabled:bg-gray-200 text-green-600 disabled:text-gray-600 disabled:hover:bg-gray-200 h-min p-1 hover:bg-green-200 bg-green-100 rounded-md'}>
          Save
        </button>
      </form>
      <button className={"mt-6 bg-red-200 text-xs p-2 text-red-700 hover:bg-red-400 rounded-md"} onClick={handleDelete}>Delete profile</button>
    </div>
  )
}

export function ProfileForm () {
  const { authUser } = useAppSelector(state => state.auth)

  return authUser ? <Profile authUser={authUser} /> : <></>
}