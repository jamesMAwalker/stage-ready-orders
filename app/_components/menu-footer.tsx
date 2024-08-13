import { CartMenu } from './cart-menu'

export const MenuFooter = () => {
  return (
    <div className='MENU_FOOTER fixed border-t border-neutral-400 bottom-0 bg-neutral-50 w-full p-md'>
      <CartMenu />
    </div>
  )
}
