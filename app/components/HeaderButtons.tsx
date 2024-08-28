'use client'

import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks'
import { removeAuth, setAuth } from '@/app/lib/features/auth/authSlice'
import { useEffect } from 'react'
import { useCookies } from 'next-client-cookies'
import { backConfig } from '@/app/backConfig'
import { navigate } from '@/app/actions/client-redirect'

export function HeaderButtons() {
  const cookies = useCookies();

  const { authUser, isAuth } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    cookies.remove('session')
    dispatch(removeAuth())
    navigate('/login')
  }

  useEffect(() => {
    const value = cookies.get('session')

    if (value) {
       fetch(`${backConfig.backURL}/auth`, {
         headers: {
           'Authorization': `Bearer ${value}`
         }
       }).then(res => res.json())
         .then(res => {
           if(!res.statusCode) {
             dispatch(setAuth(res))
           }
         })
    }
  }, [cookies])

  return isAuth ? <>
    <div>
      <Link href='/users'>Users</Link>
      <Link className={'ml-4'} href='/posts'>My list</Link>
    </div>
    <div>
      <span className={"mr-3 text-gray-600 font-bold"}>{authUser?.username}</span>
      <Link className='p-1 border border-neutral-800/40 rounded-md hover:bg-gray-200' href='/profile'>
        Profile
      </Link>
      <button className={'ml-4'} onClick={handleLogout}>Logout</button>
    </div>
  </> : <div className='space-x-6'>
    <Link href='/login'>Sign In</Link>
    <Link href='/register'>Sign Up</Link>
  </div>
}