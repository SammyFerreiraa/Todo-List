import Login from '@/components/login/Login'

export default async function Home() {
  return (
    <main className="flex h-full w-full items-center justify-center bg-zinc-900">
      <Login />
    </main>
  )
}
