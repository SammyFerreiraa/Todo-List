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
  recharge: () => void
}

const Task = ({ nome, hora, feito, id, desc, dias, recharge }: TaksProps) => {
  const cookies = parseCookies()
  const jwt = cookies.jwtToken

  const [feitoP, setFeitoP] = useState(feito)
  const [openModal, setOpenModal] = useState(false)

  const deleteTask = async () => {
    await axios.delete('https://to-do-mountains.onrender.com/delete', {
      data: {
        nome,
        jwt,
        id,
      },
    })
    recharge()
  }

  const completeTask = async () => {
    const newFeito = !feito
    console.log('1')
    feito = newFeito
    console.log('2')
    setFeitoP(newFeito)
    console.log('3')

    await axios.put('https://to-do-mountains.onrender.com/update', {
      nome,
      hora,
      jwt,
      id,
      feito: newFeito,
      dias,
      desc,
    })
    recharge()
  }

  const [hours, minutes] = hora.split(':')

  return (
    <div className="inline-flex w-full items-start justify-start gap-3 rounded-xl p-1 shadow">
      <div className="flex w-full flex-col items-center justify-start gap-3 rounded-xl bg-neutral-900 p-5 shadow md:flex-row">
        {/* Mobile View */}
        <div className="flex w-full flex-col items-center justify-center gap-6 md:hidden">
          <div className="flex w-full flex-row justify-between">
            <div onClick={completeTask}>
              <Checkbox className="h-4 w-4" checked={feitoP} />
            </div>
            {feitoP && (
              <div className="shrink basis-0 text-sm font-normal leading-tight text-zinc-100 line-through">
                {nome}
              </div>
            )}
            {!feitoP && (
              <div className="shrink basis-0 text-sm font-normal leading-tight text-zinc-100">
                {nome}
              </div>
            )}
            <div className="flex flex-row items-center gap-2 text-sm font-normal leading-tight text-zinc-100">
              <Clock className="h-4 w-4" />
              {hours} : {minutes}
            </div>
          </div>
          {desc !== null && (
            <div className="flex shrink grow basis-0 flex-row items-center gap-2 text-sm font-normal leading-tight text-zinc-100">
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
        {/* Desktop View  */}
        <div className="hidden w-full flex-row items-center justify-between md:flex ">
          <div onClick={completeTask}>
            <Checkbox className="h-4 w-4" checked={feitoP} />
          </div>
          {feitoP && (
            <div className="shrink grow basis-0 text-center text-sm font-normal leading-tight text-zinc-100 line-through">
              {nome}
            </div>
          )}
          {!feitoP && (
            <div className="shrink grow basis-0 text-center text-sm font-normal leading-tight text-zinc-100">
              {nome}
            </div>
          )}
          <div className="flex shrink grow basis-0 flex-row items-center gap-2 text-sm font-normal leading-tight text-zinc-100">
            <Clock className="h-4 w-4" />
            {hours} : {minutes}
          </div>

          {desc !== null && (
            <div className="flex shrink grow basis-0 flex-row items-center gap-2 text-sm font-normal leading-tight text-zinc-100">
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
