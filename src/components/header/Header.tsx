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
import { destroyCookie, parseCookies } from 'nookies'
import Logout from '../icons/Logout'

const Header = () => {
  const cookies = parseCookies()
  const jwt = cookies.jwtToken

  const [nome, setNome] = useState('')
  const [hora, setHora] = useState('')
  const [dias, setDias] = useState('')
  const [desc, setDesc] = useState('')

  useEffect(() => {
    if (jwt === undefined) {
      window.location.href = '/'
    }
    console.log(jwt)
    window.addEventListener('beforeunload', () => {
      destroyCookie(null, 'jwtToken')
    })
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
        desc,
        jwt,
      })
    }
    addTask()
    setNome('')
    setHora('')
    setDesc('')
    window.location.reload()
  }

  const handleLogout = () => {
    // Apague o cookie 'token'
    destroyCookie(null, 'jwtToken')

    // Redirecione para a página de logout ou para onde for apropriado
    window.location.href = '/login' // Por exemplo, uma página de logout
  }

  return (
    <header className="relative flex w-full items-center justify-center bg-stone-950 py-14">
      <button onClick={handleLogout} className="absolute right-0 top-0 ">
        <Logout />
      </button>
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
        <input
          type="text"
          onChange={(e) => setDesc(e.target.value)}
          autoComplete="off"
          value={desc}
          placeholder="Adicione uma descrição"
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
