import { ChevronsDown, ChevronsUp, Equal } from 'lucide-react'

interface PriorityBadgeProps {
  value: number
}

const priorityNames = ['Alta', 'Média', 'Baixa']

export function PriorityBadge({ value }: PriorityBadgeProps) {
  return (
    <div className="flex gap-1 items-center text-neutral-100 text">
      {value === 1 ? (
        <ChevronsUp className="text-red-500" size={20} />
      ) : value === 2 ? (
        <Equal className="text-yellow-500" size={20} />
      ) : (
        <ChevronsDown className="text-green-500" size={20} />
      )}
      <span>{priorityNames[value - 1]}</span>
    </div>
  )
}
