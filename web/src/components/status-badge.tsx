import clsx from 'clsx'

interface StatusBadgeProps {
  status: string
}

export function StatusBadge({ status }: StatusBadgeProps) {
  function formatStatus() {
    if (status === 'todo') {
      return 'Não iniciado'
    }

    if (status === 'doing') {
      return 'Em progresso'
    }

    return 'Finalizado'
  }

  return (
    <span
      className={clsx('text-xs text-neutral-100 rounded-lg px-2 py-1', {
        'bg-zinc-700/50': status === 'todo',
        'bg-orange-600/50': status === 'doing',
        'bg-pink-600/50': status === 'done',
      })}
    >
      &#9679; {formatStatus()}
    </span>
  )
}
