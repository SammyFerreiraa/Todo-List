import { CircularProgress } from '@mui/material'
import { useTasks } from './StateTask'

const CompletedTasks = () => {
  const [lengthComplete, lenghtTasks] = useTasks((state) => [
    state.completeTask,
    state.lengthTasks,
  ])

  return (
    <div className="inline-flex h-[19px] w-fit items-center justify-start gap-2">
      <div className="text-sm font-semibold text-white">Concluídas</div>
      <div className="inline-flex flex-col items-center justify-center gap-3 rounded-[999px] bg-zinc-800 px-2 py-1">
        {lengthComplete === null && (
          <div className="flex h-4 w-[32.11px] items-center justify-center text-xs font-bold text-zinc-300">
            <CircularProgress
              className="text-[#6b21a8]"
              color="inherit"
              size={10}
            />
          </div>
        )}
        {lengthComplete !== null && (
          <div className="flex items-center justify-center text-xs font-bold text-zinc-300">
            {lengthComplete} de {lenghtTasks}
          </div>
        )}
      </div>
    </div>
  )
}

export default CompletedTasks
