import { CircularProgress } from '@mui/material'
import { useTasks } from './StateTask'

const LengthTasks = () => {
  const lengthTasks = useTasks((state) => state.lengthTasks)

  return (
    <div className="flex items-center gap-2">
      <div className="text-sm font-semibold text-white">Tarefas criadas</div>
      <div className="inline-flex h-[19px] w-6 flex-col items-center justify-center gap-2.5 rounded-[999px] bg-zinc-800 px-2 py-0.5">
        {lengthTasks === null && (
          <div className="flex items-center justify-center text-xs font-bold text-zinc-300">
            <CircularProgress
              className="text-[#6b21a8]"
              color="inherit"
              size={10}
            />
          </div>
        )}
        {lengthTasks !== null && (
          <div className="flex items-center justify-center text-xs font-bold text-zinc-300">
            {lengthTasks}
          </div>
        )}
      </div>
    </div>
  )
}

export default LengthTasks
