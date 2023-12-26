import Image from 'next/image'
import { Lilita_One, Fira_Sans } from 'next/font/google'
import { BaseTemplate } from '@/templates/BaseTemplate'
import Link from 'next/link'
import {
  Input, Button,
  Card,
  CardBody, CardHeader
} from "@nextui-org/react";
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers';

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

const LoginSection = () => {
  return (
    <div className={`${fira_sans.className} text-white text-xl`}>
      <p className='text-center font-bold text-2xl mb-8'>Login</p>
      <form action="/auth/login" method="post">
        <div className='flex gap-4'>
          <Input
            type="text"
            label="Email"
            className="max-w-xs"
            name="email"
          />
          <Input
            type="text"
            label="Password"
            className="max-w-xs"
            name="password"
          />
        </div>
        <div className='text-center mt-10'>
          <Button type="submit" color='primary' className=''>Submit</Button>
        </div>
      </form>
    </div>  
  )
}

export default function Home() {
  return (
    <BaseTemplate>
      <div className='flex flex-col gap-5 px-8 py-10'>
        <div className='flex flex-col items-start justify-start'>
          <div className='flex justify-center items-center gap-2'>
          <Image
            height={40}
            width={40}
            src={'/image1.png'}
            alt='icon' />
          <h1 className={`${lilita_one.className} text-white text-xl`}>SAMINTA.COM</h1>
          </div>
          <p className='text-gray-400 text-sm'>Donate. Request. Have Fun!</p>
        </div>
        <div className='mt-8'>
          <LoginSection />
        </div>
      </div>
    </BaseTemplate>
  )
}
