'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { destroyCookie, parseCookies } from 'nookies'
import { Button } from '../ui/button'
import Image from 'next/image'
import { LogOut, PlusCircle, User } from 'lucide-react'
import NewTask from './NewTask'

const Header = () => {
  const cookies = parseCookies()
  const jwt = cookies.jwtToken
  const encodedJwt = encodeURIComponent(jwt)

  const [openModal, setOpenModal] = useState(false)

  const [userName, setUserName] = useState('')

  useEffect(() => {
    if (jwt === undefined || jwt === '' || jwt === null) {
      window.location.href = '/'
    }

    const fetchUserName = async () => {
      const responde = await axios.get(
        `http://localhost:6969/auth/getUser/${encodedJwt}`,
      )
      console.log(responde.data)
      const data = responde.data
      setUserName(data.User)
    }

    fetchUserName()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwt])

  const handleLogout = () => {
    destroyCookie(null, 'jwtToken')

    window.location.href = '/login'
  }

  return (
    <header className="relative flex w-full items-center justify-between bg-stone-950 px-8 shadow-lg">
      <div className="flex flex-row items-center justify-center gap-4 ">
        <Image
          src={'/imgs/logo.png'}
          alt="logo"
          width={80}
          height={100}
          sizes="100%"
        />
        <p className="text-xl font-bold text-purple-800">Mountain To-Do</p>
      </div>
      <div className="flex flex-row items-center justify-center gap-4">
        <div className="mr-2 flex items-center gap-2">
          <User className="h-4 w-4" />
          <p className="text-sm font-semibold text-white">{userName}</p>
        </div>
        <Button onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
        <Button onClick={() => setOpenModal(!openModal)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Tarefa
        </Button>
      </div>

      <NewTask jwt={jwt} setOpenModal={setOpenModal} openModal={openModal} />

      {/* <button onClick={handleLogout} className="absolute right-0 top-0 ">
        <Logout />
      </button>
      <div>
        <span className="text-[40px] font-black text-blue-400">to</span>
        <span className="text-[40px] font-black text-indigo-500">do</span>
      </div> */}
      {/* <form
        onSubmit={handleOnRegister}
        className="absolute -bottom-6 flex max-h-14 w-3/4 items-center gap-2"
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
        <Input
          type="text"
          autoComplete="off"
          onChange={(e) => setNome(e.target.value)}
          value={nome}
          placeholder="Adicione uma nova tarefa"
          className="h-12 w-full p-4 text-gray-300"
        />
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
        <Button
          type="submit"
          className="flex h-12 w-24 items-center justify-center gap-2"
        >
          <PlusCircle />
          Criar
        </Button>
      </form> */}
    </header>
  )
}

export default Header
