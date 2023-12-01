import { Lilita_One, Fira_Sans } from 'next/font/google'
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

const service_list = [
  {name: 'Main Bareng Live Stream', price_type: 'range', price: 'Rp 25.000 / game', description: 'bermain bersama influencer saat live stream'},
  {name: 'Komen Album', price_type: 'fixed', price: 'Rp 10.000 / komen', description: 'foto pada akun mlbb anda akan mendapat komentar langsung dari ex pro player! '},
  {name: 'Request Hero', price_type: 'range', price: 'Rp 20.000 / hero', description: 'Minta Vin untuk memainkan hero tertentu. anda juga bisa menambahkan aturan lain'},
  {name: 'Joki Rank', price_type: 'range', price: 'Rp 10.000 / bintang', description: 'Naikkan rank mu dengan cepat dan mudah'},
  {name: 'Mabar Member VIP', price_type: 'fixed', price: 'Rp 15.000 / game', description: 'bermain bersama influencer saat live stream'},
  {name: 'Subathon', price_type: 'fixed', price: 'Rp 10.000.000', description: 'Tantang streamer untuk live sampai mythic!'},
]

export default function ServiceList () {
  return (
    <div className="h-screen w-screen bg-black text-white overflow-auto p-10">
      <div className="">
        <div className='flex flex-wrap gap-x-3 items-end mb-10'>
          <h1 className={`${lilita_one.className} text-white text-3xl`}>Mau Minta Apa Dari Nuwi?</h1>
          <Link href='/'>
            <p className='text-blue-200'>(Back)</p>
          </Link>
        </div>
        <div className={`${firasans.className} grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 lg:gap-8 sm:gap-5 xs:gap-1`}>
          {service_list.map((serv:any, i) => {
            return (
              <Link href={'checkout'} key={i}>
                <div className='bg-gray-800 h-64 p-5 rounded-lg flex flex-col mb-3 hover:bg-gray-600 ease-in duration-300'>
                  <p className='text-xl mb-2'>{serv.name}</p>
                  <p className='text-sm text-gray-400'>{serv.description}</p>
                  <div className='price-section text-right flex flex-col flex-grow items-end justify-end'>
                    {serv.price_type === 'range' ? <p className='text-sm text-gray-400'>Mulai Dari</p> : null}
                    <p className='text-xl text-gray-200'>{serv.price}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
};