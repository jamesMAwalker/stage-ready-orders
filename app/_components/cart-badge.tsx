import { ReactNode } from 'react'

import { Badge } from '@/shadcn/ui/badge'
import { twm } from '@/lib/twm'

export function BadgeItem({
  children,
  classes
}: {
  children: ReactNode,
  classes?: string
}) {
  return (
    <Badge
      variant='outline'
      className={twm(
        classes,
        '!p-sm !px-ms font-bold text-green-600 border-none'
      )}
    >
      {children}
    </Badge>
  )
}
