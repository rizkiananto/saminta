'use client';
import { Fira_Sans } from 'next/font/google'
import { useEffect, useState } from 'react';
import {cloneDeep} from 'lodash';
import {
  Button,
  RadioGroup, Radio, Link
} from "@nextui-org/react";
import { ModalQueuePlayerAdd, ModalQueuePlayerCustom, ModalQueueSettings, ModalQueueAdjust, ModalQueueDone } from './modal';
import { createClient } from '@supabase/supabase-js';
import toast, { Toaster } from 'react-hot-toast';
import { supabase } from '@/lib/supabase';
import { DashboardTemplate } from '@/templates/DashboardTemplate';

const firasans = Fira_Sans({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
})

interface PlayerFix {
  id: string;
  game_nickname: string;
  game_id: string;
  match_requested: string;
  created_at: string;
  email: (string | null);
  is_away: boolean;
  is_online: boolean;
}

interface Queue {
  label: string;
  player: (PlayerFix | null)[];
}

interface pId { //player ID - grouping
  group: string;
  player: (PlayerFix)[];
}

export default function AntreanPage () {
  const [isLoadData, setIsLoadData] = useState<boolean>(true);
  const [playerList, setPlayerList] = useState<PlayerFix[]>([]);
  const [playerDataList, setPlayerDataList] = useState<{
    id: string,
    game_id: string,
    game_nickname: string,
    email: string,
    create_date: string,
    edit_date: string,
  }[]>([])
  const [queueListRaw, setQueueListRaw] = useState<PlayerFix[]>([]);
  const [queueData, setQueueData] = useState<any[]>([]);
  const [queueMode, setQueueMode] = useState<string>('game-queue');
  const [maxConsequencePlay, setMaxConsequencePlay] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState<boolean>(false);
  const [isModalSettingsOpen, setIsModalSettingsOpen] = useState<boolean>(false);
  const [isModalQueueAdjustOpen, setIsModalQueueAdjustOpen] = useState<boolean>(false);
  const [isModalQueueDone, setIsModalQueueDone] = useState<boolean>(false)

  const queueCustomPlayerBased = () => {
    const QUEUE_LIST: Queue[] = [];
    const PLAYER_GROUP: pId[] = [];
    const maxPlayerQueue = 4;

    playerList.forEach(player => {
      const testQue = PLAYER_GROUP.find(pg => {
        const count = pg.player.filter((existingPlayer:PlayerFix) => existingPlayer.game_id === player.game_id)
        if (count.length < maxConsequencePlay) return true;
        return false
      })
      if (testQue) {
        testQue.player.push(player)
      } else {
        PLAYER_GROUP.push({
          group: `group ${PLAYER_GROUP.length+1}`,
          player: [player]
        })
      }
    })

    PLAYER_GROUP.forEach(group => {

      group.player.forEach(player => {
        const currentQueue = QUEUE_LIST.find(queue => (
          queue.player.length < maxPlayerQueue &&
          !queue.player.some((existingPlayer) => existingPlayer && existingPlayer.game_id === player.game_id)
        ))
        if (currentQueue) {
          currentQueue.player.push(player)
        } else {
          QUEUE_LIST.push({
            label: `${QUEUE_LIST.length === 0 ? 'Siap Bermain' : `Antrian ${QUEUE_LIST.length + 1}`}`,
            player: [player],
          })
        }
      });

    })

    const fillQueue: Array<Queue[]> = fillQueueSlot(QUEUE_LIST);

    setIsLoadData(false);
    setQueueData(fillQueue);
  }

  const queuePlayerBased = () => {
    const QUEUE_LIST: Queue[] = [];
    const PLAYER_GROUP: pId[] = [];
    const maxPlayerQueue = 4;

    playerList.forEach(player => {
      const currentQueue = PLAYER_GROUP.find(pg => (
        !pg.player.some((existingPlayer:PlayerFix) => existingPlayer.game_id === player.game_id)
      ))

      if (currentQueue) {
        currentQueue.player.push(player)
      } else {
        PLAYER_GROUP.push({
          group: `group ${PLAYER_GROUP.length+1}`,
          player: [player]
        })
      }
    })

    PLAYER_GROUP.forEach(group => {
      group.player.forEach(player => {
        const currentQueue = QUEUE_LIST.find(queue => (
          queue.player.length < maxPlayerQueue &&
          !queue.player.some((existingPlayer) => existingPlayer && existingPlayer.game_id === player.game_id)
        ))

        if (currentQueue) {
          currentQueue.player.push(player)
        } else {
          QUEUE_LIST.push({
            label: `${QUEUE_LIST.length === 0 ? 'Siap Bermain' : `Antrian ${QUEUE_LIST.length + 1}`}`,
            player: [player],
          })
        }
      });

    })

    const fillQueue: Array<Queue[]> = fillQueueSlot(QUEUE_LIST);
    
    setIsLoadData(false);
    setQueueData(fillQueue);
  }

  const queueGameBased = () => {
    const QUEUE_LIST:any = [];

    const maxPlayersPerQueue = 4;
    let currentQueue = null;

    playerList.forEach(player => {
      const existingQueue = QUEUE_LIST.find((queue:any) => (
        queue.player.length < maxPlayersPerQueue &&
        !queue.player.some((existingPlayer:any) => existingPlayer.game_id === player.game_id)
      ));

      if (existingQueue) existingQueue.player.push(player) 
      else {
        currentQueue = { label: `${QUEUE_LIST.length === 0 ? 'Siap Bermain' : `Antrian ${QUEUE_LIST.length + 1}`}`, player: [player] };
        QUEUE_LIST.push(currentQueue);
      }
    });

    const fillQueue: Array<Queue[]> = fillQueueSlot(QUEUE_LIST);

    setIsLoadData(false);
    setQueueData(fillQueue);
  }

  const fillQueueSlot = (Queue: Queue[]) => {
    const newQueue: Array<Queue[]> = Queue.map((list:any) => {
      if (list.player.length < 4) {
        const new_p:any = cloneDeep(list.player);
        for (let i=0; i < 4 - list.player.length; i++) {
          new_p.push(null);
        }
        list.player = new_p;
      }
      return list;
    });
    return newQueue;
  }
  
  const destructureList = (listPlayer:PlayerFix[]) => {
    setQueueListRaw(listPlayer);
    const list = cloneDeep(listPlayer);
    const deformPlayerList:PlayerFix[] = [];

    list.forEach((player) => {
      const match = parseInt(player.match_requested)
      if (match > 1) {
        for (let i = 0; i < match; i++) {
          deformPlayerList.push(player)
        }
      } else deformPlayerList.push(player)
    })

    // testing purpose
    // setPlayerList([]);
    // setIsLoadData(false);

    setPlayerList(deformPlayerList);
  }

  const getPlayerDataList = async () => {
    try {
      const {data: player_list} = await supabase.from('player').select();
      if (player_list && player_list.length > 0) setPlayerDataList(player_list);
    } catch (error) {
      console.log('error getting player data', error)
    }
  }

  const getPlayerList = async () => {
    const {data: player_game}= await supabase.from('player_game').select().order('queue_no');
    if (player_game) destructureList(player_game)
  }

  const postPlayer = async (params:any) => {
    const post = await supabase.from('player_game').insert(params)

    if (post.status === 201) {
      setIsModalAddOpen(false);
      toast.success('Pemain ditambahkan dalam Antrian!');
      getPlayerList();
    }
  }

  const updatePlayer = async () => {
    const activeQueue = queueData[0];
    for (const player of activeQueue.player ) {
      const isDeleteRecord: Boolean = player.match_requested - 1 === 0 ? true : false;
      const newMatchTotal = !isDeleteRecord ? player.match_requested - 1 : 0; 
      try {
        const update = !isDeleteRecord ? await supabase
          .from('player_game')
          .update({ match_requested: newMatchTotal })
          .eq('id', player.id) : await supabase.from('player_game').delete().eq('id', player.id) 

        if (update) {
          console.log('sukses', update)
          getPlayerList();
        }
      } catch (error) {
        console.log(error)
      }
    }
    setIsModalQueueDone(false)
    toast.success('Antrian telah selesai dan terupdate!')
  }

  useEffect(() => {
    getPlayerList();
  }, [])

  useEffect(() => {
    if (playerList && playerList.length > 0) queueGameBased();
  }, [playerList])

  useEffect(() => {
    queueCustomPlayerBased();
  }, [maxConsequencePlay])

  const cnQueueMode = (value:string) => {
    if (value === 'game-queue' || value === 'player-queue') setIsLoadData(true)
    if (value === 'game-queue') queueGameBased();
    else if (value === 'player-queue') queuePlayerBased();
    else if (value === 'player-custom-queue') setModalQueue();
    setQueueMode(value);
  }

  const cancelModalQueue = () => {
    cnQueueMode('game-queue');
    setIsModalOpen(false)
  }

  const setModalQueue = () => {
    setIsModalOpen(!isModalOpen);
  }

  const onSubmitMaxQueue = (value:number) => {
    setIsLoadData(true);
    setMaxConsequencePlay(value)
    setModalQueue();
  }

  function rearrange(p_id:string) {
    const currentIndex = queueListRaw.findIndex((player) => player.id === p_id)
    const queueIndex = Math.floor(currentIndex/4);
    const newIndex = 4*(1+queueIndex)
    const totalQueue = queueData.length

    const movedQueue = cloneDeep(queueListRaw);
    if (movedQueue[newIndex] && queueIndex === 0) {
      const movedUp = cloneDeep(movedQueue[newIndex]);
      const movedDown = cloneDeep(movedQueue[currentIndex]);
      movedQueue[currentIndex] = movedUp;
      movedQueue.splice(newIndex, 1);
      movedQueue.push(movedDown);
  
      destructureList(movedQueue)      
    } else {
      setIsModalQueueAdjustOpen(true)
    }

  }

  return (
    <DashboardTemplate>
      <Toaster />
      <div className="h-full relative pb-26 overflow-hidden ">
        <div className='flex flex-wrap flex-col items-start gap-x-3'>
          {!isLoadData ?
          <>
          <div className='flex gap-2 w-full mb-2'>
            <div>
              <h1 className={`${firasans.className} text-white text-xl`}>Total {queueData.length} antrian</h1>
              <p className={`${firasans.className} text-gray-400 text-sm`}>slot kosong di antrian ke 4</p>
            </div>
            <div className='h-full text-right grow justify-self-start self-center'>
              <Button 
                color='primary' 
                startContent={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24" id="plus"><g fill="none" fillRule="evenodd" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" transform="translate(2 2)"><line x1="10" x2="10" y1="6.327" y2="13.654"></line><line x1="13.667" x2="6.333" y1="9.99" y2="9.99"></line><path d="M14.6857143,0 L5.31428571,0 C2.04761905,0 0,2.31208373 0,5.58515699 L0,14.414843 C0,17.6879163 2.03809524,20 5.31428571,20 L14.6857143,20 C17.9619048,20 20,17.6879163 20,14.414843 L20,5.58515699 C20,2.31208373 17.9619048,0 14.6857143,0 Z"></path></g></svg>}
                onClick={() => {
                  getPlayerDataList();
                  setIsModalAddOpen(true)}}>
                Antrean
              </Button>
            </div>
          </div>
          <Link 
            isExternal showAnchorIcon 
            size="sm" href="#" color="success"
            onClick={(e) => {
              e.preventDefault();
              setIsModalSettingsOpen(true)
            }}>
              Quick Settings
          </Link>
          </> : null }
        </div>
        {/* <div className='text-white mt-4'>
          {!isLoadData && queueData.length > 0 ? <ToggleQueueType value={queueMode} cnQueueMode={cnQueueMode}/> : null }
        </div> */}
        <div className='h-full pb-28 mt-6 overflow-scroll no-scroll'>
          {isLoadData ? 
            <div className='flex flex-col items-center justify-center gap-2 h-full'>
              <p>Loading ... </p>
            </div> 
          : <>
          { queueData.length > 0 ? queueData.map((queue, i) => {

          return (
            <div key={i}>
              <QueueCard 
                data={queue} 
                allQueue={queueData}
                onclick={rearrange} 
                active={i===0} 
                totalPlayer={queueListRaw.length}
                updatePlayer={() => setIsModalQueueDone(true)} 
                isReadyToPlay={i===0 && !queue.player.includes(null)} />
            </div>
            )
          }) : 
          <div className={`w-full p-5 flex flex-wrap gap-4 justify-center mb-12`}>
            <div className={`text-center auo grow align-center gap-2 p-2 rounded-md w-min bg-transparent border-dashed border-2 border-gray-400`}>
              <p className='text-center my-10'>Tidak ada Antrian</p>
            </div>
          </div> }
          </> }
        </div>
      </div>
      <ModalQueuePlayerCustom 
        isOpen={isModalOpen} 
        onOpenChange={setModalQueue} 
        onClose={cancelModalQueue} 
        onSubmit={onSubmitMaxQueue} />
      <ModalQueuePlayerAdd 
        playerList={playerDataList}
        isOpen={isModalAddOpen} 
        onOpenChange={() => {setIsModalAddOpen(!isModalAddOpen)}} 
        onClose={() => {setIsModalAddOpen(!isModalAddOpen)}} 
        onSubmit={postPlayer} />
      <ModalQueueSettings
        isOpen={isModalSettingsOpen} 
        onOpenChange={() => {setIsModalSettingsOpen(!isModalSettingsOpen)}} 
        onClose={() => {setIsModalSettingsOpen(!isModalSettingsOpen)}} 
        onSubmit={onSubmitMaxQueue} />
      <ModalQueueAdjust
        isOpen={isModalQueueAdjustOpen} 
        onOpenChange={() => {setIsModalQueueAdjustOpen(!isModalQueueAdjustOpen)}} 
        onClose={() => {setIsModalQueueAdjustOpen(!isModalQueueAdjustOpen)}} 
        onSubmit={onSubmitMaxQueue} />
      <ModalQueueDone
        isOpen={isModalQueueDone} 
        onOpenChange={() => {setIsModalQueueDone(!isModalQueueDone)}} 
        onClose={() => {setIsModalQueueDone(!isModalQueueDone)}} 
        onSubmit={updatePlayer} />
        
    </DashboardTemplate>
  )
};

