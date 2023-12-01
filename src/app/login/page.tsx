
import { Fira_Sans, Lilita_One } from 'next/font/google'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import Link from 'next/link'

const lilita_one = Lilita_One({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
})

const firasans = Fira_Sans({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
})

export default function CheckoutPage () {
  return (
    <div className="h-screen w-screen bg-black text-white overflow-auto p-10">
      <div className="flex flex-col  justify-center">
        <div className='flex flex-wrap justify-center items-end mb-10 gap-x-3'>
          <h1 className={`${lilita_one.className} text-white text-center text-3xl`}>Login</h1>
          <Link href='/'>(back)</Link>
        </div>
        <div className='flex justify-center'>
        <div className='bg-gray-900 w-full md:max-w-md md:w-2/3 px-10 py-8 rounded-lg flex flex-col mb-3'>
          <form>
            <div className='flex flex-col md:flex-row md:items-center mb-14'>
              <p className='md:md:w-44 md:mb-0 mb-1'>Email</p>
              <input 
                className='text-black w-full px-3 py-2 rounded-lg bg-gray-200' 
                type="text" 
                name="field-name"
                placeholder="someone@gmail.com" />
            </div>
            <div className='flex flex-col md:flex-row md:items-center mb-14'>
                <p className='md:w-44 md:mb-0 mb-1'>Password</p>
                <input 
                  className='text-black w-full px-3 py-2 rounded-lg bg-gray-200' 
                  type="text" 
                  name="field-name"
                  placeholder='3' />
              </div>
            <div className='text-center'>
              <button className='px-10 py-3 rounded-lg bg-green-800 font-bold'>Login</button>
            </div>
          </form>
        </div>
        </div>
      </div>
    </div>
  )
};