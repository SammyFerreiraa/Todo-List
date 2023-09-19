import { Modal, Select, SelectChangeEvent } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import React, { useState } from 'react'
import MenuItem from '@mui/material/MenuItem'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { PlusCircle, X } from 'lucide-react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'
import axios from 'axios'

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

  const handleChange = (event: SelectChangeEvent) => {
    setDias(event.target.value as string)
  }

  const handleOnRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (nome === '' || hora === '') return

    const addTask = async () => {
      await axios.post('http://localhost:6969/insert', {
        nome,
        hora,
        dias,
        desc,
        jwt,
      })
    }
    addTask()
    setNome('')
    setHora('')
    setDesc('')

    setOpenModal(false)
  }
  return (
    <Modal
      className="flex min-h-screen w-full items-center justify-center"
      open={openModal}
    >
      <Card className="h-1/2 w-1/2">
        <CardHeader className="flex flex-row items-center justify-between ">
          <CardTitle>Nova Tarefa</CardTitle>
          <X className="cursor-pointer" onClick={() => setOpenModal(false)} />
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleOnRegister}
            className="flex flex-col items-center gap-2"
          >
            <FormControl fullWidth>
              <InputLabel className="text-white">Selecione um dia</InputLabel>
              <Select
                variant="filled"
                required
                value={dias}
                onChange={handleChange}
                className="text-white hover:border-white focus:border-white"
                autoWidth
              >
                <MenuItem className="" value="Segunda">
                  Segunda-Feira
                </MenuItem>
                <MenuItem className="" value="Terca">
                  Terça-Feira
                </MenuItem>
                <MenuItem className="" value="Quarta">
                  Quarta-Feira
                </MenuItem>
                <MenuItem className="" value="Quinta">
                  Quinta-Feira
                </MenuItem>
                <MenuItem className="" value="Sexta">
                  Sexta-Feira
                </MenuItem>
                <MenuItem className="" value="Sabado">
                  Sabado
                </MenuItem>
                <MenuItem className="" value="Domingo">
                  Domingo
                </MenuItem>
                <MenuItem className="" value="Todos">
                  Todos os dias
                </MenuItem>
              </Select>
            </FormControl>

            {/* <Select value={dias} onValueChange={handleSelectDay}>
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
            </Select> */}
            <Input
              type="text"
              autoComplete="off"
              onChange={(e) => setNome(e.target.value)}
              value={nome}
              placeholder="Adicione uma nova tarefa"
              className="h-12 w-full p-4 text-gray-300"
            />
            <div className="flex w-full gap-4 pb-4">
              <Input
                type="time"
                onChange={(e) => setHora(e.target.value)}
                autoComplete="off"
                value={hora}
                placeholder="Adicione um horario"
                className="h-12 w-full  p-4 text-gray-300"
              />
              <Input
                type="text"
                onChange={(e) => setDesc(e.target.value)}
                autoComplete="off"
                value={desc}
                placeholder="Adicione uma descrição"
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
        </CardContent>
      </Card>
    </Modal>
  )
}

export default NewTask
