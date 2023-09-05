import { Button } from '../../components/ui/button'
import Link from 'next/link'
import LoginForm from '@/auth/LoginForm'
import Image from 'next/image'

const page = async () => {
  return (
    <main className="flex h-screen w-full flex-col items-center bg-zinc-900  p-9 py-12">
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
      <div className="flex w-full max-w-3xl flex-col gap-7">
        <h1 className="mt-20 text-5xl font-bold text-white">Entrar</h1>
        <LoginForm />
      </div>
      <div className="flex w-full  max-w-3xl flex-col gap-3 pt-3">
        <button
          form="login"
          className="flex h-14 w-full items-center justify-center rounded bg-purple-800 px-24 py-7 text-base font-bold text-white hover:bg-purple-900"
        >
          Fazer Login
        </button>
        <div className="flex w-full flex-col items-center gap-1">
          <p className="text-sm font-normal text-white">Novo aqui?</p>
          <Link className="w-full " href={'/registro'}>
            <Button className="flex h-14 w-full items-center justify-center rounded bg-purple-800 px-24 py-7 text-base font-bold text-white hover:bg-purple-900">
              Crie sua conta
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default page
