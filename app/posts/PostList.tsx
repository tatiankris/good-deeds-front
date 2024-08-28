'use client'

import { useAppDispatch, useAppSelector } from '@/app/lib/hooks'
import { useEffect, useState } from 'react'
import { setAllPosts, setPostsError, setPostsLoading } from '@/app/lib/features/posts/postsSlice'
import { Post } from '@/app/posts/Post'
import { backConfig } from '@/app/backConfig'
import { useCookies } from 'next-client-cookies'

export const PostList = () => {

  const cookies = useCookies()
  const dispatch = useAppDispatch()
  const { posts } = useAppSelector(state => state.posts)
  const [page, setPage] = useState(0)

  useEffect(() => {
    dispatch(setPostsLoading(true))
    fetch(`${backConfig.backURL}/post/all?page=${page}&count=${30}`, {
      cache: 'no-store',
      headers: {
        'Authorization': `Bearer ${cookies.get('session')}`
      },
    })
      .then(res => {
      return res.json()
    })
      .then(res => {
      dispatch(setAllPosts(res))
    })
      .catch(e => {
        dispatch(setPostsError(e.message))
      })
      .finally(() => {
        dispatch(setPostsLoading(false))
      })
  }, [page])

  return <div>
    <div className={'flow-root mt-4'}>
      <ul role='list' className='flex flex-col space-y-3'>
        {posts?.map((post: Post) => {
          return <Post key={post.id} post={post} />
        })}</ul>
    </div>
  </div>
}