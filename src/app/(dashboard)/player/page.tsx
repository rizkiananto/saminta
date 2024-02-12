'use client'
import React, { useEffect, useState } from "react";
import {
  Tooltip, Button, Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell
} from "@nextui-org/react";
import { supabase } from "@/lib/supabase";
import { EyeIcon, EditIcon, DeleteIcon } from "../../../components/icon";

const SearchForm = () => {
  const [searchParam, setSearchParam] = useState<string>('')
  return (
    <div className="grow mb-5">
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
    <>
    <div className="grow h-full">
      <SearchForm />
      <div className='text-right mb-3'>
        <Button 
          color='primary' 
          startContent={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24" id="plus"><g fill="none" fillRule="evenodd" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" transform="translate(2 2)"><line x1="10" x2="10" y1="6.327" y2="13.654"></line><line x1="13.667" x2="6.333" y1="9.99" y2="9.99"></line><path d="M14.6857143,0 L5.31428571,0 C2.04761905,0 0,2.31208373 0,5.58515699 L0,14.414843 C0,17.6879163 2.03809524,20 5.31428571,20 L14.6857143,20 C17.9619048,20 20,17.6879163 20,14.414843 L20,5.58515699 C20,2.31208373 17.9619048,0 14.6857143,0 Z"></path></g></svg>}
          onClick={() => {

            }}>
          Player
        </Button>
      </div>
      <div className="flex flex-col gap-3">
        <Table 
          color={'warning'} 
          aria-label="Example static collection table"
          classNames={{wrapper: 'bg-zinc-700',table: 'bg-zinc-700', th: 'bg-zinc-900'}} >
          <TableHeader>
            <TableColumn>Nama</TableColumn>
            <TableColumn>Game</TableColumn>
            <TableColumn>Aksi</TableColumn>
          </TableHeader>
          <TableBody>
            {players ? players.map((player:any, i:number) => {
              return (
                <TableRow key={i}>
                  <TableCell><label className="line-clamp-1">{player.game_nickname}</label></TableCell>
                  <TableCell>{player.id}x</TableCell>
                  <TableCell>
                    <div className="relative flex items-center gap-2">
                      <Tooltip content="Edit user">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                          <EyeIcon />
                        </span>
                      </Tooltip>
                      <Tooltip content="Edit user">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                          <EditIcon />
                        </span>
                      </Tooltip>
                      <Tooltip color="danger" content="Delete user">
                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                          <DeleteIcon />
                        </span>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              )
            }) : null }
          </TableBody>
        </Table>
      </div>
    </div>
    </>
  )
}

export default PlayerScreen;