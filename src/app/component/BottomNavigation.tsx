'use client'
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react";
import { cloneDeep } from "lodash";

const ICBottomMenuPlayer = () => {
  return (
    <svg key={0} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 20 20" >
      <g clipPath="url(#clip0_112_759)">
        <path d="M8.33337 4.44434H13.3334V5.55545H8.33337V4.44434Z" />
        <path d="M8.33337 6.66675H13.3334V7.77786H8.33337V6.66675Z" />
        <path d="M8.33337 8.88892H13.3334V10H8.33337V8.88892Z" />
        <path d="M8.33337 11.1111H13.3334V12.2222H8.33337V11.1111Z" />
        <path d="M8.33337 13.3333H13.3334V14.4444H8.33337V13.3333Z" />
        <path d="M6.11108 4.44434H7.2222V5.55545H6.11108V4.44434Z" />
        <path d="M6.11108 6.66675H7.2222V7.77786H6.11108V6.66675Z" />
        <path d="M6.11108 8.88892H7.2222V10H6.11108V8.88892Z" />
        <path d="M6.11108 11.1111H7.2222V12.2222H6.11108V11.1111Z" />
        <path d="M6.11108 13.3333H7.2222V14.4444H6.11108V13.3333Z" />
        <path d="M15.5556 1.11108H4.44449C4.1498 1.11108 3.86718 1.22815 3.65881 1.43652C3.45044 1.64489 3.33337 1.92751 3.33337 2.2222V17.7778C3.33337 18.0724 3.45044 18.3551 3.65881 18.5634C3.86718 18.7718 4.1498 18.8889 4.44449 18.8889H15.5556C15.8503 18.8889 16.1329 18.7718 16.3413 18.5634C16.5496 18.3551 16.6667 18.0724 16.6667 17.7778V2.2222C16.6667 1.92751 16.5496 1.64489 16.3413 1.43652C16.1329 1.22815 15.8503 1.11108 15.5556 1.11108ZM15.5556 17.7778H4.44449V2.2222H15.5556V17.7778Z" />
      </g>
      <defs>
        <clipPath id="clip0_112_759">
          <rect width="25" height="25" />
        </clipPath>
      </defs>
    </svg>
  )
}
const ICBottomMenuAntre = () => (
  <svg key={1} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 20 20" >
    <path d="M8.75 5.25C8.75 5.84674 8.51295 6.41903 8.09099 6.84099C7.66903 7.26295 7.09674 7.5 6.5 7.5C5.90326 7.5 5.33097 7.26295 4.90901 6.84099C4.48705 6.41903 4.25 5.84674 4.25 5.25C4.25 4.65326 4.48705 4.08097 4.90901 3.65901C5.33097 3.23705 5.90326 3 6.5 3C7.09674 3 7.66903 3.23705 8.09099 3.65901C8.51295 4.08097 8.75 4.65326 8.75 5.25ZM4 8C3.73478 8 3.48043 8.10536 3.29289 8.29289C3.10536 8.48043 3 8.73478 3 9V13.5C3 13.9596 3.09053 14.4148 3.26642 14.8394C3.44231 15.264 3.70012 15.6499 4.02513 15.9749C4.35013 16.2999 4.73597 16.5577 5.16061 16.7336C5.58525 16.9095 6.04037 17 6.5 17C6.95963 17 7.41475 16.9095 7.83939 16.7336C8.26403 16.5577 8.64987 16.2999 8.97487 15.9749C9.29988 15.6499 9.55769 15.264 9.73358 14.8394C9.90947 14.4148 10 13.9596 10 13.5V9C10 8.73478 9.89464 8.48043 9.70711 8.29289C9.51957 8.10536 9.26522 8 9 8H4ZM9.75 5.25C9.75 5.9 9.56 6.505 9.23 7.013C9.643 7.061 10.017 7.233 10.314 7.493C10.6752 7.52285 11.0382 7.46502 11.3722 7.32444C11.7062 7.18386 12.0013 6.96469 12.2324 6.68556C12.4635 6.40644 12.6238 6.07562 12.6996 5.72125C12.7754 5.36688 12.7644 4.99945 12.6677 4.65021C12.571 4.30096 12.3914 3.98025 12.1441 3.71534C11.8968 3.45043 11.5892 3.24917 11.2475 3.12867C10.9057 3.00818 10.5399 2.97201 10.1812 3.02326C9.82242 3.0745 9.48136 3.21164 9.187 3.423C9.542 3.943 9.75 4.573 9.75 5.25ZM9.5 16.855C9.97257 16.4333 10.3505 15.9163 10.6091 15.338C10.8676 14.7598 11.0008 14.1334 11 13.5V9C11 8.636 10.902 8.294 10.732 8H13C13.2652 8 13.5196 8.10536 13.7071 8.29289C13.8946 8.48043 14 8.73478 14 9V13.5C14.0001 14.0452 13.8729 14.5829 13.6285 15.0702C13.384 15.5575 13.0291 15.981 12.592 16.3069C12.1549 16.6327 11.6478 16.852 11.1109 16.9472C10.5741 17.0423 10.0225 17.0108 9.5 16.855ZM13.75 5.25C13.75 5.9 13.56 6.505 13.23 7.013C13.643 7.061 14.017 7.233 14.314 7.493C14.6752 7.52285 15.0382 7.46502 15.3722 7.32444C15.7062 7.18386 16.0013 6.96469 16.2324 6.68556C16.4635 6.40644 16.6238 6.07562 16.6996 5.72125C16.7754 5.36688 16.7644 4.99945 16.6677 4.65021C16.571 4.30096 16.3914 3.98025 16.1441 3.71534C15.8968 3.45043 15.5892 3.24917 15.2475 3.12867C14.9057 3.00818 14.5399 2.97201 14.1812 3.02326C13.8224 3.0745 13.4814 3.21164 13.187 3.423C13.542 3.943 13.75 4.573 13.75 5.25ZM13.5 16.855C13.9726 16.4333 14.3505 15.9163 14.6091 15.338C14.8676 14.7598 15.0008 14.1334 15 13.5V9C15 8.636 14.902 8.294 14.732 8H17C17.2652 8 17.5196 8.10536 17.7071 8.29289C17.8946 8.48043 18 8.73478 18 9V13.5C18.0001 14.0452 17.8729 14.5829 17.6285 15.0702C17.384 15.5575 17.0291 15.981 16.592 16.3069C16.1549 16.6327 15.6478 16.852 15.1109 16.9472C14.5741 17.0423 14.0225 17.0108 13.5 16.855Z" />
  </svg>
)
const ICBottomMenuSettings = () => (
  <svg key={3} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 100 100" id="settings"><g><path d="M88.9 58.8c-2.4-2.3-3.7-5.5-3.7-8.8 0-3.3 1.3-6.4 3.7-8.8.4-.4.8-.7 1.3-1.1.7-.5.9-1.4.7-2.2-.8-2.9-2-5.7-3.4-8.3-.4-.7-1.2-1.1-2-1-.7.1-1.2.1-1.7.1-6.9 0-12.5-5.6-12.5-12.4 0-.5 0-1.1.1-1.7.1-.8-.3-1.6-1-2-2.6-1.4-5.4-2.6-8.3-3.4-.8-.2-1.7.1-2.2.7-.4.5-.8 1-1.1 1.3-2.4 2.3-5.5 3.6-8.8 3.6s-6.5-1.3-8.8-3.6c-.4-.4-.7-.8-1.1-1.3-.5-.7-1.4-.9-2.2-.7-2.9.9-5.7 2-8.3 3.4-.7.4-1.1 1.2-1 2 .1.7.1 1.2.1 1.7 0 6.9-5.6 12.4-12.5 12.4-.5 0-1.1 0-1.7-.1-.8-.1-1.6.3-2 1-1.4 2.6-2.6 5.4-3.4 8.3-.2.8 0 1.7.7 2.2.6.4 1 .8 1.3 1.1 4.9 4.8 4.9 12.7 0 17.6-.4.4-.8.7-1.3 1.1-.7.5-.9 1.4-.7 2.2.9 2.9 2 5.7 3.4 8.3.4.7 1.2 1.1 2 1 .7-.1 1.2-.1 1.7-.1 6.9 0 12.5 5.6 12.5 12.4 0 .5 0 1.1-.1 1.7-.1.8.3 1.6 1 2 2.6 1.4 5.4 2.6 8.3 3.4.8.2 1.7 0 2.2-.7.4-.5.8-1 1.1-1.3 2.4-2.3 5.5-3.6 8.8-3.6s6.5 1.3 8.8 3.6c.4.4.7.8 1.1 1.3.4.5 1 .8 1.6.8.2 0 .4 0 .6-.1 2.9-.9 5.7-2 8.3-3.4.7-.4 1.1-1.2 1-2-.1-.7-.1-1.2-.1-1.7 0-6.9 5.6-12.4 12.5-12.4.5 0 1.1 0 1.7.1.8.1 1.6-.3 2-1 1.4-2.6 2.6-5.4 3.4-8.3.2-.8 0-1.7-.7-2.2-.5-.4-1-.7-1.3-1.1zm-4.3 8.5h-.9c-9.1 0-16.5 7.4-16.5 16.4v.9c-1.6.8-3.3 1.5-5.1 2.1l-.6-.6c-3.1-3.1-7.2-4.8-11.6-4.8s-8.5 1.7-11.6 4.8l-.6.6c-1.7-.6-3.4-1.3-5.1-2.1v-.9c0-9.1-7.4-16.4-16.5-16.4h-.9c-.8-1.6-1.5-3.3-2.1-5.1l.6-.6c6.4-6.4 6.4-16.8 0-23.3l-.6-.6c.6-1.7 1.3-3.4 2.1-5.1h.9c9.1 0 16.5-7.4 16.5-16.4v-.9c1.6-.8 3.3-1.5 5.1-2.1l.6.6c3.1 3.1 7.2 4.8 11.6 4.8s8.5-1.7 11.6-4.8l.6-.6c1.7.6 3.4 1.3 5.1 2.1v.9c0 9.1 7.4 16.4 16.5 16.4h.9c.8 1.6 1.5 3.3 2.1 5.1l-.6.6c-3.1 3.1-4.8 7.2-4.8 11.6s1.7 8.5 4.8 11.6l.6.6c-.6 1.9-1.3 3.6-2.1 5.2zM50 26.2c-13.1 0-23.8 10.7-23.8 23.8S36.9 73.8 50 73.8 73.8 63.1 73.8 50 63.1 26.2 50 26.2zm0 43.6c-10.9 0-19.8-8.9-19.8-19.8S39.1 30.2 50 30.2 69.8 39.1 69.8 50 60.9 69.8 50 69.8z"></path></g><g><path fill="#00F" d="M1644-790V894H-140V-790h1784m8-8H-148V902h1800V-798z"></path></g></svg>
)
const ICBottomMenuHelp = () => (
  <svg key={4} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" id="help"><path d="M11.29,15.29a1.58,1.58,0,0,0-.12.15.76.76,0,0,0-.09.18.64.64,0,0,0-.06.18,1.36,1.36,0,0,0,0,.2.84.84,0,0,0,.08.38.9.9,0,0,0,.54.54.94.94,0,0,0,.76,0,.9.9,0,0,0,.54-.54A1,1,0,0,0,13,16a1,1,0,0,0-.29-.71A1,1,0,0,0,11.29,15.29ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20ZM12,7A3,3,0,0,0,9.4,8.5a1,1,0,1,0,1.73,1A1,1,0,0,1,12,9a1,1,0,0,1,0,2,1,1,0,0,0-1,1v1a1,1,0,0,0,2,0v-.18A3,3,0,0,0,12,7Z"></path></svg>
)
const ICBottomMenuRequest = () => (
  <svg key={2} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 20 20" >
    <path d="M15.8333 5H4.16663C2.78829 5 1.66663 6.12167 1.66663 7.5V11.6667C1.66663 13.505 3.16163 15 4.99996 15H6.36413C7.33579 15 8.26413 14.5358 8.84829 13.7575C9.39829 13.025 10.6016 13.0242 11.1516 13.7583C11.4417 14.1431 11.8169 14.4554 12.2479 14.6708C12.6789 14.8862 13.154 14.9989 13.6358 15H15C16.8383 15 18.3333 13.505 18.3333 11.6667V7.5C18.3333 6.12167 17.2116 5 15.8333 5ZM16.6666 11.6667C16.6666 12.5858 15.9191 13.3333 15 13.3333H13.6358C13.1858 13.3333 12.755 13.1175 12.4841 12.7583C11.8925 11.9683 10.9866 11.515 9.99996 11.515C9.01329 11.515 8.10746 11.9683 7.51579 12.7575C7.3811 12.9356 7.2071 13.0803 7.00734 13.1802C6.80758 13.2801 6.58746 13.3325 6.36413 13.3333H4.99996C4.08079 13.3333 3.33329 12.5858 3.33329 11.6667V7.5C3.33329 7.04083 3.70663 6.66667 4.16663 6.66667H15.8333C16.2933 6.66667 16.6666 7.04083 16.6666 7.5V11.6667Z" />
    <path d="M6.24996 10.8333C7.40055 10.8333 8.33329 10.2736 8.33329 9.58325C8.33329 8.8929 7.40055 8.33325 6.24996 8.33325C5.09937 8.33325 4.16663 8.8929 4.16663 9.58325C4.16663 10.2736 5.09937 10.8333 6.24996 10.8333Z" />
    <path d="M13.75 10.8333C14.9006 10.8333 15.8333 10.2736 15.8333 9.58325C15.8333 8.8929 14.9006 8.33325 13.75 8.33325C12.5994 8.33325 11.6666 8.8929 11.6666 9.58325C11.6666 10.2736 12.5994 10.8333 13.75 10.8333Z" />
  </svg>
)

