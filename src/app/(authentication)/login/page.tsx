'use client'
import { Input, Button } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { useState } from "react";

interface loginData {
  email: string,
  password: string,
}

export default function Page() {
  const router = useRouter();
  const [data, setData] = useState<loginData>({email: '', password: ''})

  async function signInWithEmail() {
    try {
      let { data : dataUser } = await supabase
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
    setData((prev:any) => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className={`text-white text-xl text-center`}>
      <p className='text-center font-bold text-xl mb-8'>Login to Your Account</p>
      <div className='flex gap-4 mb-10 justify-center items-center'>
        <form>
          <div className='flex gap-4'>
            <Input
              type="text"
              label="Email"
              className="max-w-xs"
              name="email"
              onChange={handleChange}
              autoComplete="on"
            />
            <Input
              type="password"
              label="Password"
              className="max-w-xs"
              name="password"
              onChange={handleChange}
              autoComplete="on"
            />
          </div>
          <div className='text-center mt-10'>
            <Button color='primary' className='' onClick={signInWithEmail}>Submit</Button>
          </div>
        </form>
      </div>
    </div>  
  )
}