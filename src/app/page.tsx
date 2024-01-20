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
import { createServerClient, type CookieOptions } from '@supabase/ssr';
// import {supabase} from '@/lib/supabase';
import iconPic from 'public/image1.png'

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

const SUPABASE_URL:string = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://rcqkdtnftydrgzqfwlzk.supabase.co';
const SUPABASE_ANON_KEY:string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjcWtkdG5mdHlkcmd6cWZ3bHprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI5MDM0NTIsImV4cCI6MjAxODQ3OTQ1Mn0.C1VP8yEzuM9gOgVubK1VipcSlPLfuHSlAFiZqnDL4DQ'
// const supabase = createClient('https://rcqkdtnftydrgzqfwlzk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjcWtkdG5mdHlkcmd6cWZ3bHprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI5MDM0NTIsImV4cCI6MjAxODQ3OTQ1Mn0.C1VP8yEzuM9gOgVubK1VipcSlPLfuHSlAFiZqnDL4DQ');

const LoginRole = () => {
  return (
    <div className='flex gap-4 mb-10 justify-center items-center'>
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

const LoginSection = () => {
  return (
    <div className={`${fira_sans.className} text-white text-xl text-center`}>
      <p className='text-center font-bold text-xl mb-8'>Login to Your Account</p>
      {<LoginRole />}
    </div>  
  )
}

export default function Home() {
  return (
    <BaseTemplate>
      <div className='flex flex-col gap-5 py-14'>
        <div className='flex flex-col items-start justify-start'>
          <div className='flex justify-center items-center gap-2'>
          <Image
            height={40}
            width={40}
            src={iconPic}
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
