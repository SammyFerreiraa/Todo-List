'use client'

import React, { useEffect, useState } from 'react'
import { Label } from '../components/ui/label'
import { Input } from '../components/ui/input'
import axios from 'axios'
import { parseCookies, setCookie } from 'nookies'
import Email from '@/components/icons/Email'
import Password from '@/components/icons/Password'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [jwt, setJwt] = useState('')

  useEffect(() => {
    const cookies = parseCookies()
    if (cookies.jwtToken) {
      window.alert('Você já está logado!')
      window.location.href = '/todos'
    }
  }, [])

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
        setCookie(null, 'jwtToken', jwtToken)
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
    <form
      onSubmit={handleSubmit}
      id="login"
      className="flex flex-col items-center justify-center gap-4 text-white"
    >
      <div className="flex w-full flex-col gap-3">
        <Label className="text-base font-normal">Endereço de e-mail</Label>

        <div className="flex h-14 w-full items-center rounded bg-zinc-800 px-4">
          <div className=" left-4 top-4">
            <Email />
          </div>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="focus-visible:ring- h-full border-none bg-transparent text-white placeholder:text-[#525258]"
            placeholder="Digite seu endereço de e-mail"
          />
        </div>
      </div>
      <div className="flex w-full flex-col gap-3">
        <Label className="text-base font-normal">Senha</Label>

        <div className="flex h-14 w-full items-center rounded bg-zinc-800 px-4">
          <div className=" left-4 top-4">
            <Password />
          </div>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="focus-visible:ring- h-full border-none bg-transparent text-white placeholder:text-[#525258]"
            placeholder="Digite sua senha"
          />
        </div>
      </div>
    </form>
  )
}

export default LoginForm
