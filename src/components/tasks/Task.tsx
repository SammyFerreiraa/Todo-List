import React, { useState } from 'react'
import { Checkbox } from '../ui/checkbox'
import Trash from '../icons/Trash'
import axios from 'axios'
import { parseCookies } from 'nookies'
import Edit from '../icons/Edit'
import EditTasks from './EditTasks'
import { Clock, ScrollText, X } from 'lucide-react'
import { Separator } from '../ui/separator'
import { useTasks } from './StateTask'

type TaksProps = {
  nome: string
  hora: string
  id: number
  feito?: boolean
  desc?: string
  dias: string
}

const Task = ({ nome, hora, feito, id, desc, dias }: TaksProps) => {
  const cookies = parseCookies()
  const jwt = cookies.jwtToken

  const [updateTask, removeTask] = useTasks((state) => [
    state.updateCompleteTask,
    state.removeTask,
  ])

  const [feitoP, setFeitoP] = useState(feito)
  const [openModal, setOpenModal] = useState(false)

  const deleteTask = async () => {
    removeTask(id)
    await axios.delete('https://to-do-mountains.onrender.com/delete', {
      data: {
        nome,
        jwt,
        id,
      },
    })
  }

  const completeTask = async () => {
    updateTask(id)
    const newFeito = !feito

    feito = newFeito

    setFeitoP(newFeito)

    await axios.put('https://to-do-mountains.onrender.com/update', {
      nome,
      hora,
      jwt,
      id,
      feito: newFeito,
      dias,
      desc,
    })
  }

  const [hours, minutes] = hora.split(':')

  return (
    <div className="inline-flex w-full items-start justify-start gap-3 rounded-xl p-1 shadow">
      <div className="flex w-full flex-col items-center justify-start gap-3 rounded-xl bg-neutral-900 p-5 shadow md:flex-row">
        {/* Mobile View */}
        <div className="flex w-full flex-col items-center justify-center md:hidden">
          <div className="flex w-full flex-row justify-between">
            <div onClick={completeTask}>
              <Checkbox className="h-4 w-4" checked={feitoP} />
            </div>
            {feitoP && (
              <div className="shrink basis-0 text-sm font-semibold leading-tight text-zinc-100 line-through">
                {nome}
              </div>
            )}
            {!feitoP && (
              <div className="shrink basis-0 text-sm font-semibold leading-tight text-zinc-100">
                {nome}
              </div>
            )}
            <div className="flex flex-row items-center gap-2 text-sm font-normal leading-tight text-zinc-100">
              <Clock className="h-4 w-4" />
              {hours} : {minutes}
            </div>
          </div>
          <Separator className="my-3 bg-zinc-800" />
          {desc !== '' && (
            <div className="flex shrink grow basis-0 flex-row items-center gap-2 text-sm font-normal leading-tight text-zinc-100">
              <ScrollText className="h-4 w-4" />
              {desc}
            </div>
          )}
          {desc === '' && (
            <div className="flex shrink grow basis-0 flex-row items-center gap-2 text-sm font-normal leading-tight text-zinc-100">
              <X className="h-4 w-4" />
              Sem descrição
              <X className="h-4 w-4" />
            </div>
          )}
          <Separator className="my-3 bg-zinc-800" />
          <div className="flex flex-row gap-4">
            <button onClick={() => setOpenModal(!openModal)}>
              <Edit />
            </button>
            <button onClick={deleteTask}>
              <Trash />
            </button>
          </div>
        </div>
        {/* Desktop View  */}
        <div className="hidden w-full flex-row items-center justify-between md:flex ">
          <div onClick={completeTask}>
            <Checkbox className="h-4 w-4" checked={feitoP} />
          </div>
          {feitoP && (
            <div className="shrink grow basis-0 text-center text-sm font-semibold leading-tight text-zinc-100 line-through">
              {nome}
            </div>
          )}
          {!feitoP && (
            <div className="shrink grow basis-0 text-center text-sm font-semibold leading-tight text-zinc-100">
              {nome}
            </div>
          )}
          <div className="flex shrink grow basis-0 flex-row items-center gap-2 text-sm font-normal leading-tight text-zinc-100">
            <Clock className="h-4 w-4" />
            {hours} : {minutes}
          </div>

          {desc !== '' && (
            <div className="flex shrink grow basis-0 flex-row items-center gap-2 text-sm font-normal leading-tight text-zinc-100">
              <ScrollText className="h-4 w-4" />
              {desc}
            </div>
          )}
          {desc === '' && (
            <div className="flex shrink grow basis-0 flex-row items-center gap-2 text-sm font-normal leading-tight text-zinc-100">
              <X className="h-4 w-4" />
              Sem descrição
              <X className="h-4 w-4" />
            </div>
          )}
          <div className="flex flex-row gap-4">
            <button onClick={() => setOpenModal(!openModal)}>
              <Edit />
            </button>
            <button onClick={deleteTask}>
              <Trash />
            </button>
          </div>
        </div>
      </div>

      {openModal && (
        <EditTasks
          id={id}
          feito={feito}
          dias={dias}
          nome={nome}
          setOpenModal={setOpenModal}
          openModal={openModal}
          hora={hora}
          desc={desc}
        />
      )}
    </div>
  )
}

export default Task
