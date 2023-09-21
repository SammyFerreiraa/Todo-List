import LoginForm from '@/auth/LoginForm'
import Image from 'next/image'

const page = async () => {
  return (
    <main className="flex w-full flex-1 flex-col items-center justify-center bg-zinc-900 p-4">
      <a
        href="/"
        className="flex w-fit items-center justify-center gap-4 self-center"
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
      <div className="flex w-full max-w-3xl flex-col items-start justify-center gap-7">
        <h1 className=" text-5xl font-bold text-white">Entrar</h1>
        <LoginForm />
      </div>
    </main>
  )
}

export default page
