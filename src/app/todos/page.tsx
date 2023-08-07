import Header from '@/components/header/Header'
import Task from '@/components/tasks/Task'
import React from 'react'

const page = () => {
  return (
    <main className="h-full w-full bg-zinc-900">
      <Header />
      <section className="mt-24 w-full px-64">
        {/* <Header /> */}
        <div className="flex items-center justify-between">
          {/* <Tarefas Criadas /> */}
          <div className="flex items-center gap-2">
            <div className="text-sm font-bold text-blue-400">
              Tarefas criadas
            </div>
            <div className="inline-flex h-[19px] w-6 flex-col items-center justify-center gap-2.5 rounded-[999px] bg-zinc-800 px-2 py-0.5">
              <div className="text-xs font-bold text-zinc-300">5</div>
            </div>
          </div>
          {/* <Tarefas Concluidas /> */}
          <div className="inline-flex h-[19px] w-[138px] items-center justify-start gap-2">
            <div className="text-sm font-bold text-indigo-400">Concluídas</div>
            <div className="inline-flex flex-col items-center justify-center gap-2.5 rounded-[999px] bg-zinc-800 px-2 py-0.5">
              <div className="text-xs font-bold text-zinc-300">2 de 5</div>
            </div>
          </div>
        </div>
        {/* <Tarefas Criadas /> */}
        <div className="mt-10 flex flex-col items-center justify-center">
          <Task />
        </div>
      </section>
    </main>
  )
}

export default page
