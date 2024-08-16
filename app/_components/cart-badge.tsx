import { Badge } from '@/shadcn/ui/badge'

export function BadgeItem({ text }: { text: string }) {
  return (
    <Badge variant='outline' className='!p-sm !px-ms !rounded-md font-bold text-green-600 border-green-600'>
      {text}
    </Badge>
  )
}
