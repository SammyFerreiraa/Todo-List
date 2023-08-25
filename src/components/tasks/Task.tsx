import React, { useState } from 'react'
import { Checkbox } from '../ui/checkbox'
import Trash from '../icons/Trash'
import axios from 'axios'
import { parseCookies } from 'nookies'
import Edit from '../icons/Edit'
import EditTasks from './EditTasks'

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
    <div className="inline-flex w-full items-start justify-start gap-3 rounded border border-zinc-800 bg-neutral-800 p-5 shadow">
      {!feito && (
        <div className="flex w-full  flex-col items-center justify-start gap-3 rounded border border-red-800 bg-neutral-800 p-5 shadow">
          <div>
            <Checkbox onClick={completeTask} checked={feito} />
          </div>
          <div className="shrink grow basis-0 text-sm font-normal leading-tight text-zinc-100">
            {nome}
          </div>
          <div className="shrink grow basis-0 text-sm font-normal leading-tight text-zinc-100">
            {hours} : {minutes}
          </div>
          {desc === null ||
            (desc === '' && (
              <div className="shrink grow basis-0 text-sm font-normal leading-tight text-zinc-100">
                Sem descrição!
              </div>
            ))}
          {desc !== null && (
            <div className="shrink grow basis-0 text-sm font-normal leading-tight text-zinc-100">
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
        <div className="flex w-full  flex-col items-center justify-start gap-3 rounded border  border-green-600 bg-neutral-800 p-5 shadow">
          <div>
            <Checkbox onClick={completeTask} checked={feito} />
          </div>
          <div className="shrink grow basis-0 text-sm font-normal leading-tight text-zinc-100 line-through">
            {nome}
          </div>
          <div className="shrink grow basis-0 text-sm font-normal leading-tight text-zinc-100">
            {hours} : {minutes}
          </div>
          {desc === null && (
            <div className="shrink grow basis-0 text-sm font-normal leading-tight text-zinc-100">
              Sem descrição!
            </div>
          )}
          {desc !== null && (
            <div className="shrink grow basis-0 text-sm font-normal leading-tight text-zinc-100">
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
