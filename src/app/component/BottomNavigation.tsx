'use client'
import { useRouter } from "next/navigation"
import { useState } from "react";
import { cloneDeep } from "lodash";

const MENU:any = [
  {
    icon: 
      <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 20 20" >
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
            <rect width="35" height="35" />
          </clipPath>
        </defs>
      </svg>,
    label: 'Player',
    href: '/player',
    active: false,
  },
  {
    icon: 
      <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 20 20" >
        <path d="M8.75 5.25C8.75 5.84674 8.51295 6.41903 8.09099 6.84099C7.66903 7.26295 7.09674 7.5 6.5 7.5C5.90326 7.5 5.33097 7.26295 4.90901 6.84099C4.48705 6.41903 4.25 5.84674 4.25 5.25C4.25 4.65326 4.48705 4.08097 4.90901 3.65901C5.33097 3.23705 5.90326 3 6.5 3C7.09674 3 7.66903 3.23705 8.09099 3.65901C8.51295 4.08097 8.75 4.65326 8.75 5.25ZM4 8C3.73478 8 3.48043 8.10536 3.29289 8.29289C3.10536 8.48043 3 8.73478 3 9V13.5C3 13.9596 3.09053 14.4148 3.26642 14.8394C3.44231 15.264 3.70012 15.6499 4.02513 15.9749C4.35013 16.2999 4.73597 16.5577 5.16061 16.7336C5.58525 16.9095 6.04037 17 6.5 17C6.95963 17 7.41475 16.9095 7.83939 16.7336C8.26403 16.5577 8.64987 16.2999 8.97487 15.9749C9.29988 15.6499 9.55769 15.264 9.73358 14.8394C9.90947 14.4148 10 13.9596 10 13.5V9C10 8.73478 9.89464 8.48043 9.70711 8.29289C9.51957 8.10536 9.26522 8 9 8H4ZM9.75 5.25C9.75 5.9 9.56 6.505 9.23 7.013C9.643 7.061 10.017 7.233 10.314 7.493C10.6752 7.52285 11.0382 7.46502 11.3722 7.32444C11.7062 7.18386 12.0013 6.96469 12.2324 6.68556C12.4635 6.40644 12.6238 6.07562 12.6996 5.72125C12.7754 5.36688 12.7644 4.99945 12.6677 4.65021C12.571 4.30096 12.3914 3.98025 12.1441 3.71534C11.8968 3.45043 11.5892 3.24917 11.2475 3.12867C10.9057 3.00818 10.5399 2.97201 10.1812 3.02326C9.82242 3.0745 9.48136 3.21164 9.187 3.423C9.542 3.943 9.75 4.573 9.75 5.25ZM9.5 16.855C9.97257 16.4333 10.3505 15.9163 10.6091 15.338C10.8676 14.7598 11.0008 14.1334 11 13.5V9C11 8.636 10.902 8.294 10.732 8H13C13.2652 8 13.5196 8.10536 13.7071 8.29289C13.8946 8.48043 14 8.73478 14 9V13.5C14.0001 14.0452 13.8729 14.5829 13.6285 15.0702C13.384 15.5575 13.0291 15.981 12.592 16.3069C12.1549 16.6327 11.6478 16.852 11.1109 16.9472C10.5741 17.0423 10.0225 17.0108 9.5 16.855ZM13.75 5.25C13.75 5.9 13.56 6.505 13.23 7.013C13.643 7.061 14.017 7.233 14.314 7.493C14.6752 7.52285 15.0382 7.46502 15.3722 7.32444C15.7062 7.18386 16.0013 6.96469 16.2324 6.68556C16.4635 6.40644 16.6238 6.07562 16.6996 5.72125C16.7754 5.36688 16.7644 4.99945 16.6677 4.65021C16.571 4.30096 16.3914 3.98025 16.1441 3.71534C15.8968 3.45043 15.5892 3.24917 15.2475 3.12867C14.9057 3.00818 14.5399 2.97201 14.1812 3.02326C13.8224 3.0745 13.4814 3.21164 13.187 3.423C13.542 3.943 13.75 4.573 13.75 5.25ZM13.5 16.855C13.9726 16.4333 14.3505 15.9163 14.6091 15.338C14.8676 14.7598 15.0008 14.1334 15 13.5V9C15 8.636 14.902 8.294 14.732 8H17C17.2652 8 17.5196 8.10536 17.7071 8.29289C17.8946 8.48043 18 8.73478 18 9V13.5C18.0001 14.0452 17.8729 14.5829 17.6285 15.0702C17.384 15.5575 17.0291 15.981 16.592 16.3069C16.1549 16.6327 15.6478 16.852 15.1109 16.9472C14.5741 17.0423 14.0225 17.0108 13.5 16.855Z" />
      </svg>,
    label: 'Antrean',
    href: '/antre',
    active: true,
  },
  {
    icon: 
      <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 20 20" >
        <path d="M15.8333 5H4.16663C2.78829 5 1.66663 6.12167 1.66663 7.5V11.6667C1.66663 13.505 3.16163 15 4.99996 15H6.36413C7.33579 15 8.26413 14.5358 8.84829 13.7575C9.39829 13.025 10.6016 13.0242 11.1516 13.7583C11.4417 14.1431 11.8169 14.4554 12.2479 14.6708C12.6789 14.8862 13.154 14.9989 13.6358 15H15C16.8383 15 18.3333 13.505 18.3333 11.6667V7.5C18.3333 6.12167 17.2116 5 15.8333 5ZM16.6666 11.6667C16.6666 12.5858 15.9191 13.3333 15 13.3333H13.6358C13.1858 13.3333 12.755 13.1175 12.4841 12.7583C11.8925 11.9683 10.9866 11.515 9.99996 11.515C9.01329 11.515 8.10746 11.9683 7.51579 12.7575C7.3811 12.9356 7.2071 13.0803 7.00734 13.1802C6.80758 13.2801 6.58746 13.3325 6.36413 13.3333H4.99996C4.08079 13.3333 3.33329 12.5858 3.33329 11.6667V7.5C3.33329 7.04083 3.70663 6.66667 4.16663 6.66667H15.8333C16.2933 6.66667 16.6666 7.04083 16.6666 7.5V11.6667Z" />
        <path d="M6.24996 10.8333C7.40055 10.8333 8.33329 10.2736 8.33329 9.58325C8.33329 8.8929 7.40055 8.33325 6.24996 8.33325C5.09937 8.33325 4.16663 8.8929 4.16663 9.58325C4.16663 10.2736 5.09937 10.8333 6.24996 10.8333Z" />
        <path d="M13.75 10.8333C14.9006 10.8333 15.8333 10.2736 15.8333 9.58325C15.8333 8.8929 14.9006 8.33325 13.75 8.33325C12.5994 8.33325 11.6666 8.8929 11.6666 9.58325C11.6666 10.2736 12.5994 10.8333 13.75 10.8333Z" />
      </svg>,
    label: 'Request',
    href: '/request',
    active: false,
  },
  {
    icon: 
      <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 19 20">
        <path d="M18.6843 12.5422L17.2222 11.2921C17.2914 10.8679 17.3271 10.4349 17.3271 10.0018C17.3271 9.56874 17.2914 9.13568 17.2222 8.71154L18.6843 7.46146C18.7946 7.36704 18.8736 7.2413 18.9106 7.10094C18.9477 6.96058 18.9412 6.81225 18.8919 6.67569L18.8719 6.61765C18.4693 5.49263 17.8666 4.44972 17.0927 3.53931L17.0525 3.49243C16.9587 3.38205 16.8335 3.3027 16.6937 3.26484C16.5538 3.22698 16.4057 3.2324 16.269 3.28036L14.4541 3.9255C13.7844 3.37635 13.0366 2.94328 12.2285 2.63969L11.8781 0.742239C11.8516 0.599466 11.7824 0.468118 11.6795 0.365645C11.5766 0.263173 11.445 0.194426 11.3021 0.168538L11.2419 0.157377C10.0788 -0.052459 8.85553 -0.052459 7.6925 0.157377L7.63223 0.168538C7.48936 0.194426 7.35774 0.263173 7.25487 0.365645C7.152 0.468118 7.08274 0.599466 7.0563 0.742239L6.7036 2.64862C5.90195 2.95228 5.15542 3.38511 4.49362 3.92996L2.66537 3.28036C2.52868 3.23201 2.38051 3.22641 2.24055 3.26429C2.1006 3.30217 1.97548 3.38174 1.88183 3.49243L1.84165 3.53931C1.06871 4.45036 0.466055 5.4931 0.0625089 6.61765L0.0424181 6.67569C-0.0580353 6.95472 0.0245598 7.26725 0.250022 7.46146L1.73004 8.72494C1.66083 9.14461 1.62735 9.57321 1.62735 9.99958C1.62735 10.4282 1.66083 10.8568 1.73004 11.2742L0.250022 12.5377C0.139737 12.6321 0.0608044 12.7579 0.0237204 12.8982C-0.0133636 13.0386 -0.006842 13.1869 0.0424181 13.3235L0.0625089 13.3815C0.466555 14.5066 1.06481 15.5446 1.84165 16.4598L1.88183 16.5067C1.97571 16.6171 2.10083 16.6965 2.2407 16.7343C2.38057 16.7722 2.52863 16.7668 2.66537 16.7188L4.49362 16.0692C5.15885 16.6161 5.9022 17.0492 6.7036 17.3505L7.0563 19.2569C7.08274 19.3997 7.152 19.531 7.25487 19.6335C7.35774 19.736 7.48936 19.8047 7.63223 19.8306L7.6925 19.8418C8.86622 20.0527 10.0681 20.0527 11.2419 19.8418L11.3021 19.8306C11.445 19.8047 11.5766 19.736 11.6795 19.6335C11.7824 19.531 11.8516 19.3997 11.8781 19.2569L12.2285 17.3595C13.0363 17.0567 13.7883 16.6222 14.4541 16.0737L16.269 16.7188C16.4057 16.7671 16.5539 16.7727 16.6938 16.7349C16.8338 16.697 16.9589 16.6174 17.0525 16.5067L17.0927 16.4598C17.8695 15.5424 18.4678 14.5066 18.8719 13.3815L18.8919 13.3235C18.9924 13.0489 18.9098 12.7364 18.6843 12.5422ZM15.6373 8.97495C15.6931 9.31203 15.7221 9.65804 15.7221 10.004C15.7221 10.35 15.6931 10.6961 15.6373 11.0331L15.4899 11.9283L17.1574 13.3547C16.9047 13.9371 16.5856 14.4884 16.2065 14.9977L14.1349 14.2633L13.434 14.8392C12.9005 15.2767 12.3067 15.6205 11.6638 15.8616L10.8133 16.1808L10.4137 18.3461C9.78321 18.4176 9.14669 18.4176 8.51622 18.3461L8.11664 16.1763L7.27283 15.8527C6.63663 15.6116 6.04507 15.2678 5.51601 14.8325L4.81507 14.2543L2.7301 14.9955C2.35061 14.4843 2.03363 13.9329 1.77915 13.3525L3.46453 11.9127L3.31943 11.0197C3.26586 10.6871 3.23684 10.3434 3.23684 10.004C3.23684 9.6625 3.26362 9.32096 3.31943 8.98835L3.46453 8.09543L1.77915 6.6556C2.0314 6.07297 2.35061 5.52382 2.7301 5.01262L4.81507 5.75375L5.51601 5.17558C6.04507 4.74028 6.63663 4.39651 7.27283 4.15542L8.11887 3.8362L8.51845 1.66641C9.14573 1.59498 9.7864 1.59498 10.4159 1.66641L10.8155 3.83174L11.666 4.15096C12.3067 4.39205 12.9027 4.73582 13.4362 5.17335L14.1371 5.74928L16.2087 5.01486C16.5882 5.52605 16.9052 6.07743 17.1597 6.65783L15.4922 8.08427L15.6373 8.97495ZM9.46941 5.85197C7.29962 5.85197 5.54057 7.61102 5.54057 9.78081C5.54057 11.9506 7.29962 13.7097 9.46941 13.7097C11.6392 13.7097 13.3983 11.9506 13.3983 9.78081C13.3983 7.61102 11.6392 5.85197 9.46941 5.85197ZM11.2374 11.5488C11.0055 11.7813 10.7299 11.9658 10.4265 12.0914C10.1231 12.2171 9.79782 12.2815 9.46941 12.281C8.80196 12.281 8.17468 12.0198 7.70143 11.5488C7.46888 11.3169 7.28447 11.0413 7.15881 10.7379C7.03315 10.4345 6.96873 10.1092 6.96924 9.78081C6.96924 9.11336 7.23042 8.48608 7.70143 8.01283C8.17468 7.53959 8.80196 7.28064 9.46941 7.28064C10.1369 7.28064 10.7641 7.53959 11.2374 8.01283C11.4699 8.24472 11.6544 8.5203 11.78 8.82372C11.9057 9.12714 11.9701 9.4524 11.9696 9.78081C11.9696 10.4483 11.7084 11.0755 11.2374 11.5488Z"/>
      </svg>,
    label: 'Pengaturan',
    href: 'settings',
    active: false,
  }
]

const BottomNavigation = () => {
  const [menu, setMenu] = useState<any>(MENU)
  const router  = useRouter();
  
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
        {menu.map((ic:any, i:any) => {
          return (
            <div key={i} className={`${ic.active ? 'fill-yellow-200' : 'fill-white'} grow flex flex-col items-center justify-center`} onClick={(e) => handleClick(e, ic.href)}>
              <div className='hover:cursor-pointer flex flex-col items-center justify-center'>
              {ic.icon}
              <p className={`${ic.active ? 'text-yellow-200' : ''}`}>{ic.label}</p>
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default BottomNavigation;