import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center gap-36 bg-zinc-900 px-12 py-8  text-white  sm:px-16 md:px-20 lg:px-24  xl:px-36">
      <div className="flex items-center justify-center gap-5">
        <Image
          alt="logo"
          src={'/imgs/logo.png'}
          width={150}
          height={100}
          sizes="100%"
        />
        <p className="text-center text-3xl font-extrabold text-purple-800 sm:text-5xl">
          Mountain To-Do
        </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-16">
        <div>
          <p className="text-center text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl  xl:text-6xl">
            Transforme sua lista de tarefas em realizações com facilidade e
            eficiência!
          </p>
        </div>
        <Link href={'/login'}>
          <button className="flex items-center justify-center rounded-xl bg-purple-800 px-24 py-7 font-bold hover:bg-purple-900  sm:px-28 md:px-32  lg:px-36  xl:px-40">
            Começar agora!
          </button>
        </Link>
      </div>
    </main>
  )
}
