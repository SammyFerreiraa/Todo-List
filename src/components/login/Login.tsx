'use client'

import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Link from 'next/link'
import axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [jwt, setJwt] = useState('')

  const data = {
    email,
    password,
  }
  const login = async () => {
    try {
      const response = await axios.post(
        'http://localhost:6969/auth/login',
        data,
      )

      if (response.status === 200) {
        const jwtToken = response.data // Substitua 'jwt' pelo nome correto do campo do JWT na resposta
        setJwt(jwtToken)
        window.location.href = '/todos'
        console.log(jwt)
      } else {
        console.log('Erro na solicitação:', response.status, response.data)
      }
    } catch (error) {
      console.error('Erro na solicitação:', error)
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    login()
    setEmail('')
    setPassword('')
  }

  return (
    <div className="flex h-[75%] w-[65%] flex-col items-center justify-center gap-8 rounded-xl bg-neutral-800 text-white">
      <div>
        <p className="text-[32px] font-bold">Entre na sua conta!</p>
      </div>
      <form
        onSubmit={handleSubmit}
        id="login"
        className="flex flex-col items-center justify-center gap-4"
      >
        <div>
          <Label>Email</Label>

          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-black"
          />
        </div>
        <div>
          <Label>Senha</Label>

          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-black"
          />
        </div>
      </form>
      <div className="flex flex-row items-center justify-center gap-4">
        <Button form="login">Entrar</Button>
        <Link href="/registro">
          <Button>Registrar</Button>
        </Link>
      </div>
    </div>
  )
}

export default Login
