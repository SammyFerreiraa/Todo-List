import { Button } from '../../components/ui/button'
import Link from 'next/link'
import LoginForm from '@/auth/LoginForm'

const page = async () => {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-zinc-900">
      <div className="flex h-[75%] w-[65%] flex-col items-center justify-center gap-8 rounded-xl bg-neutral-800 p-8 text-white">
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
    </main>
  )
}

export default page
