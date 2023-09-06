'use client'

import axios from 'axios'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'
import { parseCookies } from 'nookies'
import Email from '@/components/icons/Email'
import UserIcon from '@/components/icons/UserIcon'
import Password from '@/components/icons/Password'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Alert, AlertTitle } from '@mui/material'
import { CheckIcon } from 'lucide-react'

const RegistrationForm = () => {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [email, setEmail] = useState('')

  const [isValidUsername, setIsValidUsername] = useState(true)
  const [isValidEmail, setIsValidEmail] = useState(true)
  const [isValidPassword, setIsValidPassword] = useState(true)
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true)

  const [isValidRegister, setIsValidRegister] = useState(true)
  const [errorMessage, setErrorMessage] = useState(false)
  const [successMessage, setSuccessMessage] = useState(false)

  const handleInputChangeConfirmPassword = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newPassword = e.target.value
    setConfirmPassword(newPassword)
    setIsValidConfirmPassword(checkIsValidConfirmPassword(newPassword)) // will check if the password is valid or not, and it will pass if it's valid
    setIsValidRegister(checkIsValidPassword(newPassword))
  }

  const checkIsValidConfirmPassword = (newPassword: string) => {
    if (newPassword === password) {
      return true
    } else {
      return false
    }
  }

  const handleInputChangePassword = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newPassword = e.target.value
    setPassword(newPassword)
    setIsValidPassword(checkIsValidPassword(newPassword)) // will check if the password is valid or not, and it will pass if it's valid
  }

  const checkIsValidPassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return passwordRegex.test(password)
  }

  const handleInputChangeUsername = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newUser = e.target.value
    setUser(newUser)
    setIsValidUsername(checkIsValidUsername(newUser)) // will check if the email is valid or not, and it will pass if it's valid
    setIsValidRegister(checkIsValidUsername(newUser))
  }
  const checkIsValidUsername = (user: string) => {
    const usernameRegex = /^[a-zA-Z0-9_-]+$/
    return usernameRegex.test(user) && user.length >= 3
  }

  const handleInputChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value
    setEmail(newEmail)
    setIsValidEmail(checkIsValidEmail(newEmail)) // will check if the email is valid or not, and it will pass if it's valid
    setIsValidRegister(checkIsValidEmail(newEmail))
  }

  const checkIsValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email) // return true ou false if the email is valid
  }

  useEffect(() => {
    const cookies = parseCookies()
    if (cookies.jwtToken) {
      window.alert('Você já está logado!')
      window.location.href = '/todos'
    }
  }, [])

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
        setSuccessMessage(true)
      } else {
        console.log('Erro na solicitação:', response.status, response.data)
      }
    } catch (error) {
      setErrorMessage(true)
      console.error('Erro na solicitação:', error)
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (
      !isValidRegister ||
      password === '' ||
      user === '' ||
      email === '' ||
      confirmPassword === ''
    ) {
      setIsValidRegister(false)
      e.preventDefault()
    } else {
      e.preventDefault()

      register()
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setUser('')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      id="register"
      className="flex h-screen w-full flex-col items-center justify-start gap-4 text-white  "
    >
      {successMessage && (
        <Alert
          onClose={() => setSuccessMessage(false)}
          icon={<CheckIcon />}
          className="fixed left-1/3 right-1/3 top-8 items-center justify-center bg-green-950 text-gray-200"
          severity="success"
          variant="filled"
        >
          <AlertTitle>Sucesso</AlertTitle>Você se registrou com sucesso!
        </Alert>
      )}
      {errorMessage && (
        <Alert
          onClose={() => setErrorMessage(false)}
          icon={<CheckIcon />}
          className="fixed left-1/3 right-1/3 top-8 items-center justify-center bg-red-950 text-gray-200"
          severity="error"
          variant="filled"
        >
          <AlertTitle>Erro</AlertTitle>Email ou nome já utilizado!
        </Alert>
      )}

      {/* Usuario */}
      <div className="flex w-full flex-col gap-3">
        {/* Label */}
        <div className="flex items-center justify-between">
          <Label className="text-base font-normal">Nome de Usuario</Label>
          {!isValidUsername && (
            <p className="text-end text-xs text-red-500">
              O nome contem menos de 3 caracteres ou contem caracteres inválidos
            </p>
          )}
        </div>
        {/* input */}
        <div
          className={`flex h-14
            w-full items-center rounded border-2 border-none bg-zinc-800
          px-4`}
        >
          <div className=" left-4 top-4">
            <UserIcon />
          </div>
          <Input
            value={user}
            onChange={handleInputChangeUsername}
            className={`focus-visible:ring- h-full  border-none  bg-transparent text-white
            placeholder:text-[#525258]`}
            placeholder="Digite seu nome de usuário"
          />
        </div>
      </div>

      {/* Email */}
      <div className="flex w-full flex-col gap-3">
        {/* Label */}
        <div className="flex items-center justify-between">
          <Label className="text-base font-normal">Endereço de e-mail</Label>
          {!isValidEmail && (
            <p className="text-end text-xs text-red-500">
              Digite um endereço de e-mail válido
            </p>
          )}
        </div>
        {/* input */}
        <div
          className={`$ ${isValidEmail ? 'border-none' : 'border-red-500'} flex
            h-14 w-full items-center rounded border-2 bg-zinc-800
          px-4`}
        >
          <div className=" left-4 top-4">
            <Email />
          </div>
          <Input
            value={email}
            onChange={handleInputChangeEmail}
            className={`focus-visible:ring- h-full  border-none  bg-transparent text-white
            placeholder:text-[#525258]`}
            placeholder="Digite seu endereço de e-mail"
          />
        </div>
      </div>

      {/* Senha */}
      <div className="flex w-full flex-col gap-3">
        {/* Label */}
        <div className="flex items-center justify-between">
          <Label className="text-base font-normal">Senha</Label>
          {!isValidPassword && (
            <p className="text-end text-xs text-red-500">
              A senha deve conter pelo menos 8 caracteres, uma letra maiúscula,
              e uma minúscula, um número e um caractere especial
            </p>
          )}
        </div>
        {/* input */}
        <div
          className={`flex h-14
            w-full items-center rounded border-2 border-none bg-zinc-800
          px-4`}
        >
          <div className=" left-4 top-4">
            <Password />
          </div>
          <Input
            type="password"
            value={password}
            onChange={handleInputChangePassword}
            className={`focus-visible:ring- h-full  border-none  bg-transparent text-white
            placeholder:text-[#525258]`}
            placeholder="Digite sua senha"
          />
        </div>
      </div>

      {/* Confirmar Senha */}
      <div className="flex w-full flex-col gap-3">
        {/* Label */}
        <div className="flex items-center justify-between">
          <Label className="text-base font-normal">Confirmar Senha</Label>
          {!isValidConfirmPassword && (
            <p className="text-end text-xs text-red-500">A senha não confere</p>
          )}
        </div>
        {/* input */}
        <div
          className={`flex h-14
            w-full items-center rounded border-2 border-none bg-zinc-800
          px-4`}
        >
          <div className=" left-4 top-4">
            <Password />
          </div>
          <Input
            type="password"
            value={confirmPassword}
            onChange={handleInputChangeConfirmPassword}
            className={`focus-visible:ring- h-full  border-none  bg-transparent text-white
            placeholder:text-[#525258]`}
            placeholder="Digite sua senha novamente"
          />
        </div>
      </div>
      <div className="flex w-full  max-w-3xl flex-col gap-3 pt-3">
        <button
          disabled={!isValidRegister}
          form="register"
          className={`flex h-14 w-full items-center justify-center rounded bg-purple-800 px-24 py-7 text-base font-bold text-white hover:bg-purple-900 ${
            !isValidRegister ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          Registrar
        </button>
        <div className="flex w-full flex-col items-center gap-1">
          <p className="text-sm font-normal text-white">Já tem uma conta?</p>
          <Link className="w-full " href={'/login'}>
            <Button className="flex h-14 w-full items-center justify-center rounded bg-purple-800 px-24 py-7 text-base font-bold text-white hover:bg-purple-900">
              Entre na sua conta
            </Button>
          </Link>
        </div>
      </div>
    </form>
  )
}

export default RegistrationForm
