import { redirect } from 'next/navigation'
import { backConfig } from '@/app/backConfig'
import { cookies } from 'next/headers'

interface Props {
    params: {
    id: number
  }
}
export default async function Page ({ params }: Props) {
  const token = cookies().get('session')?.value

  const res = await fetch(`${backConfig.backURL}/user/${params.id}`, {
    cache: 'no-store',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  const data = await res.json()

  if (data.statusCode === 401) {
    redirect('/login')
  }

  return (
    <div className={'mt-8 min-w-[700px] mx-auto '}>
      <div className={'w-[500px] flex items-center space-x-4'}>
        <div className='flex-shrink-4'>
          <img className='w-8 h-8 rounded-full'
               src='https://flowbite.com/docs/images/people/profile-picture-5.jpg' alt='Neil image' />
        </div>
        <div className={'flex-1 min-w-0'}>
          <h1 className={'text-sm font-medium text-gray-900 truncate dark:text-white'}>{data.firstName}</h1>
          <h1 className={'text-sm text-gray-500 truncate dark:text-gray-400'}>{data.email}</h1>
        </div>
        <div className={'inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'}>
          {data.username}
        </div>
      </div>
      <div className={'w-[600px] flex items-center space-x-4 mt-10'}>
        <ul className={'flex flex-col space-y-5 w-[100%]'}>
          {data.posts?.map((post: Post) => {
            return <li key={post.id}>
              <div className={"bg-white rounded-md shadow-sm border p-3"}>
                <h1 className={"text-md font-bold"}>{post.name}</h1>
                <p className={"text-lg italic"}>{post.description}</p>
              </div>
            </li>
          })}
        </ul>
      </div>

    </div>

  )
}