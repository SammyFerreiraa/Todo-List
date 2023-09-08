import React from 'react'
import TaskType from '@/models/TaskType'
import { CircularProgress } from '@mui/material'

const LengthTasks = ({ Tasks }: { Tasks: TaskType[] }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="text-sm font-bold text-blue-400">Tarefas criadas</div>
      <div className="inline-flex h-[19px] w-6 flex-col items-center justify-center gap-2.5 rounded-[999px] bg-zinc-800 px-2 py-0.5">
        {Tasks.length === null ||
          (Tasks.length === undefined && (
            <div className="flex items-center justify-center text-xs font-bold text-zinc-300">
              <CircularProgress size={10} />
            </div>
          ))}
        {Tasks.length >= 0 && (
          <div className="flex items-center justify-center text-xs font-bold text-zinc-300">
            {Tasks.length === 0 && 0}
            {Tasks.length > 0 && Tasks.length}
          </div>
        )}
      </div>
    </div>
  )
}

export default LengthTasks
