import React from 'react'
import { Button } from '../../components/ui/button'
import Link from 'next/link'
import LoginForm from '@/auth/LoginForm'

const page = async () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-8 bg-neutral-800 text-white">
      <div>
        <p className="text-[32px] font-bold">Entre na sua conta!</p>
      </div>
      <LoginForm />
      <div className="flex flex-row items-center justify-center gap-4">
        <Button form="login">Entrar</Button>
        <Link href="/registro">
          <Button>Registrar</Button>
        </Link>
      </div>
    </div>
  )
}

export default page
