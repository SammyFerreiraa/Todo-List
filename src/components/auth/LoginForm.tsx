'use client'

import React, { useState } from 'react'
import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'
import axios from 'axios'
import { setCookie } from 'nookies'

const LoginForm = () => {
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
  )
}

export default LoginForm
