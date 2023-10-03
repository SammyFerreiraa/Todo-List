export type TaskType = {
  id: number
  nome: string
  hora: string
  feito?: boolean
  desc?: string
  dias: string
}

type TaskTypeProps = {
  tasks: TaskType[]
  completeTask: number | null
  setCompleteTask: (completeTask: number | null) => void

  lengthTasks: number | null
  setLengthTasks: (lengthTasks: number | null) => void
  updateCompleteTask: (id: number) => void

  addTask: (task: TaskType) => void
  removeTask: (id: number) => void
  updateTask: (id: number, task: TaskType) => void
}

export default TaskTypeProps
