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

  useEffect(() => {
    setNewName(nome)
    setNewHora(hora)
    setNewDesc(desc)
    setNewDias(dias)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const editTask = async () => {
    await axios.put('http://localhost:6969/update', {
      nome: newName,
      hora: newHora,
      jwt,
      id,
      feito,
      dias: newDias,
      desc: newDesc,
    })
    window.location.reload()
  }
  const handleSelectDay = (dia: string) => {
    setNewDias(dia)
    console.log(dia)
  }
  return (
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
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
              <div className="items-left flex w-3/4 flex-col justify-center gap-4">
                <label>Horario</label>
                <Input
                  type="time"
                  placeholder="Digite o Horario Desejado"
                  className="w-full text-black"
                  value={newHora}
                  onChange={(e) => setNewHora(e.target.value)}
                />
              </div>
              <div className="items-left gap- flex w-3/4 flex-col justify-center text-black">
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
              <Input
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                type="text"
                placeholder="Digite a descrição desejada"
                className="h-36 w-full text-black"
              />
            </div>
            <button onClick={editTask} className="rounded-full bg-black p-4">
              Atualizar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditTasks
