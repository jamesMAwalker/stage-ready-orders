import { motion } from 'framer-motion'

import { animate } from '@/animation'

export const LinkButton = ({
  href,
  text
}: {
  href: string
  text: string
}) => {
  function handleClick(e: any) {
    e.preventDefault()
    window.location.href = href
  }

  return (
    <motion.button
      {...animate()}
      onClick={handleClick}
      className='text-sm text-center w-full bg-brand rounded-md py-sm text-white hover:text-brand'
    >
      {text}
    </motion.button>
  )
}