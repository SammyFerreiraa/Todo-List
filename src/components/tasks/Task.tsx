import React from 'react'
import { Checkbox } from '../ui/checkbox'
import Trash from '../icons/Trash'
import axios from 'axios'
import { parseCookies } from 'nookies'

type TaksProps = {
  nome: string
  hora: string
  id: number
  feito: boolean
  desc?: string
}

const Task = ({ nome, hora, feito, id, desc }: TaksProps) => {
  const cookies = parseCookies()
  const jwt = cookies.jwtToken
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
    })
    window.location.reload()
  }

  return (
    <div className="inline-flex w-full items-start justify-start gap-3 rounded border border-zinc-800 bg-neutral-800 p-5 shadow">
      {!feito && (
        <div className="inline-flex  w-full items-start justify-start gap-3 rounded border border-zinc-800 bg-neutral-800 p-5 shadow">
          <div>
            <Checkbox onClick={completeTask} checked={feito} />
          </div>
          <div className="shrink grow basis-0 text-sm font-normal leading-tight text-zinc-100">
            {nome}
          </div>
          <div className="shrink grow basis-0 text-sm font-normal leading-tight text-zinc-100">
            {hora}
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

          <button onClick={deleteTask}>
            <Trash />
          </button>
        </div>
      )}
      {feito && (
        <div className="inline-flex  w-full items-start justify-start gap-3 rounded border border-green-600 bg-neutral-800 p-5 shadow">
          <div>
            <Checkbox onClick={completeTask} checked={feito} />
          </div>
          <div className="shrink grow basis-0 text-sm font-normal leading-tight text-zinc-100 line-through">
            {nome}
          </div>
          <div className="shrink grow basis-0 text-sm font-normal leading-tight text-zinc-100">
            {hora}
          </div>
          <button onClick={deleteTask}>
            <Trash />
          </button>
        </div>
      )}
    </div>
  )
}

export default Task
