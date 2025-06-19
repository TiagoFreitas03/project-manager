import type { ReactNode } from 'react'

interface KeyValueTextProps {
  keyName: string
  children: ReactNode
}

export function KeyValueText({ keyName, children }: KeyValueTextProps) {
  return (
    <div className="flex flex-col gap-1 my-1">
      <span className="text-neutral-600 text-xs">{keyName}</span>

      <span>{children}</span>
    </div>
  )
}
