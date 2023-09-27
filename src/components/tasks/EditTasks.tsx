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

type EditProps = {
  nome: string
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  openModal: boolean
  hora: string
  desc: string
  dias: string
  id: number
  feito: boolean
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
  const [edited, setEdited] = useState(false)

  useEffect(() => {
    setNewName(nome)
    setNewHora(hora)
    setNewDesc(desc)
    setNewDias(dias)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleonEditTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const editTask = async () => {
      await axios.put('https://to-do-mountains.onrender.com/update', {
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
    setEdited(true)
    setTimeout(() => {
      window.location.reload()
    }, 2000)
  }
  const handleSelectDay = (dia: string) => {
    setNewDias(dia)
    console.log(dia)
  }
  return (
    <div className="fixed inset-0 z-10 bg-black bg-opacity-50 text-gray-200">
      <div className="flex h-full w-full items-center justify-center">
        {edited && (
          <div className="absolute right-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/70">
            <ClockLoader size={50} color="#6b21a8" speedMultiplier={3} />
          </div>
        )}
        <div className="absolute z-20 mx-auto my-0 flex h-3/4 w-3/4 flex-col overflow-hidden rounded-xl bg-neutral-900 shadow-2xl">
          <Button
            className="absolute right-4 top-4 bg-transparent text-white hover:text-black"
            onClick={() => setOpenModal(!openModal)}
          >
            X
          </Button>
          <form
            onSubmit={handleonEditTask}
            action="#"
            className="flex h-full w-full flex-row items-center justify-center gap-4 p-6"
          >
            <div className="flex h-full w-full flex-col items-center justify-center gap-6">
              <div className="items-left flex w-3/4 flex-col justify-center gap-4">
                <label>Nome</label>
                <Input
                  type="text"
                  placeholder="Digite o nome da tarefa"
                  className="w-full "
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
              <div className="items-left flex w-3/4 flex-col justify-center gap-4">
                <label>Horario</label>
                <Input
                  type="time"
                  placeholder="Digite o Horario Desejado"
                  className="w-full"
                  value={newHora}
                  onChange={(e) => setNewHora(e.target.value)}
                />
              </div>
              <div className="items-left gap- flex w-3/4 flex-col justify-center ">
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

            <div className="items-left flex w-3/4 flex-col justify-center gap-4">
              <label>Descrição</label>
              <Textarea
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Digite a descrição desejada"
                className="h-36 w-full"
              />
            </div>
            <Button type="submit">Atualizar</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditTasks
