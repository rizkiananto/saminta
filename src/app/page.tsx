'use client';

import Image from 'next/image'
import { Lilita_One, Fira_Sans } from 'next/font/google'
import { BaseTemplate } from '@/templates/BaseTemplate'
import Link from 'next/link'
import {
  Input, Button,
} from "@nextui-org/react";
import {supabase} from '@/lib/supabase';
import iconPic from 'public/image1.png'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const lilita_one = Lilita_One({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
})

const fira_sans = Fira_Sans({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
})

export default function Home() {
  const router = useRouter();
  return (
    <BaseTemplate>
      <div className='flex flex-col gap-5 items-center justify-center h-full py-14'>
        <div className='flex flex-col items-center justify-start'>
          <div className='flex justify-center items-center gap-2'>
          <Image
            height={40}
            width={40}
            src={iconPic}
            alt='icon' />
          <h1 className={`${lilita_one.className} text-white text-xl`}>SAMINTA.COM</h1>
          </div>
          <p className='text-gray-400 text-sm'>Donate. Request. Have Fun!</p>
          
          <Button className='mt-4' color="success" onClick={() => {
            router.push('/login')
            }}>
            <label className='font-semibold'>Login</label>
          </Button> 

          <Button className='mt-4' color="primary" variant='flat' onClick={() => {
            router.push('/store')
            }}>
            <label className='font-semibold'>Beli Jasa dari Host!</label>
          </Button> 
        </div>
      </div>
    </BaseTemplate>
  )
}
