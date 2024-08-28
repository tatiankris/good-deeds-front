import { ProfileForm } from '@/app/profile/ProfileForm'

export default function Profile() {

  return (
    <div className={'max-w-[700px] mx-auto'}>
    <h1 className={"font-bold text-xl text-gray-800 my-3"}>
      Profile
    </h1>
    <ProfileForm />
  </div>
  )
}