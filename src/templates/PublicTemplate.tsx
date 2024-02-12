import React from "react";
import { BaseTemplate } from "@/templates/BaseTemplate";
import Image from "next/image";
import Link from "next/link";
import { Lilita_One } from 'next/font/google'
import iconPic from 'public/image1.png'

const lilita_one = Lilita_One({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
})

export default function PublicTemplate({children} : {children: React.ReactNode}) {
  return (
    <BaseTemplate>
      <div className='flex flex-col gap-5 pt-6 pb-14'>
        <div className='flex flex-col items-start justify-start'>
          <div className='flex justify-center items-center gap-2'>
          <Image
            height={40}
            width={40}
            src={iconPic}
            alt='icon' />
          <h1 className={`${lilita_one.className} text-white text-xl`}>
            <Link href='/'>SAMINTA.COM</Link>
          </h1>
          </div>
          <p className='text-gray-400 text-sm'>Donate. Request. Have Fun!</p>
        </div>
        <div className='mt-8'>
          {children}
        </div>
      </div>
    </BaseTemplate>
  )
}