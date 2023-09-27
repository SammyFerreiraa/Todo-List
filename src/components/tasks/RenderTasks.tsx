'use client'

import TaskType from '@/models/TaskType'
import React, { useEffect, useState } from 'react'
import Task from './Task'
import axios from 'axios'
import { parseCookies } from 'nookies'
import CompletedTasks from './CompletedTasks'
import LengthTasks from './LengthTasks'
import { ClockLoader } from 'react-spinners'
import { AlertTriangle } from 'lucide-react'

const RenderTasks = () => {
  const [loading, setLoading] = useState(true)
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [TasksLength, setTasksLength] = useState<number | null>(null)
  const [completedTasks, setCompletedTasks] = useState<number>(
    tasks.filter((task) => task.feito).length,
  )

  const cookies = parseCookies()
  const jwt = cookies.jwtToken
  const encodedJwt = encodeURIComponent(jwt)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `https://to-do-mountains.onrender.com/tasks/${encodedJwt}`,
        )
        const TasksData: TaskType[] = response.data
        const data = TasksData.sort((a, b) => a.hora.localeCompare(b.hora))
        setTasks(data)
        setLoading(false)
        console.log(TasksData)
        setTasksLength(data.length)
        setCompletedTasks(data.filter((task) => task.feito).length)
      } catch (error) {
        console.error(error)
      }
    }
    fetchTasks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `https://to-do-mountains.onrender.com/tasks/${encodedJwt}`,
      )
      const TasksData: TaskType[] = response.data
      const data = TasksData.sort((a, b) => a.hora.localeCompare(b.hora))
      setTasks(data)
      setLoading(false)
      console.log(TasksData)
      setTasksLength(data.length)
      setCompletedTasks(data.filter((task) => task.feito).length)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <section className="flex w-full flex-1 flex-col bg-neutral-950 px-6 py-4 md:px-12 md:py-8">
      {loading && (
        <div className="absolute right-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/70">
          <ClockLoader size={50} color="#6b21a8" speedMultiplier={3} />
        </div>
      )}
      <div className="flex items-center justify-between">
        <LengthTasks TasksLength={tasks.length || null} />
        <CompletedTasks
          TasksLength={tasks.length || null}
          TasksComplete={completedTasks}
        />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center py-4 text-white">
        {TasksLength !== null && TasksLength === 0 && (
          <div className="flex flex-row items-center justify-center gap-4 ">
            <AlertTriangle size={30} className="text-[#6b21a8]" />
            <p className="text-xl font-bold text-purple-800">
              Não há tarefas, adicione-as!
            </p>
          </div>
        )}
        <div className="grid w-full grid-rows-1 gap-6">
          {tasks.filter(
            (task) => task.dias === 'Segunda' || task.dias === 'Todos',
          ).length > 0 && (
            <div className="h-fit">
              <h1 className="flex flex-col items-center justify-center gap-8 rounded-md p-2 font-semibold">
                SEGUNDA-FEIRA
              </h1>

              {tasks
                .filter(
                  (task) => task.dias === 'Segunda' || task.dias === 'Todos',
                )
                .map((task) => (
                  <Task
                    recharge={fetchTasks}
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
          )}

          {tasks.filter(
            (task) => task.dias === 'Terca' || task.dias === 'Todos',
          ).length > 0 && (
            <div>
              <h1 className="flex flex-col items-center justify-center gap-8 rounded-md p-2 font-semibold">
                TERÇA-FEIRA
              </h1>
              {tasks
                .filter(
                  (task) => task.dias === 'Terca' || task.dias === 'Todos',
                )
                .map((task) => (
                  <Task
                    recharge={fetchTasks}
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
          )}

          {tasks.filter(
            (task) => task.dias === 'Quarta' || task.dias === 'Todos',
          ).length > 0 && (
            <div>
              <h1 className="flex flex-col items-center justify-center gap-8 rounded-md p-2 font-semibold">
                QUARTA-FEIRA
              </h1>
              {tasks
                .filter(
                  (task) => task.dias === 'Quarta' || task.dias === 'Todos',
                )
                .map((task) => (
                  <Task
                    recharge={fetchTasks}
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
          )}

          {tasks.filter(
            (task) => task.dias === 'Quinta' || task.dias === 'Todos',
          ).length > 0 && (
            <div>
              <h1 className="flex flex-col items-center justify-center gap-8 rounded-md p-2 font-semibold">
                QUINTA-FEIRA
              </h1>
              {tasks
                .filter(
                  (task) => task.dias === 'Quinta' || task.dias === 'Todos',
                )
                .map((task) => (
                  <Task
                    recharge={fetchTasks}
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
          )}

          {tasks.filter(
            (task) => task.dias === 'Sexta' || task.dias === 'Todos',
          ).length > 0 && (
            <div>
              <h1 className="flex flex-col items-center justify-center gap-8 rounded-md p-2 font-semibold">
                SEXTA-FEIRA
              </h1>
              {tasks
                .filter(
                  (task) => task.dias === 'Sexta' || task.dias === 'Todos',
                )
                .map((task) => (
                  <Task
                    recharge={fetchTasks}
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
          )}

          {tasks.filter(
            (task) => task.dias === 'Sabado' || task.dias === 'Todos',
          ).length > 0 && (
            <div>
              <h1 className="flex flex-col items-center justify-center gap-8 rounded-md p-2 font-semibold">
                SÁBADO
              </h1>
              {tasks
                .filter(
                  (task) => task.dias === 'Sabado' || task.dias === 'Todos',
                )
                .map((task) => (
                  <Task
                    recharge={fetchTasks}
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
          )}

          {tasks.filter(
            (task) => task.dias === 'Domingo' || task.dias === 'Todos',
          ).length > 0 && (
            <div>
              <h1 className="flex flex-col items-center justify-center gap-8 rounded-md p-2 font-semibold">
                DOMINGO
              </h1>
              {tasks
                .filter(
                  (task) => task.dias === 'Domingo' || task.dias === 'Todos',
                )
                .map((task) => (
                  <Task
                    recharge={fetchTasks}
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
          )}
        </div>
      </div>
    </section>
  )
}

export default RenderTasks
