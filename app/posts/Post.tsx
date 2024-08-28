'use client'

import { IconCheck, IconTrashX } from '@tabler/icons-react'
import { deletePost, updatePost } from '@/app/lib/features/posts/postsSlice'
import { useAppDispatch } from '@/app/lib/hooks'
import { useFormik } from 'formik'
import { NewPostSchema } from '@/app/schemas/PostSchemas'
import { useState } from 'react'
import { backConfig } from '@/app/backConfig'
import { useCookies } from 'next-client-cookies'

type Props = {
  post: Post
};
export const Post = ({post}: Props) => {
  const dispatch = useAppDispatch()
  const [error, setError] = useState<string | null>(null)
  const cookies = useCookies()

  const form = useFormik({
    initialValues: {
      name: post.name,
      description: post.description,
    } as PostReqData,
    validationSchema: NewPostSchema,
    onSubmit: (values: PostReqData, formikHelpers) => {
      fetch(`${backConfig.backURL}/post/update?id=${post.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.get('session')}`
        },
        body: JSON.stringify(values),
      }).then(res => {
        return res.json()
      }).then(res => {
        dispatch(updatePost(res))
      }).catch(e => {
        setError(e.message)
      }).finally(() => {
        formikHelpers.resetForm({ values })
      })
    },
  })

  const handleDelete = async (id: number) => {
    fetch(`${backConfig.backURL}/post?id=${post.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.get('session')}`
      }}
    ).then(()=> {
      dispatch(deletePost(id))
    })
  }

  const handleChange = () => {
    error && setError(null)
  }
  const { touched, dirty, errors } = form
  const disabled = !dirty
  return (
    <form onSubmit={form.handleSubmit} onChange={handleChange}>
      <li className={' flex flex-row justify-between rounded-lg p-4 bg-white py-3 sm:py-4'} key={post.id}>
        <div className={'flex-1 flex flex-col min-w-0 space-y-2'}>
          <input
            name={'name'}
            placeholder={'Name'}
            onChange={form.handleChange}
            value={form.values.name}
            className={'p-1 rounded-md hover:bg-green-50 focus:bg-green-50 text-sm font-medium text-gray-900 truncate dark:text-white'} />
          {errors.name && touched.name ? <div className='text-sm text-red-600'>{errors.name}</div> : ''}
          <textarea
            name='description'
            onChange={form.handleChange}
            value={form.values.description}
            placeholder={'Description'}
            className={'p-1 rounded-md hover:bg-green-50 focus:bg-green-50  text-sm text-gray-500 truncate dark:text-gray-400'}/>
          {errors.description && touched.description ?
            <div className='text-sm text-red-600'>{errors.description}</div> : ''}
        </div>
        <div className='ml-2 flex flex-row justify-center items-center space-x-2'>
          <button type={'submit'} disabled={disabled}
                   className={'disabled:bg-gray-100 disabled:hover:bg-gray-100 h-min p-1 hover:bg-green-200 bg-green-100 rounded-md'}>
            <IconCheck color={disabled ? 'grey' : 'green'} stroke={1.5} size={'1.5rem'} />
          </button>
          <button type={'button'} className={'h-min p-1 hover:bg-red-200 rounded-md'} onClick={() => handleDelete(post.id)}>
            <IconTrashX color={'red'} stroke={1.5} size={'1.5rem'} />
          </button>
        </div>
      </li>
    </form>
  )
}