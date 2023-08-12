'use client'

import axios from 'axios'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'

const RegistrationForm = () => {
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
  )
}

export default RegistrationForm
