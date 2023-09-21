import RegistrationForm from '@/auth/RegistrationForm'
import React from 'react'
import Image from 'next/image'

const Page = async () => {
  return (
    <main className="flex w-full flex-col items-center justify-center bg-zinc-900 p-4">
      <a
        href="/"
        className="flex w-full items-center justify-center gap-4 self-center"
      >
        <Image
          src={'/imgs/logo.png'}
          alt="logo"
          width={82}
          height={100}
          sizes="100%"
        />
        <h1 className="text-2xl font-extrabold text-purple-800">
          Mountains To-Do
        </h1>
      </a>
      <div className="flex h-full w-full max-w-3xl flex-col gap-7">
        <h1 className="text-5xl font-bold text-white">Registrar-se</h1>
        <RegistrationForm />
      </div>
    </main>
  )
}

export default Page
