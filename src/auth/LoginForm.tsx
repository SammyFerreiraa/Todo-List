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
import { ClockLoader } from 'react-spinners'
const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isValid, setIsValid] = useState(true)
  const [erroMessage, setErrorMessage] = useState(false)
  const [successMessage, setSuccessMessage] = useState(false)
  const [isLogued, setIsLogued] = useState(false)
  const [loggingIn, setLoggingIn] = useState(false)

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
      setIsLogued(true)
      setTimeout(() => {
        window.location.href = '/todos'
      }, 2000)
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
        setSuccessMessage(true)
        setLoggingIn(false)
        setTimeout(() => {
          window.location.href = '/todos'
        }, 2000)
      } else {
        console.log('Erro na solicitação:', response.status, response.data)
      }
    } catch (error) {
      setErrorMessage(true)
      setLoggingIn(false)
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
      setLoggingIn(true)
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
      {loggingIn && (
        <div className="absolute right-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black/70">
          <ClockLoader size={50} color="#6b21a8" speedMultiplier={3} />
        </div>
      )}
      {isLogued && (
        <Alert
          onClose={() => setIsLogued(false)}
          className="absolute top-8 z-40 items-center justify-center text-gray-200"
          severity="info"
          variant="filled"
        >
          <AlertTitle>Parabéns</AlertTitle>Você já está logado
        </Alert>
      )}
      {erroMessage && (
        <Alert
          onClose={() => setErrorMessage(false)}
          className="absolute top-8 z-40 items-center justify-center text-gray-200"
          severity="error"
          variant="filled"
        >
          <AlertTitle>Erro</AlertTitle>Email ou senha incorretos!
        </Alert>
      )}
      {successMessage && (
        <Alert
          onClose={() => setSuccessMessage(false)}
          className="absolute top-8 items-center justify-center  text-gray-200"
          severity="success"
          variant="filled"
        >
          <AlertTitle>Parabéns</AlertTitle>Você foi logado com sucesso!
        </Alert>
      )}
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
            autoComplete="off"
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
            autoComplete="off"
            type="password"
            placeholder="Digite sua senha"
          />
        </div>
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
