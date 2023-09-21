'use client'

import React, { useEffect, useState } from 'react'
import { Label } from '../components/ui/label'
import { Input } from '../components/ui/input'
import axios from 'axios'
import { parseCookies, setCookie } from 'nookies'
import Email from '@/components/icons/Email'
import Password from '@/components/icons/Password'
import { Button } from '../components/ui/button'
import Link from 'next/link'
import { Alert, AlertTitle } from '@mui/material'
const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isValid, setIsValid] = useState(true)
  const [erroMessage, setErrorMessage] = useState(false)
  const [successMessage, setSuccessMessage] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value
    setEmail(newEmail)
    setIsValid(isValidEmail(newEmail)) // will check if the email is valid or not, and it will pass if it's valid
  }

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email) // return true ou false if the email is valid
  }

  const [jwt, setJwt] = useState('')

  useEffect(() => {
    const cookies = parseCookies()
    if (cookies.jwtToken) {
      window.alert('Você já está logado!')
      window.location.href = '/todos'
    }
  }, [])

  const login = async () => {
    try {
      const response = await axios.post(
        'https://to-do-mountains.onrender.com/auth/login',
        {
          email,
          password,
        },
      )

      if (response.status === 200) {
        const jwtToken = response.data
        setJwt(jwtToken)
        setCookie(null, 'jwtToken', jwtToken)
        console.log(jwt)
        setSuccessMessage(true)
        window.location.href = '/todos'
      } else {
        console.log('Erro na solicitação:', response.status, response.data)
      }
    } catch (error) {
      setErrorMessage(true)
      console.log(erroMessage)
      console.error('Erro na solicitação:', error)
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (email === '' || password === '' || !isValid) {
      setIsValid(false)
      e.preventDefault()
    } else {
      e.preventDefault()
      setErrorMessage(false)
      login()
      setEmail('')
      setPassword('')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      id="login"
      className="flex max-h-min w-full flex-1 flex-col items-center justify-center gap-4 text-white"
    >
      <div className="flex w-full flex-col gap-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-normal">Endereço de e-mail</Label>
          {!isValid && (
            <p className="text-xs text-red-500">
              Digite um endereço de e-mail válido
            </p>
          )}
        </div>

        <div
          className={`$ ${isValid ? 'border-none' : 'border-red-500'} flex
            h-14 w-full items-center rounded border-2 bg-zinc-800
          px-4`}
        >
          <div className=" left-4 top-4">
            <Email />
          </div>
          <Input
            value={email}
            onChange={handleInputChange}
            className={`focus-visible:ring- h-full  border-none  bg-transparent text-white
            placeholder:text-[#525258]`}
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
            type="password"
            placeholder="Digite sua senha"
          />
        </div>
        {erroMessage && (
          <Alert
            onClose={() => setErrorMessage(false)}
            className="absolute left-1/3 right-1/3 top-8 items-center justify-center text-gray-200"
            severity="error"
            variant="filled"
          >
            <AlertTitle>Erro</AlertTitle>Email ou senha incorretos!
          </Alert>
        )}
        {successMessage && (
          <Alert
            onClose={() => setSuccessMessage(false)}
            className="absolute left-1/3 right-1/3 top-8 items-center justify-center  text-gray-200"
            severity="success"
            variant="filled"
          >
            <AlertTitle>Parabéns</AlertTitle>Você foi logado com sucesso!
          </Alert>
        )}
      </div>
      <div className="flex w-full  max-w-3xl flex-col gap-3 pt-3">
        <button
          disabled={!isValid}
          form="login"
          className={`flex h-14 w-full items-center justify-center rounded bg-purple-800 px-24 py-7 text-base font-bold text-white hover:bg-purple-900 ${
            !isValid ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          Fazer Login
        </button>
        <div className="flex w-full flex-col items-center gap-1">
          <p className="text-sm font-normal text-white">Novo aqui?</p>
          <Link className="w-full " href={'/registro'}>
            <Button className="flex h-14 w-full items-center justify-center rounded bg-purple-800 px-24 py-7 text-base font-bold text-white hover:bg-purple-900">
              Crie sua conta
            </Button>
          </Link>
        </div>
      </div>
    </form>
  )
}

export default LoginForm
