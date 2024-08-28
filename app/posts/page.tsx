import { PostForm } from '@/app/posts/PostForm'
import { PostList } from '@/app/posts/PostList'
import { CookiesProvider } from 'next-client-cookies/server'

export default function Page () {

  return (
    <div className={'max-w-[700px] mx-auto'}>
      <h1 className={"font-bold text-xl text-gray-800 my-3"}>My posts list</h1>
      <CookiesProvider><PostForm /></CookiesProvider>
      <CookiesProvider><PostList /></CookiesProvider>
    </div>
  )
}