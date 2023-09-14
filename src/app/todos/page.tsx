import Header from '@/components/header/Header'
import RenderTasks from '@/components/tasks/RenderTasks'

const Page = async () => {
  return (
    <main className="flex min-h-screen w-full flex-col bg-neutral-950">
      <Header />
      <RenderTasks />
    </main>
  )
}

export default Page
