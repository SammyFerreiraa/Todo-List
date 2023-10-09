import React, { useState } from 'react'
import { PlusCircle } from 'lucide-react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import axios from 'axios'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { useTasks } from '../tasks/StateTask'
import { TaskType } from '@/models/TaskType'

type newTaskType = {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  openModal: boolean
  jwt: string
}

const NewTask = ({ setOpenModal, openModal, jwt }: newTaskType) => {
  const [nome, setNome] = useState('')
  const [hora, setHora] = useState('')
  const [dias, setDias] = useState('')
  const [desc, setDesc] = useState('')

  const encodedJwt = encodeURIComponent(jwt)

  const [newTaskMng, setLengthTasks, setCompletedTasks] = useTasks((state) => [
    state.addTask,
    state.setLengthTasks,
    state.setCompleteTask,
  ])

  const newTaskUrl = process.env.NEXT_PUBLIC_URL_NEW_TASK || ''
  const renderTaskUrl = process.env.NEXT_PUBLIC_URL_RENDER_TASK || ''

  const handleChange = (newDia: string) => {
    setDias(newDia)
  }

  const handleOnRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (nome === '' || hora === '' || dias === '') return

    const addTask = async () => {
      await axios.post(newTaskUrl, {
        nome,
        hora,
        dias,
        desc,
        jwt,
      })

      const response = await axios.get(`${renderTaskUrl}${encodedJwt}`)
      const TasksData: TaskType[] = response.data
      const data = TasksData.sort((a, b) => a.hora.localeCompare(b.hora))
      data.map((task) => newTaskMng(task))
      setCompletedTasks(data.filter((task) => task.feito).length)
      setLengthTasks(data.length)
    }
    addTask()

    setOpenModal(!openModal)
  }
  return (
    <div className="fixed inset-0 z-10  bg-black bg-opacity-50 text-gray-50">
      <div className="flex h-full w-full items-center justify-center">
        <div className="absolute flex h-auto w-auto flex-col  items-center justify-center gap-4 overflow-hidden rounded-xl bg-neutral-900 px-10 py-6 shadow-xl  sm:h-auto sm:w-fit">
          <div className="flex w-full flex-row items-center justify-between">
            <p className="text-lg font-semibold">Crie sua tarefa!</p>
            <Button
              className=" w-fit bg-transparent font-semibold text-white hover:text-black"
              onClick={() => setOpenModal(!openModal)}
            >
              X
            </Button>
          </div>
          <form
            onSubmit={handleOnRegister}
            className="flex flex-col items-center gap-2"
          >
            <Select value={dias} onValueChange={handleChange}>
              <SelectTrigger className="">
                <SelectValue placeholder="Selecione o dia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="" value="Segunda">
                  Segunda-Feira
                </SelectItem>
                <SelectItem className="" value="Terca">
                  Terça-Feira
                </SelectItem>
                <SelectItem className="" value="Quarta">
                  Quarta-Feira
                </SelectItem>
                <SelectItem className="" value="Quinta">
                  Quinta-Feira
                </SelectItem>
                <SelectItem className="" value="Sexta">
                  Sexta-Feira
                </SelectItem>
                <SelectItem className="" value="Sabado">
                  Sabado
                </SelectItem>
                <SelectItem className="" value="Domingo">
                  Domingo
                </SelectItem>
                <SelectItem className="" value="Todos">
                  Todos os dias
                </SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="text"
              autoComplete="off"
              onChange={(e) => setNome(e.target.value)}
              value={nome}
              placeholder="Nome da tarefa"
              className="h-12 w-full p-4 text-gray-300"
            />
            <div className="flex w-full flex-col gap-4 pb-4 md:flex-row">
              <Input
                type="time"
                onChange={(e) => setHora(e.target.value)}
                autoComplete="off"
                value={hora}
                placeholder="Adicione um horario"
                className="h-12 w-full p-4 text-gray-300"
              />
              <Input
                type="text"
                onChange={(e) => setDesc(e.target.value)}
                autoComplete="off"
                value={desc}
                placeholder="Descrição da tarefa (Opcional)"
                className="h-12 w-full p-4 text-gray-300"
              />
            </div>
            <Button
              type="submit"
              className="flex h-12 min-w-full items-center justify-center gap-2"
            >
              <PlusCircle />
              Criar
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NewTask