const MENU:any = [
  {
    id:0,
    icon: <ICBottomMenuPlayer />,
    label: 'Player',
    href: '/player',
    active: false,
    show: true,
  },
  {
    id:1,
    icon: <ICBottomMenuAntre />,
    label: 'Antrean',
    href: '/antre',
    active: true,
    show: true,
  },
  {
    id:2,
    icon: <ICBottomMenuRequest />,
    label: 'Request',
    href: '/request',
    active: false,
    show: false,
  },
  {
    id:3,
    icon: <ICBottomMenuSettings />,
    label: 'Pengaturan',
    href: '/settings',
    active: false,
    show: true,
  },
  {
    id:4,
    icon: <ICBottomMenuHelp/>,
    label: 'Bantuan',
    href: '/help',
    active: false,
    show: true,
  }
]

export const BottomNavigation = () => {
  const [menu, setMenu] = useState<any>([])
  const router  = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const initMenu = cloneDeep(MENU);
    initMenu.map((menu:any) => {
      if (menu.href === pathName) menu.active = true
      else menu.active = false
      return menu
    })
    const initMenuFiltered = initMenu.filter((menu:any) => menu.show === true)
    setMenu(initMenuFiltered)
  }, [])
  
  const handleClick = (e:any, href:string) => {
    e.preventDefault();
    const newMenu = cloneDeep(menu);
    newMenu.map((menu:any) => menu.active = false)
    const currentMenuIdx = newMenu.findIndex((menu:any) => menu.href === href);
    newMenu[currentMenuIdx].active = true;
    setMenu(newMenu);
    router.push(href)
  }

  return (
    <div className='w-full h-24 qwe py-2 px-4 flex flex-column grow items-center justify-center'>
        { menu ? menu.map((ic:any, i:number) => {
          return (
            <div key={i} className={`${ic.active ? 'fill-yellow-200' : 'fill-white'} grow flex flex-col items-center justify-center`} onClick={(e) => handleClick(e, ic.href)}>
              <div className='hover:cursor-pointer flex flex-col items-center justify-center'>
                {ic.icon}
                <p className={`font-semibold text-xs md:text-md ${ic.active ? 'text-yellow-200' : ''}`}>{ic.label}</p>
              </div>
            </div>
          )
        }) : null}
    </div>
  )
}

export default BottomNavigation;