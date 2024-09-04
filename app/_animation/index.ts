import { Variant, Variants } from "framer-motion"

// Phases
const phases = {
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
}

// Animations
const fsu: Variants = {
  visible: {
    opacity: 1,
    y: 0,
  },
  hidden: {
    opacity: 0,
    y: '40vh',
  },
}

const fi: Variants = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
}

// Animate Function
export const animate = ({
  variant = fi,
  delay = 0,
  duration = 0.25,
  type = 'tween',
} = {}) => ({
  variants: variant as Variants,
  transition: {
    delay,
    duration,
    type,
    transition: 'var(--smooth-framer)'
  },
  ...phases
})

