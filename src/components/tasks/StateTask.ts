import TaskTypeProps from '@/models/TaskType'
import { create } from 'zustand'

export const useTasks = create<TaskTypeProps>((set) => ({
  tasks: [],

  completeTask: null, // Quantidade de tasks feitas
  setCompleteTask: (completeTask) => set({ completeTask }), // Setar quantidade de tasks feitas

  // Att quantidade de tasks feitas
  updateCompleteTask: (id) => {
    set((state) => {
      let completeTask = state.completeTask
      const tasks = state.tasks.map((task) => {
        if (task.id === id) {
          const feito = !task.feito
          if (feito !== task.feito) {
            if (completeTask !== null) {
              completeTask += feito ? 1 : -1
            }
          }
          return { ...task, feito }
        }
        return task
      })
      return { tasks, completeTask }
    })
  },

  lengthTasks: null, // Quantidade de tasks
  setLengthTasks: (lengthTasks) => set({ lengthTasks }), // Setar quantidade de tasks

  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })), // Adicionar task

  // Remover task
  removeTask: (id) =>
    set((state) => {
      const tasks = state.tasks.filter((task) => task.id !== id)
      const completeTask = tasks.filter((task) => task.feito).length
      const lengthTasks = tasks.length
      return { tasks, completeTask, lengthTasks }
    }),

  // Atualizar task
  updateTask: (id, task) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? task : t)),
    })),
}))
