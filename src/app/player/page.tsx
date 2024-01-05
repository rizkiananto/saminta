'use client'
import React, { useEffect, useState } from "react";
import { Fira_Sans } from 'next/font/google'
import {
  Card, Input, Divider, Chip
} from "@nextui-org/react";
import { createClient } from "@supabase/supabase-js";

const firasans = Fira_Sans({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);


const SearchForm = () => {
  const [searchParam, setSearchParam] = useState<string>('')
  return (
    <div className="grow">
      <div>
        <Input
          key={'warning'}
          type="text"
          label="Cari Nama Pemain"
          variant="bordered"
          value={searchParam}
          className="text-black"
          classNames={{inputWrapper: "bg-slate-50"}}
          endContent={
            <div className='h-full flex items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 50 50" fill='black'>
                <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
              </svg>
            </div>
          }
          onChange={(e) => {
            console.log('eee')
            setSearchParam(e.target.value)
          }}
        />
      </div>
    </div>
  )
}

const PlayerScreen = () => {
  const [players, setPlayers] = useState<any>([]);

  useEffect(() => {
    fetchGetPlayer();
  }, [])

  const fetchGetPlayer = async () => {
    try {
      const {data: players} = await supabase.from('player').select();
      setPlayers(players);
    } catch (error) {
      
    }
  }

  return (
    <div className="grow h-full">
      <SearchForm />
      <div className="mt-10 flex flex-wrap gap-4">
        {players ? players.map((player:any, i:number) => {
          return (
            <Card key={i} className="grow bg-gradient-to-r from-zinc-700 via-zinc-600 to-zinc-500 text-white px-4 py-2 shadow-xl shadow-gray-700">
              <div className="max-w-1">
                <p className="text-lg font-bold">{player.game_nickname}</p>
                <p className="text-sm font-semibold mb-1">{player.game_id}</p>
                <p className="text-xs text-gray-200"><strong>2 Antrian</strong> - Total 3x Mabar</p>
              </div>
              <div className="mt-4 flex gap-1">
                <Chip variant="shadow" color="warning" size="sm" radius="sm">Dark System</Chip>
                <Chip variant="shadow" color="danger" size="sm" radius="sm">Ghoib</Chip>
                <Chip variant="shadow" color="primary" size="sm" radius="sm">Pelanggan</Chip>
              </div>
            </Card>
          )
        }) : null}
      </div>
    </div>
  )
}

export default PlayerScreen;