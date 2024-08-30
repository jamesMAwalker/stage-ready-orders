import { Avatar, AvatarFallback, AvatarImage } from '@/shadcn/ui/avatar'
import React from 'react'

export const UserAvatar = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <Avatar>
      <AvatarImage
        src={imageUrl}
        alt='shopify user avatar'
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}
