import { User } from '@/app/types/AuthTypes'
import Pagination from '@/app/components/Pagination'
import { redirect } from 'next/navigation'
import { backConfig } from '@/app/backConfig'
import { Search } from '@/app/users/Search'
import UserInList from '@/app/users/UserInList'
import { cookies } from 'next/headers'
import { CookiesProvider } from 'next-client-cookies/server'

export default async function UsersPage({ searchParams }: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {

  const page = searchParams.page - 1 || 0
  const count = 5
  const token = cookies().get('session')?.value

  const res = await fetch(`${backConfig.backURL}/user/all?page=${page}&count=${count}`, {
    cache: 'no-store',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })
  const data = await res.json()
  const pages = Math.ceil(data?.count / count)

  if (data.statusCode === 401) {
    redirect('/login')
  }

  return (
    <>
      <h1 className='my-4 min-w-[700px] mx-auto text-xl font-bold leading-none text-gray-900'>Users list</h1>
      <CookiesProvider><Search /></CookiesProvider>
      <div className={'p-4 rounded-md shadow-ld bg-gray-50 min-w-[700px] mx-auto'}>
        <div className={'flow-root'}>
          <ul role='list' className='divide-y divide-gray-200 dark:divide-gray-700'>
            {data?.rows?.map((user: User) => {
              return <li key={user.id} className={'py-3 sm:py-4'}>
                <UserInList user={user} /></li>
            })}</ul>
        </div>
        <Pagination totalPages={pages} />
      </div>
    </>
  )
}