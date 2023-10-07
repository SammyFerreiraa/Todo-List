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

  const getUsersUrl = process.env.NEXT_PUBLIC_URL_GETUSERS || ''

  const [openModal, setOpenModal] = useState(false)

  const [userName, setUserName] = useState('')

  useEffect(() => {
    if (jwt === undefined || jwt === '' || jwt === null) {
      window.location.href = '/'
    }

    const fetchUserName = async () => {
      const responde = await axios.get(`${getUsersUrl}${encodedJwt}`)
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
    <header className="relative flex h-fit w-full flex-col items-center justify-between  bg-stone-950 px-8 shadow-lg md:flex-row">
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
      <div className="mb-4 mr-2 flex items-center justify-center gap-2 md:mb-0 md:mr-0">
        <User className="h-4 w-4" />
        <p className="text-sm font-semibold text-white">{userName}</p>
      </div>
      <div className="flex flex-row items-center justify-center gap-4">
        <Button onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
        <Button onClick={() => setOpenModal(!openModal)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Tarefa
        </Button>
      </div>

      {openModal && (
        <NewTask setOpenModal={setOpenModal} openModal={openModal} jwt={jwt} />
      )}
    </header>
  )
}

export default Header
