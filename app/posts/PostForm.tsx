'use client'

import { useFormik } from 'formik'
import { NewPostSchema } from '@/app/schemas/PostSchemas'
import { useRef, useState } from 'react'
import { useAppDispatch } from '@/app/lib/hooks'
import { setPost } from '@/app/lib/features/posts/postsSlice'
import { backConfig } from '@/app/backConfig'
import { useCookies } from 'next-client-cookies'

export const PostForm = () => {
  const [error, setError] = useState<string | null>(null)
  const buttonRef = useRef(null)
  const dispatch = useAppDispatch()
  const cookies = useCookies()

  const form = useFormik({
    initialValues: {
      name: '',
      description: '',
    } as PostReqData,
    validationSchema: NewPostSchema,
    onSubmit: (values: PostReqData, formikHelpers) => {
      buttonRef.current.disabled = true
      fetch(`${backConfig.backURL}/post/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.get('session')}`
        },
        body: JSON.stringify(values)
      }).then(res => {
        formikHelpers.resetForm()
        return res.json()
      }).then(res => {
        dispatch(setPost(res))
      }).catch(e => {
        setError(e.message)
      }).finally(() => {
        buttonRef.current.disabled = false
      })
    },
  })

  const handleChange = () => {
    error && setError(null)
  }

  const { touched, errors } = form

  return (
    <div className={"bg-gray-50 shadow-md rounded-md p-3"}>
      <h1 className='font-bold text-lg text-gray-800'>Create new post</h1>
      <form onChange={handleChange} className='flex flex-col justify-start space-y-2' onSubmit={form.handleSubmit}>
        <div>
          <h2 className='font-bold'>Name</h2>
          <input
            type='text'
            className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6'
            name='name'
            onChange={form.handleChange}
            value={form.values.name}
            placeholder={'Post name'}
          />
          {errors.name && touched.name ? <div className='text-sm text-red-600'>{errors.name}</div> : ''}
        </div>
        <div>
          <h2 className='font-bold'>Description</h2>
          <textarea
            className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6'
            name='description'
            onChange={form.handleChange}
            value={form.values.description}
            placeholder={'Post description'}
          />
          {errors.description && touched.description ? <div className='text-sm text-red-600'>{errors.description}</div> : ''}
        </div>
        <button type={"submit"} ref={buttonRef} className='bg-blue-500 border-0 hover:bg-blue-600 text-white disabled:bg-blue-100 py-2 px-4 rounded'>Create</button>
      </form>
    </div>
  )
}