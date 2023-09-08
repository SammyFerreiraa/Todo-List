import React from 'react'
import { CircularProgress } from '@mui/material'

const LengthTasks = ({ TasksLength }: { TasksLength: number | null }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="text-sm font-bold text-blue-400">Tarefas criadas</div>
      <div className="inline-flex h-[19px] w-6 flex-col items-center justify-center gap-2.5 rounded-[999px] bg-zinc-800 px-2 py-0.5">
        {TasksLength === null && (
          <div className="flex items-center justify-center text-xs font-bold text-zinc-300">
            <CircularProgress size={10} />
          </div>
        )}
        {TasksLength !== null && (
          <div className="flex items-center justify-center text-xs font-bold text-zinc-300">
            {TasksLength === 0 && 0}
            {TasksLength > 0 && TasksLength}
          </div>
        )}
      </div>
    </div>
  )
}

export default LengthTasks
