import Link from 'next/link'

export default function Home() {

  return (
    <main className='flex justify-center space-x-60 items-center min-h-dvh flex-row px-24'>
      <Link href={'/users'}>
        <div
          className='p-4 space-y-6 flex-col cursor-pointer h-64 w-48 rounded-lg border shadow-lg hover:shadow-2xl bg-gray-100 hover:bg-gray-50'>
          <h1 className='text-xl text-gray-900 font-bold'>Users</h1>
          <h3 className='text-md text-gray-700'>Find users and read their lists of good deeds...</h3>
          <div className={'underline text-lg text-blue-500 hover:text-blue-600'}>Go to users</div>
        </div>
      </Link>
      <Link href={'/posts'}>
      <div
        className='p-4 space-y-6 flex-col cursor-pointer h-64 w-48 rounded-lg border shadow-lg hover:shadow-2xl bg-gray-100 hover:bg-gray-50'>
        <h1 className='text-xl text-gray-900 font-bold'>My good deeds list</h1>
        <h3>Make your own list of good deeds...</h3>
        <Link className={'underline text-lg text-blue-500 hover:text-blue-600'} href={'/posts'}>Go to my list</Link>
      </div></Link>
    </main>
  )
}
