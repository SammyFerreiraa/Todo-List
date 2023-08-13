import TaskType from '@/models/TaskType'
import { CircularProgress } from '@mui/material'

const CompletedTasks = ({ Tasks }: { Tasks: TaskType[] }) => {
  return (
    <div className="inline-flex h-[19px] w-fit items-center justify-start gap-2">
      <div className="text-sm font-bold text-indigo-400">Concluídas</div>
      <div className="inline-flex flex-col items-center justify-center gap-3 rounded-[999px] bg-zinc-800 px-2 py-1">
        {Tasks.length === 0 && (
          <div className="flex h-4 w-[32.11px] items-center justify-center text-xs font-bold text-zinc-300">
            <CircularProgress size={10} />
          </div>
        )}
        {Tasks.length > 0 && (
          <div className="flex items-center justify-center text-xs font-bold text-zinc-300">
            {Tasks.filter((task) => task.feito).length} de {Tasks.length}
          </div>
        )}
      </div>
    </div>
  )
}

export default CompletedTasks
