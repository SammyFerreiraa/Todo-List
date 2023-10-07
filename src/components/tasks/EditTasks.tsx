import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import axios from 'axios'
import { parseCookies } from 'nookies'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { ClockLoader } from 'react-spinners'
import { useTasks } from './StateTask'

type EditProps = {
  nome: string
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  openModal: boolean
  hora: string
  desc?: string
  dias: string
  id: number
  feito?: boolean
}

const cookies = parseCookies()
const jwt = cookies.jwtToken

const EditTasks = ({
  nome,
  setOpenModal,
  openModal,
  hora,
  desc,
  dias,
  id,
  feito,
}: EditProps) => {
  const [newName, setNewName] = useState('')
  const [newHora, setNewHora] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [newDias, setNewDias] = useState('')

  const updateTask = useTasks((state) => state.updateTask)

  const editTaskUrl = process.env.NEXT_PUBLIC_URL_EDIT_TASK || ''

  useEffect(() => {
    setNewName(nome)
    setNewHora(hora)
    if (desc) {
      setNewDesc(desc)
    }
    setNewDias(dias)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleonEditTask = async (e: React.FormEvent<HTMLFormElement>) => {
    updateTask(id, {
      id,
      nome: newName,
      hora: newHora,
      desc: newDesc,
      dias: newDias,
      feito,
    })
    e.preventDefault()
    const editTask = async () => {
      await axios.put(editTaskUrl, {
        nome: newName,
        hora: newHora,
        jwt,
        id,
        feito,
        dias: newDias,
        desc: newDesc,
      })
    }
    editTask()
    setOpenModal(!openModal)
  }

  const handleSelectDay = (dia: string) => {
    setNewDias(dia)
  }
  return (
    <div className="fixed inset-0 z-10 bg-black bg-opacity-50 text-gray-200">
      <div className="flex h-full w-full items-center justify-center">
        <div className="absolute z-20 flex h-auto w-auto flex-col gap-2 overflow-hidden rounded-xl bg-neutral-900 px-10 py-6 shadow-xl sm:h-auto sm:w-3/5">
          <div className="flex w-full flex-row items-center justify-between">
            <p className="text-lg font-semibold">Edite sua tarefa!</p>
            <Button
              className=" w-fit bg-transparent font-semibold text-white hover:text-black"
              onClick={() => setOpenModal(!openModal)}
            >
              X
            </Button>
          </div>
          <form
            onSubmit={handleonEditTask}
            action="#"
            className="flex h-full w-full flex-col items-center justify-evenly gap-2"
          >
            <div className="flex h-full w-full flex-col items-center justify-center gap-4">
              <div className="items-left flex w-full flex-col justify-center gap-1">
                <label>Nome</label>
                <Input
                  type="text"
                  placeholder="Digite o nome da tarefa"
                  className="w-full"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
              <div className="items-left flex w-full flex-col justify-center gap-1">
                <label>Horário</label>
                <Input
                  type="time"
                  placeholder="Digite o Horario Desejado"
                  className="w-full"
                  value={newHora}
                  onChange={(e) => setNewHora(e.target.value)}
                />
              </div>
              <div className="items-left flex w-full flex-col justify-center">
                <Select value={newDias} onValueChange={handleSelectDay}>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Selecione o dia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Segunda">Segunda-Feira</SelectItem>
                      <SelectItem value="Terca">Terça-Feira</SelectItem>
                      <SelectItem value="Quarta">Quarta-Feira</SelectItem>
                      <SelectItem value="Quinta">Quinta-Feira</SelectItem>
                      <SelectItem value="Sexta">Sexta-Feira</SelectItem>
                      <SelectItem value="Sabado">Sabado</SelectItem>
                      <SelectItem value="Domingo">Domingo</SelectItem>
                      <SelectItem value="Todos">Todos os dias</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="items-left flex w-full flex-col justify-center gap-1">
              <label>Descrição</label>
              <Textarea
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Digite a descrição desejada"
                className="h-36 max-h-36 w-full"
              />
            </div>
            <Button className="mt-2 w-full" type="submit">
              Atualizar
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditTasks
