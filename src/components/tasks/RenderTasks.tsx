'use client'

import { TaskType } from '@/models/TaskType'
import React, { useEffect, useState } from 'react'
import Task from './Task'
import axios from 'axios'
import { parseCookies } from 'nookies'
import CompletedTasks from './CompletedTasks'
import LengthTasks from './LengthTasks'
import { ClockLoader } from 'react-spinners'
import { AlertTriangle } from 'lucide-react'
import { useTasks } from './StateTask'

const RenderTasks = () => {
  const [loading, setLoading] = useState(true)

  const renderTaskUrl = process.env.NEXT_PUBLIC_URL_RENDER_TASK || ''

  const [
    tasksMng,
    addTasks,
    lengthTasks,
    setCompletedTasksMng,
    setLengthTasks,
  ] = useTasks((state) => [
    state.tasks,
    state.addTask,
    state.lengthTasks,
    state.setCompleteTask,
    state.setLengthTasks,
  ])

  const cookies = parseCookies()
  const jwt = cookies.jwtToken
  const encodedJwt = encodeURIComponent(jwt)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${renderTaskUrl}${encodedJwt}`)
        const TasksData: TaskType[] = response.data
        const data = TasksData.sort((a, b) => a.hora.localeCompare(b.hora))
        data.map((task) => addTasks(task))
        setLoading(false)

        setCompletedTasksMng(data.filter((task) => task.feito).length)
        setLengthTasks(data.length)
      } catch (error) {
        console.error(error)
      }
    }
    fetchTasks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="flex w-full flex-1 flex-col bg-neutral-950 px-6 py-4 md:px-12 md:py-8">
      {loading && (
        <div className="absolute right-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/70">
          <ClockLoader size={50} color="#6b21a8" speedMultiplier={3} />
        </div>
      )}
      <div className="flex items-center justify-between">
        <LengthTasks />
        <CompletedTasks />
      </div>
      <div
        className={`flex flex-1 flex-col  py-4 text-white ${
          lengthTasks ? 'items-center' : 'items-center justify-center'
        }`}
      >
        {lengthTasks === null ||
          (lengthTasks === 0 && (
            <div className="flex flex-row items-center justify-center gap-4 ">
              <AlertTriangle size={30} className="text-[#6b21a8]" />
              <p className="text-xl font-bold text-purple-800">
                Não há tarefas, adicione-as!
              </p>
            </div>
          ))}
        <div className="grid w-full grid-rows-1 gap-6">
          {tasksMng.filter(
            (task) => task.dias === 'Segunda' || task.dias === 'Todos',
          ).length > 0 && (
            <div className="h-fit">
              <h1 className="flex flex-col items-center justify-center gap-8 rounded-md p-2 font-semibold">
                SEGUNDA-FEIRA
              </h1>

              {tasksMng
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
          )}

          {tasksMng.filter(
            (task) => task.dias === 'Terca' || task.dias === 'Todos',
          ).length > 0 && (
            <div>
              <h1 className="flex flex-col items-center justify-center gap-8 rounded-md p-2 font-semibold">
                TERÇA-FEIRA
              </h1>
              {tasksMng
                .filter(
                  (task) => task.dias === 'Terca' || task.dias === 'Todos',
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
          )}

          {tasksMng.filter(
            (task) => task.dias === 'Quarta' || task.dias === 'Todos',
          ).length > 0 && (
            <div>
              <h1 className="flex flex-col items-center justify-center gap-8 rounded-md p-2 font-semibold">
                QUARTA-FEIRA
              </h1>
              {tasksMng
                .filter(
                  (task) => task.dias === 'Quarta' || task.dias === 'Todos',
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
          )}

          {tasksMng.filter(
            (task) => task.dias === 'Quinta' || task.dias === 'Todos',
          ).length > 0 && (
            <div>
              <h1 className="flex flex-col items-center justify-center gap-8 rounded-md p-2 font-semibold">
                QUINTA-FEIRA
              </h1>
              {tasksMng
                .filter(
                  (task) => task.dias === 'Quinta' || task.dias === 'Todos',
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
          )}

          {tasksMng.filter(
            (task) => task.dias === 'Sexta' || task.dias === 'Todos',
          ).length > 0 && (
            <div>
              <h1 className="flex flex-col items-center justify-center gap-8 rounded-md p-2 font-semibold">
                SEXTA-FEIRA
              </h1>
              {tasksMng
                .filter(
                  (task) => task.dias === 'Sexta' || task.dias === 'Todos',
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
          )}

          {tasksMng.filter(
            (task) => task.dias === 'Sabado' || task.dias === 'Todos',
          ).length > 0 && (
            <div>
              <h1 className="flex flex-col items-center justify-center gap-8 rounded-md p-2 font-semibold">
                SÁBADO
              </h1>
              {tasksMng
                .filter(
                  (task) => task.dias === 'Sabado' || task.dias === 'Todos',
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
          )}

          {tasksMng.filter(
            (task) => task.dias === 'Domingo' || task.dias === 'Todos',
          ).length > 0 && (
            <div>
              <h1 className="flex flex-col items-center justify-center gap-8 rounded-md p-2 font-semibold">
                DOMINGO
              </h1>
              {tasksMng
                .filter(
                  (task) => task.dias === 'Domingo' || task.dias === 'Todos',
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
          )}
        </div>
      </div>
    </section>
  )
}

export default RenderTasks
