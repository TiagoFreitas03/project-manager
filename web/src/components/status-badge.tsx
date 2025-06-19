import clsx from 'clsx'

import type { Status } from '@/types/status'

interface StatusBadgeProps {
  value: Status
  size?: 'xs' | 'sm'
}

export function StatusBadge({ value, size = 'xs' }: StatusBadgeProps) {
  function formatStatus() {
    if (value === 'TO_DO') {
      return 'Pendente'
    }

    if (value === 'DOING') {
      return 'Em andamento'
    }

    return 'Finalizado'
  }

  return (
    <span
      className={clsx('text-neutral-100 rounded-lg px-2 py-1', {
        'bg-zinc-700/50': value === 'TO_DO',
        'bg-orange-600/50': value === 'DOING',
        'bg-pink-600/50': value === 'DONE',
        'text-xs': size === 'xs',
        'text-sm': size === 'sm',
      })}
    >
      &#9679; {formatStatus()}
    </span>
  )
}
