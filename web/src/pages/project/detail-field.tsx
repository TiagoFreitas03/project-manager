import type { ReactNode } from 'react'

interface DetailFieldProps {
  title: string
  children: ReactNode
}

export function DetailField({ title, children }: DetailFieldProps) {
  return (
    <div className="flex flex-col gap-1 my-1">
      <span className="text-neutral-600 text-xs">{title}</span>

      <span>{children}</span>
    </div>
  )
}
