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

const LoginRole = () => {
  const router = useRouter();
  const [data, setData] = useState<{
    email: string,
    password: string,
  }>({
    email: '',
    password: ''
  })

  async function signInWithEmail() {
    try {
      let { data : dataUser, error } = await supabase
        .auth
        .signInWithPassword({
          email: data.email,
          password: data.password
      })
      if (data) {
        router.push('/antre')
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  const handleChange = (e:any) => {
    const {name, value} = e.target;
    console.log(data)
    setData((prev:any) => ({
      ...prev,
      [name]: value
    }))
  }
  
  return (
    <div className='flex gap-4 mb-10 justify-center items-center'>
      <form>
        <div className='flex gap-4'>
          <Input
            type="text"
            label="Email"
            className="max-w-xs"
            name="email"
            onChange={handleChange}
          />
          <Input
            type="password"
            label="Password"
            className="max-w-xs"
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className='text-center mt-10'>
          <Button color='primary' className='' onClick={signInWithEmail}>Submit</Button>
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
          <LoginSection />
        </div>
      </div>
    </BaseTemplate>
  )
}
