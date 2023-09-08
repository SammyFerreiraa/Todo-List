import React, { useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material'

const LengthTasks = ({ TasksLength }: { TasksLength: number | null }) => {
  const [modifiedLengthTasks, setModifiedLengthTasks] = useState<number | null>(
    null,
  )
  useEffect(() => {
    const timer = setTimeout(() => {
      if (TasksLength === null) {
        setModifiedLengthTasks(0)
      } else {
        setModifiedLengthTasks(TasksLength)
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [TasksLength])

  return (
    <div className="flex items-center gap-2">
      <div className="text-sm font-bold text-blue-400">Tarefas criadas</div>
      <div className="inline-flex h-[19px] w-6 flex-col items-center justify-center gap-2.5 rounded-[999px] bg-zinc-800 px-2 py-0.5">
        {modifiedLengthTasks === null && (
          <div className="flex items-center justify-center text-xs font-bold text-zinc-300">
            <CircularProgress size={10} />
          </div>
        )}
        {modifiedLengthTasks !== null && (
          <div className="flex items-center justify-center text-xs font-bold text-zinc-300">
            {modifiedLengthTasks}
          </div>
        )}
      </div>
    </div>
  )
}

export default LengthTasks
