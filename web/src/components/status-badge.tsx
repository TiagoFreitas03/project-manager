import clsx from 'clsx'

interface StatusBadgeProps {
  status: string
  size?: 'xs' | 'sm'
}

export function StatusBadge({ status, size = 'xs' }: StatusBadgeProps) {
  function formatStatus() {
    if (status === 'todo') {
      return 'Pendente'
    }

    if (status === 'doing') {
      return 'Em andamento'
    }

    return 'Finalizado'
  }

  return (
    <span
      className={clsx('text-neutral-100 rounded-lg px-2 py-1', {
        'bg-zinc-700/50': status === 'todo',
        'bg-orange-600/50': status === 'doing',
        'bg-pink-600/50': status === 'done',
        'text-xs': size === 'xs',
        'text-sm': size === 'sm',
      })}
    >
      &#9679; {formatStatus()}
    </span>
  )
}
