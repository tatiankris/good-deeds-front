"use client";

import { IconSearch } from '@tabler/icons-react'
import { backConfig } from '@/app/backConfig'
import { useState } from 'react'
import { User } from '@/app/types/AuthTypes'
import UserInList from '@/app/users/UserInList'
import { useCookies } from 'next-client-cookies'

export const Search = () => {
  const cookies = useCookies();

  const [user, setUser] = useState<null | User>(null)
  async function handleSearch(name: string) {

    const res = await fetch(`${backConfig.backURL}/user/username/${name}`, {
      cache: 'no-store',
      headers: {
        'Authorization': `Bearer ${cookies.get('session')}`
      },
    })
      const data = await res.json()
    if (data.statusCode) {
      setUser(null)
    } else {
      setUser(data)
    }
  }

  return (
    <div className="min-w-[700px] mx-auto relative flex flex-1 flex-shrink-0 mb-5">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={"Search user by username"}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <IconSearch className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      {user && <div className={"z-30 hover:bg-green-50 bg-green-50 p-1 border border-neutral-800 rounded-sm w-[400px] h-[50px] absolute top-10 left-0"}><UserInList user={user} /></div>}
    </div>
  )
}