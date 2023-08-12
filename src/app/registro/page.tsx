'use client'

import RegistrationForm from '@/components/auth/RegistrationForm'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <main className="flex h-full w-full items-center justify-center bg-zinc-900">
      <div className="flex h-[75%] w-[65%] flex-col items-center justify-center gap-8 rounded-xl bg-neutral-800 text-white">
        <div>
          <p className="text-[32px] font-bold">Registre-se!</p>
        </div>
        <RegistrationForm />
        <div className="flex flex-row items-center justify-center gap-4">
          <Button form="register">Registrar</Button>
          <Link href={'/'}>
            <Button>Entrar</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Page
