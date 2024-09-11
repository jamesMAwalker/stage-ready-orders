import { motion } from 'framer-motion'

import { animate } from '@/animation'
import { cn } from '@/shadcn/utils'

export const LinkButton = ({
  href,
  text,
  classes
}: {
  href: string
  text: string
  classes?: string
}) => {
  function handleClick(e: any) {
    e.preventDefault()
    window.open(href, '_blank')
  }

  return (
    <motion.button
      {...animate()}
      onClick={handleClick}
      className={cn('text-sm text-center w-full bg-brand rounded-md py-sm text-white', classes)}
    >
      {text}
    </motion.button>
  )
}