import type { ReactNode } from 'react'

interface KeyValueProps {
  keyName: string
  children: ReactNode
}

export function KeyValue({ keyName, children }: KeyValueProps) {
  return (
    <div className="flex flex-col gap-1 my-1">
      <span className="text-neutral-600 text-xs">{keyName}</span>

      <span>{children}</span>
    </div>
  )
}
