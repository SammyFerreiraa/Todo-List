import React, { useState } from 'react'
import { Checkbox } from '../ui/checkbox'
import Trash from '../icons/Trash'
import axios from 'axios'
import { parseCookies } from 'nookies'
import Edit from '../icons/Edit'
import EditTasks from './EditTasks'
import { Clock, ScrollText } from 'lucide-react'

type TaksProps = {
  nome: string
  hora: string
  id: number
  feito: boolean
  desc: string
  dias: string
}

const Task = ({ nome, hora, feito, id, desc, dias }: TaksProps) => {
  const cookies = parseCookies()
  const jwt = cookies.jwtToken

  const [openModal, setOpenModal] = useState(false)

  const deleteTask = async () => {
    await axios.delete('http://localhost:6969/delete', {
      data: {
        nome,
        jwt,
        id,
      },
    })
    window.location.reload()
  }

  const completeTask = async () => {
    feito = !feito
    await axios.put('http://localhost:6969/update', {
      nome,
      hora,
      jwt,
      id,
      feito,
      dias,
      desc,
    })
    window.location.reload()
  }

  const [hours, minutes] = hora.split(':')

  return (
    <div className="inline-flex w-full items-start justify-start gap-3 rounded p-1 shadow">
      {!feito && (
        <div className="flex w-full flex-row items-center justify-start gap-3 rounded bg-neutral-900 p-5 shadow">
          <div>
            <Checkbox
              className="h-4 w-4"
              onClick={completeTask}
              checked={feito}
            />
          </div>
          <div className="shrink grow basis-0 text-sm font-normal leading-tight text-zinc-100">
            {nome}
          </div>
          <div className="flex shrink grow basis-0 flex-row items-center gap-2 text-sm font-normal leading-tight text-zinc-100">
            <Clock className="h-4 w-4" />
            {hours} : {minutes}
          </div>

          {desc !== null && (
            <div className="flex shrink grow basis-0 gap-2 text-sm font-normal leading-tight text-zinc-100">
              {desc !== '' && <ScrollText className="h-4 w-4" />}
              {desc}
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
      )}
      {feito && (
        <div className="flex w-full flex-row items-center justify-start gap-3 rounded bg-neutral-900 p-5 shadow">
          <div>
            <Checkbox onClick={completeTask} checked={feito} />
          </div>
          <div className="shrink grow basis-0 text-sm font-normal leading-tight text-zinc-100 line-through">
            {nome}
          </div>
          <div className="flex shrink grow basis-0 flex-row items-center gap-2 text-sm font-normal leading-tight text-zinc-100">
            <Clock className="h-4 w-4" />
            {hours} : {minutes}
          </div>
          {desc !== null && (
            <div className="flex shrink grow basis-0 gap-2 text-sm font-normal leading-tight text-zinc-100">
              {desc !== '' && <ScrollText className="h-4 w-4" />}
              {desc}
            </div>
          )}
          <button onClick={() => setOpenModal(!openModal)}>
            <Edit />
          </button>
          <button onClick={deleteTask}>
            <Trash />
          </button>
        </div>
      )}
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
