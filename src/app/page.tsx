import Link from 'next/link'

export default async function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-evenly bg-zinc-900 text-white">
      <h1>Bem vindo a nossa To-do List</h1>
      <div className="flex items-center justify-center gap-14">
        <Link className="rounded-full bg-slate-900 p-8" href="/login">
          Logar
        </Link>
        <Link className="rounded-full bg-slate-900 p-8" href="/registro">
          Registrar-se
        </Link>
      </div>
    </main>
  )
}
