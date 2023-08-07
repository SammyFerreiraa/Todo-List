import React from 'react'
import PlusCircle from '../icons/PlusCircle'

const Header = () => {
  return (
    <header className="relative flex w-full items-center justify-center bg-stone-950 py-14">
      <div>
        <span className="text-[40px] font-black text-blue-400">to</span>
        <span className="text-[40px] font-black text-indigo-500">do</span>
      </div>
      <form className="absolute -bottom-6 flex max-h-14 w-3/4  gap-2">
        <input
          type="text"
          name="todo"
          placeholder="Adicione uma nova tarefa"
          id="todo"
          className="h-12 w-full rounded bg-neutral-800 p-4 text-gray-300"
        />
        <button
          type="submit"
          className="flex h-12 w-24 items-center justify-center gap-2 rounded bg-cyan-700 text-white"
        >
          <PlusCircle />
          Criar
        </button>
      </form>
    </header>
  )
}

export default Header
