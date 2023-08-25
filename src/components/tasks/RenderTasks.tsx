'use client'

import TaskType from '@/models/TaskType'
import { CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Task from './Task'
import axios from 'axios'
import { parseCookies } from 'nookies'
import CompletedTasks from './CompletedTasks'
import LengthTasks from './LengthTasks'

const RenderTasks = () => {
  const [loading, setLoading] = useState(true)
  const [tasks, setTasks] = useState<TaskType[]>([])

  const cookies = parseCookies()
  const jwt = cookies.jwtToken
  const encodedJwt = encodeURIComponent(jwt)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:6969/tasks/${encodedJwt}`,
        )
        const TasksData: TaskType[] = response.data
        const data = TasksData.sort((a, b) => a.hora.localeCompare(b.hora))
        setTasks(data)
        setLoading(false)
        console.log(TasksData)
      } catch (error) {
        console.error(error)
      }
    }
    fetchTasks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="mt-24 h-full w-full px-64">
      <div className="flex items-center justify-between">
        <LengthTasks Tasks={tasks} />
        <CompletedTasks Tasks={tasks} />
      </div>
      <div className="flex flex-col items-center justify-center gap-2 py-10 text-white">
        {loading && <CircularProgress size={40} />}
        {!loading && tasks.length === 0 && <p>Adicione uma tarefa!</p>}
        <div className="grid h-full w-full grid-cols-4 gap-8">
          <div>
            <h1 className="flex flex-col items-center justify-center gap-8 rounded-md bg-slate-800">
              Segunda-feira
            </h1>
            {tasks
              .filter(
                (task) => task.dias === 'Segunda' || task.dias === 'Todos',
              )
              .map((task) => (
                <Task
                  dias={task.dias}
                  key={task.id}
                  id={task.id}
                  nome={task.nome}
                  hora={task.hora}
                  feito={task.feito}
                  desc={task.desc}
                />
              ))}
          </div>
          <div>
            <h1 className="flex  flex-col items-center justify-center gap-8 rounded-md bg-slate-800">
              Terça-feira
            </h1>
            {tasks
              .filter((task) => task.dias === 'Terca' || task.dias === 'Todos')
              .map((task) => (
                <Task
                  dias={task.dias}
                  key={task.id}
                  id={task.id}
                  nome={task.nome}
                  hora={task.hora}
                  feito={task.feito}
                  desc={task.desc}
                />
              ))}
          </div>
          <div>
            <h1 className="flex flex-col items-center justify-center gap-8 rounded-md bg-slate-800">
              Quarta-feira
            </h1>
            {tasks
              .filter((task) => task.dias === 'Quarta' || task.dias === 'Todos')
              .map((task) => (
                <Task
                  dias={task.dias}
                  key={task.id}
                  id={task.id}
                  nome={task.nome}
                  hora={task.hora}
                  feito={task.feito}
                  desc={task.desc}
                />
              ))}
          </div>
          <div>
            <h1 className="flex flex-col items-center justify-center gap-8 rounded-md bg-slate-800">
              Quinta-feira
            </h1>
            {tasks
              .filter((task) => task.dias === 'Quinta' || task.dias === 'Todos')
              .map((task) => (
                <Task
                  dias={task.dias}
                  key={task.id}
                  id={task.id}
                  nome={task.nome}
                  hora={task.hora}
                  feito={task.feito}
                  desc={task.desc}
                />
              ))}
          </div>
        </div>

        {/* {tasks.length > 0 &&
          tasks.map((task) => (
            <Task
              dias={task.dias}
              key={task.id}
              id={task.id}
              nome={task.nome}
              hora={task.hora}
              feito={task.feito}
              desc={task.desc}
            />
          ))} */}
      </div>
    </section>
  )
}

export default RenderTasks
