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
  const [openModal, setOpenModal] = useState(false)

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
        setTasks(TasksData)
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
        {tasks.length > 0 &&
          tasks.map((task) => (
            <Task
              dias={task.dias}
              key={task.id}
              id={task.id}
              nome={task.nome}
              hora={task.hora}
              feito={task.feito}
              desc={task.desc}
              openModal={openModal}
              setOpenModal={() => setOpenModal(!openModal)}
            />
          ))}
      </div>
    </section>
  )
}

export default RenderTasks
