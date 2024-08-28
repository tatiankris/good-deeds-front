import Link from 'next/link'
import { User } from '@/app/types/AuthTypes'

interface Props {
  user: User
}
export default function UserInList({user}: Props) {
  return <div className={'flex items-center space-x-4'}>
    <div className='flex-shrink-0'>
      <img className='w-8 h-8 rounded-full'
           src='https://flowbite.com/docs/images/people/profile-picture-5.jpg' alt='Neil image' />
    </div>
    <div className={'flex-1 min-w-0'}>
      <Link href={`/users/${user.id}`}>
        <h1 className={'text-sm font-medium text-gray-900 truncate dark:text-white'}>{user.firstName}</h1>
        <h1 className={'text-sm text-gray-500 truncate dark:text-gray-400'}>{user.email}</h1>
      </Link>
    </div>
    <div className={'inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'}>
      {user.username}
    </div>
  </div>

}