const QueueCard = ({data, active, allQueue, onclick, totalPlayer, updatePlayer, isReadyToPlay}: any) => {
  const bgCard = active ? 'bg-gradient-to-r from-teal-700 via-teal-800 to-zinc-800 shadow-md shadow-zinc-500' : ''
  const isMoveable = (q:any) => {
    const moveable = totalPlayer>4 && (active || (!active && !allQueue[0].player.some((p:any) => p.game_id === q.game_id)))

    return (
      <>
        <div 
          className='absolute left-1 w-6 fill-red-200 hover:cursor-pointer' 
          onClick={() => {
            if (moveable) onclick(q.id)
            else {
              if (totalPlayer<4 && active) toast.error('Tidak ada pemain lain untuk diganti')
              else toast.error('Player sudah di antrian pertama')
            } 
          }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" id="square-sort-vertical">
            <path fill={moveable?'#111':'#4b5563'} fillRule="evenodd" d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12ZM7.55495 12.7455C7.27632 12.439 6.80199 12.4164 6.49549 12.695C6.189 12.9737 6.16641 13.448 6.44504 13.7545L8.94504 16.5045C9.08719 16.6609 9.28869 16.75 9.5 16.75C9.71131 16.75 9.91281 16.6609 10.055 16.5045L12.555 13.7545C12.8336 13.448 12.811 12.9737 12.5045 12.695C12.198 12.4164 11.7237 12.439 11.445 12.7455L10.25 14.06V8C10.25 7.58579 9.91421 7.25 9.5 7.25C9.08579 7.25 8.75 7.58579 8.75 8V14.06L7.55495 12.7455ZM11.4955 11.305C11.802 11.5836 12.2763 11.561 12.555 11.2545L13.75 9.93995L13.75 16C13.75 16.4142 14.0858 16.75 14.5 16.75C14.9142 16.75 15.25 16.4142 15.25 16L15.25 9.93995L16.445 11.2545C16.7237 11.561 17.198 11.5836 17.5045 11.305C17.811 11.0263 17.8336 10.552 17.555 10.2455L15.055 7.49549C14.9128 7.33914 14.7113 7.25 14.5 7.25C14.2887 7.25 14.0872 7.33914 13.945 7.49549L11.445 10.2455C11.1664 10.552 11.189 11.0263 11.4955 11.305Z" clipRule="evenodd"></path>
          </svg>
        </div>
      </>
    )
  }

  return (
    <>
      <p className={`text-center font-bold ${active?'mb-1 text-xl text-yellow-400':'text-emerald-500 mb-0'}`}>{data.label}</p>
      <div className={`w-full ${bgCard} rounded-lg w-full px-1 md:px-5 md:py-5 ${active?'py-5':'pt-2'} flex flex-wrap gap-4 justify-center mb-6`}>
        {data.player && data.player.map((q:any, j:any) => {
          return (
            <div key={j} className={`relative text-center auo align-center md:gap-2 md:p-2 rounded-md w-min ${q? active ? 'bg-slate-100' : 'bg-zinc-500' : 'bg-transparent border-dashed border-2 border-gray-400'}`}>
              {q?
              <div className={`h-full flex gap-2 justify-center items-center px-2`}>
                {isMoveable(q)}
                <div className={`px-10 grow ${active?'text-black':''} sm:max-w-2 sm:w-8`}>
                  <p className={`font-semibold sm:max-w-2 line-clamp-1 sm:truncate ...`}>{q.game_nickname}</p>
                  {active && <p className={`sm:max-w-2 sm:truncate ...`}>{q.game_id}</p>}
                </div>
                {active ?
                <div 
                  className='absolute right-1 w-6 hover:cursor-pointer'
                  onClick={() => {
                    navigator.clipboard.writeText(q.game_id);
                    toast.success('ID berhasil dicopy!');
                  }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={`${active?'black':'currentColor'}`} className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />
                  </svg>
                </div>
                : null}
              </div>
              :
              <div className='flex items-center h-full justify-center'>
                <p>Antrian Kosong</p>
              </div> }
            </div>
          )
        })}
        {isReadyToPlay?
          <Button color="success" className='bg-yellow-400 mt-4' onClick={() => {}}>
            <label className='text-black text-lg font-medium mx-5' onClick={() => updatePlayer()}>selesai</label>
          </Button> 
          : active && <p className='text-gray-200 text-center font-bold mt-4'>Tidak dapat memulai game dengan 3 orang pemain</p>
        }
      </div>
    </>
  )
}

interface fnProps {
  value: string,
  cnQueueMode: (val:string) => any
}

function ToggleQueueType({value, cnQueueMode}: fnProps) {
  return (
    <RadioGroup
      label=""
      color="success"
      defaultValue="game-queue"
      value={value} 
      classNames={{
        wrapper: 'flex flex-row gap-4'
      }}
      onValueChange={(value:string) => cnQueueMode(value)}
      >
      <Radio classNames={{ label: 'text-white' }} value="game-queue">Game Based</Radio>
      <Radio classNames={{ label: 'text-white' }}  value="player-queue">Player Based</Radio>
      <Radio classNames={{ label: 'text-white' }}  value="player-custom-queue">Custom Player Based</Radio>
    </RadioGroup>
  );
}