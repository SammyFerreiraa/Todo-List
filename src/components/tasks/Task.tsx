import React from 'react'
import { Checkbox } from '../ui/checkbox'
import Trash from '../icons/Trash'

const Task = () => {
  return (
    <div className="inline-flex  w-full items-start justify-start gap-3 rounded border border-zinc-800 bg-neutral-800 p-5 shadow">
      <div>
        <Checkbox />
      </div>
      <div className="shrink grow basis-0 text-sm font-normal leading-tight text-zinc-100">
        Integer urna interdum massa libero auctor neque turpis turpis semper.
        Duis vel sed fames integer.
      </div>
      <button>
        <Trash />
      </button>
    </div>
  )
}

export default Task
