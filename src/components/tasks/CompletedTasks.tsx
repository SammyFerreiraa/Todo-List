import { CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'

const CompletedTasks = ({
  TasksLength,
  TasksComplete,
}: {
  TasksLength: number | null
  TasksComplete: number | null
}) => {
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
    <div className="inline-flex h-[19px] w-fit items-center justify-start gap-2">
      <div className="text-sm font-semibold text-white">Concluídas</div>
      <div className="inline-flex flex-col items-center justify-center gap-3 rounded-[999px] bg-zinc-800 px-2 py-1">
        {modifiedLengthTasks === null && (
          <div className="flex h-4 w-[32.11px] items-center justify-center text-xs font-bold text-zinc-300">
            <CircularProgress
              className="text-[#6b21a8]"
              color="inherit"
              size={10}
            />
          </div>
        )}
        {modifiedLengthTasks !== null && (
          <div className="flex items-center justify-center text-xs font-bold text-zinc-300">
            {TasksComplete} de {modifiedLengthTasks}
          </div>
        )}
      </div>
    </div>
  )
}

export default CompletedTasks
