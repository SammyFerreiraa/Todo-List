'use client'

import React, { useEffect, useState } from 'react'
import PlusCircle from '../icons/PlusCircle'
import axios from 'axios'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { parseCookies } from 'nookies'

const Header = () => {
  const cookies = parseCookies()
  const jwt = cookies.jwtToken

  const [nome, setNome] = useState('')
  const [hora, setHora] = useState('')
  const [dias, setDias] = useState('')

  useEffect(() => {
    console.log(jwt)
  }, [jwt])

  const handleSelectDay = (dia: string) => {
    setDias(dia)
  }

  const handleOnRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (nome === '' || hora === '') return

    const addTask = async () => {
      await axios.post('http://localhost:6969/insert', {
        nome,
        hora,
        dias,
        jwt,
      })
    }
    addTask()
    setNome('')
    setHora('')
    window.location.reload()
  }
  return (
    <header className="relative flex w-full items-center justify-center bg-stone-950 py-14">
      <div>
        <span className="text-[40px] font-black text-blue-400">to</span>
        <span className="text-[40px] font-black text-indigo-500">do</span>
      </div>
      <form
        onSubmit={handleOnRegister}
        className="absolute -bottom-6 flex max-h-14 w-3/4 gap-2"
      >
        <Select value={dias} onValueChange={handleSelectDay}>
          <SelectTrigger className="w-[1000px]">
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
        <input
          type="text"
          autoComplete="off"
          onChange={(e) => setNome(e.target.value)}
          value={nome}
          placeholder="Adicione uma nova tarefa"
          className="h-12 w-full rounded bg-neutral-800 p-4 text-gray-300"
        />
        <input
          type="time"
          onChange={(e) => setHora(e.target.value)}
          autoComplete="off"
          value={hora}
          placeholder="Adicione um horario"
          className="h-12 w-full rounded bg-neutral-800 p-4 text-gray-300"
        />
        <button
          type="submit"
          className="flex h-12 w-24 items-center justify-center gap-2 rounded bg-cyan-700 text-white"
        >
          <PlusCircle />
          Criar
        </button>
      </form>
    </header>
  )
}

export default Header
