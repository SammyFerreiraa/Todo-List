'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'

const Page = () => {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [email, setEmail] = useState('')

  const data = {
    user,
    email,
    password,
    confirmPassword,
  }

  const register = async () => {
    try {
      const response = await axios.post(
        'http://localhost:6969/auth/register',
        data,
      )

      if (response.status === 200) {
        window.location.href = '/'
      } else {
        console.log('Erro na solicitação:', response.status, response.data)
      }
    } catch (error) {
      console.error('Erro na solicitação:', error)
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    register()
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setUser('')
  }

  return (
    <main className="flex h-full w-full items-center justify-center bg-zinc-900">
      <div className="flex h-[75%] w-[65%] flex-col items-center justify-center gap-8 rounded-xl bg-neutral-800 text-white">
        <div>
          <p className="text-[32px] font-bold">Registre-se!</p>
        </div>
        <form
          onSubmit={handleSubmit}
          id="register"
          className="flex flex-col items-center justify-center gap-4"
        >
          <div>
            <Label>Digite seu usuario</Label>
            <Input
              value={user}
              onChange={(e) => {
                setUser(e.target.value)
              }}
              className="text-black"
            />
          </div>
          <div>
            <Label>Digite seu Email</Label>
            <Input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              className="text-black"
            />
          </div>
          <div>
            <Label>Escreva sua senha</Label>
            <Input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              className="text-black"
            />
          </div>
          <div>
            <Label>Confirme sua senha</Label>
            <Input
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
              }}
              className="text-black"
            />
          </div>
        </form>
        <div className="flex flex-row items-center justify-center gap-4">
          <Button form="register">Registrar</Button>
          <Link href={'/'}>
            <Button>Entrar</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Page
