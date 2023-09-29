import React, { useState } from 'react'
import { PlusCircle } from 'lucide-react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'
import axios from 'axios'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import ClockLoader from 'react-spinners/ClockLoader'

type newTaskType = {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  openModal: boolean
  jwt: string
}

const NewTask = ({ setOpenModal, openModal, jwt }: newTaskType) => {
  const [nome, setNome] = useState('')
  const [hora, setHora] = useState('')
  const [dias, setDias] = useState('')
  const [desc, setDesc] = useState('')

  const [added, setAdded] = useState(false)

  const handleChange = (newDia: string) => {
    setDias(newDia)
  }

  const handleOnRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (nome === '' || hora === '') return

    const addTask = async () => {
      await axios.post('https://to-do-mountains.onrender.com/insert', {
        nome,
        hora,
        dias,
        desc,
        jwt,
      })
    }
    addTask()
    setAdded(true)
    setTimeout(() => {
      window.location.reload()
    }, 2000)
  }
  return (
    <div className="fixed inset-0 z-10  bg-black bg-opacity-50 text-gray-50">
      <div className="flex h-full w-full items-center justify-center">
        {added && (
          <div className="absolute right-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/70">
            <ClockLoader size={50} color="#6b21a8" speedMultiplier={3} />
          </div>
        )}
        <div className="absolute flex h-auto w-auto flex-col  items-center justify-center gap-4 overflow-hidden rounded-xl bg-neutral-900 px-10 py-6 shadow-xl  sm:h-auto sm:w-fit">
          <div className="flex w-full flex-row items-center justify-between">
            <p className="text-lg font-semibold">Crie sua tarefa!</p>
            <Button
              className=" w-fit bg-transparent font-semibold text-white hover:text-black"
              onClick={() => setOpenModal(!openModal)}
            >
              X
            </Button>
          </div>
          <form
            onSubmit={handleOnRegister}
            className="flex flex-col items-center gap-2"
          >
            <Select value={dias} onValueChange={handleChange}>
              <SelectTrigger className="">
                <SelectValue placeholder="Selecione o dia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="" value="Segunda">
                  Segunda-Feira
                </SelectItem>
                <SelectItem className="" value="Terca">
                  Terça-Feira
                </SelectItem>
                <SelectItem className="" value="Quarta">
                  Quarta-Feira
                </SelectItem>
                <SelectItem className="" value="Quinta">
                  Quinta-Feira
                </SelectItem>
                <SelectItem className="" value="Sexta">
                  Sexta-Feira
                </SelectItem>
                <SelectItem className="" value="Sabado">
                  Sabado
                </SelectItem>
                <SelectItem className="" value="Domingo">
                  Domingo
                </SelectItem>
                <SelectItem className="" value="Todos">
                  Todos os dias
                </SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="text"
              autoComplete="off"
              onChange={(e) => setNome(e.target.value)}
              value={nome}
              placeholder="Nome da tarefa"
              className="h-12 w-full p-4 text-gray-300"
            />
            <div className="flex w-full flex-col gap-4 pb-4 md:flex-row">
              <Input
                type="time"
                onChange={(e) => setHora(e.target.value)}
                autoComplete="off"
                value={hora}
                placeholder="Adicione um horario"
                className="h-12 w-full p-4 text-gray-300"
              />
              <Input
                type="text"
                onChange={(e) => setDesc(e.target.value)}
                autoComplete="off"
                value={desc}
                placeholder="Descrição da tarefa (Opcional)"
                className="h-12 w-full p-4 text-gray-300"
              />
            </div>
            <Button
              type="submit"
              className="flex h-12 min-w-full items-center justify-center gap-2"
            >
              <PlusCircle />
              Criar
            </Button>
          </form>
        </div>
      </div>
    </div>
    // <Modal
    //   className="flex min-h-screen w-full items-center justify-center"
    //   open={openModal}
    // >
    //   <Card className="h-1/2 w-1/2">
    //     <CardHeader className="flex flex-row items-center justify-between ">
    //       <CardTitle>Nova Tarefa</CardTitle>
    //       <X className="cursor-pointer" onClick={() => setOpenModal(false)} />
    //     </CardHeader>
    //     <CardContent>
    //       <form
    //         onSubmit={handleOnRegister}
    //         className="flex flex-col items-center gap-2"
    //       >
    //         <FormControl fullWidth>
    //           <InputLabel className="text-white">Selecione um dia</InputLabel>
    //           <Select
    //             variant="filled"
    //             required
    //             value={dias}
    //             onChange={handleChange}
    //             className="text-white hover:border-white focus:border-white"
    //             autoWidth
    //           >
    //             <MenuItem className="" value="Segunda">
    //               Segunda-Feira
    //             </MenuItem>
    //             <MenuItem className="" value="Terca">
    //               Terça-Feira
    //             </MenuItem>
    //             <MenuItem className="" value="Quarta">
    //               Quarta-Feira
    //             </MenuItem>
    //             <MenuItem className="" value="Quinta">
    //               Quinta-Feira
    //             </MenuItem>
    //             <MenuItem className="" value="Sexta">
    //               Sexta-Feira
    //             </MenuItem>
    //             <MenuItem className="" value="Sabado">
    //               Sabado
    //             </MenuItem>
    //             <MenuItem className="" value="Domingo">
    //               Domingo
    //             </MenuItem>
    //             <MenuItem className="" value="Todos">
    //               Todos os dias
    //             </MenuItem>
    //           </Select>
    //         </FormControl>

    //         {/* <Select value={dias} onValueChange={handleChange}>
    //           <SelectTrigger className="">
    //             <SelectValue placeholder="Selecione o dia" />
    //           </SelectTrigger>
    //           <SelectContent>
    //             <SelectItem className="" value="Segunda">
    //               Segunda-Feira
    //             </SelectItem>
    //             <SelectItem className="" value="Terca">
    //               Terça-Feira
    //             </SelectItem>
    //             <SelectItem className="" value="Quarta">
    //               Quarta-Feira
    //             </SelectItem>
    //             <SelectItem className="" value="Quinta">
    //               Quinta-Feira
    //             </SelectItem>
    //             <SelectItem className="" value="Sexta">
    //               Sexta-Feira
    //             </SelectItem>
    //             <SelectItem className="" value="Sabado">
    //               Sabado
    //             </SelectItem>
    //             <SelectItem className="" value="Domingo">
    //               Domingo
    //             </SelectItem>
    //             <SelectItem className="" value="Todos">
    //               Todos os dias
    //             </SelectItem>
    //           </SelectContent>
    //         </Select> */}
    //         <Input
    //           type="text"
    //           autoComplete="off"
    //           onChange={(e) => setNome(e.target.value)}
    //           value={nome}
    //           placeholder="Adicione uma nova tarefa"
    //           className="h-12 w-full p-4 text-gray-300"
    //         />
    //         <div className="flex w-full gap-4 pb-4">
    //           <Input
    //             type="time"
    //             onChange={(e) => setHora(e.target.value)}
    //             autoComplete="off"
    //             value={hora}
    //             placeholder="Adicione um horario"
    //             className="h-12 w-full  p-4 text-gray-300"
    //           />
    //           <Input
    //             type="text"
    //             onChange={(e) => setDesc(e.target.value)}
    //             autoComplete="off"
    //             value={desc}
    //             placeholder="Adicione uma descrição"
    //             className="h-12 w-full p-4 text-gray-300"
    //           />
    //         </div>
    //         <Button
    //           type="submit"
    //           className="flex h-12 min-w-full items-center justify-center gap-2"
    //         >
    //           <PlusCircle />
    //           Criar
    //         </Button>
    //       </form>
    //     </CardContent>
    //   </Card>
    // </Modal>
  )
}

export default NewTask
