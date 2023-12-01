import { Lilita_One } from 'next/font/google'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import Header from './section/header'

const lilita_one = Lilita_One({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
})
const section_list = [
  {key: 'game', title: 'AVAILABLE GAME'},
  {key: 'talent', title: 'TALENT LIST'},
  {key: 'service', title: 'POPULAR SERVICE'},
];
const game_list = [
  {name: 'Mobile Legends', icon: '/img/gi-mlbb.png'},
  {name: 'Dota 2', icon: '/img/gi-dota2.png'},
];
const talent_list = [
  {name: 'Nuwi GEMING', audience: '500 Juta', avatar: '/profiledummy.webp'}, 
  {name: 'Pacarnya Nuwi', audience: '893 Juta', avatar: '/img/profiledummy2.webp'}
];
const service_list = [
  {name: 'Main Bareng Live Stream', total_order: '12rb'}, 
  {name: 'Komen Album', total_order: '1rb'}
];

const GameListRender = () => {
  return (
    <div className=''>
      <h2 className={`text-md text-center font-bold mb-2`}>AVAILABLE GAME</h2>
      <div className={`rounded-lg px-10 py-1`}>
        {game_list.map((t:any, i) => {
          return (
            <Link href='/' key={i}>
            <div className='flex items-center p-5 rounded-md hover:bg-gray-800 ease-in duration-200'>
              <div className='relative h-8 w-8 rounded-lg'>
              <Image
                fill={true}
                alt='pp'
                src={t.icon}
                style={{objectFit: "cover"}}
                className='rounded-lg' />
              </div>
              <div className='mx-3'>
                <p className='text-md text-gray-400'>{t.name}</p>
              </div>
            </div>
            </Link>
          )
        })}
      </div>  
    </div>
  )
}
const TalentListRender = () => {
  // const router = useRouter();

  return (
    <div className=''>
      <h2 className={`text-xl text-center font-bold mb-3`}>TOP TALENT</h2>
      <div className={``}>
        {talent_list.map((t:any, i) => {
          return (
            <Link href='/service' key={i}>
            <div 
              className='flex items-center justify-center my-8 bg-gray-800 rounded-lg p-6 hover:bg-gray-600 ease-in-out duration-100' 
              key={i}
              // onClick={() => router.push('/service_list')} 
              >
              <div className='relative h-14 w-14 rounded-lg'>
              <Image
                fill={true}
                alt='pp'
                src={t.avatar}
                style={{objectFit: "cover"}}
                className='rounded-lg' />
              </div>
              <div className='ml-4'>
                <p className='text-md font-bold'>{t.name}</p>
                <p className='text-gray-400 text-xs'>{t.audience} Subscriber</p>
                <div className='game-badge-list mt-1 flex gap-x-1'>
                  <div className='bg-green-700 py-1 px-2 w-auto text-xs rounded-lg'>
                    <label>MLBB</label>
                  </div>
                  <div className='bg-violet-700 py-1 px-2 w-auto text-xs rounded-lg'>
                    <label>PUBG</label>
                  </div>
                </div>
              </div>
            </div>
            </Link>
          )
        })}
      </div>  
    </div>
  )
}
const ServiceListRender = () => {
  return (
    <div className=''>
      <h2 className={`text-md text-center font-bold mb-2`}>POPULAR REQUEST</h2>
      <div className={`rounded-lg px-10 py-1`}>
        {service_list.map((t:any, i) => {
          return (
            <Link href='/' key={i}>
              <div className='p-5 rounded-md hover:bg-gray-800 ease-in duration-200'>
                <p className='text-md'>{t.name}</p>
                <p className='text-gray-400 text-xs'>Total <span className='text-white font-bold'>{t.total_order}</span> Request</p>
              </div>
            </Link>
          )
        })}
      </div>  
    </div>
  )
}

export default function Home() {
  return (
    <div className="h-screen w-screen bg-black overflow-auto">
      <Header />
      <div className="flex flex-col items-center justify-center p-10 text-white">
          <div className='flex flex-col items-center justify-center'>
            <Image
              height={100}
              width={100}
              src={'/image1.png'}
              alt='icon' />
            <h1 className={`${lilita_one.className} text-white text-3xl`}>SAMINTA.COM</h1>
            <p className='text-gray-400 mt-2'>Donate. Request. Have Fun!</p>
          </div>
          <div className='mt-20 grid items-center grid-cols-1 lg:grid-cols-3 gap-8'>
            {section_list.map((s:any, x) => {
              return (
                <div key={x} className={`${s.key == 'talent' ? `order-first lg:order-none` : ''}`}>
                { s.key === 'game' && <GameListRender key={x}/> }
                { s.key === 'talent' && <TalentListRender key={x}/> }
                { s.key === 'service' && <ServiceListRender key={x}/> }
                </div>
              )
            })}
          </div>
      </div>
    </div>
  )
}
