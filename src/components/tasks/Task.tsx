import React from 'react'
import { Checkbox } from '../ui/checkbox'
import Trash from '../icons/Trash'
import axios from 'axios'
import { parseCookies } from 'nookies'
import Edit from '../icons/Edit'
import { Input } from '@/components/ui/input'

type TaksProps = {
  nome: string
  hora: string
  id: number
  feito: boolean
  desc?: string
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  dias?: string
}

const Task = ({
  nome,
  hora,
  feito,
  id,
  desc,
  openModal,
  setOpenModal,
  dias,
}: TaksProps) => {
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
      dias,
    })
    window.location.reload()
  }

  const [hours, minutes] = hora.split(':')

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
        <div className="fixed inset-0 z-10 bg-white bg-opacity-25 text-gray-200">
          <div className="flex h-full w-full items-center justify-center">
            <div className="absolute z-50 mx-auto my-0 flex h-3/4 w-3/4 flex-col overflow-hidden rounded-xl bg-neutral-800 shadow-2xl">
              <button
                className="absolute right-4 top-4"
                onClick={() => setOpenModal(!openModal)}
              >
                X
              </button>
              <form
                action="#"
                className="flex h-full w-full flex-row items-center justify-center gap-4 p-6"
              >
                <div className="flex h-full w-full flex-col items-center justify-center gap-6">
                  <div className="items-left flex w-3/4 flex-col justify-center gap-4">
                    <label>Nome</label>
                    <Input
                      type="text"
                      placeholder="Digite o nome da tarefa"
                      className="w-full text-black"
                      value={nome}
                    />
                  </div>
                  <div className="items-left flex w-3/4 flex-col justify-center gap-4">
                    <label>Horario</label>
                    <Input
                      type="time"
                      placeholder="Digite o Horario Desejado"
                      className="w-full text-black"
                      value={hora}
                    />
                  </div>
                </div>

                <div className="items-left flex w-3/4 flex-col justify-center gap-4">
                  <label>Descrição</label>
                  <Input
                    value={desc}
                    type="text"
                    placeholder="Digite a descrição desejada"
                    className="h-36 w-full text-black"
                  />
                </div>
                <button className="rounded-full bg-black p-4">Atualizar</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Task
