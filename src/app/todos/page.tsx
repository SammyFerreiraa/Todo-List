'use client'

import Header from '@/components/header/Header'
import Task from '@/components/tasks/Task'
import React, { useEffect, useState } from 'react'
import { parseCookies } from 'nookies'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress/CircularProgress'

interface Task {
  id: number
  nome: string
  hora: string
  feito: boolean
  desc?: string
}

const Page = () => {
  const [loading, setLoading] = useState(true)
  const cookies = parseCookies()
  const jwt = cookies.jwtToken
  const encodedJwt = encodeURIComponent(jwt)
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:6969/tasks/${encodedJwt}`,
        )
        const TasksData: Task[] = response.data
        setTasks(TasksData)
        setLoading(false)
        console.log(TasksData)
      } catch (error) {
        console.error(error)
      }
    }
    fetchTasks()
    console.log(tasks)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="min-h-screen w-full bg-zinc-900">
      <Header jwt={jwt} />
      <section className="mt-24 h-full w-full px-64">
        {/* <Header /> */}
        <div className="flex items-center justify-between">
          {/* <Tarefas Criadas /> */}
          <div className="flex items-center gap-2">
            <div className="text-sm font-bold text-blue-400">
              Tarefas criadas
            </div>
            <div className="inline-flex h-[19px] w-6 flex-col items-center justify-center gap-2.5 rounded-[999px] bg-zinc-800 px-2 py-0.5">
              <div className="text-xs font-bold text-zinc-300">
                {tasks.length === 0 && 0}
                {tasks.length > 0 && tasks.length}
              </div>
            </div>
          </div>
          {/* <Tarefas Concluidas /> */}
          <div className="inline-flex h-[19px] w-fit items-center justify-start gap-2">
            <div className="text-sm font-bold text-indigo-400">Concluídas</div>
            <div className="inline-flex flex-col items-center justify-center gap-3 rounded-[999px] bg-zinc-800 px-2 py-1">
              <div className="text-xs font-bold text-zinc-300">
                {tasks.filter((task) => task.feito).length} de {tasks.length}
              </div>
            </div>
          </div>
        </div>
        {/* <Tarefas Criadas /> */}
        <div className="flex flex-col items-center justify-center gap-2 py-10 text-white">
          {loading && <CircularProgress />}
          {!loading && tasks.length === 0 && <p>Adicione uma tarefa!</p>}
          {tasks.length > 0 &&
            tasks.map((task) => (
              <Task
                key={task.id}
                id={task.id}
                nome={task.nome}
                hora={task.hora}
                feito={task.feito}
                desc={task.desc}
              />
            ))}
        </div>
      </section>
    </main>
  )
}

export default Page
