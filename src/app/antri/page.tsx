'use client';
import { Fira_Sans, Lilita_One } from 'next/font/google'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import {Button} from "@nextui-org/react";
import { useEffect, useState } from 'react';

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

const PLAYER_LIST = [
  {name: 'Anti Dark System', user_id: 4, id: '33190392', date: 3},
  {name: 'Andi', user_id: 1, id: '8341n934', date: 4},
  {name: 'Jono', user_id: 2, id: '93410129', date: 1},
  {name: 'Jono', user_id: 2, id: '93410129', date: 1},
  {name: 'Jono', user_id: 2, id: '93410129', date: 1},
  {name: 'Mulyadi', user_id: 3, id: '03141304', date: 2},
]

export default function CheckoutPage () {
  const [queueData, setQueueData] = useState<any[]>([]);

  useEffect(() => {
    const queue_collection:any = [];
    const total_queue = Math.ceil(PLAYER_LIST.length / 4);
    for (let i = 0; i < total_queue; i++) {
      queue_collection.push({
        label: i == 0 ? 'Siap Bermain' : `Antrian ${i}`,
        queue_user: []
      })
    }

    const res:any = PLAYER_LIST.reduce((hash:any, { ["name"]: value, ...rest }) => (
      { ...hash, [value]: (hash[value] || []).concat({ ...rest }) }), {}
    );
    const res_array:any = Object.keys(res).map((key:any) => {
      return {player_name: key, match:res[key]}
    })
    
    console.log('=====')
    console.log(res_array)

    var sort = function (prop:any, arr:any) {
      
    };

    const yy:any = PLAYER_LIST.map((p:any, i) => {
      p.user_id
      p.queue_number = Math.floor(i/4);
      return p;
    })
    console.log('----', yy)
    PLAYER_LIST.map((player, i) => {
      const idx = Math.floor(i/4);
      queue_collection[idx].queue_user.push(player);
    })
    const last_qu = queue_collection[total_queue-1].queue_user.length
    for (let i = last_qu; i < 4; i++) {
      queue_collection[total_queue-1].queue_user.push(null);
    }
    setQueueData(queue_collection);
  }, [])

  return (
    <div className={`${firasans.className} w-full flex align-center items-center justify-center`}>
    <div className="h-screen w-1/4 sm:w-4/6 bg-stone-800 text-white overflow-auto py-10 px-4">
      <div className="flex flex-col justify-center">
        <div className='flex flex-wrap items-end mb-10 gap-x-3'>
          <h1 className={`${firasans.className} text-white text-xl`}>Halo John. Ada 9 total antrian nih</h1>
          <p className={`${firasans.className} text-gray-400 text-sm`}>ayo segera main dan selesaikan antriannya!</p>
        </div>
        <div className=''>
        {queueData && queueData.map((queue, i) => {
          return (
          <div key={i}>
          <p className='text-center mb-2'>{queue.label}</p>
          <div className={`bg-zinc-700 w-full ${i==0?`shadow-xl shadow-yellow-800`:''} w-full p-3 rounded-lg flex flex-wrap gap-4 justify-center mb-12`}>
            {queue.queue_user && queue.queue_user.map((q:any, j:any) => {
              return (
                <div key={j} className={`text-center auo align-center gap-2 p-2 rounded-md w-min ${q? 'bg-zinc-500' : 'bg-transparent border-dashed border-2 border-gray-400'}`}>
                  {q?
                  <div className='flex gap-2 justify-center pe-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className='qwe grow truncate ...'>{q.name}</p>
                    <p>{q.id}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />
                    </svg>

                  </div>
                  :
                  <div className=''>
                    <p>Antrian Kosong</p>
                    <p></p>
                  </div> }
                </div>
              )
            })}
          </div>
          </div>
          )
        })}
        </div>
      </div>
    </div>
    </div>
  )
};